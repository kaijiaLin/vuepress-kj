#! /usr/bin/env node

const program = require('commander')
const mkdirp = require('mkdirp')
const os = require('os')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const sortedObject = require('sorted-object')

const _exit = process.exit
const eol = os.EOL
const pkg = require('../package.json')

const inquirer = require('inquirer')
const chalk = require('chalk')

const version = pkg.version

// 传入的路径
let dirPath = '',
    githubUsername = '',
    repoName = '',
    isBlog = false

// 重新分配exit
process.exit = exit

// cli

before(program, 'outputHelp', function() {
    this.allowUnknownOption();
});

program
    .version(version)
    .usage('[command] [dir]')
    .option('-f, --force', 'force create')

program
    .command('create [dir]')
    .description('init vuepress at the given dirname')
    .action((dir, option) => {
        dirPath = dir && (dir.indexOf('./') === -1 ? `./${dir}` : dir);
    })

program.parse(process.argv)

if (!exit.exited) {
    main();
}

function before(obj, method, fn) {
    let old = obj[method];

    obj[method] = function() {
        fn.call(this);
        old.apply(this, arguments);
    };
}

/*
 * 在给定的路径中初始化vuepress
 *
 */

function createApplication(app_name, path) {
    let wait = isBlog ? 8 : 7;

    console.log();

    function complete() {
        if (--wait) return;
        let prompt = launchedFromCmd() ? '>' : '$';

        console.log();
        console.log('   install dependencies:');
        console.log('     %s cd %s && npm install', prompt, path);
        console.log();
        console.log('   run the vuepress:');
        console.log();
        if (isBlog) {
            console.log(chalk.red('\tyou should install vuepress globally, and then run: '));
            console.log();
            console.log(chalk.green.bold('\t\tvupress dev docs'))
            console.log();
            console.log('For details, please visit https://github.com/kaijiaLin/vuepress-kj')
        } else {
            console.log(chalk.green.bold('\t\tnpm run docs:dev'));
        }

        console.log();
    }

    // JavaScript
    let config = '';

    if (isBlog) {
        config = `module.exports = {
            title: 'Title',
            description: 'description',
            theme: 'yubisaki',
            head: [
                ['link', { rel: 'icon', href: '/favicon.ico' }]
            ],
            base: '/${repoName}/',
            repo: 'https://github.com/${githubUsername}/${repoName}',
            dest: './docs/.vuepress/dist',
            ga: '',
            serviceWorker: true,
            evergreen: true,
            themeConfig: {
                background: '/img/',
                logo: '/images/logo.png',
                accentColor: '#ac3e40',
                // footer: '', // 显示在博客的 footer 中

                // 是否显示文章的最近更新时间
                lastUpdated: true,
                github: '${githubUsername}',
                per_page: 6,
                date_format: 'yyyy-MM-dd HH:mm:ss',

                // 设置顶部导航栏
                nav: [
                    {text: 'Home', link: '/'},
                    { text: 'TAGS', link: '/tag/' },
                    {text: 'About', link: '/about/'},
                    {text: 'Github', link: 'https://github.com/${githubUsername}'},
                ],

                // 评论功能
                comment: {
                    clientId: '<GitHub Application Client ID>',
                    clientSecret: '<GitHub Application Client Secret>',
                    repo: '${repoName}',
                    owner: '${githubUsername}',
                    perPage: 5,
                    locale: 'zh-CN',
                }
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
        }`
    } else {
        config = `module.exports = {
            title: 'Title',
            description: 'description',
            head: [
                ['link', { rel: 'icon', href: '/favicon.ico' }]
            ],
            base: '/${repoName}/',
            repo: 'https://github.com/${githubUsername}/${repoName}',
            dest: './docs/.vuepress/dist',
            ga: '',
            serviceWorker: true,
            evergreen: true,
            themeConfig: {
                github: '${githubUsername}',
                per_page: 6,
                date_format: 'yyyy-MM-dd HH:mm:ss',

                // 设置顶部导航栏
                nav: [
                    { text: '导航', link: '链接' }
                ],

                sidebar: [{
                    title: "sidebar",
                    collapsable: true,
                    children: [
                        ["/posts/", "posts"]
                    ]
                }]
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
        }`
    }


    // Style
    let css = loadTemplate('docs/.vuepress/public/styles/style.css');
    let stylus = loadTemplate('docs/.vuepress/override.styl');

    // MarkDown
    let readme = loadTemplate('docs/README.md');
    let template = loadTemplate('docs/posts/template.md');

    // img
    let favicon = loadTemplate('docs/.vuepress/public/favicon.ico');
    let logo = loadTemplate('docs/.vuepress/public/images/logo.png');

    mkdir(path, function() {
        mkdir(path + '/docs', function() {
            write(path + '/docs/README.md', readme);
            if (isBlog) {
                write(path + '/docs/index.md', '');
            }
            complete();
        });
        mkdir(path + '/docs/.vuepress', function() {
            write(path + '/docs/.vuepress/config.js', config);
            write(path + '/docs/.vuepress/override.styl', stylus);
            complete();
        });
        mkdir(path + '/docs/.vuepress/public', function() {
            write(path + '/docs/.vuepress/public/favicon.ico', favicon);
            complete();
        });
        mkdir(path + '/docs/.vuepress/public/images', function() {
            write(path + '/docs/.vuepress/public/images/logo.png', logo);
            complete();
        });
        mkdir(path + '/docs/.vuepress/public/styles', function() {
            write(path + '/docs/.vuepress/public/styles/style.css', css);
            complete();
        });

        mkdir(path + '/docs/posts', function() {
            write(path + '/docs/posts/index.md', '');
            isBlog && write(path + '/docs/posts/template.md', template);
            complete();
        });

        isBlog && mkdir(path + '/docs/about', function() {
            write(path + '/docs/about/index.md', '# About me');
            complete();
        });

        // package.json
        let pkg = {
            name: app_name,
            version: '0.1.0',
            private: true,
            main: "index.js",
            description: "vuepress",
            keywords: ["vuepress"],
            repository: {
                type: "git",
                url: `https://github.com/${githubUsername}/${repoName}`
            },
            scripts: {
                "docs:dev": "npx vuepress dev docs",
                "docs:build": "vuepress build docs",
                "deploy": "gh-pages -d docs/.vuepress/dist",
                "deploy:build": "npm run docs:build && gh-pages -d docs/.vuepress/dist",
                "docs:deploy": "npm run docs:build && git add . && git commit -m 'deploy' && git push origin master && npm run deploy",
                "blog:deploy": "git add . && git commit -m 'deploy' && git push origin master && npm run deploy"
            },
            author: `${githubUsername}`,
            license: "MIT",
            devDependencies: {
                "Prism": "^2.0.0",
                "gh-pages": "^2.0.0",
                "mathsass": "^0.10.1",
                "node-sass": "^4.9.3",
                "prismjs": "^1.16.0",
                "sass-loader": "^7.1.0",
                "scss-loader": "^0.0.1",
                "vuepress": "^0.14.4"
            },
            dependencies: {
                "gitalk": "^1.5.0",
                "markdown-it-include": "^1.0.0",
                "markdown-it-task-lists": "^2.1.1",
                "markdown-it-imsize": "2.0.1",
                "vuepress-theme-yubisaki": "^3.1.9"
            }
        }


        pkg.dependencies = sortedObject(pkg.dependencies);

        // package.json
        write(path + '/package.json', JSON.stringify(pkg, null, 2));

        // .gitignore
        write(path + '/.gitignore', fs.readFileSync(__dirname + '/../template/gitignore', 'utf-8'));

        complete();
    });
}

