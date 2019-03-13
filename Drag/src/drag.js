function drag(elem) {
  let params = {};
  if (elem instanceof HTMLElement) {
    params = {
      offsetX: null,
      offsetY: null
    };
    elem.style.transform = "translate(0px, 0px)";
    elem.addEventListener("mousedown", e => {
      params.offsetX = e.offsetX;
      params.offsetY = e.offsetY;
      initializationCss();
      dragMouseMove(e);
      document.addEventListener("mousemove", dragMouseMove);
    });
    elem.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", dragMouseMove);
    });
    elem.addEventListener("mouseout", e => {
      document.removeEventListener("mousemove", dragMouseMove);
    });
    elem.addEventListener("touchstart", e => {
      const [{ pageX, pageY }] = e.touches;
      const { top, left } = getOffset(elem);
      params.offsetX = pageX - left;
      params.offsetY = pageY - top;
      initializationCss();
      dragTouchMove(e);
      document.addEventListener("touchmove", dragTouchMove);
    });
    elem.addEventListener("touchend", e => {
      document.removeEventListener("touchmove", dragTouchMove);
    });
  } else {
    throw new Error("绑定元素非 DOM 元素。")
  }
  function dragMouseMove(e) {
    elem.style.left = e.pageX - params.offsetX + "px";
    elem.style.top = e.pageY - params.offsetY + "px";
  }
  function dragTouchMove(e) {
    const [{ pageX, pageY }] = e.touches;
    elem.style.left = pageX - params.offsetX + "px";
    elem.style.top = pageY - params.offsetY + "px";
  }
  function getOffset(elem, top = 0, left = 0) {
    top += elem.offsetTop;
    left += elem.offsetLeft;
    if (elem.offsetParent) {
      return getOffset(elem.offsetParent, top, left);
    } else {
      return { top, left };
    }
  }
  function initializationCss() {
    elem.style.position = "absolute";
    elem.style.margin = 0;
  }
}
