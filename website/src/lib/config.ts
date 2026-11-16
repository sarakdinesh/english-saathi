const trim = (value: string | undefined) => (value ?? "").trim();

export const config = {
  playStoreUrl:
    trim(import.meta.env.VITE_PLAY_STORE_URL) ||
    "https://play.google.com/store/apps/details?id=com.englishsaathi.learn",
  supportEmail: trim(import.meta.env.VITE_SUPPORT_EMAIL) || "support@example.com",
} as const;

export const hasPlayStore = Boolean(config.playStoreUrl);
