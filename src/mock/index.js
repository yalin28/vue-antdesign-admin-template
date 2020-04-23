import { isIE } from '@/utils/util'
import { prodUseMock } from '@/config/index'
// 判断环境不是 production或者是生成环境且开启了使用 mock(方便预览，正式使用需要修改 src/config/index 中的配置)
if (prodUseMock || process.env.NODE_ENV !== 'production') {
  if (isIE()) {
    console.error('ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('mock mounting')
  const Mock = require('mockjs2')
  require('./services/auth')
  require('./services/user')
  require('./services/manage')
  require('./services/other')
  require('./services/article')

  Mock.setup({
    timeout: 800, // setter delay time
  })
  console.log('mock mounted')
}
