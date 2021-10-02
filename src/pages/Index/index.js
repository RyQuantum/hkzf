import React from 'react'
import { Carousel } from "antd-mobile";

export default class Index extends React.Component {
  state = {
    data: ['1', '2', '3'],
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  render() {
    return (
      <div>
        <Carousel
          autoplay
          infinite
          autoplayInterval={5000}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://incognito.tpddns.cn:666"
              style={{ display: 'inline-block', width: '100%', height: 212 }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}