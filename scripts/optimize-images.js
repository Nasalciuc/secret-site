#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * One-shot image optimizer.
 *
 * Walks src/assets and:
 *   - Resizes any raster image wider than MAX_WIDTH down to MAX_WIDTH (preserves aspect).
 *   - Re-encodes the original PNG/JPG with aggressive compression in place.
 *   - Writes a sibling .webp version alongside each PNG/JPG.
 *
 * Run once: `node scripts/optimize-images.js`
 * Requires: yarn add -D sharp
 *
 * After running, you can switch <img src="...png"> to <picture> with WebP
 * fallback for the biggest wins, or keep existing src and rely on the
 * smaller re-encoded original (still ~70% smaller than the input).
 */

const fs = require('fs')
const path = require('path')

let sharp
try {
    sharp = require('sharp')
} catch (e) {
    console.error('sharp is not installed. Run: yarn add -D sharp')
    process.exit(1)
}

const ROOT = path.join(__dirname, '..', 'src', 'assets')
const MAX_WIDTH = 1600 // hero/banner cap; smaller images stay untouched
const JPG_QUALITY = 78
const PNG_QUALITY = 80
const WEBP_QUALITY = 75

const stats = { scanned: 0, optimized: 0, webp: 0, savedBytes: 0 }

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(full)
            continue
        }
        const ext = path.extname(entry.name).toLowerCase()
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
        if (entry.name.endsWith('.optimized.tmp')) continue
        stats.scanned++
        processImage(full, ext)
    }
}

async function processImage(file, ext) {
    try {
        const before = fs.statSync(file).size
        const meta = await sharp(file).metadata()
        const needsResize = meta.width && meta.width > MAX_WIDTH

        let pipeline = sharp(file).rotate() // honor EXIF orientation
        if (needsResize) {
            pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
        }

        // Re-encode original in place
        const tmp = file + '.optimized.tmp'
        if (ext === '.png') {
            await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true }).toFile(tmp)
        } else {
            await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(tmp)
        }
        fs.renameSync(tmp, file)
        const after = fs.statSync(file).size
        stats.optimized++
        stats.savedBytes += Math.max(0, before - after)

        // Sibling WebP
        const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        let webpPipeline = sharp(file).rotate()
        if (needsResize) {
            webpPipeline = webpPipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
        }
        await webpPipeline.webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(webpPath)
        stats.webp++

        const pct = before ? Math.round((1 - after / before) * 100) : 0
        console.log(
            `${path.relative(process.cwd(), file)}: ${formatSize(before)} -> ${formatSize(after)} (-${pct}%)`,
        )
    } catch (err) {
        console.error(`Failed: ${file}`, err.message)
    }
}

function formatSize(bytes) {
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    if (bytes >= 1024) return (bytes / 1024).toFixed(0) + ' KB'
    return bytes + ' B'
}

;(async () => {
    if (!fs.existsSync(ROOT)) {
        console.error(`Assets dir not found: ${ROOT}`)
        process.exit(1)
    }
    console.log(`Optimizing images in ${ROOT}\n`)
    walk(ROOT)
    // Allow async tasks to finish
    await new Promise((r) => setTimeout(r, 0))
    setTimeout(() => {
        console.log('\nDone.')
        console.log(`Scanned:    ${stats.scanned}`)
        console.log(`Optimized:  ${stats.optimized}`)
        console.log(`WebP made:  ${stats.webp}`)
        console.log(`Saved:      ${formatSize(stats.savedBytes)}`)
    }, 1000)
})()
