<template>
  <div class="test">
    <pre>
      viewBox一定要指定，因为它是固定值
      viewPort会动态的变化，收到外部元素的影响
      svg的大小，在viewPort和viewBox之间缩放1
      svg内的元素的宽高：
        (viewPort宽/viewBox宽)*宽
        (viewPort高/viewBox高)*高
      preserveAspectRatio：XMidYMid meet
        九种对齐方式：
          x轴：左中右
          y轴：山中下
        三种缩放策略--宽高比(参考：https://zhuanlan.zhihu.com/p/460941930)
          meet: 即尽量符合，在viewBox图像能完全显示的情况下，尽量放大它。
          slice: 即viewport不留有任何空白，可以接受viewBox图像放大后，被切掉一部分
          none: 表示不保持长宽比，直接缩放viewBox和viewport保持一样大小
    </pre>
    <svg width="500" height="200" viewBox="0 0 50 20" style="border: 1px solid red">
      <rect x="20" y="10" width="10" height="5" style="stroke:#000000;fill: none;"/>
    </svg>
<!--    使用<g></g> 需要在svg外层使用时候，指定viewBox-->
<!--    <svg width="0" height="0">-->
<!--      <defs>-->
<!--        <g id="more">-->
<!--          <circle r="5" cx="20" cy="25" fill="currentColor"/>-->
<!--          <circle r="5" cx="20" cy="50" fill="currentColor"/>-->
<!--          <circle r="5" cx="20" cy="75" fill="currentColor"/>-->
<!--          <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor" />-->
<!--          <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor" />-->
<!--          <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor" />-->
<!--        </g>-->
<!--      </defs>-->
<!--    </svg>-->
<!--    使用<symbol></symbol> 可以直接指定viewBox-->
    <svg width="0" height="0">
      <defs>
        <symbol id="more" viewBox="0 0 100 100">
          <circle r="5" cx="20" cy="25" fill="currentColor"/>
          <circle r="5" cx="20" cy="50" fill="currentColor"/>
          <circle r="5" cx="20" cy="75" fill="currentColor"/>
          <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor" />
          <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor" />
          <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor" />
        </symbol>
        <symbol id="filledArrowRight" viewBox="0 0 100 100">
          <polyline points="20 10, 80 50, 20 90" fill="currentColor"></polyline>
        </symbol>
        <symbol id="arrowRight" viewBox="0 0 100 100">
          <polyline points="30 20, 70 50, 30 80" fill="transparent"
                    stroke="currentColor"
                    stroke-width="3"
          />
        </symbol>
      </defs>
    </svg>




  </div>
</template>

<script>
  export default {
    name: 'test-component',
    setup() {
      return {
        msg: 'hello world!'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
