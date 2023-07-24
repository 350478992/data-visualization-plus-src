import Test from './Test.vue'

export default function (Vue) {
    Vue.component(Test.name, Test)
}

// import {random, a, b} from './plugin'
//
// console.log(random()) // 只用到random，a、b变量会被 tree-shaking，不会打入包中，使最终的包大小减小
//
// export default random

// import * as data from './plugin'
//
// console.log(data.default.random())
//
// export default data.default.random
