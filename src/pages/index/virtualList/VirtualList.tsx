import React from 'react';
import { ITouchEvent, ScrollView, View } from '@tarojs/components';
import FixedSizeList from './FixedSizeList';
import { ReactElement } from 'react';
import { Component } from 'react';

export interface OuterScrollViewRefType extends ReactElement{

}
export interface OuterScrollViewPropsType {
    style: any;
    onScroll: (event: ITouchEvent) => void;
    layout: any;
}
const OuterScrollView = React.forwardRef<OuterScrollViewRefType, OuterScrollViewPropsType>(
    (props, ref) => {
        const { style, onScroll, layout}  = props;
        console.log(`style`, style)
        console.log(`onScroll`, onScroll)
        console.log(`layout`, layout)

        const handleScroll = event => {
            console.log('sodalog handleScroll')
        }

        return React.createElement(ScrollView, {
            ref,
            onScroll: handleScroll,
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
        innerElementType = View,
        itemElementType = View,
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
