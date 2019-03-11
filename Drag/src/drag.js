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
