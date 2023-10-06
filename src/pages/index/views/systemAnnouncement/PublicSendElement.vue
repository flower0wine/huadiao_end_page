<template>
  <div class="public-enter-origin-body">
    <div class="public-middle-container">
      <div class="current-send-mode-container">
        <div class="current-send-mode-title">当前发送模式</div>
        <div class="current-send-mode">公开</div>
      </div>
      <div class="public-message-title-container">
        <div class="public-message-title-title">系统消息标题</div>
        <input type=text class="public-message-title-input"
               :placeholder="tips.systemMessageTitleTip"
        >
      </div>
    </div>
    <div class="waring-container">
      <div class="warning-title">注意事项</div>
      <div class="waring-text">
        <p>1. 当前是花凋官方后台管理页面公开消息发送窗口。</p>
        <p>2. 公开模式下发送的消息会被所有用户接收到, 在发送之前请确保消息的准确性、官方性。</p>
        <p>3. 严禁擅自发送导致误导用户的非官方消息。</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import tips from '@/assets/js/tips';

export default {
  name: "PublicSendElement",
  data() {
    return {
      tips,
    }
  },
  mounted() {
    this.$bus.$on('handleSystemMessage', this.getSystemMessageTitle);
  },
  methods: {
    getSystemMessageTitle(message) {
      let publicMessageTitleInput = $('.public-message-title-input');
      let systemMessageTitle = publicMessageTitleInput.val();

      publicMessageTitleInput.val('');
      if(systemMessageTitle && systemMessageTitle !== '') {
        this.$bus.$emit('sendSystemMessage', systemMessageTitle, message);
      } else {
        this.$bus.$emit('addWarningTip', '请输入系统标题', 'warning');
      }
    }
  },
  beforeDestroy() {
    this.$bus.$off('handleSystemMessage');
  }
}
</script>

<style scoped>
.public-enter-origin-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
}

/*调整布局*/
.waring-container,
.current-send-mode-container {
  padding: 10px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.waring-container {
  width: 90%;
  margin: 15px 7px 7px 7px;
}

/*中间层*/
.public-middle-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 10px;
}

.current-send-mode-container {
  min-width:80px;
  text-align: center;
}

/*公开消息标题*/
.public-message-title-container {
  width: 70%;
  padding: 10px;
  margin-left: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.public-message-title-title {
  font-weight: 700;
  font-size: 14px;
}

.public-message-title-input {
  width: calc(100% - 10px);
  height: 30px;
  border-radius: 30px;
  margin-top: 8px;
  padding-left: 10px;
}

.waring-container:hover,
.current-send-mode-container:hover,
.public-message-title-container:hover {
  transform: translateY(-3px);
  transition: all 0.4s;
}

/*当前发送模式*/
.current-send-mode-title,
  /*警告消息提示标题*/
.warning-title {
  font-size: 14px;
  font-weight: 700;
}

.waring-text p {
  margin-left: 15px;
  text-indent: 1rem;
  line-height: 25px;
  font-size: 12px;
}

.current-send-mode {
  font-size: 14px;
}



</style>