
import "./css/base.css";

var loaded = false;
window.addEventListener("click", function () {
    var app = document.getElementById("app");
    var div = document.createElement("div");
    div.className = "box";
    app.appendChild(div);
    console.log('添加元素');
    if (!loaded) {
        import(/* webpackChunkName: 'style'*/ "./css/common.css").then(_ => {
            console.log("Change size of html");
            loaded = !loaded;
        });
    }
})

