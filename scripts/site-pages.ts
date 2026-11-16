// Static Marathi learning pages for the website, built from the app's own
// content so Google can index them (the main site is a client-rendered SPA).
//   node --experimental-strip-types scripts/site-pages.ts
// Writes website/public/learn/*.html; with SITE_URL set (e.g.
// https://englishboluya.in) it also writes sitemap.xml and robots.txt.
import fs from "node:fs";
import path from "node:path";
import { load } from "./lib.ts";

const PLAY = "https://play.google.com/store/apps/details?id=com.englishsaathi.learn";
const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

type Page = { file: string; title: string; description: string; h1: string; body: string };

function shell(p: Page, site: string) {
  const canonical = site ? `<link rel="canonical" href="${site}/learn/${p.file}" />` : "";
  return `<!doctype html>
<html lang="mr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}" />
${canonical}
<link rel="icon" type="image/png" href="/favicon.png" />
<meta name="theme-color" content="#174C3C" />
<style>
:root{--green:#174c3c;--lime:#d8f36a;--ink:#172b24;--bg:#f7f8f2;--line:#dce3d8;--body:#566558;--card:#fff}
@media (prefers-color-scheme:dark){:root{--green:#9fd8b8;--ink:#eef3ec;--bg:#0f1c17;--line:#2a3b33;--body:#b5c4b9;--card:#16261f}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 "Noto Sans Devanagari",system-ui,sans-serif}
main,header,footer{max-width:46rem;margin:0 auto;padding:0 16px}
header{display:flex;justify-content:space-between;align-items:center;padding-top:16px;gap:12px}
header a{color:var(--green);font-weight:700;text-decoration:none}
h1{font-size:1.8rem;line-height:1.3;margin:1.2rem 0 .4rem}h2{font-size:1.25rem;margin:2rem 0 .6rem}
p,li{color:var(--body)}a{color:var(--green)}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 16px;margin:10px 0}
.en{font-weight:700;color:var(--ink);font-size:1.1rem}.say{color:var(--green)}.mr{color:var(--body)}
.wrong{text-decoration:line-through;color:#a1473a}
.cta{display:block;background:var(--lime);color:#172b24;border-radius:999px;padding:14px 20px;text-align:center;font-weight:700;text-decoration:none;margin:2rem 0}
ul.links{padding-left:1.1rem}footer{padding:2rem 16px;font-size:.9rem;color:var(--body)}
</style>
</head>
<body>
<header><a href="/">इंग्लिश बोलूया</a><a href="/learn/index.html">सर्व धडे</a></header>
<main>
<h1>${esc(p.h1)}</h1>
${p.body}
<a class="cta" href="${PLAY}">हे वाक्य ऐका आणि बोलायचा सराव करा — ॲप मोफत डाउनलोड करा</a>
</main>
<footer>इंग्लिश बोलूया · English Boluya — मराठीतून इंग्रजी बोलायला शिका. मोफत, जाहिराती नाहीत, इंटरनेटशिवाय चालते.</footer>
</body>
</html>
`;
}

const card = (en: string, mr: string, say?: string) =>
  `<div class="card"><div class="en">${esc(en)}</div>${say ? `<div class="say">${esc(say)}</div>` : ""}<div class="mr">${esc(mr)}</div></div>`;
const formula = (label: string, f: { en: string; ex: string; mr: string }) =>
  `<h2>${esc(label)}</h2><p><b>${esc(f.en)}</b></p>${card(f.ex, f.mr)}`;

