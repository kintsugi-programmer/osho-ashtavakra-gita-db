import fs from "fs";
import path from "path";

const sourceDir = path.join(process.cwd(), "..", "kaggle_dataset");
const destDir = path.join(process.cwd(), "public", "data");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

for (const file of files) {
  if (file.endsWith(".json")) {
    const source = path.join(sourceDir, file);
    const dest = path.join(destDir, file);
    fs.copyFileSync(source, dest);
    console.log(`Copied ${file}`);
  }
}

const chapters: { chapter: number; chunks: number }[] = [];

for (const file of files.sort()) {
  if (file.startsWith("ch") && file.endsWith(".json")) {
    const chapterNo = parseInt(file.match(/ch(\d+)/)?.[1] || "0");
    const data = JSON.parse(fs.readFileSync(path.join(destDir, file), "utf-8"));
    chapters.push({ chapter: chapterNo, chunks: data.length });
  }
}

fs.writeFileSync(
  path.join(destDir, "chapters.json"),
  JSON.stringify(chapters)
);

console.log("Sync complete!");
console.log("Chapters:", chapters);