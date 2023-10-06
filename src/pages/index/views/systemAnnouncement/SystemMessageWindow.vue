<template>
  <div class="system-announcement-window">
    <div class="window-title">系统消息窗口</div>
    <div class="system-message-container" @wheel="scrollAutoShow">
      <div class="authority-message-container message-container"
           v-for="systemMessage in publicInfo.systemMessages"
           :key="systemMessage.message_title"
      >
        <div class="message-text authority"
             @contextmenu="showContextMenu"
        >
          <div class="system-message-title">{{ systemMessage.message_title }}</div>
          <div class="system-message-content">{{ systemMessage.message_content }}</div>
        </div>
        <div class="authority-avatar-container">
          <img src="/img/authority.png" class="authority-logo">
        </div>
      </div>

      <div class="user-message-container message-container">
        <a href="javascript:void(0);">
          <div class="user-avatar-container"></div>
        </a>
        <div class="message-text user">你好啊!</div>
      </div>
    </div>

    <div class="contextmenu">
      <div class="contextmenu-remove">删除</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import {Timer} from "@/assets/js/utilsClass";

export default {
  name: "SystemMessageWindow",
  data() {
    return {
      timer: new Timer(),
      sendMode: 'public',
      publicInfo: {
        messageId: undefined,
        systemMessages: [],
      },
      privateInfo: {}
    }
  },
  beforeMount() {
    this.initSystemMessages();
  },
  mounted() {
    // 左键隐藏菜单
    $(document).click(this.hideContextMenu);

    // 添加发送消息事件
    this.$bus.$on('sendSystemMessage', this.sendSystemMessage);
    // 添加修改发送模式事件
    this.$bus.$on('modifySendMode', this.modifySendMode);
  },
  methods: {
    // 修改发送模式
    modifySendMode() {

    },
    // 滚动式自动显示滚动条
    scrollAutoShow() {
      $('.system-message-container').css('overflow-y', 'auto');
      this.timer.timeout(function () {
        $('.system-message-container').css('overflow-y', 'hidden');
      }, 1500);
    },
    // 右击展示菜单
    showContextMenu(e) {
      e.preventDefault();
      // 显示菜单
      let pageX = e.pageX + 'px';
      let pageY = e.pageY + 'px';
      $('.contextmenu').css({'top': pageY, 'left': pageX}).fadeIn(300);

      // 删除信息
      this.deleteSystemMessage(e);
    },
    // 删除系统消息
    deleteSystemMessage(e) {
      // 删除消息功能
      $('.contextmenu-remove').off('click').click(() => {
        let choice = confirm('确认删除吗？');
        if (choice) { // 执行删除
          let params = {
            requestType: "systemMessage",
            operation: "deleteSystemMessage",
            systemMessageId: this.publicInfo.messageId--
          }

          this.sendRequest(params, {}, (response) => {
            let res = response.data;
            let tip, type;
            if (res === 'deleteSystemMessageSucceed') {
              tip = '系统消息删除成功';
              type = 'finished';
              $(e.target).parents('.message-container').remove();
            } else {
              tip = '系统消息删除失败';
              type = 'fail';
            }
            this.$bus.$emit('addWarningTip', tip, type);
          })
        }
      });
    },
    // 左键隐藏菜单
    hideContextMenu() {
      $('.contextmenu>div').off('click');
      $('.contextmenu').fadeOut(300);
    },
    // 初始化系统消息
    initSystemMessages() {
      // 填充数据
      let params = {
        requestType: "systemMessage",
        operation: "getSystemMessages",
      }

      this.sendRequest(params, {},  (response) => {
        let systemMessages = response.data;
        console.log(systemMessages)
        if (typeof systemMessages === 'object') {
          if (systemMessages.length === 0) { // 如果没有系统消息
            this.publicInfo.messageId = 1;
          } else {  // 否则以最后一个的 messageId 为基准
            this.publicInfo.messageId = systemMessages[systemMessages.length - 1].message_id;
          }
          this.publicInfo.systemMessages = systemMessages;
        } else {
          this.$bus.$emit('addWaningTip', '系统消息获取失败', 'fail');
        }
      })
    },
    // 发送系统消息
    sendSystemMessage(systemMessageTitle, message) {
      let tip, type;
      let params = {
        requestType: "systemMessage",
        operation: "sendSystemMessage",
        systemMessageTitle,
        systemMessageContent: message
      }

      this.sendRequest(params, {}, (response) => {
        if (response.data === 'systemMessageSendSucceed') {
          this.publicInfo.messageId++;
          // 添加消息
          this.publicInfo.systemMessages.push({
            message_id: this.publicInfo.messageId,
            message_title: systemMessageTitle,
            message_content: message
          });
          tip = '系统消息发送成功';
          type = 'finished';
        } else {
          tip = '系统消息发送失败';
          type = 'fail';
        }
        this.$bus.$emit('addWarningTip', tip, type);
      });
    },
    // 发起请求, axios
    sendRequest(params, data, fn) {
      this.$bus.$emit('sendRequest', params, data, fn);
    }
  },
  beforeDestroy() {
    this.$bus.$off(['sendSystemMessage', 'modifySendMode']);
    $('.system-message-container').off('mousewheel');
    $('.message-text').off('contextmenu');
  },

}
</script>

<style>

/*系统消息窗口*/
.system-announcement-window {
  width: 65%;
}

/*信息窗口标题*/
.window-title {
  text-align: center;
  font-weight: 700;
  line-height: 40px;
}

/*消息展示区域*/
.system-message-container {
  position: relative;
  width: 100%;
  height: 710px;
  overflow-y: hidden;
}

.authority-message-container {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

.user-message-container {
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}

.authority-logo {
  width: 30px;
}

.authority-avatar-container,
.user-avatar-container {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 150px;
  overflow: hidden;
}

.user-avatar-container {
  background: url('https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675') no-repeat;
  background-size: cover;
  box-shadow: var(--box-shadow-min);
}

/*官方消息*/
.authority {
  padding: 10px;
  margin-right: 15px;
  box-shadow: var(--box-shadow-min);
  border-radius: var(--border-radius) 0 var(--border-radius) var(--border-radius);
}

/*消息标题*/
.system-message-title {
  font-weight: 700;
  margin-bottom: 10px;
}

.user {
  padding: 10px;
  margin-left: 15px;
  box-shadow: var(--box-shadow-min);
  border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
}

/*右键菜单*/
.contextmenu {
  position: absolute;
  display: none;
  z-index: 1002;
  border-radius: var(--border-radius-min);
  box-shadow: var(--box-shadow-min);
  overflow: hidden;
}

.contextmenu > div {
  padding: 10px 20px;
  cursor: pointer;
}
</style>