import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  // console.log('options', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '小无益',
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {},
  }
  // role
  const roleObj = {
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
      {
        roleId: 'admin',
        permissionId: 'profile',
        permissionName: '详细页权限',
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
        permissionId: 'table',
        permissionName: '表格权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'import',
            describe: '导入',
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
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'form',
        permissionName: '表单权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
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
        permissionId: 'order',
        permissionName: '订单管理',
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
        permissionId: 'permission',
        permissionName: '权限管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
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
        permissionId: 'role',
        permissionName: '角色管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
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
        permissionId: 'table',
        permissionName: '桌子管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
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
        permissionId: 'user',
        permissionName: '用户管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'import',
            describe: '导入',
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
          {
            action: 'export',
            describe: '导出',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
    ],
  }

  roleObj.permissions.push({
    roleId: 'admin',
    permissionId: 'support',
    permissionName: '超级模块',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false,
      },
      {
        action: 'import',
        describe: '导入',
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
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false,
      },
    ],
    actionList: null,
    dataAccess: null,
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

const userNav = (options) => {
  const nav = [
    {
      path: '/',
      name: 'index',
      component: 'BasicLayout',
      meta: { title: '首页' },
      redirect: '/dashboard/analysis',
      children: [
        // 默认页
        {
          path: '/dashboard',
          name: 'dashboard',
          redirect: '/dashboard/analysis',
          component: RouteView,
          meta: { title: '工作台', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'Analysis',
              component: () => import('@/views/dashboard/Analysis'),
              meta: { title: 'hello', keepAlive: true, permission: ['dashboard'] },
            },
          ],
        },
        {
          path: '/example',
          name: 'example',
          redirect: '/example/table',
          component: RouteView,
          meta: { title: '示例页面', keepAlive: true, icon: 'thunderbolt', permission: ['dashboard'] },
          children: [
            {
              path: '/example/table',
              name: 'tableExample',
              component: () => import('@/views/example/TableList'),
              meta: { title: 'table', keepAlive: true, permission: ['dashboard'] },
            },
            {
              path: '/example/test',
              name: 'tableTest',
              component: () => import('@/views/example/test'),
              meta: { title: 'test', keepAlive: true, permission: ['dashboard'] },
            },
          ],
        },
        {
          path: 'https://pro.loacg.com/docs/getting-started',
          name: 'docs',
          meta: { title: '在线文档', icon: 'select', target: '_blank' },
        },
      ],
    },
  ]
  const json = builder(nav)
  console.log('json', json)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
