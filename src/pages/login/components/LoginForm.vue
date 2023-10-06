<template>
  <div class="form-container">
    <div class="form-content">
      <div class="form-head">
        <img src="/img/authority.png" class="huadiao-logo" alt="">
      </div>
      <form action="http://localhost:9090/huadiao/operateAdministratorServlet" method="post"
            id="login-form"
            @submit="checkAccountAndPasswd"
      >
        <div class="form-main">
          <div class="form-username-container">
            <div class="form-username-input">
              <label for="username">
                <svg t="1673176744477" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2686" width="200" height="200">
                  <path
                      d="M512 570.861563a285.430782 285.430782 0 1 1 285.430782-285.430781A285.703921 285.703921 0 0 1 512 570.861563z m0-516.233662a230.802881 230.802881 0 1 0 230.802881 230.802881A231.07602 231.07602 0 0 0 512 54.627901z"
                      fill="#231815" p-id="2687"></path>
                  <path
                      d="M1007.201921 1024h-54.627901a440.57402 440.57402 0 0 0-881.14804 0H16.798079a495.201921 495.201921 0 0 1 990.403842 0z"
                      p-id="2688"></path>
                </svg>
              </label>
              <input type="text"
                     name="username"
                     id="username"
                     autocomplete="off"
                     placeholder="输入用户名"
                     v-model="values.usernameInputValue"
                     pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$"
              >
            </div>
          </div>
          <div class="form-password-container">
            <div class="form-password-input">
              <label for="password">
                <svg t="1673176884688" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5241" width="200" height="200">
                  <path
                      d="M779.821998 367.986566l-5.15869 0c-2.579345 0-2.579345 0-5.15869 0L769.504618 272.550798C770.3644 116.930311 657.732997 0 508.990764 0c-146.162888 0-257.934509 116.930311-257.934509 272.550798l0 95.435768-7.738035 0c-78.240134 0-141.004198 66.203191-141.004198 143.583543l0 367.986566c0 80.819479 63.623846 143.583543 141.004198 143.583543l536.503778 0c78.240134 0 141.004198-66.203191 141.004198-143.583543L920.826196 511.570109C919.106633 431.610411 855.482788 367.986566 779.821998 367.986566zM294.905122 270.831234c0-134.125945 90.277078-228.701931 214.085642-228.701931 126.387909 0 216.664987 97.155332 216.664987 228.701931l0 95.435768L292.325777 366.267003 292.325777 270.831234 294.905122 270.831234zM877.837112 879.556675c0 55.88581-43.848866 102.314022-97.155332 102.314022L243.31822 981.870697c-53.306465 0-97.155332-46.428212-97.155332-102.314022L146.162888 511.570109c0-55.88581 43.848866-102.314022 97.155332-102.314022L257.934509 409.256087l36.970613 0 434.189757 0 51.586902 0 0 0c53.306465 0 97.155332 46.428212 97.155332 102.314022L877.837112 879.556675 877.837112 879.556675z"
                      fill="#272636" p-id="5242"></path>
                  <path
                      d="M507.271201 567.455919c-34.391268 0-61.0445 29.232578-61.0445 63.623846 0 24.073887 12.036944 43.848866 31.811923 55.88581l0 104.893367c0 17.195634 14.616289 31.811923 31.811923 31.811923s31.811923-14.616289 31.811923-31.811923L541.662469 686.965575c19.774979-12.036944 31.811923-31.811923 31.811923-55.88581C567.455919 597.548279 540.802687 567.455919 507.271201 567.455919z"
                      p-id="5243"></path>
                </svg>
              </label>
              <input type="password"
                     name="password"
                     id="password"
                     placeholder="输入密码"
                     v-model="values.passwordInputValue"
                     pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$"
              >
            </div>
          </div>
          <div class="login-btn-container">
            <input type="submit" name="loginBtn" id="login-btn" value="登录">
          </div>
          <div class="other-operations-container">
            <div class="forget-password" @click="forgetAccountOperation">忘记密码？</div>
            <div class="remember-me-operate"
                 @click="rememberMeOperation"
            >
              <span v-if="rememberAccount">不记住账号</span>
              <span v-else>记住账号</span>
            </div>
          </div>
          <div class="other-login-methods"></div>
        </div>
      </form>
      <div class="form-footer">
        <div class="huadiao-login-tips">
          <div class="huadiao-tip-title">温馨提示：</div>
          <p>1. 该页面是花凋管理员进行网站管理的登录页面。</p>
          <p>2. 该页面没有注册功能，由 root 管理员新增管理员账号后方可登录。</p>
          <p>3. 左侧元素有些许动画，希望你会喜欢！</p>
        </div>
      </div>
    </div>
    <!--流动边框-->
    <div class="form-border-container">
      <div class="form-border"></div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import LOGIN_CONSTANTS from '@/assets/js/constants/pages/system/login/index.js';
