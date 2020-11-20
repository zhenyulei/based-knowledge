module.exports = {
    markdown: {
        lineNumbers: true
    },
    title: '前端知识集锦',
    description: '前端炼金术计划',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    evergreen: true,
    themeConfig:{
        nav:[
            {text:'Home',link:'/'},
            {text:'目录',link:'/guide/'},
            {text:'vuepress',link:'https://www.vuepress.cn/'},
            {text:'github',link:'https://github.com/zhenyulei/based-knowledge.git'},
        ],
        smoothScroll: true,
        sidebar: {
            '/pages/vue/':[
                {
                    title:'Vue',
                    children:[
                        ['','配置环境'],
                        ['vueBased','基础知识']
                    ]
                }
            ],
            '/pages/react/':[
                {
                    title:'React',
                    children:[
                        '',
                    ]
                }
            ],
            '/pages/miniprogram/':[
                {
                    title:"微信小程序知识汇总",
                    children:[
                        ['','配置环境']
                    ]
                }
            ],
            '/pages/typescript/':[
                {
                    title:'TypeScript',
                    children:[
                        ['','安装'],
                    ]
                }
            ]
        }
    },

}