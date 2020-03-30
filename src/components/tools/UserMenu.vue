<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- notice：信息通知组件 -->
      <!-- <notice-icon class="action" /> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item> -->
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
      </a-dropdown>
    </div>
  </div>
</template>

<script>
// import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    // NoticeIcon,
  },
  computed: {
    ...mapGetters(['nickname', 'avatar']),
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch((err) => {
              this.$message.error({
                title: '错误',
                description: err.message,
              })
            })
        },
      })
    },
  },
}
</script>
