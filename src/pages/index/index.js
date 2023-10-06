'use strict';
import Vue from 'vue'
import VueRouter from "vue-router";
import router from "@/pages/index/router";
import '@/assets/css/common/common.css';
import index from "@/pages/index/index.vue";
import '@/pages/index/theme/dark.css';
import '@/pages/index/theme/light.css';
import '@/assets/css/common/layout.css';
import '@/assets/css/common/animation.css';
import slideTip from "@/pages/index/views/tip";

Vue.config.productionTip = false;  // 生产提示

// 使用路由
Vue.use(VueRouter);

Vue.component('slide-tip', slideTip)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;  // 全局事件总线, 声明 vm 为中间变量
  },
  render: h => h(index),  // 渲染
  router, // 导入路由配置
}).$mount('#app'); // 挂载

