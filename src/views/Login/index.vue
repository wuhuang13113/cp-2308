<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form">
        <el-form-item
          label="账号"
          v-model="formData.username"
          prop="username"
          :rules="rules"
        >
          <el-input />
        </el-form-item>

        <el-form-item
          label="密码"
          v-model="formData.password"
          prop="password"
          :rules="rules"
        >
          <el-input />
        </el-form-item>

        <el-form-item prop="remember" v-model="formData.remember">
          <el-checkbox>记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data(){
    return {
      formData: {
        username: '',
        password: '',
        remember: ''
      },
      rules: {
          username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {pattern:/^1{2357}\d[9]$/}
          
          ],
          password: [
            { required: true, message: '请选择活动区域', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
    }
  }

}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
