<template>
  <div class="user-details-background">
    <div class="user-details-container">
      <div class="user-details-header">
        <div class="user-details-shutdown-container"
             :title="tip.shutdownTip"
             @click="shutdownUserDetails"
        >
          <div class="user-details-shutdown">
            <div class="shutdown-icon">x</div>
          </div>
        </div>
        <div class="user-details-title">修改用户信息</div>
        <div class="user-details-commit" @click="clickCommitButton">
          <svg t="1671861139342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5046" width="200" height="200"><path d="M689.3568 820.9408 333.6192 820.9408c-13.9264 0-25.1904-11.264-25.1904-25.1904L308.4288 465.152l-211.968 0c-10.1888 0-19.4048-6.144-23.296-15.5648C69.2224 440.2176 71.424 429.312 78.6432 422.144l415.0272-415.0784c9.472-9.472 26.1632-9.472 35.6352 0l411.392 411.3408c7.2704 4.4544 12.0832 12.4416 12.0832 21.5552 0 14.1312-11.52 24.576-25.7024 25.1904-0.1536 0-0.3072 0-0.512 0l-211.968 0 0 330.5472C714.5984 809.6256 703.2832 820.9408 689.3568 820.9408zM358.8096 770.5088l305.3568 0L664.1664 439.9616c0-13.9264 11.264-25.1904 25.1904-25.1904l176.3328 0L511.488 60.5184 157.2864 414.7712l176.3328 0c13.9264 0 25.1904 11.264 25.1904 25.1904L358.8096 770.5088z" p-id="5047"></path><path d="M96.4096 923.1872l830.1056 0L926.5152 1024 96.4096 1024 96.4096 923.1872 96.4096 923.1872zM96.4096 923.1872" p-id="5048"></path></svg>
          <div class="edit-tools-name">提交</div>
        </div>
      </div>
      <div class="user-details-content">
        <div class="user-details-attribute-column">
          <div class="user-details-attribute"
               v-for="(attr, index) in userInfoAttribute"
               :key="index">{{attr}}</div>
        </div>
        <div class="user-details-input-column">
          <div class="user-details-input-container"
               v-for="(value, key) in editingUserInfoCopy"
               :key="key">
            <input type="text" class="user-details-input" :value="value">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import tip from '@/assets/js/tips';

export default {
  name: "UserDetails",
  props: ['userInfoAttribute', 'editingUserInfo', 'shutdownUserDetails', 'commitUserDetails'],
  data() {
    return {
      tip,
      editingUserInfoCopy: {},
    }
  },
  watch: {
    editingUserInfo: {
      handler(newValue) {
        if(newValue) {
          for(let key in newValue) {
            if(!Object.hasOwnProperty.call(this.editingUserInfoCopy, key)) {
              this.$set(this.editingUserInfoCopy, key, newValue[key]);
            } else {
              this.editingUserInfoCopy[key] = newValue[key];
            }
          }
        }
      }
    },
  },
  methods: {
    // 提交用户信息
    clickCommitButton() {
      if(confirm(this.tip.irrevocable)) { // 弹窗提示
        // 获取 input.value
        let inputs = $('.user-details-input-column .user-details-input');
        let values = [];
        for(let i = 0; i < inputs.length; i++) {
          values.push($(inputs[i]).val())
        }
        // 提交给父组件
        this.commitUserDetails(values);
      }
    }
  }
}
</script>

<style scoped>
/*详细信息背景遮罩层*/
.user-details-background {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.38);
  transition: all 0.3s;
}

.user-details-container {
  width: 800px;
  max-height: 600px;
  margin: 50vh auto 0;
  transform: translateY(-50%);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
}

.user-details-header {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 60px;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
}

.user-details-shutdown-container {
  padding: 10px;
  margin-left: 10px;
}

.user-details-shutdown {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #a61a1a;
  overflow: hidden;
  cursor: pointer;
}

.user-details-shutdown:hover .shutdown-icon {
  opacity: 1;
}

.shutdown-icon {
  color: #adadad;
  opacity: 0;
  margin: -9px 0 0 2px;
  font-size: 21px;
  transition: all 0.3s;
}

/*提交按钮*/
.user-details-commit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 35px;
  text-align: center;
  margin-right: 15px;
  border-radius: var(--border-radius-min);
  color: #69ce42;
  border: 1px solid #69ce42;
  cursor: pointer;
  transition: all 0.3s;
}

.user-details-commit .icon {
  width: 18px;
  height: 18px;
  fill: #69ce42;
}

.user-details-commit:hover {
  transform: translateY(-2px);
  box-shadow: var(--box-shadow);
}

.user-details-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 auto;
}

/*用户详细信息区域*/
.user-details-content {
  display: flex;
  height: calc(100% - 60px);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.user-details-attribute {
  height: 41px;
  text-align: center;
  padding: 10px;
  white-space: nowrap;
}

/*属性值列*/
.user-details-attribute-column {
  min-width: 18%;
}

/*输入框列*/
.user-details-input-column {
  width: 85%;
}

.user-details-input-container {
  width: 100%;
  height: 41px;
}

.user-details-input {
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding-left: 10px;
  border-bottom-right-radius: var(--border-radius);
}

</style>