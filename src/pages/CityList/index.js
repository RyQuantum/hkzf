import React from 'react'
import { Toast } from 'antd-mobile';
import axios from 'axios'
import { List, AutoSizer } from 'react-virtualized'

import './index.scss'
import { getCurrentCity } from '../../utils'
import NavHeader from '../../components/NavHeader'

const TITLE_HEIGHT = 36
const NAME_HEIGHT = 50
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

const formatCityData = list => {
  const cityList = {}
  list.forEach(item => {
    const first = item.short.substr(0, 1)
    if (cityList[first]) {
      cityList[first].push(item)
    } else {
      cityList[first] = [item]
    }
  })
  const cityIndex = Object.keys(cityList).sort()
  return { cityList, cityIndex }
}

const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return 'Current location'
    case 'hot':
      return 'hot city'
    default:
      return letter.toUpperCase()
  }
}
export default class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: {},
      cityIndex: [],
      activeIndex: 0,
    }
    this.cityListComponent = React.createRef()
  }

  async componentDidMount() {
    await this.getCityList()
    this.cityListComponent.current.measureAllRows()
  }

  async getCityList() {
    const res = await axios.get(`http://localhost:8080/area/city?level=1`)
    const { cityList, cityIndex } = formatCityData(res.data.body)
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    cityList['hot'] = hotRes.data.body
    cityIndex.unshift('hot')

    const curCity = await getCurrentCity()

    cityList['#'] = [curCity]
    cityIndex.unshift('#')
    this.setState({ cityList, cityIndex })
  }

  changeCity = ({ label, value }) => {
    if (HOUSE_CITY.includes(label)) {
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      this.props.history.go(-1)
    } else {
      Toast.info('No tenancy info of the city currently', 2, null, false)
    }
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { cityIndex, cityList } = this.state;
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
          {cityList[letter].map(item => (
          <div className="name" key={item.value} onClick={() => this.changeCity(item)}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  getRowHeight = ({ index }) => {
    const { cityList, cityIndex } = this.state;
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  renderCityIndex = () => {
    const { cityIndex, activeIndex } = this.state;
    return cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          this.cityListComponent.current.scrollToRow(index)
        }}
      >
        <span className={activeIndex === index ? 'index-active' : ''}>{item.toUpperCase()}</span>
      </li>)
    )
  }

  onRowsRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({ activeIndex: startIndex})
    }
  }

  render() {
    return (
      <div className="citylist">
        <NavHeader>Cities</NavHeader>
        <AutoSizer>
          {
            ({ width, height }) => (
              <List
                ref={this.cityListComponent}
                width={width}
                height={height}
                rowCount={this.state.cityIndex.length}
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
                scrollToAlignment="start"
              />)
          }
        </AutoSizer>
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
}