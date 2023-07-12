/* eslint-disable @typescript-eslint/no-var-requires */

const MockJs = require('mockjs')

module.exports = {
  /**
   * 提交登录信息
   */
  'POST /base/server/login/v1.0': (req, res) => {
    setTimeout(() => {
      if (req.body.account === 'admin' && req.body.password === '123456') {
        const data = MockJs.mock({
          code: '10000',
          message: '登录成功',
          body: req.body
        })
        return res.json(data)
      } else {
        const data = MockJs.mock({
          code: '10001',
          message: '账号密码错误',
          body: null
        })
        return res.json(data)
      }
    }, 500)
  }
}
