import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
// Loads TypeScript data/state modules in-memory with real relative resolution,
// so tests run against exactly the content the app bundles.
const cache = new Map<string, any>();
export function load(file: string): any {
  let full = path.resolve(file);
  if (!fs.existsSync(full) && fs.existsSync(full + ".ts")) full += ".ts";
  if (fs.existsSync(full) && fs.statSync(full).isDirectory())
    full = path.join(full, "index.ts");
  if (cache.has(full)) return cache.get(full);
  const code = ts.transpileModule(fs.readFileSync(full, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} as any };
  cache.set(full, module.exports);
  new Function("require", "module", "exports", code)(
    (id: string) => load(path.resolve(path.dirname(full), id)),
    module,
    module.exports,
  );
  return module.exports;
}
