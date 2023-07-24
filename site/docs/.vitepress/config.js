export default {
  base: process.env.NODE_ENV === 'production' ? '/shadowWindDoc/' : '/',
  themeConfig: {
    siteTitle: '创达UI',
    nav: [
      { text: '指南', link: '/guide/installation/' },
      { text: '组件', link: '/components/button/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guide/installation',
            },
            {
              text: '快速开始',
              link: '/guide/quickstart',
            },
          ],
        },
        {
          text: '进阶',
          items: [
            {
              text: 'xx',
              link: '/xx',
            },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button',
              link: '/components/button',
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/350478992/chuangda.git' }],
  },
}
