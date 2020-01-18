<template>
  <section class="TableList">
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
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  components: {},
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
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
    getList(params = {}) {
      console.log('params:', params)
      this.loading = true
      getList({ results: 10, ...params }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">
.TableList {
}
</style>
