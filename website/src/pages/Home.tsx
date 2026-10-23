import { motion, useReducedMotion } from "framer-motion";
import { brand, features, getApp, hero, paths, stages } from "../content/copy";
import { PlayCta } from "../components/PlayCta";
import { WaitlistForm } from "../components/WaitlistForm";
import { Reveal } from "../components/Reveal";

const shots = [
  "1-home.png",
  "2-lesson-steps.png",
  "3-learn.png",
  "4-speak.png",
  "5-phrasebook.png",
  "6-grammar.png",
] as const;

export function Home() {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="hero" aria-label="English Boluya">
        <div className="hero__grid">
          <div>
            <motion.img
              className="hero__mark"
              src="/brand/splash-mark.png"
              alt=""
              width={72}
              height={72}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            />
            <motion.h1
              className="hero__brand"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {brand.en}
              <span>{brand.mr}</span>
            </motion.h1>
            <motion.p
              className="hero__tagline"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
            >
              {brand.tagline}
            </motion.p>
            <motion.div
              className="hero__support"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <strong>{hero.supportMr}</strong>
              {hero.supportEn}
            </motion.div>
            <motion.div
              className="hero__ctas"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PlayCta variant="lime" />
              <a className="btn btn--ghost-on-dark" href="#get-app">
                <span className="btn__stack">
                  <span>{hero.waitlist.mr}</span>
                  <small>{hero.waitlist.en}</small>
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero__visual"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__phone">
              <img
                src="/screenshots/1-home.png"
                alt="English Boluya home screen showing today’s lesson and streak"
                width={1080}
                height={1920}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <Reveal>
            <p className="section__eyebrow">How it works · कसे शिकाल</p>
            <h2 className="section__title bilingual">
              प्रत्येक धडा सात छोट्या टप्प्यांत
              <small>Every lesson in seven short stages</small>
            </h2>
            <p className="section__lead">
              किती मिनिटे बाकी ते नेहमी दिसते. ऐका, म्हणा, सराव करा — मग खऱ्या संवादात वापरा.
              <span className="en">Listen, speak, practise — then use it in a real exchange.</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="stages">
              {stages.map((stage) => (
                <li key={stage.en}>
                  <div>
                    <strong>{stage.mr}</strong>
                    <span className="en-line">{stage.en}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="shot-strip" aria-label="App screenshots">
              {shots.map((file) => (
                <img
                  key={file}
                  src={`/screenshots/${file}`}
                  alt=""
                  width={200}
                  height={356}
                  loading="lazy"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" id="why">
        <div className="container">
          <Reveal>
            <p className="section__eyebrow">Why Boluya · का निवडाल</p>
            <h2 className="section__title bilingual">
              मराठी बोलणाऱ्यांसाठी बनवलेले
              <small>Built for Marathi speakers</small>
            </h2>
            <p className="section__lead">
              दबाव नाही — प्रोत्साहन आहे. प्रगती फोनवरच; ब्रेक झाला तरी हरकत नाही.
              <span className="en">Encouragement without pressure. Progress stays on your phone.</span>
            </p>
          </Reveal>

          <ul className="feature-list">
            {features.map((item, i) => (
              <Reveal key={item.titleEn} delay={i * 0.05} className="">
                <li>
                  <h3 className="bilingual">
                    {item.titleMr}
                    <small>{item.titleEn}</small>
                  </h3>
                  <p>
                    {item.bodyMr}
                    <span className="en-line">{item.bodyEn}</span>
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="paths">
        <div className="container">
          <Reveal>
            <p className="section__eyebrow">Paths · मार्ग</p>
            <h2 className="section__title bilingual">
              जिथून सुरुवात हवी तिथून
              <small>Start where you are</small>
            </h2>
            <p className="section__lead">
              पाया पासून मध्यम पर्यंत — ऐच्छिक वाचन पाया आणि व्यावसायिक पूर्वावलोकन सह.
              <span className="en">
                From Foundation to Intermediate, with optional reading foundations and a Professional preview.
              </span>
            </p>
          </Reveal>

          <ul className="path-list">
            {paths.map((path, i) => (
              <Reveal key={path.titleEn} delay={i * 0.04}>
                <li>
                  <h3 className="bilingual">
                    {path.titleMr}
                    <small>{path.titleEn}</small>
                  </h3>
                  <p>
                    {path.bodyMr}
                    <span className="en-line">{path.bodyEn}</span>
                  </p>
                  {"note" in path && path.note ? (
                    <p className="note">Preview · प्रायोगिक</p>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint" id="get-app">
        <div className="container get-app">
          <Reveal>
            <p className="section__eyebrow">Get the app · ॲप मिळवा</p>
            <h2 className="section__title bilingual">
              {getApp.titleMr}
              <small>{getApp.titleEn}</small>
            </h2>
            <p className="section__lead">
              {getApp.bodyMr}
              <span className="en">{getApp.bodyEn}</span>
            </p>
            <div className="get-app__actions">
              <PlayCta variant="lime" />
            </div>
            <p className="honesty">
              {getApp.honestyMr}
              <span className="en-line">{getApp.honestyEn}</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
