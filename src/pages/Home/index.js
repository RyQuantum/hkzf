import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

import './index.scss'

import News from '../News'
import Index from '../Index'
import HouseList from '../HouseList'
import Profile from '../Profile'

const tabItems = [
  {
    title: 'Home',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: 'Find',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: 'News',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: 'Profile',
    icon: 'icon-my',
    path: '/home/profile'
  },
]

export default class Home extends React.Component {
  state = {
    selectedTab: this.props.location.pathname,
  };

  renderTabBarItem() {
    return tabItems.map(item => <TabBar.Item
      title={item.title}
      key={item.title}
      icon={<i className={`iconfont ${item.icon}`} />}
      selectedIcon={<i className={`iconfont ${item.icon}`} /> }
      selected={this.state.selectedTab == item.path}
      onPress={() => {
        this.setState({ selectedTab: item.path })
        this.props.history.push(item.path)
      }}
    />)
  }

  render() {
    return (
      <div className="home">
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />
        <div>
          <TabBar
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent
          >
            {this.renderTabBarItem()}
          </TabBar>
        </div>
      </div>
    )
  }
}