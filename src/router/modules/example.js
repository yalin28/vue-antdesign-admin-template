import { RouteLayout } from '@/layouts'

const exampleModle = {
  path: '/example',
  name: 'example',
  redirect: '/example/table',
  component: RouteLayout,
  meta: { title: '示例页面', keepAlive: true, icon: 'thunderbolt', permission: ['dashboard'] },
  children: [
    {
      path: '/example/table',
      name: 'exampleTableList',
      component: () => import('@/views/example/TableList'),
      meta: { title: 'table', keepAlive: true, permission: ['dashboard'] },
    },
    {
      path: '/example/test',
      name: 'exampleTest',
      component: () => import('@/views/example/test'),
      meta: { title: 'test', keepAlive: true, permission: ['dashboard'] },
    },
  ],
}

export default exampleModle
