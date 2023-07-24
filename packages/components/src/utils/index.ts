/**
 * 避免多次快速操作，产生无效的操作
 * @param delay
 * @param callback
 * @returns {(function(): void)|*}
 */
export function debounce (delay: number, callback: Function) {
    let task: number
    return function () {
        clearTimeout(task)
        task = setTimeout(() => {
            // @ts-ignore
            callback.apply(this, arguments) // delay时间内，将task放入队列中，delay时间内，只会有一个task
        }, delay)

    }

}
