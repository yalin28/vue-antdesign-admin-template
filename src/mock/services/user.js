import Mock from 'mockjs2'
import { builder, getBody } from '../util'

// 模拟拥有不同菜单权限的账户
const info = (options) => {
  const body = getBody(options)
  const token = body.token
  const admin_user = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: 'admin',
    username: 'admin',
    password: '',
    avatar: 'https://tva2.sinaimg.cn/crop.0.0.1006.1006.180/a6a53118jw8fc26p9zxeuj20ry0ryq4l.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {
      id: 'admin',
      name: '管理员',
      describe: '拥有所有权限',
      status: 1,
      creatorId: 'system',
      createTime: 1497160610259,
      deleted: 0,
      permissions: [
        {
          roleId: 'admin',
          permissionId: 'dashboard',
          permissionName: '仪表盘',
          actions:
            '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
          actionEntitySet: [
            {
              action: 'add',
              describe: '新增',
              defaultCheck: false,
            },
            {
              action: 'query',
              describe: '查询',
              defaultCheck: false,
            },
            {
              action: 'get',
              describe: '详情',
              defaultCheck: false,
            },
            {
              action: 'update',
              describe: '修改',
              defaultCheck: false,
            },
            {
              action: 'delete',
              describe: '删除',
              defaultCheck: false,
            },
          ],
          actionList: null,
          dataAccess: null,
        },
        {
          roleId: 'admin',
          permissionId: 'exception',
          permissionName: '异常页面权限',
          actions:
            '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
          actionEntitySet: [
            {
              action: 'add',
              describe: '新增',
              defaultCheck: false,
            },
            {
              action: 'query',
              describe: '查询',
              defaultCheck: false,
            },
            {
              action: 'get',
              describe: '详情',
              defaultCheck: false,
            },
            {
              action: 'update',
              describe: '修改',
              defaultCheck: false,
            },
            {
              action: 'delete',
              describe: '删除',
              defaultCheck: false,
            },
          ],
          actionList: null,
          dataAccess: null,
        },
        {
          roleId: 'admin',
          permissionId: 'result',
          permissionName: '结果权限',
          actions:
            '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
          actionEntitySet: [
            {
              action: 'add',
              describe: '新增',
              defaultCheck: false,
            },
            {
              action: 'query',
              describe: '查询',
              defaultCheck: false,
            },
            {
              action: 'get',
              describe: '详情',
              defaultCheck: false,
            },
            {
              action: 'update',
              describe: '修改',
              defaultCheck: false,
            },
            {
              action: 'delete',
              describe: '删除',
              defaultCheck: false,
            },
          ],
          actionList: null,
          dataAccess: null,
        },
      ],
    },
  }
  const super_user = {
    id: '4391d7da9005377ec9aec4a71ea837f',
    name: 'super',
    username: 'super',
    password: '',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {
      id: 'admin',
      name: '管理员',
      describe: '拥有所有权限',
      status: 1,
      creatorId: 'system',
      createTime: 1497160610259,
      deleted: 0,
      permissions: [
        {
          roleId: 'admin',
          permissionId: 'dashboard',
          permissionName: '仪表盘',
          actions:
            '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
          actionEntitySet: [
            {
              action: 'add',
              describe: '新增',
              defaultCheck: false,
            },
            {
              action: 'query',
              describe: '查询',
              defaultCheck: false,
            },
            {
              action: 'get',
              describe: '详情',
              defaultCheck: false,
            },
            {
              action: 'update',
              describe: '修改',
              defaultCheck: false,
            },
            {
              action: 'delete',
              describe: '删除',
              defaultCheck: false,
            },
          ],
          actionList: null,
          dataAccess: null,
        },
        {
          roleId: 'admin',
          permissionId: 'exception',
          permissionName: '异常页面权限',
          actions:
            '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
          actionEntitySet: [
            {
              action: 'add',
              describe: '新增',
              defaultCheck: false,
            },
            {
              action: 'query',
              describe: '查询',
              defaultCheck: false,
            },
            {
              action: 'get',
              describe: '详情',
              defaultCheck: false,
            },
            {
              action: 'update',
              describe: '修改',
              defaultCheck: false,
            },
            {
              action: 'delete',
              describe: '删除',
              defaultCheck: false,
            },
          ],
          actionList: null,
          dataAccess: null,
        },
        {
          roleId: 'admin',
          permissionId: 'result',
          permissionName: '结果权限',
          actions:
            '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
          actionEntitySet: [
            {
              action: 'add',
              describe: '新增',
              defaultCheck: false,
            },
            {
              action: 'query',
              describe: '查询',
              defaultCheck: false,
            },
            {
              action: 'get',
              describe: '详情',
              defaultCheck: false,
            },
            {
              action: 'update',
              describe: '修改',
              defaultCheck: false,
            },
            {
              action: 'delete',
              describe: '删除',
              defaultCheck: false,
            },
          ],
          actionList: null,
          dataAccess: null,
        },
      ],
    },
  }
  const userInfo = {
    '4291d7da9005377ec9aec4a71ea837f': admin_user,
    '4391d7da9005377ec9aec4a71ea837f': super_user,
  }
  return builder(userInfo[token])
}

