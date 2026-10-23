import { Link } from "react-router-dom";
import { config } from "../lib/config";

export function Privacy() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <h1>English Boluya (इंग्लिश बोलूया) — Privacy policy</h1>
        <p className="muted">
          Last updated: 22 October 2026 · Contact:{" "}
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
        </p>

        <h2>मराठीत थोडक्यात</h2>
        <p>
          हे ॲप तुमची कोणतीही वैयक्तिक माहिती गोळा करत नाही किंवा कोणालाही पाठवत नाही. खाते नाही,
          जाहिराती नाहीत, analytics नाही. तुमची प्रगती फक्त तुमच्या फोनवर राहते. रेकॉर्डिंग तात्पुरते
          असते आणि फोनबाहेर जात नाही. &quot;शब्द ओळख&quot; फोनवरच चालते.
        </p>

        <h2>What the app stores</h2>
        <p>
          Your learning progress (lessons finished, answers, streak, settings) is stored only on your
          device. It isn&apos;t sent to us or to anyone else. Uninstalling the app or clearing its data
          deletes it.
        </p>

        <h2>Microphone and recordings</h2>
        <p>
          The microphone is used only when you choose to practise speaking. Recordings are temporary
          files on your device, deleted when you leave the screen, and never uploaded. The optional
          word check uses your phone&apos;s built-in on-device speech recogniser in offline mode, so
          your voice stays on your phone. The app works without microphone permission.
        </p>

        <h2>Notifications</h2>
        <p>
          If you turn on the daily reminder, the app schedules local notifications on your device. No
          notification data is sent to a server.
        </p>

        <h2>Text-to-speech</h2>
        <p>English sentences are read aloud by your phone&apos;s own text-to-speech voice.</p>

        <h2>Backups</h2>
        <p>
          You can export your progress as text and share it wherever you choose. The app sends it
          nowhere by itself.
        </p>

        <h2>What we do not do</h2>
        <p>
          No account or login, no advertising, no advertising ID, no analytics or tracking, no
          location, no contacts, no sale or sharing of data.
        </p>

        <h2>This website</h2>
        <p>
          This marketing website does not use advertising or analytics cookies. If you join the
          waitlist, the email address (and optional name) you submit is used only to tell you when
          the app is available. Contact us at{" "}
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a> to ask that we delete
          that message.
        </p>

        <h2>Children</h2>
        <p>The app collects no personal data from anyone, including children.</p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the new version will be posted on this page with a new date.
        </p>

        <p className="muted" style={{ marginTop: "2rem" }}>
          Also see our <Link to="/terms">Terms &amp; conditions</Link>.
        </p>
      </div>
    </article>
  );
}
