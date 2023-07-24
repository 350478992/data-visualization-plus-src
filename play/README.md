# 技术栈

Vue 3 + TypeScript + Vite + Pinia Node@18

## VScode 设置

### 插件安装

1. volar（针对 vue3）
2. Vue Volar extension Pack

## devtools 工具安装

将项目目录/doc/devtools/crx 下的文件，拖拽到 Chrome 的拓展程序页面既可完成安装

## 完成功能

### 配置基于 rollup 组件库，使可以在本地实时联调自定义组件

在 rollup 工程中，完成组件库的封装

### 构建设备基础档案的详情页面

1. 加载多个 tab 标签项，每个 tab 下，是一个表单视图配置
2. 根据视图，加载每个视图中的分组的数据，并渲染分组下的表单组件
3. 要封装的组件：
   1. SubFormPanel  根据视图编号，获取字段，并生成表单组件
   2. FormField 根据视图中的字段配置信息，生成具体的表单组件（input、select、radio...）
   3. CdInput
   4. CdButton
   5. CdSelect (完成)
   6. DictRadio (完成)
   7. DictSelect (完成)
   8. DictCheckbox (完成)
   9. DictCascader (完成)
   10. IndustrySelect (完成)
   11. 
   12. CdDatePicker
   13. CdPublicPlace
   14. CdUnitSelect
   15. 等等


### 进展
1. 功能描述：搭建基于vue3的基础档案，用于替代现有的基础档案页面框架，后续通过iframe嵌入，进展
   1. 框架雏形已完成，接下去就是封装一些公共组件，接入视图，生成表单   
   2. 理清大概要完成的组件    
