import { Component, FC } from 'react'
import { View, Button, Text } from '@tarojs/components'
import VirtualList from './virtualList'

import './index.scss'

export type IndexProps = {

}
const Index: FC<IndexProps> = ({}) => {

  const handleTest = () => {
    console.log('sodalog test')

    function tick () {
      console.log('sodalog tick')
    }
    
    // const timeoutID = {
    //   id: requestAnimationFrame(tick)
    // }
    
  }
  return (
    <View className='index'>
        <Button className='add_btn' onClick={handleTest}>test</Button>
        
        <VirtualList />
      </View>
  )
}

export default Index

