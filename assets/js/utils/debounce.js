export const debounce = (callback, timeout) => {
    let timer
    return (args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(args)
      }, timeout)
    }
  }