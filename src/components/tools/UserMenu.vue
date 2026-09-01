<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown placement="bottomRight">
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar">
            <template #icon v-if="!avatar">
              <a-icon type="user" />
            </template>
          </a-avatar>
          <span style="margin-left: 8px;">{{ nickname || "管理员" }}</span>
        </span>
        <template #overlay>
          <a-menu class="user-dropdown-menu-wrapper">
            <a-menu-item key="2" disabled>
              <a-icon type="setting" style="margin-right: 8px;" />
              <span>修改密码</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="handleLogout">
              <a-icon type="logout" style="margin-right: 8px;" />
              <span>退出登录</span>
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

<style lang="less" scoped>
.user-wrapper {
  display: inline-block;
  height: 100%;
  .action {
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
