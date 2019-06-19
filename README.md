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
vuepress create <path>
```

2. install dependencies

```sh
cd <path>

npm install
```

3. add github repository

```sh
git init
git add .
git commit -m 'initial'
git remote add origin https://github.com/<username>/<repo>.git
```

4. generate page and deploy to github page

```sh
npm run docs:build
npm run deploy
```

5. local preview

```sh
npm run docs:dev
```



> If you want to update, you must first `git` submit and then `npm run deploy`.



## Preview

[https://kaijiaLin.github.io/blog/](https://kaijiaLin.github.io/blog/)



## Author

👤 **kaijiaLin**

* Github: [@kaijiaLin](https://github.com/kaijiaLin)



## Show your support

Give a ⭐️ if this project helped you !

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_