import * as components from './index';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Icon: typeof components.Icon;
    ProgressBar: typeof components.ProgressBar;
    SvgAnimation: typeof components.SvgAnimation;
    SvgLogo: typeof components.SvgLogo;
    FlyBox: typeof components.FlyBox;
    Loading: typeof components.Loading;
    Container: typeof components.Container;
  }
}

export {};
