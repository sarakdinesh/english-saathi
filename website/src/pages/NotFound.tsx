import { Link } from "react-router-dom";
import { notFound } from "../content/copy";

export function NotFound() {
  return (
    <div className="not-found container">
      <h1 className="bilingual">
        {notFound.titleMr}
        <small>{notFound.titleEn}</small>
      </h1>
      <p>
        {notFound.bodyMr}
        <span className="en-line">{notFound.bodyEn}</span>
      </p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn--lime" to="/">
          <span className="btn__stack">
            <span>{notFound.home.mr}</span>
            <small>{notFound.home.en}</small>
          </span>
        </Link>
      </p>
    </div>
  );
}
