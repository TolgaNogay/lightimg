import sharp from 'sharp';
import glob from 'fast-glob';
import path from 'node:path';
import fs from 'node:fs/promises';
import pc from 'picocolors';
const SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'tiff'];
export async function optimizeImages(dirPath) {
    const absolutePath = path.resolve(process.cwd(), String(dirPath));
    const optimizedDir = path.join(absolutePath, 'optimized');
    // Create optimized directory if it doesn't exist
    try {
        await fs.mkdir(optimizedDir, { recursive: true });
    }
    catch (err) {
        throw new Error(`Failed to create optimized directory: ${err instanceof Error ? err.message : String(err)}`);
    }
    // Scan for files
    const pattern = path.join(absolutePath, `**/*.{${SUPPORTED_EXTENSIONS.join(',')}}`);
    const files = await glob(pattern, {
        ignore: ['**/optimized/**', '**/node_modules/**'],
        onlyFiles: true,
    });
    if (files.length === 0) {
        throw new Error(`No images found to optimize in "${absolutePath}". Supported extensions: ${SUPPORTED_EXTENSIONS.join(', ')}. Note: "optimized" and "node_modules" folders are ignored.`);
    }
    let totalSavings = 0;
    let optimizedCount = 0;
    for (const file of files) {
        try {
            const filename = path.basename(file, path.extname(file));
            const outputFileName = `${filename}.webp`;
            const outputPath = path.join(optimizedDir, outputFileName);
            const originalStats = await fs.stat(file);
            await sharp(file)
                .webp({ quality: 80, effort: 6 })
                .toFile(outputPath);
            const optimizedStats = await fs.stat(outputPath);
            totalSavings += (originalStats.size - optimizedStats.size);
            optimizedCount++;
        }
        catch (err) {
            console.error(`\n${pc.red('!')} Failed to process ${pc.dim(file)}: ${pc.red(err instanceof Error ? err.message : String(err))}`);
        }
    }
    return {
        count: optimizedCount,
        outputPath: optimizedDir,
        savings: totalSavings > 0 ? totalSavings : 0,
    };
}
//# sourceMappingURL=processor.js.map