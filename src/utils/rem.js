/**
 * @description rem的值计算和键盘遮盖文本框
 */
const baseSize = 100
let baseWidth = 720;
function setRem () {
  let scale = document.documentElement.clientWidth / baseWidth
  scale = scale > 1 ? 1 : scale
  document.documentElement.style.fontSize = baseSize * scale + 'px'
}
// H5页面弹出的键盘遮盖文本框
function pageInput () {
  if (
    document.activeElement.tagName == 'INPUT' ||
    document.activeElement.tagName == 'TEXTAREA'
  ) {
    document.activeElement.scrollIntoViewIfNeeded()
  }
}
setRem()
window.onresize = function () {
  setRem()
  pageInput()
}

