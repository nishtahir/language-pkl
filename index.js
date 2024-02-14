import fs from "fs";
import path from "path";
import plist from "plist";
import json from "format-json";
import yaml from "yamljs";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.resolve(__dirname, "dist/");

/**
 * Wrapper around [writeFileSync] that creates
 * the directory to write in before performing the write.
 * @param {string} dest
 * @param {string} content
 */
function safeWriteFileSync(dest, content) {
  const dir = dest.substring(0, dest.lastIndexOf("/") + 1);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(dest, content);
}

const source = JSON.parse(fs.readFileSync("pkl-vscode/out/pkl.tmLanguage.json", "utf-8"));

console.log("Generating Json file...");
safeWriteFileSync(
  path.resolve(OUTPUT_PATH, "pkl.JSON-tmLanguage"),
  json.plain(source)
);

console.log("Generating Yaml file...");
safeWriteFileSync(
  path.resolve(OUTPUT_PATH, "pkl.YAML-tmLanguage"),
  yaml.stringify(source, 6)
);

console.log("Generating Xml file...");
const xmlData = plist.build(source);
safeWriteFileSync(path.resolve(OUTPUT_PATH, "pkl.tmLanguage"), xmlData);
