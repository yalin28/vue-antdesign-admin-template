<template>
  <section class="TableList">
    <div class="button-view">
      <a-button type="primary">获取数据</a-button>
    </div>
    <a-table
      :columns="columns"
      :rowKey="record => record.login.uuid"
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
import { getList } from '@/api/quick-start'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]
export default {
  name: 'TableList',
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  components: {},
  watch: {},
  mounted () {},
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.getList({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    getList (params = {}) {
      this.loading = true
      getList({ results: 10, ...params }).then(res => {
        const pagination = { ...this.pagination }
        pagination.total = 100
        this.loading = false
        this.data = res.results
        this.pagination = pagination
      })
    }
  }
}
</script>

<style lang="less">
.TableList {
  .button-view {
    margin-bottom: 30px;
  }
}
</style>
