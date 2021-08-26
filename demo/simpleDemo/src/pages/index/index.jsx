import React, { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import VirtualList from './virtual-list'
import './index.scss'

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index} : {data[index]}
    </View>
  );
})

function buildData (offset = 0) {
  return Array(100).fill(0).map((_, i) => i + offset);
}

const Index = () => {
  const [data, setData] = useState(buildData(0));
  const [loading, setLoading] = useState(false);

  const listReachBottom = () => {
    setLoading(true)
    Taro.showLoading();
    setTimeout(() => {
      setData(data.concat(buildData(data.length)))
      Taro.nextTick(() => {
        Taro.hideLoading();
        setLoading(false);
      })
    }, 1000)
  }

  const handleScroll = ({ scrollDirection, scrollOffset }) => {
    console.log(`scrollOffset`, scrollOffset)
    const targetSize = (data.length - 5) * itemSize
    console.log(`targetSize`, targetSize)
    if (!loading && scrollDirection === 'forward' && scrollOffset >= targetSize - 20) {
      listReachBottom()
    }
  }
  const itemSize = 100;

  return (
    <VirtualList
      className="List"
      height={500}
      itemData={data}
      itemCount={data.length}
      itemSize={itemSize}
      width="100%"
      onScroll={handleScroll}
    >
      {Row}
    </VirtualList>
  )
}

export default Index;
