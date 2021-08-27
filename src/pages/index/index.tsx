import React, { Component, FC, useState } from 'react'
import { View, Button, Text } from '@tarojs/components'
import VirtualList from './virtualList'

import './index.scss'
import { PropsWithChildren } from 'react'

type RowProps = {
  id: string
}
const Row: React.FC<RowProps> = React.memo((props) => {
  const { id } = props
  return <View id={id}>Row</View>
})

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset)
}

export type IndexProps = {}
const Index: FC<IndexProps> = ({}) => {
  const [data, setData] = useState(buildData(0));
  const itemSize = 100;
  const handleScroll = ({ scrollDirection, scrollOffset }) => {
    console.log('virtual 最外层滚动事件')
  }

  const handleTest = () => {
    function tick() {
    }
  }


  return (
    <View className="index">
      <Button className="add_btn" onClick={handleTest}>
        test
      </Button>

      <VirtualList
        className="list"
        height={500}
        itemData={data}
        itemCount={data.length}
        itemSize={itemSize}
        width="100%"
        onScroll={handleScroll}
      >
        {Row}
      </VirtualList>
    </View>
  )
}

export default Index
