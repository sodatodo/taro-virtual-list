import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import createListComponent, {
  IListProps,
  IListState,
} from './createListComponent'
import { isHorizontalFunc } from './utils'

const validateProps = (nextProps: IListProps, prevState: IListState) => {
  console.log('sodalog validate props', nextProps)
}

const getStartIndexForOffset = (props, scrollOffset, ref) => {
  return Math.max(0, ref._getSizeCount(props, scrollOffset) - 1)
}
const getStopIndexForStartIndex = (props, scrollOffset, startIndex, ref) => {
  const {
    height,
    itemCount,
    itemSize,
    width,
    direction,
    layout,
    unlimitedSize,
  } = props
  const size = isHorizontalFunc(direction, layout) ? width : height
  const offset = ref._getCountSize(props, startIndex)

  if (!unlimitedSize) {
    // TODO Deprecate direction "horizontal"
    const numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize)
    /** -1 is because stop index is inclusive */
    return Math.max(
      startIndex,
      Math.min(itemCount - 1, startIndex + numVisibleItems - 1),
    )
  }
  return Math.max(
    startIndex,
    Math.min(itemCount - 1, ref._getSizeCount(props, size + scrollOffset)),
  )
}

const getItemOffset = (props, index, ref) => {
  if (!props.unlimitedSize) {
    return index * props.itemSize
  }
  return ref._getCountSize(props, index)
}
const getItemSize = (props, index, ref) => {
    return props.itemSize;
}

const getEstimatedTotalSize = (props, ref) => {
    return ref._getCountSize(props, props.itemCount);
}

const FixedSizeList = createListComponent({
  validateProps,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  shouldResetStyleCacheOnItemSizeChange: true,
  getItemOffset,
  getItemSize,
  getEstimatedTotalSize
})

export default FixedSizeList
