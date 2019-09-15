This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



++++++++++++++++++++++++++++++++

+ 路由

  1. 设置路由权限（在未登录情况下不得跳转到主页面）

     ```javascript
      <Router>
          <Switch>
               <Route path="/login" component={Login}/>
               <Route
                 path="/"
                 render={
                   this.props.userData ?
                     (props)=> LayOutRouter :
                     ()=> <Redirect to="/login"  push/>
                 }
               />
         </Switch>
     </Router>
     ```

  2. `exact`      `push`   作用 :

     1. https://www.cnblogs.com/yesu/p/10929646.html

     ``` javascript
     <Route exact path="/" render={(props)=> LayOut} />
     <Route path="/" render={(props)=> LayOut />
     <Redirect to="/login"  push/>
     ```

  3. `Redirect` 的正确使用  

     1. https://blog.csdn.net/b954960630/article/details/88766222

     ```javascript
     <LayOut>
         <Switch>
              <Route path="/stumanage" component={StuManage}/>
              <Redirect to="/publishrace" />
         </Switch>
     </LayOut>
     ```

  4. `Switch`  `this.props.children` 的使用

     1. https://www.cnblogs.com/yesu/p/10929646.html
     2. https://www.cnblogs.com/guolintao/p/9019504.html

     ```javascript
     <div id="layout">
         <Header/>
         <div id="main">
             {this.props.children}
         </div>
     </div>
     ```

  5. 在组件中   `this.props.history`  方法

     1. `this.props.history.goBack()`
     2. `this.props.history.push('/login')`   添加到`history`栈
     3. `this.props.history.replace('/login')`   不添加到`history`栈

+ 百度地图

  1. 在 `index.html` 中引入 `<script>`标签

  2. 在 `config/webpack.config.js` 文件中配置

     1. 运行 `yarn eject`  或  `npm run eject`  暴露项目的配置文件

     2. 找到 ` webpack.config.js` 添加

        ```javascript
        modules.export = {
         externals:{
              'BMap':'BMap',
            },
        }
        ```

     3. 在组件中引入 `import BMap from 'BMap'`  失败，无法使用

     4. 改成引入  `  const { BMap } = window`   成功

  3. 在 `yarn eject` 后，重新运行 `yarn start` 报错 ，找不到 `react-script` 模块

     解决： `yarn add react-script` 

  4. 再次运行   提示  `babel  webpack` 相关插件版本不是最新，影响`debug` 和运行

     解决： 按提示修改 `package.json`  在 `yarn` 更新

+ `classList.contains`

  ```javascript
  // 3. 鼠标移入/移出单元活动  0--移入 1--移出
   _itemEnterOrLeave(e, flag){
      let parent = e.target.parentNode;
      let node;
      if(parent.classList.contains('con_item')){
          node = parent;
      }else if(parent.parentNode.classList.contains('con_item')){
          node = parent.parentNode;
      }else if(e.target.classList.contains('con_item')){
         node =  e.target;
      }else if(e.target.classList === 'items_container'){
          node =  e.target.children[0];
      }
      if(!flag && node && node.classList.contains('con_item')){
          node.classList.add('hover');
      }else if(flag && node && node.classList.contains('con_item')){
          node.classList.remove('hover');
      }
  }
  ```

+ 使用`BrowserRouter`下，直接访问二级路由时报错： `index.html` 中的 `js`资源访问不到

  1. 解决：在 `index.html` 中的 `js` 文件 `src`改成 `/...`  以 `/` 开头，变成从根路径访问 `http://localhost:3000/...js`
  2. 按原先写法 `src="jquery.js"` 是如何渲染？是渲染成相对路径还是绝对路径？

+ 占位`loading`

+ `npm i react-keeper`    解决`router`页面缓存     报错：找不到依赖？

+ 抽组件!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

+ 自适应@@@@@@@@@@@@@@

+ `session`过期

