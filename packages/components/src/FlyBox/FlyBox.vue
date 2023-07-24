<template>
  <div class="fly-box" ref="flyBoxRef">
    <svg :width="width" :height="height">
      <defs>
        <path :id="pathId"
              :d="path"
              fill="none"></path>
        <radialGradient
          :id="radialGradientId"
          cx="50%" cy="50%"
          fx="100%" fy="50%"
          r="50%"
        >
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <circle :r="starLength" cx="0" cy="0" :fill="`url(#${radialGradientId})`">
            <animateMotion
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>
      </defs>
      <use :href="`#${pathId}`" stroke-width="1" :stroke="lineColor" />
      <use :href="`#${pathId}`" stroke-width="3" :stroke="starColor"
          :mask="`url(#${maskId})`"
      />
    </svg>
    <div class="fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({name: "FlyBox"})
import './style/index.scss'
import {computed, onMounted, ref, getCurrentInstance} from 'vue'
import {v4 as uuidv4} from 'uuid'

const props = defineProps({
  lineColor: {
    type: String,
    default: '#235fa7'
  },
  starColor: {
    type: String,
    default: '#4fd2dd'
  },
  starLength: {
    type: [String, Number],
    default: 50
  },
  duration: {
    type: [String, Number],
    default: 3
  }
})

const uuid = uuidv4();
const width = ref(0);
const height = ref(0);

const flyBoxRef = ref()

const refName = 'flyBox'
const pathId = ref(`${refName}-path-${uuid}`);
const radialGradientId = ref(`${refName}-gradient-${uuid}`);
const maskId = ref(`${refName}-mask-${uuid}`);
const path = computed(() =>
    `M5 5 L${width.value-5} 5 L${width.value-5} ${height.value-5} L5 ${height.value} Z`)

const init = () => {
  const dom: Element = flyBoxRef.value
  width.value = dom.clientWidth
  height.value = dom.clientHeight

}
onMounted(()=>{
  init();
})

</script>

