// Set VITE_N8N_WEBHOOK_URL in the deployment environment before launch.
export const N8N_WEBHOOK_URL: string =
  (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined) || "";

export const isLeadWebhookConfigured = Boolean(N8N_WEBHOOK_URL.trim());

export async function postLead(payload: Record<string, unknown>): Promise<void> {
  if (!isLeadWebhookConfigured) return;
  await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
