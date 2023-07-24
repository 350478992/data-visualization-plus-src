<template>

  <!--  1.突破Chrome的font-size:12px问题-->
  <!--  2.固定页面宽高比，放大页面后，字体大小不变,一屏之中，要把所有数据全部展示出来-->

  <div id="container" ref="containerRef">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineOptions({name: "Container"})
import {ref, onMounted, onUnmounted, nextTick, PropType} from 'vue';
import {debounce} from "../utils";

const props = defineProps({
  options: {
    type: Object as PropType<Option>,
    default: () => {}
  }
})

const containerRef = ref()
const width = ref(0)
const height = ref(0)
const originalWidth = ref(0) // 视口宽
const originalHeight = ref(0) // 视口高
const ready = ref(false) // 页面是否dom加载完成

const initSize = () => {
  // 因为使用了nextTick后，在initSize之后,还要执行updateScale，可能会产生冲突，
  // 因此返回Promise（将回调方法，变成同步方法，保证initSize执行完后，再执行updateScale）
  return new Promise((resolve) => {
    // 保证执行逻辑，在dom渲染更新之后
    nextTick(() => {
      // 获取大屏的真实宽高
      if (props.options?.width && props.options?.height) {
        width.value = props.options.width;
        height.value = props.options.height;
      } else {
        width.value = containerRef.value.clientWidth;
        height.value = containerRef.value.clientHeight;
      }

      if (!originalWidth.value && !originalHeight.value) {
        // 获取画布的宽高
        originalWidth.value = window.screen.width;
        originalHeight.value = window.screen.height;
      }
      console.log(width.value, height.value, originalWidth.value, originalHeight.value)

      resolve(true);
    })
  })
}

const updateSize = () => {
  const dom = containerRef.value
  if (width.value && height.value) {
    // 传递的宽高
    dom.style.width =`${width.value}px`
    dom.style.height =`${height.value}px`
  } else {
    // 画布的宽高
    dom.style.width =`${originalWidth.value}px`
    dom.style.height =`${originalHeight.value}px`
  }
}

const updatScale = () => {
  // 获取当前视口实际显示的宽高
  const currentWidth = document.body.clientWidth;
  const currentHeight = document.body.clientHeight;
  // 获取大屏最终的宽高
  const realWidth = width.value || originalWidth.value
  const realHeight = height.value || originalHeight.value

  // 设置宽高比，突破Chrome浏览器的font-size:12px
  const widthScale = currentWidth/realWidth;
  const heightScale = currentHeight/realHeight;
  containerRef.value.style.transform = `scale(${widthScale}, ${heightScale})`
}


const onResize = () => {
  debounce(1000, async function () {
    console.log('onResize...')
    await initSize()
    updatScale()
  })()
}

onMounted( async () => {
  ready.value = false
  await initSize();
  updateSize()
  updatScale()
  // 2.固定页面宽高比，放到页面后，字体大小不变,一屏之中，要把所有数据全部展示出来
  window.addEventListener('resize', onResize)
  ready.value = true
})
onUnmounted(()=>{
  window.removeEventListener('remove', onResize)
})

</script>