export function pages(): Page[] {
  const { situations, mistakes } = load("src/data/speaking.ts");
  const { tenses, modals, patterns } = load("src/data/grammar.ts");
  const { interviewQuestions, interviewPhrases } = load("src/data/interview.ts");
  const out: Page[] = [];

  for (const x of situations)
    out.push({
      file: `phrases-${x.id}.html`,
      title: `${x.mr} — इंग्रजीत कसे बोलायचे? ${x.title} English sentences in Marathi`,
      description: `${x.mr} या प्रसंगात लागणारी सोपी इंग्रजी वाक्ये, मराठी अर्थ आणि उच्चारासह. ${x.phrases[0].en}`,
      h1: `${x.mr}: इंग्रजी वाक्ये (${x.title})`,
      body: `<p>${esc(x.tip)}</p>${x.phrases.map((p: any) => card(p.en, p.mr, p.say)).join("")}`,
    });

  const grammar = (id: string, name: string, mr: string, use: string, forms: [string, any][], extra = "") =>
    out.push({
      file: `grammar-${id}.html`,
      title: `${name} in Marathi — ${mr} | सूत्र आणि उदाहरणे`,
      description: `${name} (${mr}) मराठीत सोपे: ${use} सूत्र आणि उदाहरणांसह.`,
      h1: `${name} — ${mr}`,
      body: `<p>${esc(use)}</p>${extra}${forms.filter(([, f]) => f).map(([l, f]) => formula(l, f)).join("")}`,
    });
  for (const t of tenses)
    grammar(t.id, t.name, t.mr, t.use, [
      ["होकारार्थी · Affirmative", t.affirmative],
      ["नकारार्थी · Negative", t.negative],
      ["प्रश्न · Question", t.question],
      ["कर्मणी · Passive", t.passive],
    ], `<p>ओळखण्याचे शब्द: <b>${esc(t.signals)}</b></p>`);
  for (const m of modals)
    grammar(m.id, m.modal, m.mr, m.use, [
      ["होकारार्थी · Affirmative", m.affirmative],
      ["नकारार्थी · Negative", m.negative],
      ["प्रश्न · Question", m.question],
      ["कर्मणी · Passive", m.passive],
    ]);
  for (const p of patterns)
    grammar(p.id, p.name, p.mr, p.use, p.forms.map((x: any) => [x.label, x.f]), p.note ? `<p>${esc(p.note)}</p>` : "");

  out.push({
    file: "mistakes.html",
    title: "मराठी बोलणारे इंग्रजीत करतात त्या सामान्य चुका — Common English mistakes",
    description: "मराठीतून शब्दशः भाषांतर केल्यामुळे होणाऱ्या इंग्रजीतील चुका आणि त्यांची बरोबर वाक्ये.",
    h1: "इंग्रजी बोलताना होणाऱ्या सामान्य चुका",
    body: mistakes
      .map((m: any) => `<div class="card"><div class="wrong">${esc(m.wrong)}</div><div class="en">${esc(m.right)}</div><div class="say">${esc(m.say)}</div><div class="mr">${esc(m.why)}</div></div>`)
      .join(""),
  });

  out.push({
    file: "interview.html",
    title: "Interview questions and answers in Marathi — मुलाखतीचे प्रश्न आणि सोपी इंग्रजी उत्तरे",
    description: "नोकरीच्या मुलाखतीत नेहमी विचारले जाणारे २० प्रश्न, सोपी इंग्रजी उत्तरे आणि मराठी अर्थ.",
    h1: "मुलाखतीचे २० प्रश्न आणि सोपी उत्तरे",
    body:
      `<h2>अडकलात तर ही वाक्ये वापरा</h2>${interviewPhrases.map((p: any) => card(p.en, p.mr)).join("")}` +
      interviewQuestions
        .map((q: any, i: number) => `<h2>${i + 1}. ${esc(q.q)}</h2><p>${esc(q.qMr)}</p>${card(q.answer, q.answerMr)}<p>💡 ${esc(q.tip)}</p>`)
        .join(""),
  });

  const link = (p: Page) => `<li><a href="/learn/${p.file}">${esc(p.h1)}</a></li>`;
  const group = (prefix: string) => `<ul class="links">${out.filter((p) => p.file.startsWith(prefix)).map(link).join("")}</ul>`;
  out.unshift({
    file: "index.html",
    title: "मराठीतून इंग्रजी शिका — मोफत धडे | English Boluya",
    description: "रोजच्या प्रसंगातील इंग्रजी वाक्ये, सोपे व्याकरण, मुलाखतीची तयारी आणि सामान्य चुका — सर्व मराठीतून.",
    h1: "मराठीतून इंग्रजी शिका — मोफत धडे",
    body: `<h2>रोजच्या प्रसंगातील वाक्ये</h2>${group("phrases-")}<h2>व्याकरण मराठीत</h2>${group("grammar-")}<h2>मुलाखत आणि चुका</h2>${group("interview")}${group("mistakes")}`,
  });
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const site = (process.env.SITE_URL ?? "").replace(/\/$/, "");
  const dir = "website/public/learn";
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const all = pages();
  for (const p of all) fs.writeFileSync(path.join(dir, p.file), shell(p, site));
  if (site) {
    const urls = ["/", "/privacy", "/terms", ...all.map((p) => `/learn/${p.file}`)];
    fs.writeFileSync(
      "website/public/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join("\n")}\n</urlset>\n`,
    );
    fs.writeFileSync("website/public/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
  }
  console.log(`${all.length} learn pages written${site ? " with sitemap" : " (set SITE_URL for a sitemap)"}.`);
}
