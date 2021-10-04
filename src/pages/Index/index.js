import React from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import axios from 'axios'

import { getCurrentCity } from '../../utils';

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

export default class Index extends React.Component {
  state = {
    swipers: [],
    isSwiperLoaded: false,
    groups: [],
    news: [],
    curCityName: '',
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  async componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getNews()

    const curCity = await getCurrentCity();
    this.setState({ curCityName: curCity.label })
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

  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    this.setState({ news: res.data.body })
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

  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`http://localhost:8080${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
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
          <Flex className="search-box">
            <Flex className="search">
              <div className="location" onClick={() => this.props.history.push('/citylist')}>
                <span className="name">{this.state.curCityName}</span>
                <i className="iconfont icon-arrow" />
              </div>
              <div className="form" onClick={() => this.props.history.push('/search')}>
                <i className="iconfont icon-search" />
                <span className="text">BLK/BLVD name or address</span>
              </div>
            </Flex>
            <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')} />
          </Flex>
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

        <div className="news">
          <h3 className="group-title">Latest news</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}