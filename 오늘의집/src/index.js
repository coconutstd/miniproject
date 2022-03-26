const $sideBarToggleButton = document.querySelector('.side-bar-toggle')
const $sideBar = document.querySelector('.side-bar')
const $backDrop = document.querySelector('.back-drop')

$sideBarToggleButton.addEventListener('click', () => {
  $sideBar.classList.toggle('open')
  $backDrop.style.display = "block"
})

$backDrop.addEventListener('click', () => {
  $sideBar.classList.toggle('open')
  $backDrop.style.display = "none"
})