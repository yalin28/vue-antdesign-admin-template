<template>
  <div :style="!$route.meta?.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : null">
    <page-header v-if="!$route.meta?.hiddenHeaderContent" :title="pageTitle" :logo="logo" :avatar="avatar">
      <template #action>
        <slot name="action"></slot>
      </template>
      <template #content>
        <slot name="headerContent"></slot>
        <div v-if="!$slots.headerContent && description">
          <p style="font-size: 14px; color: rgba(0, 0, 0, 0.65);">{{ description }}</p>
          <div class="link">
            <template v-for="(link, index) in linkList" :key="index">
              <a @click="() => link.callback && link.callback()">
                <a-icon :type="link.icon" />
                <span>{{ link.title }}</span>
              </a>
            </template>
          </div>
        </div>
      </template>
      <template #extra>
        <slot name="extra">
          <div class="extra-img">
            <img v-if="extraImage" :src="extraImage" />
          </div>
        </slot>
      </template>
      <template #pageMenu>
        <slot name="pageMenu">
          <div class="page-menu-search" v-if="search">
            <a-input-search style="width: 80%; max-width: 522px;" placeholder="请输入..." size="large" enterButton="搜索" />
          </div>
          <div class="page-menu-tabs" v-if="tabs && tabs.items">
            <a-tabs :tabBarStyle="{ margin: 0 }" :activeKey="tabs.active?.()" @change="tabs.callback">
              <a-tab-pane v-for="item in tabs.items" :tab="item.title" :key="item.key"></a-tab-pane>
            </a-tabs>
          </div>
        </slot>
      </template>
    </page-header>
    <div class="content">
      <div class="page-header-index-wide">
        <slot>
          <route-layout ref="content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader/PageHeader.vue";
import RouteLayout from "./RouteLayout.vue";

export default {
  name: "PageLayout",
  components: {
    PageHeader,
    RouteLayout,
  },
  props: {
    avatar: {
      type: String,
      default: null,
    },
    title: {
      type: [String, Boolean],
      default: true,
    },
    logo: {
      type: String,
      default: null,
    },
    directTabs: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageTitle: null,
      description: null,
      linkList: [],
      extraImage: "",
      search: false,
      tabs: {},
    };
  },
  mounted() {
    this.tabs = this.directTabs || {};
    this.getPageMeta();
  },
  updated() {
    this.getPageMeta();
  },
  methods: {
    getPageMeta() {
      this.pageTitle = typeof this.title === "string" || !this.title ? this.title : this.$route.meta?.title;

      const content = this.$refs.content;
      if (content) {
        if (content.pageMeta) {
          Object.assign(this, content.pageMeta);
        } else {
          this.description = content.description;
          this.linkList = content.linkList || [];
          this.extraImage = content.extraImage;
          this.search = content.search === true;
          this.tabs = content.tabs || {};
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 24px 24px 0;
  .link {
    margin-top: 16px;
    &:not(:empty) {
      margin-bottom: 16px;
    }
    a {
      margin-right: 32px;
      height: 24px;
      line-height: 24px;
      display: inline-block;
      i, .anticon {
        font-size: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
      span {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
.page-menu-search {
  text-align: center;
  margin-bottom: 16px;
}
.page-menu-tabs {
  margin-top: 48px;
}

.extra-img {
  margin-top: -60px;
  text-align: center;
  width: 195px;

  img {
    width: 100%;
  }
}

.mobile {
  .extra-img {
    margin-top: 0;
    text-align: center;
    width: 96px;

    img {
      width: 100%;
    }
  }
}
</style>
