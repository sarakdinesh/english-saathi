import { Link } from "react-router-dom";
import { brand, nav } from "../content/copy";

const links = [nav.how, nav.why, nav.paths, nav.getApp] as const;

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link className="nav__brand" to="/" aria-label={brand.full}>
          <img src="/brand/splash-mark.png" alt="" width={36} height={36} />
          <span className="nav__brand-text">
            {brand.en}
            <small>{brand.mr}</small>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav__links">
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.mr}
                  <span className="sr-only"> ({item.en})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--lime nav__cta" href={nav.getApp.href}>
          <span className="btn__stack">
            <span>{nav.getApp.mr}</span>
            <small>{nav.getApp.en}</small>
          </span>
        </a>
      </div>
    </header>
  );
}
