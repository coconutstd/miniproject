const $progressBar = document.querySelector('.progress-bar')

let timerId = null;

const throttle = (callback, time) => {
  if (timerId) return
  timerId = setTimeout(() => {
    callback()
    timerId= null
  }, time)
}

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  const height = scrollHeight - clientHeight
  const scrollWidth = (scrollTop / height) * 100
  $progressBar.style.width = scrollWidth + '%'
}

window.addEventListener('scroll', () => throttle(onScroll, 100));