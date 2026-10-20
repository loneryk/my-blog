/**
 * Favicon 批量生成脚本
 * 从一张 ≥512×512 的源图，一键生成 public/favicon/ 下的全套图标
 *
 * 使用方法：
 *   node scripts/generate-favicons.js [源图路径]
 *   或把源图放到项目根目录，命名为 favicon-source.png
 *
 * 说明：
 *   - 生成 9 个 PNG（16/32/48/152/167/180/192/512）与 1 个 favicon.ico（内含 16/32/48）
 *   - favicon.svg / safari-pinned-tab.svg 是矢量，sharp 无法从位图生成，需手动替换
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const OUT_DIR = join(ROOT_DIR, "public", "favicon");

// 源图：优先取命令行参数，否则用项目根目录的 favicon-source.png
const sourceArg = process.argv[2];
const SOURCE = sourceArg
	? resolve(process.cwd(), sourceArg)
	: join(ROOT_DIR, "favicon-source.png");

// PNG 输出：文件名 -> 边长
const PNG_SIZES = [
	{ file: "favicon-16x16.png", size: 16 },
	{ file: "favicon-32x32.png", size: 32 },
	{ file: "favicon-48x48.png", size: 48 },
	{ file: "apple-touch-icon.png", size: 180 },
	{ file: "apple-touch-icon-152x152.png", size: 152 },
	{ file: "apple-touch-icon-167x167.png", size: 167 },
	{ file: "apple-touch-icon-180x180.png", size: 180 },
	{ file: "android-chrome-192x192.png", size: 192 },
	{ file: "android-chrome-512x512.png", size: 512 },
];

// favicon.ico 内嵌的尺寸
const ICO_SIZES = [16, 32, 48];

/**
 * 把多个 PNG 打包成一个 ICO 容器（ICONDIR + ICONDIRENTRY + PNG 数据）。
 * 现代浏览器均支持 PNG 压缩的 ICO 条目，无需 BMP 转换。
 */
function createIco(pngs) {
	const count = pngs.length;
	const headerSize = 6 + 16 * count;

	const entries = [];
	let offset = headerSize;

	for (const { width, height, data } of pngs) {
		const entry = Buffer.alloc(16);
		entry.writeUInt8(width >= 256 ? 0 : width, 0);
		entry.writeUInt8(height >= 256 ? 0 : height, 1);
		entry.writeUInt8(0, 2); // colorCount，0 表示不限制
		entry.writeUInt8(0, 3); // reserved
		entry.writeUInt16LE(1, 4); // planes
		entry.writeUInt16LE(32, 6); // bitCount
		entry.writeUInt32LE(data.length, 8); // bytesInRes
		entry.writeUInt32LE(offset, 12); // imageOffset
		entries.push(entry);
		offset += data.length;
	}

	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: 1 = icon
	header.writeUInt16LE(count, 4); // image count

	return Buffer.concat([
		header,
		...entries,
		...pngs.map((p) => p.data),
	]);
}

async function main() {
	if (!existsSync(SOURCE)) {
		console.error(`❌ 未找到源图: ${SOURCE}`);
		console.error("");
		console.error("用法：");
		console.error("  node scripts/generate-favicons.js <源图路径>");
		console.error("  或把源图放到项目根目录，命名为 favicon-source.png");
		process.exit(1);
	}

	mkdirSync(OUT_DIR, { recursive: true });

	// 源图统一裁成正方形（居中裁切）；若本来就是正方形则无影响
	const image = sharp(SOURCE);

	for (const { file, size } of PNG_SIZES) {
		const buf = await image
			.clone()
			.resize(size, size, { fit: "cover" })
			.png()
			.toBuffer();
		writeFileSync(join(OUT_DIR, file), buf);
		console.log(`✅ ${file} (${size}×${size})`);
	}

	// favicon.ico
	const icoPngs = [];
	for (const size of ICO_SIZES) {
		const buf = await image
			.clone()
			.resize(size, size, { fit: "cover" })
			.png()
			.toBuffer();
		icoPngs.push({ width: size, height: size, data: buf });
	}
	writeFileSync(join(OUT_DIR, "favicon.ico"), createIco(icoPngs));
	console.log(`✅ favicon.ico (内含 ${ICO_SIZES.join("/")})`);

	console.log("");
	console.log("⚠️  以下 SVG 未生成（sharp 无法把位图转成矢量）：");
	console.log("   - favicon.svg");
	console.log("   - safari-pinned-tab.svg");
	console.log("   请手动替换，或沿用现有文件。");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
