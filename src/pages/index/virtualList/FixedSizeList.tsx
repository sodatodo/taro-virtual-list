import React from "react";
import { ScrollView, View } from '@tarojs/components';
import createListComponent from "./createListComponent";

const OuterScrollView = React.forwardRef<any, any>(
    (props, ref) => {
        const { style, onScroll, onScrollNative, layout, ...rest } = props;
        const handleScroll = event => {

        }
        return React.createElement(ScrollView, {
            ref,
            style,
            scrollY: layout === 'vertical',
            scrollX: layout === 'horizontal',
            onScroll: handleScroll,
            ...rest
        })
    }
)

const FixedSizeList = 
    createListComponent({
        initInstanceProps() {},
    })