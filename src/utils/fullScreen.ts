export default function fullScreen(el: Element) {
  if (document.fullscreen) document.exitFullscreen()
  else el.requestFullscreen()
}