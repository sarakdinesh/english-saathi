const trim = (value: string | undefined) => (value ?? "").trim();

export const config = {
  playStoreUrl: trim(import.meta.env.VITE_PLAY_STORE_URL),
  supportEmail: trim(import.meta.env.VITE_SUPPORT_EMAIL) || "support@example.com",
  waitlistEndpoint: trim(import.meta.env.VITE_WAITLIST_ENDPOINT),
} as const;

export const hasPlayStore = Boolean(config.playStoreUrl);