function copy_template(from, to) {
    from = path.join(__dirname, '..', 'template' + 'from');
    write(to, fs.readFileSync(from, 'utf-8'));
}

/*
 * 检查所给的目录是否为空
 */

function emptyDirectory(path, fn) {
    fs.readdir(path, function(err, files) {
        if (err && 'ENOENT' != err.code) throw err;
        fn(!files || !files.length);
    });
}

/**
 * from koa-generator
 * Graceful exit for async STDIO
 */

function exit(code) {
    // flush output for Node.js Windows pipe bug
    function done() {
        if (!(draining--)) _exit(code);
    }

    let draining = 0;
    let streams = [process.stdout, process.stderr];

    exit.exited = true;

    streams.forEach(function(stream) {
        // submit empty write request and wait for completion
        draining += 1;
        stream.write('', done);
    });

    done();
}

/**
 *  判断是否在window的cmd启动
 */

function launchedFromCmd() {
    return process.platform === 'win32' &&
        process.env._ === undefined;
}

/**
 * 加载模板
 */

function loadTemplate(name) {
    return fs.readFileSync(path.join(__dirname, '..', 'template', name), 'utf-8');
}

/**
 * 主入口函数
 */

function main() {
    let appName = '';
    inquirer
        .prompt([{
            type: 'input',
            message: chalk.bold('app name: '),
            name: 'name'
        }, {
            type: 'input',
            message: chalk.gray('github username: '),
            name: 'username'
        }, {
            type: 'input',
            message: chalk.gray('repository name: '),
            name: 'reponame'
        }, {
            type: 'confirm',
            message: chalk.magenta.bold('Do you want to use it as your blog?(default use vuepress-theme-yubisaki) '),
            name: 'isBlog'
        }])
        .then(answers => {
            answers.name && (appName = answers.name);
            answers.username && (githubUsername = answers.username);
            answers.reponame && (repoName = answers.reponame);
            answers.isBlog && (isBlog = answers.isBlog);

            // Path
            let destinationPath = dirPath || '.';


            // App name
            appName = appName || path.basename(path.resolve(destinationPath));

            // Generate application
            emptyDirectory(destinationPath, function(empty) {
                if (empty || program.force) {
                    createApplication(appName, destinationPath);
                } else {
                    inquirer
                        .prompt([{
                            type: 'confirm',
                            message: 'destination is not empty, continue? ',
                            name: 'continue'
                        }])
                        .then(answers => {
                            if (answers.continue) {
                                process.stdin.destroy();
                                createApplication(appName, destinationPath);
                            } else {
                                console.error('aborting');
                                exit(1);
                            }
                        })
                }
            });
        })
        .catch(err => {
            console.error(err)
        })
}

/**
 * 写入文件
 */

function write(path, str, mode) {
    fs.writeFileSync(path, str, { mode: mode || 0666 });
    console.log(chalk.blue('   create') + ' : ' + path);
}

/**
 * 创建文件夹
 */

function mkdir(path, fn) {
    mkdirp(path, 0755, function(err) {
        if (err) throw err;
        console.log(chalk.blue('   create') + ' : ' + path);
        fn && fn();
    });
}