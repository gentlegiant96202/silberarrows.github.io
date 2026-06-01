import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const svg = readFileSync(resolve(root, "app/icon.svg"));

async function png(size, out) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(resolve(root, out));
  console.log("wrote", out, `(${size}x${size})`);
}

// Build a minimal multi-size .ico (16, 32, 48) from PNG frames.
async function ico(out, sizes = [16, 32, 48]) {
  const pngs = await Promise.all(
    sizes.map((s) =>
      sharp(svg, { density: 384 }).resize(s, s).png().toBuffer()
    )
  );
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  pngs.forEach((buf, i) => {
    const s = sizes[i];
    const base = i * 16;
    dir.writeUInt8(s >= 256 ? 0 : s, base + 0); // width
    dir.writeUInt8(s >= 256 ? 0 : s, base + 1); // height
    dir.writeUInt8(0, base + 2); // colors
    dir.writeUInt8(0, base + 3); // reserved
    dir.writeUInt16LE(1, base + 4); // planes
    dir.writeUInt16LE(32, base + 6); // bpp
    dir.writeUInt32LE(buf.length, base + 8); // size
    dir.writeUInt32LE(offset, base + 12); // offset
    offset += buf.length;
  });

  const file = Buffer.concat([header, dir, ...pngs]);
  writeFileSync(resolve(root, out), file);
  console.log("wrote", out, `(${sizes.join(",")})`);
}

await png(512, "public/assets/icons/silberarrows-logo-square.png");
await png(180, "public/apple-touch-icon.png");
await ico("public/favicon.ico");
console.log("done");
