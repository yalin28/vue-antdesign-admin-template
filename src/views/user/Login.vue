<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formRef" :model="formState" :rules="rules" @finish="handleSubmit">
      <a-tabs v-model:activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
          <a-form-item name="username">
            <a-input
              size="large"
              type="text"
              placeholder="账户: admin or super"
              v-model:value="formState.username"
            >
              <template #prefix>
                <a-icon type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
              size="large"
              autocomplete="off"
              placeholder="密码: 和账户名一致"
              v-model:value="formState.password"
            >
              <template #prefix>
                <a-icon type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="tab2" disabled tab="手机号登录">
          <a-form-item name="mobile">
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-model:value="formState.mobile"
            >
              <template #prefix>
                <a-icon type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item name="captcha">
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-model:value="formState.captcha"
                >
                  <template #prefix>
                    <a-icon type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
              >
                {{ (!state.smsSendBtn && "获取验证码") || state.time + " s" }}
              </a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-model:checked="formState.rememberMe" class="user-select-none">自动登录</a-checkbox>
        <a class="forge-password" style="float: right;">忘记密码</a>
      </a-form-item>

      <a-form-item style="margin-top: 24px;">
        <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn">
          确定
        </a-button>
      </a-form-item>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import md5 from "md5";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { notification, message } from "ant-design-vue";
import TwoStepCaptcha from "@/components/tools/TwoStepCaptcha.vue";
import { useUserStore } from "@/store/modules/user";
import { timeFix } from "@/utils/util";
import { getSmsCaptcha, get2step } from "@/api/user";

export default {
  name: "UserLogin",
  components: {
    TwoStepCaptcha,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const formRef = ref(null);

    const customActiveKey = ref("tab1");
    const isLoginError = ref(false);
    const requiredTwoStepCaptcha = ref(false);
    const stepCaptchaVisible = ref(false);

    const formState = reactive({
      username: "",
      password: "",
      mobile: "",
      captcha: "",
      rememberMe: true,
    });

    const state = reactive({
      time: 60,
      loginBtn: false,
      loginType: 0,
      smsSendBtn: false,
    });

    const rules = {
      username: [{ required: true, message: "请输入帐户名或邮箱地址", trigger: "change" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      mobile: [{ required: true, pattern: /^1[345789]\d{9}$/, message: "请输入正确的手机号", trigger: "change" }],
      captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    };

    onMounted(() => {
      get2step({})
        .then((res) => {
          requiredTwoStepCaptcha.value = res?.result?.stepCode || false;
        })
        .catch(() => {
          requiredTwoStepCaptcha.value = false;
        });
    });

    const loginSuccess = () => {
      router.push({ path: "/" });
      setTimeout(() => {
        notification.success({
          message: "欢迎",
          description: `${timeFix()}，欢迎回来`,
        });
      }, 500);
      isLoginError.value = false;
    };

    const requestFailed = (err) => {
      isLoginError.value = true;
      notification.error({
        message: "错误",
        description: err?.response?.data?.message || err?.message || "请求出现错误，请稍后再试",
        duration: 4,
      });
    };

    const handleSubmit = () => {
      state.loginBtn = true;
      const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(formState.username);
      state.loginType = isEmail ? 0 : 1;

      const loginParams = {
        username: formState.username,
        password: md5(formState.password),
        rememberMe: formState.rememberMe,
      };

      if (!isEmail) {
        loginParams.username = formState.username;
      } else {
        loginParams.email = formState.username;
      }

      userStore
        .Login(loginParams)
        .then(() => {
          loginSuccess();
        })
        .catch((err) => {
          requestFailed(err);
        })
        .finally(() => {
          state.loginBtn = false;
        });
    };

    const getCaptcha = (e) => {
      e.preventDefault();
      if (!formState.mobile) {
        message.warning("请输入手机号");
        return;
      }
      state.smsSendBtn = true;
      const interval = setInterval(() => {
        if (state.time-- <= 0) {
          state.time = 60;
          state.smsSendBtn = false;
          clearInterval(interval);
        }
      }, 1000);

      const hide = message.loading("验证码发送中..", 0);
      getSmsCaptcha({ mobile: formState.mobile })
        .then((res) => {
          setTimeout(hide, 500);
          notification.success({
            message: "提示",
            description: "验证码获取成功，您的验证码为：" + res.result.captcha,
            duration: 8,
          });
        })
        .catch((err) => {
          setTimeout(hide, 1);
          clearInterval(interval);
          state.time = 60;
          state.smsSendBtn = false;
          requestFailed(err);
        });
    };

    const stepCaptchaSuccess = () => {
      loginSuccess();
    };

    const stepCaptchaCancel = () => {
      userStore.Logout().then(() => {
        state.loginBtn = false;
        stepCaptchaVisible.value = false;
      });
    };

    return {
      formRef,
      formState,
      rules,
      state,
      customActiveKey,
      isLoginError,
      requiredTwoStepCaptcha,
      stepCaptchaVisible,
      handleSubmit,
      getCaptcha,
      stepCaptchaSuccess,
      stepCaptchaCancel,
    };
  },
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-select-none {
    user-select: none;
  }
}
</style>
