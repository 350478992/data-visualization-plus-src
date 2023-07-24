<template>
  <div class="icon-wrapper" :style="{...style}">
    <svg class="icon">
      <use :href="iconName"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import './style/index.less';
import {computed} from "vue";

defineOptions({ name: 'Icon' });

const props = defineProps({
  name: String,
  prefix: {
    type: String,
    default: 'icon' // iconfont 设置的prefix
  },
  style: Object
})

const iconName = computed(() => `#${props.prefix}${props.name}`)

</script>
