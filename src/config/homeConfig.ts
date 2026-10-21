import type { HomeConfig } from "../types/config";

export const homeConfig: HomeConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/logo.jpg",

	// 资料卡横幅图（导航 Logo 资料卡第一层）
	// 路径约定与头像一致；留空则回退为「头像模糊放大」当背景
	avatarBanner: "assets/images/avatar-banner.webp",

	// 名字
	name: "loneryk",

	// 首页展示名字（留空则使用 name）
	displayName: "loneryk",

	// 职业/身份标签
	occupation: "[软件工程在读 / 好想成为全干工程师]",

	// 个人签名（支持多条，会循环打字+删除效果）
	bio: ["前路漫漫，道阻且长"],

	hero: {
		backgroundImage: "/assets/images/home/home.avif",
		mosaic: {
			rows: 4,
			columns: 6,
			idleVisible: 6,
			idleInterval: 900,
			seed: 20260814,
			// 首屏六块碎片按 reveal rank 放置；滚动或轮换后的随机布局不受影响。
			initialLayout: [
				{ x: 0.14, y: 0.305, width: 0.104, height: 0.205 },
				{ x: 0.435, y: 0.18, width: 0.068, height: 0.13, blur: 5.5 },
				{ x: 0.642, y: 0.368, width: 0.047, height: 0.092, blur: 5 },
				{ x: 0.863, y: 0.402, width: 0.097, height: 0.19 },
				{ x: 0.337, y: 0.653, width: 0.159, height: 0.313 },
				{ x: 0.639, y: 0.751, width: 0.116, height: 0.228 },
			],
			scrub: 0.45,
			// 滑动距离整体砍半，同样的滚动量推进更快
			desktopScrollDistance: 3250,
			mobileScrollDistance: 2300,
			desktopDialogueTailDistance: 240,
			mobileDialogueTailDistance: 180,
			desktopMinViewports: 4.05,
			mobileMinViewports: 3.05,
			interactionHold: 0.06,
		},
		contact: {
			platform: "Github",
			handle: "loneryk",
		},
		sticker: {
			image: "assets/images/logo.jpg",
			alt: "logo",
		},
		//	galgame 对话框（写死暗黑主题）。内容全部由此驱动，可自由增删
		dialogue: {
			enabled: true,
			speakers: {
				host: "loneryk",
				visitor: "访客",
			},
			menuTitle: "想聊点什么？",
			typingSpeed: 45,
			autoDelay: 1600,
			// 默认逐句播放的简介，末句后弹出话题菜单
			intro: [
				{ speaker: "host", text: "欢迎我的博客，仅仅用作个人前进的记录" },
				{
					speaker: "host",
					text: "我是loneryk，一个软件工程在读的福州学生，还没有多少成绩，仍在沉淀中",
				},
				{
					speaker: "host",
					text: "如果你也同样在沉淀，不妨来和我一起交流交流，一起进步吧",
				},

				{ speaker: "host", text: "想聊点什么？" },
			],
			// 话题菜单：点击进入逐句对话，末句后返回菜单
			topics: [
				{
					title: "关于我",
					lines: [
						{ speaker: "visitor", text: "你是怎么样的人" },
						{
							speaker: "host",
							text: "努力尝试走出舒适圈ing，音乐爱好者，包括不限于，edm ，hiphop，电子，民谣，流行，轻音乐，等等",
						},
						{
							speaker: "host",
							text: "想让脑中的构想慢慢落地，这样说可能有些过于乐观了（笑）",
						},

						{
							speaker: "host",
							text: "总之，一个正在努力的人吧",
						},
					],
				},
				{
					title: "为什么做博客",
					lines: [
						{
							speaker: "host",
							text: "记录自己的变化，也希望自己能够对他人产生影响",
						},
						{
							speaker: "host",
							text: "博客是个人思考的沉淀，是个人成长的见证，能给自己的记忆一个存档",
						},
						// { speaker: "host", text: "慢慢逛，角落里藏着不少彩蛋呢喵！" },
					],
				},
			],
		},
		// 玻璃雨珠 + 撞击水花（移动端自动降低密度，尊重 prefers-reduced-motion）
		rain: {
			enabled: true,
			intensity: 0.6,
			// 留空则随主题自动取色（暗色→白 / 浅色→深灰）；也可填 "#7fb0ff" 或 "127,176,255"
			color: "#ffffff",
		},
	},

	dataLayer: {
		visitImage: "/assets/images/home/home-data-1.avif",
		archiveImage: "/assets/images/home/home-data-2.avif",
		contactImage: "/assets/images/home/home-data-3.avif",
	},

	// 桌面端双层影像交互：固定背景揭示 → 五幕画面横向叙事
	homeBlinds: {
		enabled: true,
		reveal: {
			backgroundImage: "/assets/images/home-blinds/act2/1.webp",
			foregroundImage: "/assets/images/home-blinds/act1/1.webp",
			foregroundAlt: "奔跑人物剪影",
			foregroundOpacity: 0.5,
			pointerTravel: 28,
			// 长条横移揭示的入场标题：标题单行显示（版式按 4 字排），
			// 祝福语单行显示（版式按 5 字排），可自由增减条数
			headline: {
				title: "祝愿各位",
				messages: ["夜路有星光", "岁岁皆欢愉", "所念皆星河", "版本无回滚"],
				enterDuration: 0.6,
				messageHold: 2.6,
				messageFlipDuration: 0.75,
			},
		},
		scenes: {
			scrollDistance: 3400,
			// 背景跑马灯：列表从右往左无缝循环，只有一张也会自动复制到铺满
			cycleImages: ["/assets/images/home-blinds/act-cycle/1.webp"],
			cycleDuration: 26,
			composite: {
				eyebrow: "PROLOGUE / RUN",
				title: "从此刻开始",
				description: "以代码为梁、热爱为瓦，荒原上筑起一间自己的小屋。",
				alt: "第一幕插画",
				// 明信片右下角的落款日期，按每张图的实际日期改；删掉即不显示
				date: "2026 / 10 / 20",
			},
			items: [
				{
					eyebrow: "SCENE 02 / LIGHT",
					title: "灯火阑珊",
					description: "莫听穿林打叶声",
					image: "/assets/images/home-blinds/act3/1.webp",
					alt: "第二幕插画",
					date: "2026 / 06 / 10",
				},
				{
					eyebrow: "SCENE 03 / WIND",
					title: "静待花开",
					description: "",
					image: "/assets/images/home-blinds/act3/2.webp",
					alt: "第三幕插画",
					date: "2026 / 06 / 21",
				},
				{
					eyebrow: "SCENE 04 / PAGE",
					title: "拥抱未来",
					description: "不断迭代，不断更新",
					image: "/assets/images/home-blinds/act3/3.webp",
					alt: "第四幕插画",
					date: "2026 / 08 / 18",
				},
				{
					eyebrow: "FINALE / ARRIVE",
					title: "抵达之前",
					description: "笔墨暂歇，来日方长；下一程山水，且歌且行。",
					image: "/assets/images/home-blinds/act3/4.webp",
					alt: "第五幕插画",
					date: "2026 / 09 / 01",
				},
			],
			// 立牌图；置为空数组则不渲染底部立牌
			standImages: [],
		},
	},

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		// {
		// 	name: "qq",
		// 	icon: "fa7-brands:qq",
		// 	url: "https://qm.qq.com/q/2R07cjGTZ0",
		// 	showName: false,
		// },
		// {
		// 	name: "B站",
		// 	icon: "fa7-brands:bilibili",
		// 	url: "https://space.bilibili.com/15446538",
		// 	showName: false,
		// },
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/loneryk",
			showName: false,
		},
		// {
		// 	name: "站内留言",
		// 	icon: "material-symbols:chat-rounded",
		// 	url: "/guestbook/",
		// 	showName: false,
		// },
		// {
		// 	name: "RSS",
		// 	icon: "fa7-solid:rss",
		// 	url: "/rss/",
		// 	showName: false,
		// },
	],
};
