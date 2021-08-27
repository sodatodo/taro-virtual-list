# taro-virtual-list
taro虚拟列表组件
## index.ts
用于导出组件
## VirtualList.tsx
用于组织组件的props 以及设置默认的参数
## FixedSizeList
用于处理组件逻辑方法

## createListComponent.tsc
用于构件组件的整体逻辑流程
该组件的 props 主要来自 VirtualList 和 FixedSizeList
用两个文件来分别处理核心组件的props和中间状态