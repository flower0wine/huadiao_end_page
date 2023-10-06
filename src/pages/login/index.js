'use strict';

import Vue from 'vue';
import '@/assets/css/common/common.css';
import '@/assets/css/common/animation.css';
import index from "@/pages/login/index.vue";

Vue.config.productionTip = false;  // 生产提示


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;  // 全局事件总线, 声明 vm 为中间变量
  },
  render: h => h(index),  // 渲染
}).$mount('#app'); // 挂载

