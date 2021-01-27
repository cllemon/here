// .vuepress/config.js
module.exports = {
  base: '/ii/',
  title: '木鸢', // Title for the site. This will be displayed in the navbar.
  description: "Web development, Frontend, JavaScript, TypeScript",
  theme: '@vuepress/theme-blog',
  themeConfig: {
    smoothScroll: true,
    // Please keep looking down to see the available options.
    directories: [
      {
        id: '_essays',
        dirname: '_essays',
        title: '随笔',
        path: '/essays/',
        itemPermalink: '/essays/:year/:month/:day/:slug',
      },
      {
        id: '_programming',
        dirname: '_programming',
        title: '编程',
        path: '/programming/',
        itemPermalink: '/programming/:year/:month/:day/:slug',
      },
    ],
    nav: [
      {
        text: '编程',
        link: '/programming/',
      },
      {
        text: '随笔',
        link: '/essays/',
      },
      // {
      //   text: '标签',
      //   link: '/tag/',
      // },
    ],
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/cllemon',
        },
        {
          type: 'mail',
          link: 'mailto:hnx.lemon@gmail.com',
        },
      ],
      copyright: [
        {
          text: 'Powered by VuePress | Wooden Kite © 2017 - Present ',
        },
      ],
    },
    globalPagination: {
      lengthPerPage: 20,
    },
    sitemap: {
      hostname: "https://cllemon.github.io/ii/"
    },
    comment: {
      service: "vssue",
      autoCreateIssue: true,
      prefix: "[Post]",
      owner: "cllemon",
      repo: "ii",
      clientId: "77ee671f2494abd9505e",
      clientSecret: "39104cb3d8856b8cf5c4a344661729607eff715b"
    },
  },
}
