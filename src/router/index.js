//导入vue vue-router包
import Vue from'vue'
import VueRouter from 'vue-router'
//导入路由组件
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import addArticle from '../views/addArticle.vue' 
import articleList from '../views/articleList.vue'
import userList from '../views/userList.vue' 
import IndexMain from '../views/IndexMain.vue'

//把vuerouter安装成vue插件
Vue.use(VueRouter)

//创建路由实例对象
const router = new VueRouter({
   routes:[
    {
       //配置路径
       path:'/',
       name:'Index',
       //路由代理
       redirect:'/IndexMain',
       //指定路由组件
       component:Index,
       //配置子路由
       children:[
         {path:'/IndexMain', component: IndexMain},
         {path:'/userList', component: userList},
         {path:'/articleList', component:articleList},
         {path:'/addArticle', component: addArticle},
       ]
      },
      {
        //配置路径
        path:'/Login',
        name:'Login',
       //指定路由组件
      component:Login,
      }
  ]
})
  //向外共享路由示例对象
  export default router