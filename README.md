<h1 align="center">Welcome to vuepress-kj 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/kaijiaLin/vuepress-kj">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
</p>

> 快速构建你的VuePress应用的脚手架

### 🏠 [Homepage](https://github.com/kaijiaLin/vuepress-kj)

## Install

```sh
npm install vuepress-kj -g
```

## Usage

1. create your VuePress app

```sh
vuepress-kj create <path>
```

2. install dependencies

```sh
cd <path>

npm install
```

3. init git

```sh
git init

git remote add origin https://github.com/<username>/<repo>.git
```

4. generate page and deploy to github page

- If you choose to it as your blog, you should install vuepress globally

```sh
npm install vuepress -g

vuepress build docs

npm run blog:deploy

vuepress dev docs  # local preview
```

- otherwise

```sh
npm run docs:deploy

npm run docs:dev  # local preview
```



### Links

>  [vuepress-theme-yubisaki](https://wuwaki.me/yubisaki/next.html) 
>
> [vuepress](https://vuepress.vuejs.org/zh/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)



## Preview

[https://kaijiaLin.github.io/blog/](https://kaijiaLin.github.io/blog/)



## Author

👤 **kaijiaLin**

* Github: [@kaijiaLin](https://github.com/kaijiaLin)



## Show your support

Give a ⭐️ if this project helped you !

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_