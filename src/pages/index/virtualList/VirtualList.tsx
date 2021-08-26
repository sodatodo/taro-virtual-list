import { View } from '@tarojs/components';
import React from 'react';

const VirtualList = React.forwardRef((props, ref) => {
    const { children } = props;
    return React.createElement(View, {
    }, 'Hello world')
})

export default VirtualList;
