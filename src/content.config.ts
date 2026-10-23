import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),
		comment: z.boolean().optional().default(true),
		password: z.string().optional().default(""),
		passwordHint: z.string().optional().default(""),
		// 仅从公开机器知识入口排除，文章页面仍然保留。
		wikiExclude: z.boolean().optional().default(false),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
	schema: z.object({}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
 };



 
//  title             │ string   │ ✅   │ 文章标题       │ 列表卡片、文章页、SEO、RSS                  │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ published         │ date     │ ✅   │ 发布日期       │ 排序、RSS、结构化数据                       │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ updated           │ date     │ ❌   │ 更新日期       │ 文章底部「上次编辑」卡片、SEO dateModified  │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ description       │ string   │ ❌   │ 摘要           │ 列表卡片简介、<meta description>、分享卡片  │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ image             │ string   │ ❌   │ 封面图         │ 列表/网格卡片、分享卡片（详见下文）         │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ tags              │ string[] │ ❌   │ 标签           │ 标签页、相关文章推荐、卡片标签              │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ category          │ string   │ ❌   │ 分类（单值）   │ 分类页、图谱、相关文章                      │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ pinned            │ boolean  │ ❌   │ 置顶           │ 列表排序靠前、首页置顶轮播                  │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ draft             │ boolean  │ ❌   │ 草稿           │ true 时构建产物中不发布（本地 dev 仍可见）  │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ lang              │ string   │ ❌   │ 文章语言       │ JSON-LD inLanguage，留空用站点默认          │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ author            │ string   │ ❌   │ 作者           │ 文章底部版权区（留空用站点名）              │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ sourceLink        │ string   │ ❌   │ 原文链接       │ 文章底部版权区                              │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ licenseName       │ string   │ ❌   │ 许可协议名称   │ 文章底部版权区                              │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ licenseUrl        │ string   │ ❌   │ 许可协议链接   │ 文章底部版权区                              │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ comment           │ boolean  │ ❌   │ 是否显示评论   │ 默认 true；你已在全局禁用评论，此项目前无效 │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ password          │ string   │ ❌   │ 文章密码       │ 设了就显示密码解锁页（EncryptedPost）       │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ passwordHint      │ string   │ ❌   │ 密码提示       │ 解锁页的提示文字                            │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ wikiExclude       │ boolean  │ ❌   │ 从机器入口排除 │ 不进入 llms.txt/wiki，但文章页面仍存在      │
//   ├───────────────────┼──────────┼──────┼────────────────┼─────────────────────────────────────────────┤
//   │ prevTitle 等 4 项 │ string   │ ❌   │ 内部字段       │ 自动生成，不要手动填写