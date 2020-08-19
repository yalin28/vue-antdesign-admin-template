<template>
  <section class="TableList">
    <div class="button-view">
      <template v-if="noData">
        <a-button type="primary" @click="getList" icon="cloud-download">获取数据</a-button>
        <a-button type="danger" disabled icon="redo">重置数据</a-button>
      </template>
      <template v-else>
        <a-button type="primary" disabled icon="cloud-download">获取数据</a-button>
        <a-button type="danger" @click="resetList" icon="redo">重置数据</a-button>
      </template>
    </div>
    <a-divider orientation="left">表格展示：</a-divider>
    <a-table
      :locale="locale"
      :columns="columns"
      :rowKey="(record) => record.login.uuid"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }} </template>
    </a-table>
  </section>
</template>

<script>
import { getList } from '@/api/example/table'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]
export default {
  name: 'exampleTableList',
  components: {},
  data() {
    return {
      data: [],
      pagination: {
        showSizeChanger: true,
      },
      loading: false,
      columns,
      locale: {
        emptyText: '数据加载中...',
      },
    }
  },
  computed: {
    noData() {
      return this.data.length === 0
    },
  },
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.getList({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      })
    },
    getList(params = {}) {
      this.loading = true
      getList({ results: 10, ...params })
        .then((res) => {
          const pagination = { ...this.pagination }
          pagination.total = 100
          this.loading = false
          this.data = res.results
          this.pagination = pagination
        })
        .finally((f) => {
          this.locale.emptyText = '暂无数据'
        })
    },
    resetList() {
      this.data = []
      this.pagination = {
        showSizeChanger: true,
        total: 0,
      }
      this.loading = false
    },
  },
}
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
