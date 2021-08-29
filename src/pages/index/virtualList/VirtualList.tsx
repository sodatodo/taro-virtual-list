import React, { ReactElement, Component } from 'react';
import { ITouchEvent, ScrollView, View } from '@tarojs/components';
import classNames from 'classnames'
import { convertPxToInt } from './utils';
import FixedSizeList from './FixedSizeList';
import ListItem from './ItemElement';

export interface OuterScrollViewRefType extends ReactElement{

}
export interface OuterScrollViewPropsType {
    style: any;
    onScroll: (event: ITouchEvent) => void;
    layout: any;
}
const OuterScrollView = React.forwardRef<OuterScrollViewRefType, OuterScrollViewPropsType>(
    (props, ref) => {
        const { style, onScroll, layout, ...rest}  = props;

        const handleScroll = event => {
            onScroll({
                ...event,
                currentTarget: {
                    ...event.detail,
                    clientWidth: convertPxToInt(style.width),
                    clientHeight: convertPxToInt(style.height)
                }
            })
        }

        return React.createElement(ScrollView, {
            ref,
            onScroll: handleScroll,
            style,
            scrollY: true,
            ...rest
        })
    }
)

export interface ItemElementRefType {}
export interface ItemElementPropsType {
    className?: string;
    listIndex?: number;
}
const ItemElement = React.forwardRef<ItemElementRefType, ItemElementPropsType>(
    (props, ref) => {
        const { className, listIndex } = props;
        const name = classNames(className, 'item-element', `virtual-item-${listIndex}`);
        return React.createElement(ListItem, {
            ref,
            className: name,
            listIndex,
            ...props
        })
    }
)
export interface InnerElementRefType {}
export interface InnerElementPropsType {
    className?: string;
}
const InnerElement = React.forwardRef<InnerElementRefType, InnerElementPropsType>(
    (props, ref) => {
        const { className } = props;
        const name = classNames('inner-element', className)
        return React.createElement(View, {
            ref,
            className: name,
            ...props
        })
    }
)

export interface VirtualListRefType extends ReactElement {}
export interface VirtualListPropsType {
    className?: string;
    height: number;
    itemData: any[];
    itemCount: number;
    itemSize: number;
    width: string;
    onScroll: any;
    children: any;
    direction?: string;
    innerElementType?: Component;
    itemElementType?: Component;
    initialScrollOffset?: number;
    overscanCount?: number;
}
const VirtualList = React.forwardRef<VirtualListRefType, VirtualListPropsType>((props, ref) => {
    const { 
        direction = 'ltr',
        innerElementType = InnerElement,
        itemElementType = ItemElement,
        initialScrollOffset = 0,
        overscanCount = 1,
        ...rest
     } = props;

    return React.createElement(FixedSizeList, {
        ref,
        outerElementType: OuterScrollView,
        innerElementType,
        itemElementType,
        direction,
        initialScrollOffset,
        overscanCount,
        ...rest,
    })
})

export default VirtualList;
