<template>
    <div class="login-wrap">
      <!-- rules对应验证对象 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="login-form"
        :rules="form_rules"
      >
        <h2>用户登录</h2>
        <!--prop对应字段名字和具体验证规则-->
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" class="login-input"></el-input>
        </el-form-item>
        <el-form-item label-position="top" label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            class="login-input"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        //验证对象与整个 form的rules属性值保持一致
        form_rules: {
          //验证的名字和与要验证的字段名保持一致
          username: [
            //具体验证规则
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 3, max: 8, message: "长度在3到8个字符", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      onSubmit() {
        this.$http.post("sysUser/login", this.form).then((backdata) => {
          console.log(backdata);
          if (backdata.data.msg == "success") {
            //使用el-ui的弹窗提示
            this.$message({
              message: "登录成功",
              type: "success",
            });
            //拿到登录的返回数据后，需要将token保存下来
            localStorage.setItem("ttk", backdata.data.data.token);
            // console.log(localStorage.getItem('ttk'))
            //编程式导航进行路由跳转
            this.$router.push({ path: "/" });
          } else {
            this.$message.error(backdata.data.msg);
          }
        });
      },
    },
  };
  </script>
  
  <style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }
  .login-wrap .login-form .login-btn {
    width: 100%;
  }
  </style>
  