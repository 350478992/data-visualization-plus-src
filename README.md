## UI 文档

https://350478992.github.io/shadowWindDoc

## 组件编写规范

1. 组件在 packages/components/src 下进行编写
2. 样式单独写一个文件里，方便后续打包进行按需加载设置
3. 示例，新建一个 button 组件，目录结构如下：

```
  -button
    -index.ts     用于导出buton
    -button.vue   组件业务逻辑
    -style
      -index.less 组件样式(这个目录每个组件必须要创建，否则，编译时候会异常，不会生成相应的组件文件夹)
```

button/button.vue

```
<template>
  <button class="cd-button" :class="buttonStyle"><slot /></button>
</template>

<script lang="ts" setup>
  import './style/index.less';
  import { computed } from 'vue';
  // 组件命名-每个组件都需要有一个唯一的名字，方便后续使用vue插件进行问题分析和typescript的语法提示
  defineOptions({ name: 'cd-button' });
  type ButtonProps = {
    type?: string;
  };
  const buttonProps = defineProps<ButtonProps>();

  const buttonStyle = computed(() => {
    return { [`cd-button--${buttonProps.type}`]: buttonProps.type };
  });
</script>

```

button/index.ts

```
  import _Button from './button.vue';
  import { withInstall } from '@moniya/utils'; // 固定格式，方便后续组件的全局挂载
  export const Button = withInstall(_Button);
  export default Button;
```

## 打包说明

1. 使用 gulp 将 less、vue 组件分开打包，因为 vite 的打包会将所有样式打包到同一个 style 中，不能按需加载
2. 打包脚本在 packages/components/script 下,script 下的文件目录说明

```
  script/utils:
    paths.ts: 存放打包所需要的路径的配置信息，若工程文件有迁移，需要进行修改
    delpath.ts: 删除文件夹,打包前需要将之前的打包文件删除，但是需要过滤掉打包目录下的 package.json 和 README.md 文件，因为后续发布到 npmjs.org 还需要这些文件的配置
    run.ts: 打包函数，因为需要再根目录直接就可以进行打包，而不需要切换到 packages/components 目录下，再去执行打包命令,所以要单独写一个打包的函数，指定要打包的组件路径
  script/build
    HttpRequest.ts: 提供给 gulp 的脚本，就是调用 utils 下的一些方法
  script/publish: 自动化发布到 github 的方法
```

3. 打包指令配置在根目录下的 package.json

```
 "cd:install": "pnpm i && pnpm run cd:build", // 初次下载安装，运行这个
 "cd:build": "gulp -f packages/components/script/build/index.ts & pnpm run --filter ./packages/utils build",
 "cd:publish": "gulp -f packages/components/script/publish/index.ts", // 发布到npmjs仓库
 "cd:dev": "pnpm run --filter ./play dev", // 运行示例业务工程
```

## 测试组件

1. 可以直接在 play 项目中进行引入测试，需要引入@moniya/data-visualization-plus 组件，进入 play 目录，执行：
   `pnpm add @moniya/data-visualization-plus`
2. 导入组件

全局引入，在 play/main.ts 中引入

```
  import { createApp } from 'vue';
  import App from './App.vue';
  import chuangda from '@moniya/data-visualization-plus';
  const app = createApp(App);
  app.use(chuangda);
  app.mount('#app');
```

局部引入：

`import {CdButton} from '@moniya/data-visualization-plus'`

## 组件测试

1. 使用前端测试框架 Vitest
2. 测试指令配置在 packages/components/package.json 中
   `"coverage": "vitest run --coverage"`
3. Vitest 默认会执行**/\*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}的文件,这里我们的测试文件统一命名为**/\*.{test}.ts 的形式并放在每个组件的**tests**目录下
4. 如 button 组件目录下新建

```
cd button
mkdir __tests__
cd __tests__
touch button.test.ts
```

button.test.ts

```
import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import button from '../button.vue';
// The component to test
describe('test button', () => {
  it('should render slot', () => {
    const wrapper = mount(button, {
      slots: {
        default: 'easyest'
      }
    });

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('easyest');
  });
});
```

5. 在 button.test.ts 中就可以编写这个组件的输入输出的元素校验逻辑，达到测试的目的，防止修改组件后徐建出现异常
6. 执行 pnpm run coverage 可以看到我们测试覆盖情况，其中它们每个字段代表的含义如下

