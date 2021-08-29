import { FC, useEffect } from "react";
import classNames from 'classNames';
import { View } from '@tarojs/components';
import { createSelectorQuery, nextTick } from "@tarojs/taro";

export type ItemElementProps = {
    ref?: any;
    listIndex?: number;
    className?: string;
}
const ItemElement: FC<ItemElementProps> = (props) => {
    useEffect(() => {
        const query = createSelectorQuery();
        const { listIndex } = props;
        nextTick(() => {
            query.select(`.virtual-item-${listIndex}`).boundingClientRect((rect => {
                console.log(`sodalog rect ${listIndex}`, rect);
            })).exec();
        })
    }, [])
    // const name = classNames(`virtual-item-${listItem}`, className)
    return (
        <View {...props} >ItemElement</View>
    )
}

export default ItemElement;
