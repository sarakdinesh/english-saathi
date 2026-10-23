import { Link } from "react-router-dom";
import { config } from "../lib/config";

export function Terms() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <h1>English Boluya (इंग्लिश बोलूया) — Terms &amp; conditions</h1>
        <p className="muted">
          Last updated: 23 October 2026 · Contact:{" "}
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
        </p>

        <h2>मराठीत थोडक्यात</h2>
        <p>
          इंग्लिश बोलूया हे मोफत शिक्षण ॲप आहे. खाते नसते; प्रगती तुमच्या फोनवर राहते. हे ॲप भाषेचे
          प्रमाणपत्र किंवा अस्खलिततेचे आश्वासन देत नाही. मायक्रोफोन ऐच्छिक आहे. वेबसाइट आणि ॲप
          वापरताना या अटींना सहमती मानली जाते.
        </p>

        <h2>1. Agreement</h2>
        <p>
          By downloading, installing, or using the English Boluya mobile application (the
          &quot;App&quot;) or by using this website, you agree to these Terms &amp; conditions. If you
          do not agree, do not use the App or website.
        </p>

        <h2>2. The service</h2>
        <p>
          English Boluya is a free, Marathi-first spoken-English learning app. Lessons and practice
          content are bundled for offline use. There is no account or login. Learning progress is
          stored on your device unless you choose to export a backup yourself.
        </p>

        <h2>3. Licence</h2>
        <p>
          We grant you a personal, non-exclusive, non-transferable, revocable licence to use the App
          for your own learning. You may not copy, redistribute, reverse engineer, or use the content
          for commercial teaching products without prior written permission.
        </p>

        <h2>4. No certificates or fluency guarantees</h2>
        <p>
          The App does not issue language certificates, CEFR levels, or exam scores. Practice tools
          such as listen-and-repeat and on-device word check are learning aids, not pronunciation
          grades or proficiency assessments. We do not promise fluency in any fixed time.
        </p>

        <h2>5. Microphone and optional features</h2>
        <p>
          Speaking practice may request microphone access. You can refuse permission; core lessons
          still work. Recordings stay temporary on your device and are not uploaded by the App. See
          our <Link to="/privacy">Privacy policy</Link> for details.
        </p>

        <h2>6. Your responsibilities</h2>
        <p>
          You are responsible for keeping device backups you export, for any content you choose to
          share outside the App, and for using the App in a way that complies with applicable law.
        </p>

        <h2>7. Website waitlist</h2>
        <p>
          If you join the waitlist on this website, you ask us to contact you about App availability.
          You can ask us to stop by emailing{" "}
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
        </p>

        <h2>8. Disclaimer</h2>
        <p>
          The App and website are provided &quot;as is&quot; without warranties of any kind, to the
          fullest extent permitted by law. We do not warrant uninterrupted availability of store
          listings, device speech voices, or on-device speech recognition, which depend on your
          device and platform.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, we are not liable for any indirect,
          incidental, or consequential damages arising from your use of the App or website, or from
          loss of local progress if you uninstall the App or clear its data.
        </p>

        <h2>10. Changes</h2>
        <p>
          We may update these terms. The new version will be posted on this page with an updated
          date. Continued use after changes means you accept the revised terms.
        </p>

        <h2>11. Governing law</h2>
        <p>
          These terms are governed by the laws of India, without regard to conflict-of-law rules.
          Courts in India shall have exclusive jurisdiction, subject to any mandatory consumer
          protections that apply where you live.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
        </p>

        <p className="muted" style={{ marginTop: "2rem" }}>
          Related: <Link to="/privacy">Privacy policy</Link>.
        </p>
      </div>
    </article>
  );
}
