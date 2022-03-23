
// 쓰로틀

const $progressBar = document.querySelector('.progress-bar')

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  const height = scrollHeight - clientHeight
  const scrollWidth = (scrollTop / height) * 100
  $progressBar.style.width = scrollWidth + '%'
}

window.addEventListener('scroll', onScroll);