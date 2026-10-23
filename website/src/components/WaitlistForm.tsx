import { useState } from "react";
import type { FormEvent } from "react";
import { config } from "../lib/config";
import { getApp } from "../content/copy";

type Status = "idle" | "sending" | "ok" | "err";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!email) return;

    setStatus("sending");

    try {
      if (config.waitlistEndpoint) {
        const res = await fetch(config.waitlistEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, source: "english-boluya-website" }),
        });
        if (!res.ok) throw new Error("request failed");
        setStatus("ok");
        form.reset();
        return;
      }

      const subject = encodeURIComponent("English Boluya waitlist");
      const body = encodeURIComponent(
        [`Name: ${name || "(not provided)"}`, `Email: ${email}`, "", "Please add me to the waitlist."].join(
          "\n",
        ),
      );
      window.location.href = `mailto:${config.supportEmail}?subject=${subject}&body=${body}`;
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="waitlist" onSubmit={onSubmit} noValidate>
      <h3 className="bilingual">
        वेटलिस्ट
        <small>Waitlist</small>
      </h3>
      <p className="en-line" style={{ color: "var(--body)", marginTop: "0.5rem" }}>
        <strong>{getApp.formSubmit.mr}</strong>
        <span className="en-line">{getApp.formSubmit.en}</span>
      </p>

      <div className="field">
        <label htmlFor="waitlist-name">
          {getApp.formName.mr}
          <span className="en-line">{getApp.formName.en}</span>
        </label>
        <input id="waitlist-name" name="name" type="text" autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="waitlist-email">
          {getApp.formEmail.mr}
          <span className="en-line">{getApp.formEmail.en}</span>
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <button className="btn btn--green" type="submit" disabled={status === "sending"}>
        <span className="btn__stack">
          <span>{status === "sending" ? getApp.formSending.mr : getApp.formSubmit.mr}</span>
          <small>{status === "sending" ? getApp.formSending.en : getApp.formSubmit.en}</small>
        </span>
      </button>

      {status === "ok" && (
        <p className="form-status form-status--ok" role="status">
          {getApp.formSuccess.mr}
          <span className="en-line">{getApp.formSuccess.en}</span>
        </p>
      )}
      {status === "err" && (
        <p className="form-status form-status--err" role="alert">
          {getApp.formError.mr}
          <span className="en-line">{getApp.formError.en}</span>
        </p>
      )}
    </form>
  );
}
