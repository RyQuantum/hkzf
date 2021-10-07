import React from 'react'
import axios from 'axios'
import { Flex, WingBlank } from 'antd-mobile'

export default class News extends React.Component {
  state = {
    news: [],
  }

  componentDidMount() {
    this.getNews()
  }

  async getNews() {
    const res = await axios.get(
      'http://incognito.tpddns.cn:8081/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    this.setState({
      news: res.data.body
    })
  }

  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://incognito.tpddns.cn:8081${item.imgSrc}`}
            alt=""
          />
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
      <div className="news">
        <h3 className="group-title">News</h3>
        <WingBlank size="md">{this.renderNews()}</WingBlank>
      </div>
    )
  }
}
