import React from 'react'
import { Carousel, Flex, Grid } from "antd-mobile";

import axios from 'axios'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import './index.scss'

const navs = [
  {
    id: 1,
    img: Nav1,
    title: 'Full rent',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: 'Shared rent',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: 'Find in map',
    path: '/home/list'
  },
  {
    id: 4,
    img: Nav4,
    title: 'Rent house',
    path: '/map'
  },
]

// const data = Array.from(new Array(4)).map((_val, i) => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`,
// }));

export default class Index extends React.Component {
  state = {
    swipers: [],
    isSwiperLoaded: false,
    groups: []
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  componentDidMount() {
    this.getSwipers()
    this.getGroups()
  }

  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    this.setState({
      swipers: res.data.body,
      isSwiperLoaded: true,
    })
  }

  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      }
    })
    this.setState({
      groups: res.data.body
    })
  }

  renderSwipers() {
    return this.state.swipers.map(item => (
      <a
        key={item.id}
        href="http://incognito.tpddns.cn:666"
        style={{ display: 'inline-block', width: '100%', height: 212 }}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      </a>
    ))
  }

  renderNavs() {
    return navs.map(item => (
      <Flex.Item
        key={item.id}
        onClick={() => this.props.history.push(item.path)}
      >
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ))
  }

  render() {
    return (
      <div className="index">
        <div className="swiper">
          {this.state.isSwiperLoaded ? (
            <Carousel
              autoplay
              infinite
              autoplayInterval={5000}
            >
              {this.renderSwipers()}
            </Carousel>
          ) : ''}
        </div>
        <Flex className="nav">{this.renderNavs()}</Flex>

        <div className="group">
          <h3 className="group-title">
            Rent group <span className="more">More</span>
          </h3>
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
      </div>
    );
  }
}