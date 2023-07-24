<template>
<!--  <TestComponent />-->
<!--  <Icon name="more" prefix="" style="color: green"/>-->

<!--  <SvgAnimation />-->

<!--  <ProgressBar />-->
<!--  <SvgLogo />-->
<!--  <FlyBox />-->
  <Loading />
<!--  <Container />-->
  <router-view />
</template>

<script setup lang="ts">
import TestComponent from '@/components/Test/Test.vue'
import {Icon, SvgAnimation, SvgLogo, ProgressBar, FlyBox, Loading, Container} from '@moniya/dataVisual'
</script>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
  }
  html,
  body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
