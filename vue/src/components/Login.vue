<template>
  <div class="login-box">
    <el-form :model="userInfo" status-icon :rules="checkRules" ref="loginForm" label-width="100px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="userInfo.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="userInfo.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button type="secondary" @click="submitForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工号或学号'));
      } else {
        // TODO: When the auth part is finished,
        // this should be implemented with a query
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 8) {
        callback(new Error('请输入正确的密码'));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        id: '',
        pass: ''
      },
      checkRules: {
        id: [
          { validator: validateUser, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO: Here is to submit the user info
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>
