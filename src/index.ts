#!/usr/bin/env node
import {
  intro,
  outro,
  text,
  select,
  spinner,
  isCancel,
  cancel,
} from "@clack/prompts";
import { cac } from "cac";
import pc from "picocolors";
import path from "node:path";
import fs from "node:fs/promises";
import { optimizeImages } from "./processor.js";

const cli = cac("lightimg");

cli.command("[dir]", "Optimize images in a directory").action(async (dir) => {
  intro(`${pc.bgCyan(pc.black(" lightimg "))}`);

  let targetDir = dir;

  if (!targetDir) {
    targetDir = await text({
      message: "Which directory should I scan for images?",
      placeholder: "./images",
      initialValue: ".",
      validate(value) {
        if (!value || value.length === 0) return `Value is required!`;
      },
    });
  }

  if (isCancel(targetDir)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const absolutePath = path.resolve(process.cwd(), targetDir);

  try {
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      cancel("The path provided is not a directory.");
      process.exit(1);
    }
  } catch (err) {
    cancel("The path provided does not exist.");
    process.exit(1);
  }

  const s = spinner();
  s.start("Finding images and optimizing...");

  try {
    const result = await optimizeImages(absolutePath);
    s.stop(`Done! Optimized ${pc.green(result.count)} images.`);

    outro(`Output saved to ${pc.cyan(result.outputPath)}`);

    if (result.savings > 0) {
      console.log(
        `${pc.dim("Total space saved:")} ${pc.bold(pc.green(formatBytes(result.savings)))}`,
      );
    }
  } catch (err) {
    s.stop('Failed to optimize images.');
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  }
});

cli.help();
cli.parse();

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
