
// const a = 1;
// const b = 2;
// function random() {
//     console.log('random')
// }
//
// export default { //这种方式容易使包大小变大，无法实现tree-shaking
//     a,b,random
// }

export const a = 1;
export const b = 2;
export function random() {
    console.log('random')
}

export default {
    a,b,random
}
