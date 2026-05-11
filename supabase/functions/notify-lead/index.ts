const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = "asher@vectraeliteglobal.com";
const FROM_EMAIL = "The Aura Miami <onboarding@resend.dev>";

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const lead = payload.record;

    const html = `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#f0ece4;padding:40px;">
        <div style="border-bottom:1px solid rgba(212,175,95,0.3);padding-bottom:20px;margin-bottom:28px;">
          <p style="font-family:Inter,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(212,175,95,0.85);margin:0 0 8px;">The Aura Miami</p>
          <h1 style="font-size:28px;font-weight:300;margin:0;color:#f0ece4;">New Inquiry Received</h1>
        </div>

        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", lead.full_name)}
          ${row("Email", lead.email)}
          ${row("Phone", lead.phone)}
          ${row("Location", lead.current_location)}
          ${row("Intent", lead.primary_goal)}
          ${row("Budget", lead.budget)}
          ${row("Timeline", lead.timeline)}
          ${row("Financing", lead.financing_type || "—")}
          ${row("Interest", lead.interest || "—")}
          ${row("Page", lead.page_url)}
          ${row("Submitted", new Date(lead.submitted_at).toLocaleString("en-US", { timeZone: "America/New_York" }))}
        </table>

        <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(212,175,95,0.15);">
          <a href="https://supabase.com/dashboard/project/uttiwpmshzwbxarhsjsd/editor"
             style="display:inline-block;padding:12px 24px;background:rgba(212,175,95,0.15);border:1px solid rgba(212,175,95,0.4);color:rgba(212,175,95,0.9);font-family:Inter,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            View in Supabase
          </a>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        subject: `New Inquiry — ${lead.full_name} · ${lead.primary_goal} · ${lead.budget}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});

function row(label: string, value: string) {
  return `
    <tr>
      <td style="font-family:Inter,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(212,175,95,0.7);padding:10px 16px 10px 0;vertical-align:top;white-space:nowrap;">${label}</td>
      <td style="font-size:14px;color:rgba(240,236,228,0.85);padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${value || "—"}</td>
    </tr>
  `;
}
