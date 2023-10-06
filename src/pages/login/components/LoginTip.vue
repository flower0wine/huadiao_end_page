<template>
  <div class="login-tip-container">
    <div class="tip-content">{{tip}}</div>
  </div>
</template>

<script>
export default {
  name: "LoginTip",
  data() {
    return {
    }
  },
  props: ['tip'],
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.login-tip-container {
  z-index: 999;
  width: 0;
  height: 0;
  transition: var(--transition-500ms);
}

.tip-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  padding: 15px 30px;
  border-radius: var(--border-radius);
  backdrop-filter: blur(2px);
  box-shadow: var(--box-shadow);
  transition: var(--transition-500ms);
}
</style>