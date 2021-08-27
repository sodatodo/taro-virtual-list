import { CSSProperties } from 'react'
import { View } from '@tarojs/components';
import { Component, createElement, PureComponent } from 'react'
import { memoizeOne } from './memoize'
import { isHorizontalFunc, isRtlFunc } from './utils'

let INSTANCE_ID = 0

export type createListComponentParams = {}

export interface IListProps {
  className: string
  initialScrollOffset?: number
  itemElementType: React.FunctionComponent<any>
  outerElementType: React.FunctionComponent<any>
  innerElementType: React.FunctionComponent<any>
  children: React.FunctionComponent<any>
  direction?: string
  layout?: string
  itemCount: number
  overscanCount: number
  itemKey: (any) => string | number
  itemData: any[]
  position: string
  itemSize: number
  useIsScrolling: boolean
  width: number | string
  height: number | string
  style?: CSSProperties
}
export interface IListState {
  id: string
  instance: PureComponent<IListProps, IListState>
  isScrolling: boolean
  scrollDirection: 'forward' | 'backward'
  scrollOffset: number
  scrollUpdateWasRequested: boolean
  sizeList: any[]
}

const defaultItemKey = (index, itemData: any[]) => itemData[index]
export default function createListComponent({
  validateProps,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  shouldResetStyleCacheOnItemSizeChange,
  getItemOffset,
  getItemSize,
  getEstimatedTotalSize,
}) {
  let _class, _temp

  return (
    (_temp = _class = class List extends PureComponent<IListProps, IListState> {
      private _instanceProps: undefined
      private _outerRef: undefined
      private _resetIsScrollingTimeoutId: null
      field: {
        scrollLeft: number
        scrollTop: number
        scrollHeight: number
        scrollWidth: number
        clientHeight: number
        clientWidth: number
      }

      // 从props中获取state
      static getDerivedStateFromProps(nextProps, prevState) {
        validateProps(nextProps, prevState)
        return null
      }

      constructor(props) {
        super(props)
        this._instanceProps = void 0
        this._outerRef = void 0
        this._resetIsScrollingTimeoutId = null

        this.state = {
          id: props.id || `virtual-list-${INSTANCE_ID++}`,
          instance: this,
          isScrolling: false,
          scrollDirection: 'forward',
          scrollOffset:
            typeof this.props.initialScrollOffset === 'number'
              ? this.props.initialScrollOffset
              : 0,
          scrollUpdateWasRequested: false,
          sizeList: [],
        }

        this.field = {
          scrollLeft: 0,
          scrollTop: 0,
          scrollHeight: 0,
          scrollWidth: 0,
          clientHeight: 0,
          clientWidth: 0,
        }
      }

      _onScrollVertical = (event) => {
        console.log('sodalog onScroll')
      }
      _onScrollHorizontal = (event) => {}

      _getItemStyleCache = memoizeOne(() => ({}))

      _getItemStyle = (index) => {
        const { direction, itemSize, layout } = this.props

        // 使用缓存存储上次的style数据 更新的时候只更新位置
        const itemStyleCache = this._getItemStyleCache(
          shouldResetStyleCacheOnItemSizeChange && itemSize,
          shouldResetStyleCacheOnItemSizeChange && layout,
          shouldResetStyleCacheOnItemSizeChange && direction,
        )

        let style

        const offset = getItemOffset(this.props, index, this)
        const size = getItemSize(this.props, index, this)
        const isHorizontal = isHorizontalFunc(direction, layout)
        const isRtl = isRtlFunc(direction)

        if (itemStyleCache.hasOwnProperty(index)) {
          style = itemStyleCache[index]
          if (isHorizontal) {
            style.width = size
            if (isRtl) {
              style.right = offset
            } else {
              style.left = offset
            }
          } else {
            style.height = size
            style.top = offset
          }
        } else {
          const offsetHorizontal = isHorizontal ? offset : 0
          itemStyleCache[index] = style = {
            position: 'absolute',
            left: !isRtl ? offsetHorizontal : undefined,
            right: isRtl ? offsetHorizontal : undefined,
            top: !isHorizontal ? offset : 0,
            height: !isHorizontal ? size : '100%',
            width: isHorizontal ? size : '100%',
          }
        }

        return style
      }

      _getSizeCount = (props, offset) => {
        if (offset === 0) {
          return 0
        }
        const { unlimitedSize } = props
        if (!unlimitedSize) {
          return Math.min(
            props.itemCount - 1,
            Math.floor(offset / props.itemSize),
          )
        }
      }

      _getCountSize = (props, count) => {
        if (!props.unlimitedSize) {
          return props.itemSize * count
        }
      }

      _getStyleValue = (value) => {
        return typeof value === 'number'
          ? `${value}px`
          : value == null
          ? ''
          : value
      }

      _getRangeToRender = () => {
        const { itemCount, overscanCount } = this.props
        const { isScrolling, scrollDirection, scrollOffset } = this.state

        if (itemCount === 0) {
          return [0, 0, 0, 0]
        }

        const startIndex = getStartIndexForOffset(
          this.props,
          scrollOffset,
          this,
        )
        const stopIndex = getStopIndexForStartIndex(
          this.props,
          scrollOffset,
          startIndex,
          this,
        )
        const overscanBackward =
          !isScrolling || scrollDirection === 'backward'
            ? Math.max(1, overscanCount)
            : 1
        const overscanForward =
          !isScrolling || scrollDirection === 'forward'
            ? Math.max(1, overscanCount)
            : 1
        return [
          Math.max(0, startIndex - overscanBackward),
          Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
          startIndex,
          stopIndex,
        ]
      }

      render() {
        const {
          className,
          outerElementType,
          innerElementType,
          itemElementType,
          direction,
          layout,
          itemCount,
          itemData,
          itemKey = defaultItemKey,
          position,
          children,
          useIsScrolling,
          height,
          width,
          style,
          ...rest
        } = this.props

        const { id, isScrolling } = this.state
        const isHorizontal = isHorizontalFunc(direction, layout)

        const onScroll = isHorizontal
          ? this._onScrollHorizontal
          : this._onScrollVertical
        const [startIndex, stopIndex] = this._getRangeToRender()

        const items: any = []

        if (itemCount > 0) {
          for (let index = startIndex; index <= stopIndex; index++) {
            const key: number | string = itemKey(index, itemData)
            let style: CSSProperties | undefined
            if (position === 'relative') {
              console.log('sodalog position function')
            } else {
              style = this._getItemStyle(index)
            }
            items.push(
              createElement(
                itemElementType,
                { key, style },
                createElement(children, {
                  id: `${id}-${index}`,
                  data: itemData,
                  index,
                  isScrolling: useIsScrolling ? isScrolling : undefined,
                }),
              ),
            )
          }
        }

        const estimatedTotalSize = getEstimatedTotalSize(this.props, this)
        console.log(`estimatedTotalSize`, estimatedTotalSize)

        const outerElementProps = {
          ...rest,
          id,
          className,
          onScroll,
          layout,
          style: {
            position: 'relative',
            height: this._getStyleValue(height),
            width: this._getStyleValue(width),
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform',
            direction,
            ...style,
          },
        }

        console.log(`outerElementProps`, outerElementProps)
        // return createElement(View, { id: 'soda' }, 'hello world')
        return createElement(outerElementType, outerElementProps, 
            createElement(innerElementType, {
                key: `${id}-inner`,
                id: `${id}-inner`,
                style: {
                    height: this._getStyleValue(isHorizontal ? '100%' : estimatedTotalSize),
                    PointerEvent: isScrolling ? 'none' : 'auto',
                    width: this._getStyleValue(isHorizontal ? estimatedTotalSize : '100%')
                }
            }, items)    
        )
      }
    }),
    (_class.defaultProps = {
      direction: 'ltr',
      itemData: undefined,
      layout: 'vertical',
      overscanCount: 2,
      useIsScrolling: false,
    }),
    _temp
  )
}
