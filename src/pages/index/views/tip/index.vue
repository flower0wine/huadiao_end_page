<template>
    <div class="slide-tip-container">
      <div class="tip-title">提示</div>
      <div class="tip-content">
        <div class="icon-tip">
          <svg v-if="tipType === 'finished'" t="1671621624627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2705" width="200" height="200"><path d="M511.950005 512.049995m-447.956254 0a447.956254 447.956254 0 1 0 895.912508 0 447.956254 447.956254 0 1 0-895.912508 0Z" fill="#20B759" p-id="2706"></path><path d="M458.95518 649.636559L289.271751 479.95313c-11.698858-11.698858-30.697002-11.698858-42.39586 0s-11.698858 30.697002 0 42.395859l169.683429 169.68343c11.698858 11.698858 30.697002 11.698858 42.39586 0 11.798848-11.598867 11.798848-30.597012 0-42.39586z" fill="#FFFFFF" p-id="2707"></path><path d="M777.62406 332.267552c-11.698858-11.698858-30.697002-11.698858-42.39586 0L424.158578 643.437164c-11.698858 11.698858-11.698858 30.697002 0 42.39586s30.697002 11.698858 42.39586 0l311.069622-311.069622c11.798848-11.798848 11.798848-30.796992 0-42.49585z" fill="#FFFFFF" p-id="2708"></path></svg>
          <svg v-else-if="tipType === 'warning'" t="1671509800088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2694"><path d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z" fill="#FAAD14" p-id="2695"></path></svg>
          <svg v-else-if="tipType === 'fail'" t="1671622008018" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2713" width="200" height="200"><path d="M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z" fill="#E84335" p-id="2714"></path></svg>
        </div>
        <div class="text-tip">{{tipContent}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "SlideTip",
  data() {
    return {
      tipContent: this.warningTip,
    }
  },
  methods: {},
  props: ['warningTip', 'tipType'],
  beforeDestroy() {
  }
}
</script>

<style scoped>
/*提示信息*/
.slide-tip-container {
  display: inline-block;
  z-index: 1003;
  max-width: 300px;
  padding: 10px 20px;
  margin-top: 15px;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  transition: all 0.5s;
}

.tip-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.icon-tip .icon {
  width: 15px;
  height: 15px;
  margin-right: 7px;
  vertical-align: -2px;
}

.tip-content {
  display: flex;
}
</style>