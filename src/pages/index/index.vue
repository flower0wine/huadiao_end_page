<template>
  <div class="manage-board">
    <ManageHeader></ManageHeader>
    <router-view></router-view>
    <div class="right-slide-tip-container">
      <transition v-for="ele in warningTips"
                  :key="ele + new Date().getMilliseconds()"
                  name="slide"
                  out-in
                  appear
      >
        <slide-tip :warningTip="ele.tip" :tipType="ele.type"></slide-tip>
      </transition>
    </div>
  </div>
</template>

<script>

import ManageHeader from "@/pages/index/components/ManageHeader";
import {Timer} from "@/assets/js/utilsClass";
import {sendRequest} from "@/assets/js/common";

export default {
  name: "manageIndex",
  data() {
    return {
      warningTips: [],
    }
  },
  components: {
    ManageHeader,
  },
  mounted() {
    // 添加自定义事件
    this.$bus.$on('addWarningTip', this.addWarningTip);
    this.$bus.$on('sendRequest', sendRequest);
  },
  methods: {
    // 添加提示信息到数组中, 被删除的信息代表的 SlideTip 组件会被 destroy
    addWarningTip(tip, type) {
      let timer = new Timer();
      let time = tip.length / 10.0 * 2000; // 延迟时间随字符串长度改变

      // 添加提示信息
      this.warningTips.push({tip, type});
      time = time > 2000 ? time : 2000; // 时间最短为 2 秒
      // 延迟删除
      timer.timeout(() => {
        this.warningTips.splice(this.warningTips.indexOf(tip), 1);
        timer.destroy();  // 定时器删除
      }, time);
    },
  },
  beforeDestroy() {
    this.$bus.$off('addWarningTip');
    this.$bus.$off('sendRequest');
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/*整个面板*/
.manage-board {
  width: 100%;
  height: 1000px;
}

.right-slide-tip-container {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 9999999;
  margin: 20px 30px 0 0;
}

.right-slide-tip-container {
  display: flex;
  flex-direction: column;
}

</style>