```
%stmts 是语句覆盖率（statement coverage）：是不是每个语句都执行了？

%Branch 分支覆盖率（branch coverage）：是不是每个 if 代码块都执行了？

%Funcs 函数覆盖率（function coverage）：是不是每个函数都调用了？

%Lines 行覆盖率（line coverage）：是不是每一行都执行了？
```

## 使用 VitePress 大件部署组件库文档

当我们组件库完成的时候,一个详细的使用文档是必不可少的。本篇文章将介绍如何使用 VitePress 快速搭建一个组件库文档站点并部署到 GitHub 上

1. 新建 site 文件夹,并执行 pnpm init,然后安装 vitepress 和 vue
   `pnpm install -D vitepress vue`
2. 安装完成之后,新建 docs/index.md 文件
   `# Hello Easyest`
3. 然后 package.json 中新增 scripts 命令

```
"scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
```

4. 执行 pnpm run docs:dev, 即可看到基本的文档结构
5. 导航栏配置，在 docs/.vitepress 目录下新建 config.js

```
export default {
  base: process.env.NODE_ENV === 'production' ? '/shadowWindDoc/' : '/',
  themeConfig: {
    siteTitle: '创达UI',
    nav: [
      { text: '指南', link: '/guide/installation/' },
      { text: '组件', link: '/components/button/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guide/installation',
            },
            {
              text: '快速开始',
              link: '/guide/quickstart',
            },
          ],
        },
        {
          text: '进阶',
          items: [
            {
              text: 'xx',
              link: '/xx',
            },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button',
              link: '/components/button',
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/350478992/chuangda-ui-doc.git' }],
  },
}
```

6. 在 pnpm-workspace.yaml 中新增 site 目录

```
packages:
  - "packages/**"
  - "play"
  - "site"
```

7. 引入组件依赖
   `pnpm add @moniya/data-visualization-plus`
8. 添加说明文档，在 docs 中新建 components/button/index.md,其他组件的说明文档以此类推，然后路径配置到 config.js 中

   ````

   ## Button 按钮

   <cd-button>default</cd-button>
   <cd-button type="primary">primary</cd-button>

   ::: details 显示代码

   ```html
   <cd-button>默认按钮</cd-button>

   <cd-button type="primary">默认按钮</cd-button>
   ```

   :::
   ````

9. 部署静态站点,将文档部署到 github 的站点中

## 自动发布到 npmjs 和 github 中，使用 release-it

### 参考文章

Vite+TypeScript 从零搭建 Vue3 组件库：https://juejin.cn/column/7118932817119019015

## 组件清单

### 基础组件（basic）

`CdButton`: 普通按钮
`CdIconButton`: 图标文本按钮(与 CdButton 合并)
`CdMoreButton`: 更多按钮组
`CdInput`: 文本输入框
`CdInputPoptip`: 气泡文本输入框(与 CdInput 合并)
`CdSelect`: 下拉框
`CdRadio`: 单选框（不封装）
`CdRadioGroup`: 单选框组
`CdCheckbox`: 多选框（不封装）
`CdCheckboxGroup`: 多选框组
`CdDatePicker`: 日期选择
`CdDatePickerRange`: 日期范围选择
`CdCascader`: 级联选择
`CdModal`: 拟态弹窗
`CdLoading`: 加载组件

### 业务组件(bussiness)

`CdQrcode`: 二维码生成
`CdAttachment`: 附件上传（待拆分）
`CdPersonSelect`: 人员选择
`CdPersonSelectSimple`: 精简版人员选择
`CdPublicPlace`: 公共聚集场所
`CdEchart`: 图表（待拆分）
`CdCircleProgress`: 圆形进度条
`CdEditor`: 富文本框
`CdEquipSelectList`: 设备选择列表
`CdFieldSelect`: 字段选择器
`CdFlow`: 流程组件（待拆分）
`CdImportExecl`: 窗口式 Execl 导入
`CdLoginForm`: 登录表单
`CdWebview`: 外部链接 iframe 容器
`CdMap`: 地图
`CdBtnPermission`: 权限按钮容器
`CdListPanel`: 列表面板组件
`CdListPanelSimple`: 精简列表面板组件
`CdFormPanel`: 表单面板组件
`CdFormField`: 表单元素组件
`CdUserOpera`: 用户操作组件

### 布局组件

`CdParentView`: 路由容器
`CdContentTags`: 菜单标签
`CdSider`: 侧边栏
`CdHeader`: 头部
`CdMain`: 主容器
``
