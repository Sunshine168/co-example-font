# mobx-react-quick-starter

mobx+react+react-routerv4+styled-components+flow 
 
Features:
 * hmr support
 * eslint code style-check
 * use flow to static type check 
 * styled-components and antd-mobile for css
 * devtools
 
 (antd-mobile conventionally is importing the module when you need so dont worry about it. or you can remove it in babelrc and dependcies as you need ~ )

## project structure

```
├── build //build dir
├── config 
│   ├── default.json
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── flow-typed
│   ├── antd-mobile.js
│   ├── mobx-react.js
│   └── npm
├── main.js //entry file
├── server
│   └── index.js //hmr 
├── src
│   ├── api  //api
│   ├── app.js 
│   ├── assets 
│   ├── component
│   ├── router.js
│   ├── screen
│   ├── store
│   └── util
├── template.html
```

## run

`npm run dev` or `yarn dev` and enjoy it~

## build 

`npm run build` or `yarn build`

