import Vue from 'vue';
import APP from './APP.vue';
//导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入路由文件
import router from './router';
//导入样式表
import '.assets/css/style.css';
//导入Axioes
import Axioes from './tool/axios';
//导入文本编辑组件
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

Vue.use(ElementUI);
Vue.use(Axioes)

Vue.config.productionTip = false
//vue实例指向App的#app
new Vue({
   router,
   render: h => h(APP)
}).$mount('#app')

