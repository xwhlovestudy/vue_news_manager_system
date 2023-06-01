//直接给VUE构造函数的原型(prototype)赋值，使所有组件及实例对象有共有属性
//所有组件都可以调用$http
import Axios from'axios;'

//插件是一个对象，对象中必须有insta11方法，用来接受Vue构造函数，方法中实现逻辑代码
var myplgin = {}
myplgin.install = function(Vue){
//创建axios对象，设置请求的基准地址
    var axios_obj = Axios.create({
        baseURL:'http://106.54.171.11:9082/api/admin/'
    })
    //使用axios对象的拦截器，来进行请求的判断及处理
    axios_obj.interceptors.request.use(function(conf){
        console.log(conf)
        //回调函数中传入的conf就是axios对象本身
        //判断本次axios请求的路径地址是不是login，不是就加上token
        if(conf.url!='login'){
        conf.headers.token = localStorage.getItem('ttk')
        }
        return conf
    })
    Vue.prototype.Shttp = axios_obj
}
//最后将对象进行模块化导出
export default myplgin
