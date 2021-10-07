import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{3,12}$/

class Registe extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>Register</NavHeader>
        <WhiteSpace size="xl" />
        <WingBlank>
          <form>
            <div className={styles.formItem}>
              <label className={styles.label}>Username</label>
              <input className={styles.input} placeholder="Please input valid username" />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                placeholder="Please input valid password"
              />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Repeat</label>
              <input
                className={styles.input}
                type="password"
                placeholder="Please input password again"
              />
            </div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                Submit
              </button>
            </div>
          </form>
          <Flex className={styles.backHome} justify="between">
            <Link to="/home">Home</Link>
            <Link to="/login">Already have account? Login here</Link>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Registe
