<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span>{{ nickname }}</span>
        </span>
        <template #overlay>
          <a-menu class="user-dropdown-menu-wrapper">
            <a-menu-item key="2" disabled>
              <a-icon type="setting" />
              <span>修改密码</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <a href="javascript:;" @click="handleLogout">
                <a-icon type="logout" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { Modal, message } from "ant-design-vue";
import { useUserStore } from "@/store/modules/user";

export default {
  name: "UserMenu",
  setup() {
    const userStore = useUserStore();
    const nickname = computed(() => userStore.name);
    const avatar = computed(() => userStore.avatar);

    const handleLogout = () => {
      Modal.confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk: () => {
          return userStore
            .Logout()
            .then(() => {
              window.location.reload();
            })
            .catch((err) => {
              message.error(err.message || "注销失败");
            });
        },
      });
    };

    return {
      nickname,
      avatar,
      handleLogout,
    };
  },
};
</script>
