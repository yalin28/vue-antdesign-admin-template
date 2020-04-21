import Mock from 'mockjs2'
import { builder, getBody } from '../util'

// 模拟两个用户
const admin_user = {
  username: 'admin',
  password: '21232f297a57a5a743894a0e4a801fc3', // MD5加密
}
const super_user = {
  username: 'super',
  password: '1b3231655cebb7a1f783eddf27d254ca', // MD5加密
}

const login = (options) => {
  const body = getBody(options)
  // console.log('mock: body', body)
  if (body.username === 'admin' && body.password === admin_user.password) {
    return builder(
      {
        id: Mock.mock('@guid'),
        name: Mock.mock('@name'),
        username: 'admin',
        password: '',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
        status: 1,
        telephone: '',
        lastLoginIp: '27.154.74.117',
        lastLoginTime: 1534837621348,
        creatorId: 'admin',
        createTime: 1497160610259,
        deleted: 0,
        roleId: 'admin',
        lang: 'zh-CN',
        token: '4291d7da9005377ec9aec4a71ea837f',
      },
      '',
      200,
      { 'Custom-Header': Mock.mock('@guid') }
    )
  } else if (body.username === 'super' && body.password === super_user.password) {
    return builder(
      {
        id: Mock.mock('@guid'),
        name: Mock.mock('@name'),
        username: 'super',
        password: '',
        avatar: 'https://tva2.sinaimg.cn/crop.0.0.1006.1006.180/a6a53118jw8fc26p9zxeuj20ry0ryq4l.jpg',
        status: 1,
        telephone: '',
        lastLoginIp: '27.154.74.117',
        lastLoginTime: 1534837621348,
        creatorId: 'super',
        createTime: 1497160610259,
        deleted: 0,
        roleId: 'super',
        lang: 'zh-CN',
        token: '4391d7da9005377ec9aec4a71ea837f',
      },
      '',
      200,
      { 'Custom-Header': Mock.mock('@guid') }
    )
  }
  return builder({ isLoginRequest: true }, '账户或密码错误', 401)
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
