<template>
  <section class="TableList">
    <div class="button-view">
      <template v-if="noData">
        <a-button type="primary" @click="() => getList()" icon="cloud-download">获取数据</a-button>
        <a-button danger disabled icon="redo">重置数据</a-button>
      </template>
      <template v-else>
        <a-button type="primary" disabled icon="cloud-download">获取数据</a-button>
        <a-button danger @click="resetList" icon="redo">重置数据</a-button>
      </template>
    </div>
    <a-divider orientation="left">表格展示：</a-divider>
    <a-table
      :locale="locale"
      :columns="columns"
      :rowKey="(record) => record.login?.uuid || record.email"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          {{ record.name?.first }} {{ record.name?.last }}
        </template>
      </template>
    </a-table>
  </section>
</template>

<script>
import { getList } from "@/api/example/table";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

export default {
  name: "ExampleTableList",
  data() {
    return {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
      },
      loading: false,
      columns,
      locale: {
        emptyText: "数据加载中...",
      },
    };
  },
  computed: {
    noData() {
      return this.data.length === 0;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.pagination = { ...this.pagination, ...pagination };
      this.getList({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter?.field,
        sortOrder: sorter?.order,
        ...filters,
      });
    },
    getList(params = {}) {
      this.loading = true;
      getList({ results: 10, ...params })
        .then((res) => {
          this.loading = false;
          this.data = res.results || [];
          this.pagination = {
            ...this.pagination,
            total: 100,
          };
        })
        .catch(() => {
          this.loading = false;
        })
        .finally(() => {
          this.locale.emptyText = "暂无数据";
        });
    },
    resetList() {
      this.data = [];
      this.pagination = {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 0,
      };
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
.TableList {
  background: #fff;
  padding: 30px;
  .button-view {
    margin-bottom: 30px;
    button {
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
