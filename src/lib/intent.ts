export const supportedIntents = ["buy", "lease", "sell"] as const;
export type AuraIntent = (typeof supportedIntents)[number];

export const normalizeIntent = (value: string | null | undefined): AuraIntent => {
  if (value === "lease" || value === "sell") return value;
  if (value === "rent") return "lease";
  return "buy";
};

export const resolveIntentFromPath = (
  pathname: string,
  rawIntent?: string | null,
): AuraIntent => {
  if (pathname === "/rent") return "lease";
  if (pathname === "/sell") return "sell";
  if (pathname === "/buy") return "buy";
  return normalizeIntent(rawIntent);
};

export const buildExplorePath = (intent: AuraIntent, section = "areas") =>
  `/explore?intent=${intent}#${section}`;

export const buildConsultationPath = (
  intent: AuraIntent,
  extraParams?: Record<string, string>,
) =>
  `/?${new URLSearchParams({ intent, ...(extraParams ?? {}) }).toString()}#consultation`;
