<template>
  <div>
    <div class="container">
      <svg width="500" height="200" viewBox="0 0 500 200">
        <!--      <rect x="0" y="0" width="100" height="50" fill="red"-->
        <!--            transform="translate(10, 10) rotate(45) skewX(30) skewY(-30) scale(1.5)" />-->

        <!--
          线性代数-矩阵变换
          transform: matrix(a,b,c,d,e,f);
          对应的矩阵：
            a   c   e
            b   d   f
            0   0   1
          matrix的矩阵运算：
            a   c   e    x      ax + cy + e 变换后的X轴坐标
            b   d   f  * y  ->  bx + dy + f 变换后的Y轴坐标
            0   0   1    1      0  + 0  + 1

          可以用它实现元素的位移(translate)、缩放(scale)、旋转(rotate)、扭曲(skew)
            缩放：scale(sx, sy) 等同于 matrix(sx, 0, 0, sy, 0, 0);
            平移：translate(tx, ty) 等同于 matrix(1, 0, 0, 1, tx, ty);
            旋转：rotate(deg) 等同于 matrix(cos(deg), sin(deg), -sin(deg), cos(deg), 0, 0);
            拉伸：skew(degx, degy) 等同于 matrix(1, tan(degy), tan(degx), 1, 0, 0);

          举例：
          [2, -1 50]  => 2*_x + (-1)*_y + 50 = newX
          [1,  2, 0]  => 1*_x + (2)*_y + 0 = newY
          -->
        <rect x="0" y="0" width="100" height="50" fill="red"
              transform="matrix(2 1 -1 2 50 0)" />
      </svg>
    </div>
    <!-- logo描边-->
    <div class="container">
      <svg viewBox="0 0 1024 1024" width="200" height="200">
        <path class="logo" d="M786.731708 648C807.42218 648 824.195121 603.109084 824.195121 547.733333 824.195121 492.357583 807.42218 447.466667 786.731708 447.466667 766.041235 447.466667 749.268292 492.357583 749.268292 547.733333 749.268292 603.109084 766.041235 648 786.731708 648ZM462.048781 698.133333C482.739253 698.133333 499.512194 658.853781 499.512194 610.4 499.512194 561.946217 482.739253 522.666667 462.048781 522.666667 441.358308 522.666667 424.585365 561.946217 424.585365 610.4 424.585365 658.853781 441.358308 698.133333 462.048781 698.133333ZM0 572.8C0 822.813926 229.933961 1024 512 1024 794.066039 1024 1024 822.813926 1024 572.8 1024 322.786074 794.066039 121.599999 512 121.599999 515.649685 121.599999 516.946722 122.183253 516.866057 122.124053 514.736119 120.560928 512.302005 118.428984 505.789668 112.472612 487.675081 95.904489 476.340222 86.603485 458.812092 75.393661 404.94781 40.945655 334.29571 21.333333 237.268292 21.333333 223.474645 21.333333 212.292683 32.556062 212.292683 46.4 212.292683 60.243938 223.474645 71.466667 237.268292 71.466667 325.013274 71.466667 386.336418 88.489363 431.969129 117.673005 444.078925 125.417623 494.717728 171.733333 512 171.733333 767.886246 171.733333 974.048781 352.120043 974.048781 572.8 974.048781 793.479955 767.886246 973.866667 512 973.866667 256.113754 973.866667 49.951219 793.479955 49.951219 572.8 49.951219 427.029845 140.536466 294.462295 284.745583 223.557118 297.132651 217.466607 302.254953 202.450961 296.186566 190.018733 290.11818 177.586505 275.157079 172.445527 262.770012 178.536038 102.138268 257.515945 0 406.990833 0 572.8Z" p-id="2407"></path>
      </svg>
    </div>
    <div class="container">
      <svg class="line-container" viewBox="0 0 400 400" width="400" height="400">
        <line class="line" x1="0" y1="50" x2="400" y2="50"
          stroke-width="20" stroke="red"
        />
      </svg>
    </div>

    <!-- SMIL动画-->
    <div class="container">
      <svg width="200" height="200">
        <rect x="0" y="0" fill="red" width="100" height="50">
          <set attributeName="x" attributeType="XML" to="10" begin="1s"></set>
          <set attributeName="x" attributeType="XML" to="20" begin="2s"></set>
          <set attributeName="fill" attributeType="XML" to="blue" begin="3s"></set>
        </rect>
      </svg>
    </div>
    <div class="container">
      <svg width="200" height="200">
        <circle cx="0" cy="0" r="30" fill="blue" stroke="black" stroke-width="1">
          <animate attributeName="cx" attributeType="XML" from="0" to="100" dur="5s" repeatCount="indefinite" fill="freeze"></animate>
          <animate attributeName="cy" attributeType="XML" from="0" to="100" dur="5s" repeatCount="indefinite" fill="freeze"></animate>
        </circle>
      </svg>
    </div>
    <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="0" y="0" width="10" height="10" fill="red">
          <animateMotion
              path="M 10 10 L 110 10 L 110 110 L 10 110 Z"
              dur="5s"
              rotate="0"
              fill="freeze"
              repeatCount="indefinite"
          />
        </rect>
        <path id="motion-path" d="M 10 10 L 110 10 L 110 110 L 10 110 Z" fill="none" stroke="green" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './style/index.scss'
import {onMounted} from 'vue'
import {defineOptions} from "@vue/runtime-core";

defineOptions({ name: 'SvgAnimation' });

onMounted(() => {
  const logo = document.getElementsByClassName('logo')[0];
  // console.log(logo?.getTotalLength())
})
</script>
