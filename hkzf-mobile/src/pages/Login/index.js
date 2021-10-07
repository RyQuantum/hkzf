import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 导入withFormik
import { withFormik, Form, Field, ErrorMessage } from 'formik'

// 导入Yup
import * as Yup from 'yup'

// 导入 API
import { API } from '../../utils'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

/* 
  简化表单处理：

  1 导入 Form 组件，替换 form 元素，去掉 onSubmit。
  2 导入 Field 组件，替换 input 表单元素，去掉 onChange、onBlur、value。
  3 导入 ErrorMessage 组件，原来的错误消息逻辑代码。
  4 去掉所有 props。
*/

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>Login</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            {/* 账号 */}
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="username"
                placeholder="Username"
              />
            </div>
            <ErrorMessage
              className={styles.error}
              name="username"
              component="div"
            />
            {/* 密码 */}
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <ErrorMessage
              className={styles.error}
              name="password"
              component="div"
            />
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                Submit
              </button>
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">Register</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// 使用 withFormik 高阶组件包装 Login 组件，为 Login 组件提供属性和方法
Login = withFormik({
  // 提供状态：
  mapPropsToValues: () => ({ username: '', password: '' }),

  // 添加表单校验规则
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Please input username')
      .matches(REG_UNAME, '5 to 8 length, only accept numbers, letters, or underscore.'),
    password: Yup.string()
      .required('Please input password')
      .matches(REG_PWD, '5 to 12 length, only accept numbers, letters, or underscore.')
  }),

  // 表单的提交事件
  handleSubmit: async (values, { props }) => {
    // 获取账号和密码
    const { username, password } = values

    // console.log('表单提交了', username, password)
    // 发送请求
    const res = await API.post('/user/login', {
      username,
      password
    })

    const { status, body, description } = res.data

    if (status === 200) {
      // 登录成功
      localStorage.setItem('hkzf_token', body.token)

      /* 
        1 登录成功后，判断是否需要跳转到用户想要访问的页面（判断 props.location.state 是否有值）。
        2 如果不需要（没有值），则直接调用 history.go(-1) 返回上一页。
        3 如果需要，就跳转到 from.pathname 指定的页面（推荐使用 replace 方法模式，而不是 push）。
      */
      if (!props.location.state) {
        // 此时，表示是直接进入到了该页面，直接调用 go(-1) 即可
        props.history.go(-1)
      } else {
        // push：[home, login, map]
        // replace: [home, map]
        props.history.replace(props.location.state.from.pathname)
      }
      // 注意：无法在该方法中，通过 this 来获取到路由信息
      // 所以，需要通过 第二个对象参数中获取到 props 来使用 props
      // props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }
})(Login)

// 注意：此处返回的是 高阶组件 包装后的组件
export default Login
