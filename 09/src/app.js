import base from "./css/base.css";


var loaded = false;
window.addEventListener("click", function () {
    if (!loaded) {
        var app = document.getElementById("app");
        var div = document.createElement("div");
        div.className = "box";
        app.appendChild(div);
        console.log('添加元素');

        loaded = !loaded;
    }
})

