<template>
  <a-modal centered :open="visible" @cancel="handleCancel" :maskClosable="false">
    <template #title>
      <div :style="{ textAlign: 'center' }">两步验证</div>
    </template>
    <template #footer>
      <div :style="{ textAlign: 'center' }">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="stepLoading" @click="handleStepOk">
          继续
        </a-button>
      </div>
    </template>

    <a-spin :spinning="stepLoading">
      <a-form layout="vertical">
        <div class="step-form-wrapper">
          <p style="text-align: center;" v-if="!stepLoading">请在手机中打开 Google Authenticator 或两步验证 APP<br />输入 6 位动态码</p>
          <p style="text-align: center;" v-else>正在验证..<br />请稍后</p>
          <a-form-item :style="{ textAlign: 'center' }" hasFeedback>
            <a-input v-model:value="stepCode" :style="{ textAlign: 'center' }" @keyup.enter="handleStepOk" placeholder="000000" maxlength="6" />
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: "TwoStepCaptcha",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stepLoading: false,
      stepCode: "",
    };
  },
  methods: {
    handleStepOk() {
      if (!this.stepCode || this.stepCode.length !== 6) {
        this.$emit("error", { message: "请输入 6 位动态码" });
        return;
      }
      this.stepLoading = true;
      setTimeout(() => {
        this.stepLoading = false;
        this.$emit("success", { values: { stepCode: this.stepCode } });
      }, 1000);
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less" scoped>
.step-form-wrapper {
  margin: 0 auto;
  width: 80%;
  max-width: 400px;
}
</style>
