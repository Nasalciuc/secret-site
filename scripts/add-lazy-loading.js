#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Adds loading="lazy" and decoding="async" to <img> tags in .vue files
 * that don't already declare them. Idempotent — safe to re-run.
 *
 * Skips images that opt-out by setting loading="eager".
 *
 * Usage: node scripts/add-lazy-loading.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', 'src')
const stats = { scanned: 0, modified: 0, imgsTouched: 0 }

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(full)
        } else if (entry.name.endsWith('.vue')) {
            processFile(full)
        }
    }
}

function processFile(file) {
    stats.scanned++
    const original = fs.readFileSync(file, 'utf8')
    let touched = 0

    // Match each <img ...> opening tag (handles multi-line)
    const updated = original.replace(/<img\b([^>]*?)\/?>/gs, (match, attrs) => {
        // Skip if loading attribute already present
        if (/\bloading\s*=/.test(attrs) || /\bdecoding\s*=/.test(attrs)) {
            return match
        }
        touched++
        const trimmed = attrs.replace(/\s+$/, '')
        const sep = trimmed.length && !trimmed.endsWith(' ') ? ' ' : ''
        const isSelfClosing = match.endsWith('/>')
        return `<img${trimmed}${sep}loading="lazy" decoding="async"${isSelfClosing ? ' />' : '>'}`
    })

    if (touched > 0 && updated !== original) {
        fs.writeFileSync(file, updated, 'utf8')
        stats.modified++
        stats.imgsTouched += touched
        console.log(`${path.relative(process.cwd(), file)}: +${touched} img${touched > 1 ? 's' : ''}`)
    }
}

walk(ROOT)
console.log(`\nDone. Files scanned: ${stats.scanned}, modified: ${stats.modified}, imgs updated: ${stats.imgsTouched}`)
