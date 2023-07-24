<template>
  <div class="loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
<!--      stroke-dasharray="2*PI*R/4"-->
      <circle
          cx="25" cy="25" r="22"
          fill="none" stroke-width="3" :stroke="outSideColor"
          stroke-dasharray="34"
          stroke-linecap="round"
      >
        <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 25 25;360 25 25"
            :dur="`${+duration}s`"
            repeatCount="indefinite"
        />

<!--        values="0 25 25;360 25 25" => from="0 25 25" to="360 25 25"-->
<!--        <animateTransform-->
<!--            attributeName="transform"-->
<!--            type="rotate"-->
<!--            from="0 25 25"-->
<!--            to="360 25 25"-->
<!--            dur="2s"-->
<!--            repeatCount="indefinite"-->
<!--        />-->
        <animate
          attributeName="stroke"
          :values="inSideColorAnimation"
          :dur="`${+duration*2}s`"  repeatCount="indefinite"
        />
      </circle>
      <circle
          cx="25" cy="25" r="12"
          fill="none" stroke-width="3" :stroke="inSideColor"
          stroke-dasharray="19"
          stroke-linecap="round"
      >
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 25 25"
            to="0 25 25"
            :dur="`${+duration}s`"
            repeatCount="indefinite"
        />
        <animate
            attributeName="stroke"
            :values="outSideColorAnimation"
            :dur="`${+duration*2}s`" repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({name: "Loading"})
import {computed} from 'vue'

const props = defineProps({
  width: {
    type: [Number, String],
    default: 50
  },
  height: {
    type: [Number, String],
    default: 50
  },
  outSideColor: {
    type: [String],
    default: "#3de6cb"
  },
  inSideColor: {
    type: [String],
    default: "#02bcfe"
  },
  duration: {
    type: [Number,String],
    default: 2
  },
})

const outSideColorAnimation = computed(() => `
      ${props.outSideColor};${props.inSideColor};${props.outSideColor};
    `)
const inSideColorAnimation = computed(() => `
      ${props.inSideColor};${props.outSideColor};${props.inSideColor};
    `)
</script>

