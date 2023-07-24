<template>
  <div class="container">
    <svg width="50" height="50" viewBox="0 0 400 400 ">
<!--      fill="transparent" 或者 fill="none"-->
<!--      周长=2*PI*R=2*3.1415926*80=-->
      <circle cx="100" cy="100" r="80"
          stroke-width="30" stroke="#d1d3d7" fill="none"/>
      <circle cx="100" cy="100" r="80"
          stroke-width="30" stroke="#00a5e0" fill="none"
          transform="matrix(0,-1,1,0,0,200)"
          class="circle"
      />
<!--      matrix的矩阵运算：-->
<!--      a   c   e    x      ax + cy + e 变换后的X轴坐标-->
<!--      b   d   f  * y  ->  bx + dy + f 变换后的Y轴坐标-->
<!--      0   0   1    1      0  + 0  + 1-->
    </svg>
  </div>

<!--  <div class="container">-->
<!--    <svg width="200" height="200" viewBox="0 0 200 200">-->
<!--      <rect x="0" y="0" width="200" height="200" fill="none" stroke="grey" stroke-width="8"></rect>-->
<!--      <rect x="0" y="0" width="200" height="200" fill="none" stroke="blue" stroke-width="8" class="rect-process" transform="matrix(0,1,-1,0,200,0)"></rect>-->
<!--    </svg>-->
<!--  </div>-->
</template>

<script lang="ts" setup>
defineOptions({name: 'ProgressBar'})
import './style/index.scss'
</script>