import UNIVERSAL_CONSTANTS from '@/assets/js/constants/universal/index.js';
import Vue from "vue";

export default {
  name: "LoginForm",
  data() {
    return {
      // 是否记住账号
      rememberAccount: false,
      // 输入框的值
      values: {
        usernameInputValue: '',
        passwordInputValue: '',
      },
      DOMElements: {
        loginForm: null,
        rememberMeOperate: null,
      }
    }
  },
  beforeMount() {
    // 从浏览器获取账号
    this.getAccountFromBrowser();
  },
  mounted() {
    // 初始化变量
    this.initialVariable();
  },
  methods: {
    // 初始化变量
    initialVariable() {
      this.DOMElements.loginForm = $('#login-form');
      this.DOMElements.rememberMeOperate = $('.remember-me-operate');
    },
    // 初次进入页面获取账号
    getAccountFromBrowser() {
      let account = window.localStorage.getItem(LOGIN_CONSTANTS.REMEMBER_ACCOUNT.ADMINISTRATOR_ACCOUNT);
      let password = window.localStorage.getItem(LOGIN_CONSTANTS.REMEMBER_ACCOUNT.ADMINISTRATOR_PASSWORD);
      if (account && password) {
        // 查询到信息说明选择了记住账号
        this.rememberAccount = true;
        this.values.usernameInputValue = account;
        this.values.passwordInputValue = password;
      }
    },
    // 检查账号密码是否符合要求
    checkAccountAndPasswd(e) {
      e.preventDefault();
      let tipContent = '';
      let accountThroughCheck = false;
      let passwdThroughCheck = false;
      let account = this.values.usernameInputValue;
      let password = this.values.passwordInputValue;

      // 如果 account 和 password 都不为 null 或 undefined
      if (account && password) {
        accountThroughCheck = this.checkString(account);
        passwdThroughCheck = this.checkString(password);
        // 账号密码符合要求
        if(accountThroughCheck && passwdThroughCheck) {
          let params = {
            requestType: "",
            operation: "searchAdministrator",
            account,
            password
          }
          // 发送请求
          this.$bus.$emit('sendRequest', params, {}, (response) => {
            let res = response.data;
            if(res === 'hasAdministrator') {
              // 记录账号信息
              this.setAccountToBrowser(account, password);
              // 跳转后台管理页面
              window.location.href = 'http://localhost:8081';
              Vue.prototype.$destroy();
            } else if(res === 'dontHasAdministrator') {
              this.$bus.$emit('addLoginTip', '用户名或密码错误!');
            }
          });
        } else if(!accountThroughCheck) {
          tipContent = '账号格式不正确!应包含数字、字母、下划线!';
        } else if(!passwdThroughCheck) {
          tipContent = '密码格式不正确!'
        }
      } else if(!account) {
        tipContent = '账号不能为空!'
      } else if(!password) {
        tipContent = '密码不能为空!';
      }
      // 添加提示信息
      this.$bus.$emit('addLoginTip', tipContent);
    },
    // 检查字符串中是否只有字母和数字
    checkString(str) {
      for(let c of str) {
        if(!(48 <= c <= 57 || 65 <= c <= 90 || 97 <= c <= 122))
          return false;
      }
      return true;
    },
    // 记录账号信息到浏览器
    setAccountToBrowser(account, password) {
      if(this.rememberAccount) {  // 选择记住账号
        window.localStorage.setItem(LOGIN_CONSTANTS.REMEMBER_ACCOUNT.ADMINISTRATOR_ACCOUNT, account);
        window.localStorage.setItem(LOGIN_CONSTANTS.REMEMBER_ACCOUNT.ADMINISTRATOR_PASSWORD, password);
      }
    },
    // 点击记住账号或不记住账号, 注意提交后才能保存账号
    rememberMeOperation() {
      // 如果之前是记住账号, 就删除账号信息
      if(this.rememberAccount) {
        window.localStorage.removeItem(LOGIN_CONSTANTS.REMEMBER_ACCOUNT.ADMINISTRATOR_ACCOUNT);
        window.localStorage.removeItem(LOGIN_CONSTANTS.REMEMBER_ACCOUNT.ADMINISTRATOR_PASSWORD);
      }
      this.rememberAccount = !this.rememberAccount;
    },
    // 忘记账号操作
    forgetAccountOperation() {
      this.$bus.$emit('addLoginTip', '忘记账号请联系网站 root 管理员：QQ：2914518090 或 WeChat：lizhi2914518090', 5000);
    },
  },
  beforeDestroy() {
    // 解绑事件
    for (let ele in this.DOMElements) {
      this.DOMElements[ele].off();
    }
  }
}
</script>

