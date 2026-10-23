import { Link } from "react-router-dom";
import { brand, footer, nav } from "../content/copy";
import { config } from "../lib/config";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">{brand.full}</div>
            <p className="footer__tag">{footer.tagline}</p>
          </div>
          <ul className="footer__links">
            <li>
              <Link to="/privacy">{nav.privacy.mr}</Link>
              <span className="sr-only"> / {nav.privacy.en}</span>
            </li>
            <li>
              <Link to="/terms">{nav.terms.mr}</Link>
              <span className="sr-only"> / {nav.terms.en}</span>
            </li>
            <li>
              <a href={`mailto:${config.supportEmail}`}>
                {footer.contact}
              </a>
            </li>
            <li>
              <a href="/#get-app">वेटलिस्ट</a>
            </li>
          </ul>
        </div>
        <div className="footer__meta">
          <span>{footer.rights}</span>
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
        </div>
      </div>
    </footer>
  );
}
