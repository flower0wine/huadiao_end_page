<template>
  <div class="manage-content-container">
    <div class="system-announcement-container">
      <system-message-window></system-message-window>
      <div class="system-announcement-enter-origin">
        <div class="enter-origin-header">
          <div class="enter-origin-title">消息输入窗口</div>
          <div class="message-settings" @click="clickMessageSettingsVisible">
            <div class="message-settings-line"></div>
            <div class="message-settings-line"></div>
            <div class="message-settings-line"></div>
          </div>
          <div class="message-settings-board">
            <div class="send-mode">
              <div class="send-mode-title">发送消息的模式</div>
              <div class="send-mode-options">
                <div class="public-send-mode"
                     :title="tips.systemMessageSendModeTip"
                     @click="clickToChangeSendMode">
                  <div class="send-mode-sign"></div>
                  <div class="public-mode-text">公开</div>
                </div>
                <div class="private-send-mode"
                     :title="tips.systemMessageSendModeTip"
                     @click="clickToChangeSendMode">
                  <div class="send-mode-sign"></div>
                  <div class="private-mode-text">私密</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="enter-origin-body">
          <transition name="down" appear>
            <component :is="sendModeComponent"></component>
          </transition>
          <system-message-input></system-message-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import tips from '@/assets/js/tips';
import publicSendElement from "@/pages/index/views/systemAnnouncement/PublicSendElement";
import privateSendElement from "@/pages/index/views/systemAnnouncement/PrivateSendElement";
import systemMessageWindow from "@/pages/index/views/systemAnnouncement/SystemMessageWindow";
import systemMessageInput from "@/pages/index/views/systemAnnouncement/SystemMessageInput";

export default {
  name: "systemAnnouncement",
  data() {
    return {
      isMessageSettingsClick: false,
      sendModeComponent: "publicSendElement",
      tips: {
        systemMessageImgTip: tips.systemMessageImgTip,
        searchUsersTip: tips.searchUsersTip,
      },
    }
  },
  components: {
    publicSendElement,
    privateSendElement,
    systemMessageWindow,
    systemMessageInput
  },
  mounted() {
    $('.public-send-mode').find('.send-mode-sign').addClass('selected-send-mode');
  },
  methods: {
    clickMessageSettingsVisible() {
      const lineTop = 0;
      const lineMiddle = 1;
      const lineBottom = 2;
      let enterOrigin = $('.system-announcement-enter-origin');
      let settingsLines = enterOrigin.find('.message-settings-line');
      let messageSettingsBoard = enterOrigin.find('.message-settings-board');

      // 按钮的变化
      if (!this.isMessageSettingsClick) {
        $(settingsLines[lineTop]).css({'transform': 'rotate(-45deg)'});
        $(settingsLines[lineBottom]).css({'transform': 'rotate(45deg)'});
        $(settingsLines[lineMiddle]).css('opacity', 0);
      } else {
        let recoverRotate = {'transform': 'rotate(0)'};
        $(settingsLines[lineTop]).css(recoverRotate);
        $(settingsLines[lineBottom]).css(recoverRotate);
        $(settingsLines[lineMiddle]).css('opacity', 1);
      }
      // 消息设置面板 jquery 动画
      messageSettingsBoard.stop().slideToggle(300);
      this.isMessageSettingsClick = !this.isMessageSettingsClick;
    },
    // 点击更换发送模式
    clickToChangeSendMode() {
      let publicSendMode = $('.public-send-mode');
      let privateSendMode = $('.private-send-mode');
      let tip;

      if(this.sendModeComponent === "publicSendElement") {
        // 更改标志样式
        publicSendMode.find('.send-mode-sign').removeClass('selected-send-mode');
        privateSendMode.find('.send-mode-sign').addClass('selected-send-mode');
        // 更换组件为 private
        this.sendModeComponent = "privateSendElement";
        tip = '当前模式更换为私密模式';
      } else {
        // 下面与上面类似
        publicSendMode.find('.send-mode-sign').addClass('selected-send-mode');
        privateSendMode.find('.send-mode-sign').removeClass('selected-send-mode');
        this.sendModeComponent = "publicSendElement";
        tip = '当前模式更换为公开模式';
      }
      this.$bus.$emit('addWarningTip', tip, 'warning');
    },

  },
  beforeDestroy() {
    $('.public-send-mode').off('click');
    $('.private-send-mode').off('click');
  }

}
</script>

<style scoped>
/*系统消息容器*/
.system-announcement-container {
  display: flex;
  height: 750px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

/*系统消息输入区域*/
.system-announcement-enter-origin {
  position: relative;
  width: 35%;
  height: 100%;
}

  /*消息输入区域标题*/
.enter-origin-title {
  text-align: center;
  font-weight: 700;
  line-height: 40px;
}

/*系统消息设置*/
.message-settings {
  position: absolute;
  top: 9px;
  right: 15px;
  height: 21px;
}

/*设置菜单线条*/
.message-settings-line {
  width: 20px;
  height: 3px;
  margin-top: 4px;
  transition: all .3s;
  transform-origin: right center;
}

/*消息设置面板*/
.message-settings-board {
  position: absolute;
  z-index: 99;
  display: none;
  top: 50px;
  right: 14px;
  width: 200px;
  padding: 15px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

/*发送消息模式标题*/
.send-mode-title {
  font-weight: 700;
}

.send-mode-options {
  display: flex;
  flex-direction: column;
}

/*发送消息模式选项*/
.send-mode-options>div {
  display: flex;
  align-items: center;
  padding: 8px 0 0 15px;
  cursor: pointer;
}

/*选项标志*/
.send-mode-sign {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
}


/*过渡*/
.down-enter {
  opacity: 0;
  transform: translateY(-20%);
}

.down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.down-leave-to {
  display: none;
}
</style>