<style scoped>

.form-container {
  display: flex;
  position: relative;
  z-index: 10;
  width: 300px;
  height: 400px;
  border-radius: var(--border-radius);
  margin: auto 50px auto auto;
}

/*表单边框*/
.form-border-container {
  position: absolute;
  z-index: -1;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.form-border {
  position: absolute;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
  animation: circleRotateZ linear infinite 5s;
}

.form-content {
  width: 99%;
  height: 99%;
  margin: auto;
  border-radius: var(--border-radius);
  transition: var(--transition-1000ms);
}

/*表单头部*/
.form-head {
  width: 100%;
  text-align: center;
  line-height: 100px;
}

.huadiao-logo {
  height: 60px;
}

/*提示文字*/
.huadiao-login-tips p {
  font-size: 12px;
}

#username,
#password {
  width: 200px;
  height: 30px;
  font-size: 14px;
  font-weight: 400;
  padding-left: 40px;
  border-radius: 30px;
  background-color: transparent;
}

.form-username-input,
.form-password-input {
  position: relative;
}

.form-username-input .icon {
  position: absolute;
  top: 7px;
  left: 15px;
  width: 16px;
  height: 16px;
}

.form-password-input .icon {
  position: absolute;
  top: 6px;
  left: 15px;
  width: 18px;
  height: 18px;
}

/*主要内容区域*/
.form-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/*用户名、密码、登录按钮*/
.form-username-container,
.form-password-container,
.login-btn-container {
  margin-top: 10px;
}

#login-btn {
  height: 40px;
  padding: 0 20px 0 40px;
  font-size: 16px;
  letter-spacing: 20px;
  border-radius: 50px;
  transition: all 0.3s;
}

#login-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

/*记住我、忘记密码*/
.other-operations-container {
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 10px;
  font-size: 13px;
}

.forget-password,
.remember-me-operate {
  cursor: pointer;
  transition: var(--transition-300ms);
}

/*底部*/
.form-footer {
  display: flex;
  justify-content: center;
}

/*提示*/
.huadiao-login-tips {
  width: 250px;
  margin-top: 20px;
}

.huadiao-tip-title {
  font-size: 14px;
}

/*提示文字*/
.huadiao-login-tips p {
  text-indent: 1rem;
}
</style>