import { useEffect, useState, FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isLeadWebhookConfigured, postLead } from "@/lib/webhook";
import { Send, CheckCircle } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(30),
  current_location: z.string().min(1, "Please select an option"),
  budget: z.string().min(1, "Please select a budget"),
  timeline: z.string().min(1, "Please select a timeline"),
  primary_goal: z.string().min(1, "Please select your intent"),
  financing_type: z.string().optional(),
  interest: z.string().trim().max(180).optional(),
  property_status: z.string().optional(),
  selling_reason: z.string().optional(),
  launch_preference: z.string().optional(),
  estimated_value: z.string().trim().max(80).optional(),
  seller_notes: z.string().trim().max(600).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to proceed" }),
  }),
});

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  current_location: string;
  budget: string;
  timeline: string;
  primary_goal: string;
  financing_type: string;
  interest: string;
  property_status: string;
  selling_reason: string;
  launch_preference: string;
  estimated_value: string;
  seller_notes: string;
  consent: boolean;
};

const getInitialInterest = () => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("interest") || "";
};

const getInitialIntent = () => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("intent") || "";
};

const initialFormState = (): FormState => ({
  full_name: "",
  email: "",
  phone: "",
  current_location: "",
  budget: "",
  timeline: "",
  primary_goal: getInitialIntent(),
  financing_type: "",
  interest: getInitialInterest(),
  property_status: "",
  selling_reason: "",
  launch_preference: "",
  estimated_value: "",
  seller_notes: "",
  consent: false,
});

const fieldClass =
  "w-full bg-input/60 border border-primary/15 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-input transition-colors duration-300";
const labelClass = "block text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-muted-foreground mb-2";

const getUtm = () => {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || null,
    utm_medium: p.get("utm_medium") || null,
    utm_campaign: p.get("utm_campaign") || null,
    utm_term: p.get("utm_term") || null,
    utm_content: p.get("utm_content") || null,
  };
};

const getInquiryContext = () => {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    interest: p.get("interest") || null,
    building: p.get("building") || null,
    area: p.get("area") || null,
    residence: p.get("residence") || null,
    residence_type: p.get("type") || null,
    price: p.get("price") || null,
    bedrooms: p.get("beds") || null,
    view: p.get("view") || null,
    intent: p.get("intent") || null,
  };
};

