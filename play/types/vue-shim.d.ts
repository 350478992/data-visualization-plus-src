declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // const component: DefineComponent<{}, {}, any>;
  const component: ReturnType<typeof DefineComponent>
  export default component
}

