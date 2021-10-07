import React from 'react'

import styles from './index.module.css'
import NavHeader from '../../components/NavHeader'

export default class Map extends React.Component {

  componentDidMount() {
    const map = new window.BMap.Map('container')
    const point = new window.BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  }

  render() {
    return (
      <div className={styles.map}>
        <NavHeader>Map</NavHeader>
        <div id="container" className={styles.container} />
      </div>
    )
  }
}