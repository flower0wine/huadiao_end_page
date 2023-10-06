<template>
  <div class="private-enter-origin-body">
    <div class="user-search-container">
      <div class="user-search-title">搜索用户</div>
      <div class="user-search-input-container">
        <input type="text" class="user-search-input" :placeholder="tips.searchUsersTip">
        <svg t="1670373447066" class="icon user-search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4635"><path d="M465.454545 868.848485C226.521212 868.848485 31.030303 673.357576 31.030303 434.424242S226.521212 0 465.454545 0s434.424242 195.490909 434.424243 434.424242-195.490909 434.424242-434.424243 434.424243z m0-806.787879C260.654545 62.060606 93.090909 229.624242 93.090909 434.424242s167.563636 372.363636 372.363636 372.363637 372.363636-167.563636 372.363637-372.363637S670.254545 62.060606 465.454545 62.060606z" p-id="4636"></path><path d="M766.448485 806.787879c6.206061-6.206061 15.515152-6.206061 21.721212 0l183.078788 167.563636c6.206061 6.206061 6.206061 15.515152 0 21.721212-6.206061 6.206061-15.515152 6.206061-21.721212 0l-183.078788-167.563636c-6.206061-6.206061-6.206061-15.515152 0-21.721212z" p-id="4637"></path><path d="M961.939394 1014.690909c-6.206061 0-15.515152-3.10303-21.721212-9.309091L757.139394 837.818182c-6.206061-6.206061-9.309091-12.412121-9.309091-21.721212 0-9.309091 3.10303-15.515152 9.309091-21.721212 6.206061-6.206061 12.412121-9.309091 21.721212-9.309091 9.309091 0 15.515152 3.10303 21.721212 9.309091l183.078788 167.563636c6.206061 6.206061 9.309091 12.412121 9.309091 21.721212 0 9.309091-3.10303 15.515152-9.309091 21.721212-6.206061 3.10303-12.412121 9.309091-21.721212 9.309091z m-186.181818-198.593939l183.078788 167.563636-192.387879-176.872727 9.309091 9.309091z" p-id="4638"></path></svg>
      </div>
    </div>
    <div class="private-middle-container">
      <div class="current-chat-user-container">
        <div class="current-chat-user-title">当前私信用户</div>
        <div class="chat-user-info">
          <div class="user-avatar-container">
            <a href="javascript:void(0);" class="personal-center">
              <div class="user-avatar"></div>
            </a>
          </div>
          <div class="user-nickname">请指定一名用户</div>
        </div>
      </div>
      <div class="current-send-mode-container">
        <div class="current-send-mode-title">当前发送模式</div>
        <div class="current-send-mode">私密</div>
      </div>
    </div>
    <div class="waring-container">
      <div class="warning-title">注意事项</div>
      <div class="waring-text">
        <p>1. 当前是花凋官方后台管理页面私密消息发送窗口。</p>
        <p>2. 私密模式下发送的消息只会被特定用户接收到, 在发送之前请确保消息的准确性、官方性。</p>
        <p>3. 严禁擅自发送导致误导用户的非官方消息。</p>
      </div>
    </div>
  </div>
</template>

<script>
import tips from '@/assets/js/tips';

export default {
  name: "PrivateSendElement",
  data() {
    return {
      tips,
    }
  },
  mounted() {
    this.$bus.$on('handleSystemMessage', this.aaa)
  },
  methods: {
    aaa() {}
  },
  beforeDestroy() {
    this.$bus.$off('handleSystemMessage');
  }
}
</script>

<style scoped>

/*私密*/
.private-enter-origin-body {
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all 0.3s;
}

/*中间层*/
.private-middle-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

/*调整布局*/
.waring-container,
.user-search-container,
.current-send-mode-container,
.current-chat-user-container {
  padding: 10px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.waring-container,
.user-search-container {
  width: 90%;
  margin: 15px 7px 7px 7px;
}

.current-send-mode-container,
.current-chat-user-container {
  margin-top: 10px;
}

/*中间层下的两个盒子宽度*/
.current-send-mode-container {
  width: calc(30% - 14px);
  text-align: center;
}

.current-chat-user-container {
  width: 70%;
}

.waring-container:hover,
.user-search-container:hover,
.current-chat-user-container:hover,
.current-send-mode-container:hover {
  transform: translateY(-3px);
  transition: all 0.4s;
}

/*当前发送模式*/
.current-send-mode-title,
  /*警告消息提示标题*/
.warning-title,
  /*用户搜索标题*/
.user-search-title,
  /*当前用户提示标题*/
.current-chat-user-title {
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
  margin-top: 5px;
}

.user-search-input-container {
  position: relative;
  width: 68%;
}

/*搜索用户输入框*/
.user-search-input {
  width: 100%;
  height: 35px;
  border-radius: 40px;
  padding-left: 15px;
  margin: 10px 0 0 15px;
}

/*用户搜索图标*/
.user-search-icon {
  position: absolute;
  top: 17px;
  right: -8px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/*已选择的用户信息容器*/
.chat-user-info{
  display: flex;
  align-items: center;
  margin: 10px 0 0 15px;
}

.user-avatar-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
}

.user-avatar {
  width: 30px;
  height: 30px;
}

.user-nickname {
  margin-left: 20px;
}
</style>