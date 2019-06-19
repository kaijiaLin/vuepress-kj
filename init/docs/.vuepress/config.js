module.exports = {
    title: 'Title',
    description: 'description',
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    base: '/dist/',
    // repo: 'https://github.com/<your username>/<your repo>',
    dest: './docs/.vuepress/dist',
    ga: '',
    serviceWorker: true,
    evergreen: true,
    themeConfig: {
        // background: `/images/`,
        // github: '<your github>',
        // logo: '/images/logo.png',
        // accentColor: '#ac3e40',
        per_page: 6,
        date_format: 'yyyy-MM-dd HH:mm:ss',

        // 设置顶部导航栏
        nav: [
            { text: '导航', link: '链接' }
        ]
    },
    markdown: {
        lineNumbers: true, // 代码块显示行数
        anchor: {
            permalink: true
        },
        toc: {
            includeLevel: [1, 2]
        },
        config: md => {
            // 使用更多 markdown-it 插件
            md.use(require('markdown-it-task-lists'))
                .use(require('markdown-it-imsize'), { autofill: true })
        }
    },
    postcss: {
        plugins: [require('autoprefixer')]
    },
}