const ConsultationForm = () => {
  const location = useLocation();
  const [data, setData] = useState<FormState>(() => initialFormState());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const context = getInquiryContext();
  const isSellInquiry = data.primary_goal === "sell" || context.intent === "sell";
  const hasContext = Boolean(
    context.interest || context.building || context.area || context.residence,
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nextIntent = params.get("intent");
    const nextInterest = params.get("interest");

    if (!nextIntent && !nextInterest) return;

    setData((current) => ({
      ...current,
      primary_goal: nextIntent || current.primary_goal,
      interest: nextInterest || current.interest,
    }));
  }, [location.search]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const n = { ...e };
        delete n[key as string];
        return n;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const k = issue.path[0] as string;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const { consent: _consent, ...formData } = result.data;
      const payload = {
        ...formData,
        page_url: window.location.href,
        submitted_at: new Date().toISOString(),
        source: "the-aura-miami-website",
        inquiry_context: getInquiryContext(),
        ...getUtm(),
      };

      if (!isSupabaseConfigured && !isLeadWebhookConfigured) {
        const subject = encodeURIComponent("Residence Inquiry — The Aura Miami");
        const body = encodeURIComponent(
          `Name: ${result.data.full_name}\nEmail: ${result.data.email}\nPhone: ${result.data.phone}\nLocation: ${result.data.current_location}\nBudget: ${result.data.budget}\nTimeline: ${result.data.timeline}\nIntent: ${result.data.primary_goal}\nInterest: ${result.data.interest || "Not specified"}\nProperty status: ${result.data.property_status || "Not specified"}\nSelling reason: ${result.data.selling_reason || "Not specified"}\nLaunch preference: ${result.data.launch_preference || "Not specified"}\nEstimated value: ${result.data.estimated_value || "Not specified"}\nSeller notes: ${result.data.seller_notes || "None"}`,
        );
        window.open(`mailto:hello@theauramiami.com?subject=${subject}&body=${body}`, "_blank");
        setSubmitted(true);
        setSubmitting(false);
        return;
      }

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("leads").insert([payload]);
        if (error) throw error;
      }

      // Fire-and-forget to n8n — errors are non-fatal so the user always gets a success state.
      postLead(payload).catch((err) => console.warn("Webhook delivery failed", err));

      setSubmitted(true);
      toast.success("Request received. We'll contact you shortly.");
      setData(initialFormState());
    } catch (err) {
      console.error("Lead submission failed", err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-panel p-8 sm:p-10 md:p-14 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <p className="eyebrow mb-4">Thank you</p>
        <h3 className="serif text-3xl md:text-4xl mb-4 gold-text">
          Request received.
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
          We will review your intent, area or property context, and preferred
          timeline before responding by email or phone. For urgent requests, use{" "}
          <a href="mailto:hello@theauramiami.com" className="text-primary hover:text-primary-glow">
            hello@theauramiami.com
          </a>
          .
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-5 sm:p-8 md:p-10 lg:p-12" noValidate>
      <div className="mb-7 md:mb-8">
        <p className="eyebrow mb-4 text-[10px] sm:text-xs">Private Consultation</p>
        <h3 className="serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
          Begin a private strategy conversation.
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          What happens next: your inquiry is reviewed by intent, routed with
          discretion, and answered with either a focused shortlist, lease
          verification path, or seller strategy next step.
        </p>
        {hasContext && (
          <div className="border border-primary/20 bg-primary/8 px-4 py-3 text-xs text-muted-foreground">
            <div className="text-[9px] uppercase tracking-[0.28em] text-primary mb-1">
              Inquiry Context
            </div>
            <div className="text-foreground/85 leading-relaxed">
              {[context.interest, context.price, context.bedrooms && `${context.bedrooms} bed`, context.view]
                .filter(Boolean)
                .join(" · ")}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="full_name">Full Name</label>
          <input id="full_name" type="text" className={fieldClass} value={data.full_name}
            onChange={(e) => update("full_name", e.target.value)} maxLength={100} />
          {errors.full_name && <p className="text-destructive text-xs mt-1.5">{errors.full_name}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" type="email" className={fieldClass} value={data.email}
            onChange={(e) => update("email", e.target.value)} maxLength={255} />
          {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" type="tel" className={fieldClass} value={data.phone}
            onChange={(e) => update("phone", e.target.value)} maxLength={30} />
          {errors.phone && <p className="text-destructive text-xs mt-1.5">{errors.phone}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="current_location">Current Location</label>
          <select id="current_location" className={fieldClass} value={data.current_location}
            onChange={(e) => update("current_location", e.target.value)}>
            <option value="">Select…</option>
            <option>Canada</option>
            <option>United States</option>
            <option>Brazil</option>
            <option>Colombia</option>
            <option>Europe</option>
            <option>Other</option>
          </select>
          {errors.current_location && <p className="text-destructive text-xs mt-1.5">{errors.current_location}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="budget">Estimated Budget</label>
          <select id="budget" className={fieldClass} value={data.budget}
            onChange={(e) => update("budget", e.target.value)}>
            <option value="">Select…</option>
            <option>$500K–$1M</option>
            <option>$1M–$2M</option>
            <option>$2M–$5M</option>
            <option>$5M+</option>
          </select>
          {errors.budget && <p className="text-destructive text-xs mt-1.5">{errors.budget}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="timeline">Timeline</label>
          <select id="timeline" className={fieldClass} value={data.timeline}
            onChange={(e) => update("timeline", e.target.value)}>
            <option value="">Select…</option>
            <option>0–3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>12+ months</option>
          </select>
          {errors.timeline && <p className="text-destructive text-xs mt-1.5">{errors.timeline}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="primary_goal">Inquiry Intent</label>
          <select id="primary_goal" className={fieldClass} value={data.primary_goal}
            onChange={(e) => update("primary_goal", e.target.value)}>
            <option value="">Select…</option>
            <option value="buy">Buy</option>
            <option value="lease">Rent / Lease</option>
            <option value="sell">Sell</option>
            <option value="invest">Invest</option>
            <option>Relocation</option>
          </select>
          {errors.primary_goal && <p className="text-destructive text-xs mt-1.5">{errors.primary_goal}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="financing_type">Cash / Finance</label>
          <select id="financing_type" className={fieldClass} value={data.financing_type}
            onChange={(e) => update("financing_type", e.target.value)}>
            <option value="">Optional</option>
            <option value="cash">Cash</option>
            <option value="finance">Finance</option>
            <option value="cash_or_finance">Cash or finance</option>
            <option value="not_sure">Not sure yet</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="interest">
            {isSellInquiry ? "Selling Address" : "Building, Area, or Residence"}
          </label>
          <input
            id="interest"
            type="text"
            className={fieldClass}
            value={data.interest}
            onChange={(e) => update("interest", e.target.value)}
            placeholder={
              isSellInquiry
                ? "Enter the property address you are considering selling"
                : "Example: Missoni Baia, Brickell, 3-bed bay view"
            }
            maxLength={180}
          />
        </div>

        {isSellInquiry && (
          <>
            <div>
              <label className={labelClass} htmlFor="property_status">Occupancy Status</label>
              <select
                id="property_status"
                className={fieldClass}
                value={data.property_status}
                onChange={(e) => update("property_status", e.target.value)}
              >
                <option value="">Optional</option>
                <option>Owner occupied</option>
                <option>Tenant occupied</option>
                <option>Vacant</option>
                <option>Seasonal use</option>
                <option>Under renovation</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="selling_reason">Reason For Selling</label>
              <select
                id="selling_reason"
                className={fieldClass}
                value={data.selling_reason}
                onChange={(e) => update("selling_reason", e.target.value)}
              >
                <option value="">Optional</option>
                <option>Testing the market</option>
                <option>Relocation</option>
                <option>Upgrading</option>
                <option>Downsizing</option>
                <option>Investment exit</option>
                <option>Estate planning</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="launch_preference">Launch Preference</label>
              <select
                id="launch_preference"
                className={fieldClass}
                value={data.launch_preference}
                onChange={(e) => update("launch_preference", e.target.value)}
              >
                <option value="">Optional</option>
                <option>Private / off-market first</option>
                <option>Pre-market testing</option>
                <option>Public listing strategy</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="estimated_value">Estimated Value</label>
              <input
                id="estimated_value"
                type="text"
                className={fieldClass}
                value={data.estimated_value}
                onChange={(e) => update("estimated_value", e.target.value)}
                placeholder="Example: $2.5M-$3M or not sure"
                maxLength={80}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="seller_notes">Seller Notes</label>
              <textarea
                id="seller_notes"
                className={`${fieldClass} min-h-28 resize-y`}
                value={data.seller_notes}
                onChange={(e) => update("seller_notes", e.target.value)}
                placeholder="Anything we should know about timing, condition, privacy, tenants, or desired strategy?"
                maxLength={600}
              />
            </div>
          </>
        )}

        <div className="md:col-span-2 mt-2">
          <label className="flex items-start gap-3 cursor-pointer group border border-primary/10 bg-background/25 p-4">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0"
            />
            <span className="text-xs leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
              I agree to be contacted by SMS/email about my inquiry. Message and data
              rates may apply. I can opt out at any time. I agree to the{" "}
              <Link to="/privacy" className="text-primary hover:text-primary-glow">
                privacy notice
              </Link>
              .
            </span>
          </label>
          {errors.consent && <p className="text-destructive text-xs mt-1.5">{errors.consent}</p>}
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="group relative inline-flex min-h-12 w-full items-center justify-center px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground bg-gradient-gold shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-5px_hsl(var(--gold)/0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:tracking-[0.26em]"
          >
            {submitting ? "Submitting…" : "Request Consultation"}
            {!submitting && (
              <Send className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ConsultationForm;