const nav = (options) => {
  const body = getBody(options)
  console.log(options)
  const token = body.token
  const admin_nav = [
    {
      parentId: 0,
      id: 11,
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/analysis',
      component: 'RouteLayout',
      meta: { title: '工作台', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
    },
    {
      parentId: 11,
      id: 111,
      path: '/dashboard/analysis',
      name: 'analysis',
      component: 'Index',
      meta: { title: 'hello', keepAlive: true, permission: ['dashboard'] },
    },
    {
      parentId: 0,
      id: 12,
      path: '/example',
      name: 'example',
      redirect: '/example/table',
      component: 'RouteLayout',
      meta: { title: '示例页面', keepAlive: true, icon: 'thunderbolt', permission: ['dashboard'] },
    },
    {
      parentId: 12,
      id: 121,
      path: '/example/table',
      name: 'exampleTableList',
      component: 'TableList',
      meta: { title: 'table', keepAlive: true, permission: ['dashboard'] },
    },
    {
      parentId: 12,
      id: 122,
      path: '/example/test',
      name: 'exampleTest',
      component: 'TableTest',
      meta: { title: 'test', keepAlive: true, permission: ['dashboard'] },
    },
    {
      parentId: 0,
      id: 13,
      path: 'https://pro.loacg.com/docs/getting-started',
      name: 'docs',
      meta: { title: '在线文档', icon: 'select', target: '_blank' },
    },
    {
      parentId: 0,
      id: 10024,
      path: '/403',
      name: '403',
      component: '403',
      meta: { title: '403', show: false },
    },
    {
      parentId: 0,
      id: 10024,
      path: '/404',
      name: '404',
      component: '404',
      meta: { title: '404', show: false },
    },
    {
      parentId: 0,
      id: 10024,
      path: '/500',
      name: '500',
      component: '500',
      meta: { title: '500', show: false },
    },
  ]
  const super_nav = [
    {
      parentId: 0,
      id: 11,
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/analysis',
      component: 'RouteLayout',
      meta: { title: '工作台', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
    },
    {
      parentId: 11,
      id: 111,
      path: '/dashboard/analysis',
      name: 'analysis',
      component: 'Index',
      meta: { title: 'hello', keepAlive: true, permission: ['dashboard'] },
    },
    // {
    //   parentId: 0,
    //   id: 12,
    //   path: '/example',
    //   name: 'example',
    //   redirect: '/example/table',
    //   component: 'RouteLayout',
    //   meta: { title: '示例页面', keepAlive: true, icon: 'thunderbolt', permission: ['dashboard'] },
    // },
    // {
    //   parentId: 12,
    //   id: 121,
    //   path: '/example/table',
    //   name: 'exampleTableList',
    //   component: 'TableList',
    //   meta: { title: 'table', keepAlive: true, permission: ['dashboard'] },
    // },
    // {
    //   parentId: 12,
    //   id: 122,
    //   path: '/example/test',
    //   name: 'exampleTest',
    //   component: 'TableTest',
    //   meta: { title: 'test', keepAlive: true, permission: ['dashboard'] },
    // },
    // {
    //   parentId: 0,
    //   id: 13,
    //   path: 'https://pro.loacg.com/docs/getting-started',
    //   name: 'docs',
    //   meta: { title: '在线文档', icon: 'select', target: '_blank' },
    // },
    // {
    //   parentId: 0,
    //   id: 10024,
    //   path: '/403',
    //   name: '403',
    //   component: '403',
    //   meta: { title: '403', show: false },
    // },
    // {
    //   parentId: 0,
    //   id: 10024,
    //   path: '/404',
    //   name: '404',
    //   component: '404',
    //   meta: { title: '404', show: false },
    // },
    // {
    //   parentId: 0,
    //   id: 10024,
    //   path: '/500',
    //   name: '500',
    //   component: '500',
    //   meta: { title: '500', show: false },
    // },
  ]
  const userNav = {
    '4291d7da9005377ec9aec4a71ea837f': admin_nav,
    '4391d7da9005377ec9aec4a71ea837f': super_nav,
  }
  return builder(userNav[token])
}

Mock.mock(/\/api\/user\/info/, 'post', info)
Mock.mock(/\/api\/user\/nav/, 'post', nav)
