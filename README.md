# simple co room

mobx+react+react-routerv4+socket.io+styled-components+flow 
 
Features:
 * hmr support
 * eslint code style-check
 * use flow to static type check 
 * styled-components and antd-mobile for css
 * devtools
 
 RoadMap
 * co-image
 * co-exl
 * mobx with rx
 * clean up code
 * test cover


## project structure

```
├── build //build dir
├── config 
│   ├── default.json
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── flow-typed
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

