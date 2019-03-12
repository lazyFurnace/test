/*
var start_X, start_Y, posi;
var tar = document.getElementById("mouse");
tar.onmousedown = function(e) {
  posi = tar.style.marginLeft;
  start_X = e.clientX;
  tar.addEventListener("mousemove", listGo);
};
tar.onmouseup = function(e) {
  tar.removeEventListener("mousemove", listGo);
};
tar.onmouseout = function() {
  tar.removeEventListener("mousemove", listGo);
};
function listGo(e) {
  tar.style.marginLeft = parseInt(posi) + e.clientX - start_X + "px";
}
tar.addEventListener("touchstart", function(e) {
  posi = tar.style.marginLeft;
  start_X = e.touches[0].pageX;
});
tar.addEventListener("touchmove", function(e) {
  tar.style.marginLeft = parseInt(posi) + e.touches[0].pageX - start_X + "px";
});
*/

function drag(elem) {
  let params = {};
  if (elem instanceof HTMLElement) {
    params = {
      offsetX: null,
      offsetY: null
    };
    elem.style.position = "absolute";
    elem.style.left = "0px";
    elem.style.top = "0px";
    elem.addEventListener("mousedown", e => {
      params.offsetX = e.offsetX;
      params.offsetY = e.offsetY;
      document.addEventListener("mousemove", dragMouseMove);
    });
    elem.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", dragMouseMove);
    });
    elem.addEventListener("mouseout", e => {
      document.removeEventListener("mousemove", dragMouseMove);
    });
  } else {
    throw new Error("绑定元素非 DOM 元素。")
  }
  function dragMouseMove(e) {
    elem.style.left = e.pageX - params.offsetX + "px";
    elem.style.top = e.pageY - params.offsetY + "px";
  }
}
