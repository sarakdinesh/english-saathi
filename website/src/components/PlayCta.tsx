import { config, hasPlayStore } from "../lib/config";
import { hero } from "../content/copy";

type Props = {
  className?: string;
  variant?: "lime" | "green" | "ghost";
};

export function PlayCta({ className = "", variant = "lime" }: Props) {
  const label = hasPlayStore ? hero.playReady : hero.playSoon;
  const classes = `btn btn--${variant} ${hasPlayStore ? "" : "btn--disabled"} ${className}`.trim();

  if (hasPlayStore) {
    return (
      <a
        className={classes}
        href={config.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="btn__stack">
          <span>{label.mr}</span>
          <small>{label.en}</small>
        </span>
      </a>
    );
  }

  return (
    <span className={classes} aria-disabled="true" role="link">
      <span className="btn__stack">
        <span>{label.mr}</span>
        <small>{label.en}</small>
      </span>
    </span>
  );
}
