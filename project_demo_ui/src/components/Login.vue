<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头部图片区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        ref="ruleForm"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="fas fa-user" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="fa fa-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <!--  ruleForm 是 form的ref属性的值-->
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      console.log(this.$refs)
      this.$refs.ruleForm.resetFields()
    },
    login() {
      this.$refs.ruleForm.validate(async valid => {
        //   console.log(valid)
        if (!valid) return
        // post请求,返回的结果是一个Promise对象，对于Promise 可以对其请求方法进行异步简化操作：await async
        // const result = this.$http.post('login',this.loginForm);
        // const result = await this.$http.post("login", this.loginForm);
        // 这里需要对登录返回结果进行相应的逻辑判断
        // console.log(result);
        this.$message({
          message: '登录成功!',
          type: 'success'
        })
        this.$router.push('/home')
        // if (result == 200) {
        //   this.$message({
        //     message: "登录成功!",
        //     type: "success"
        //   });
        //   // 登录成功需要保存token
        //   window.sessionStorage.setItem("token",result.token);
        //   this.$router.push("/home")
        // } else if (result == 400) {
        //   this.$message({
        //     message: "用户名或密码错误，请重新输入!",
        //     type: "warning"
        //   });
        // }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
