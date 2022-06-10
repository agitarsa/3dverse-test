var ourInstance = null;
var originWidth = 1366;
var originHeight = 768;
var scaleToFit = true;

var canvas = document.querySelector("#unity-canvas");
var container = canvas.parentElement;
var loadingBar = document.querySelector("#unity-loading");
var loadingText = document.querySelector("#unity-loading-text");
var config = {
    dataUrl: "Build/WebGL.data",
    frameworkUrl: "Build/WebGL.framework.js",
    codeUrl: "Build/WebGL.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "RealityChain",
    productName: "3DVerse",
    productVersion: "0.0.1",
};
container.setAttribute("isportrait", false);

function onResize() {
    var w;
    var h;

    if (window.innerWidth > window.innerHeight) {
        container.setAttribute("isportrait", false);
    } else {
        container.setAttribute("isportrait", true);
    }

    if (scaleToFit) {
        w = window.innerWidth;
        h = window.innerHeight;
        var r = originHeight / originWidth;

        if (container.getAttribute("isportrait").toLowerCase() == "true") {
            r = originWidth / originHeight;
        }

        if (w * r > window.innerHeight) {
            w = Math.min(w, Math.ceil(h / r));
        }
        h = Math.floor(w * r);
    } else {
        if (container.getAttribute("isportrait").toLowerCase() == "true") {
            w = originHeight;
            h = originWidth;
        } else {
            w = originWidth;
            h = originHeight;
        }
    }

    container.style.width = canvas.style.width = w + "px";
    container.style.height = canvas.style.height = h + "px";
    container.style.top = Math.floor((window.innerHeight - h) / 2) + "px";
    container.style.left = Math.floor((window.innerWidth - w) / 2) + "px";
}

function toggleOrientation(isportrait) {
    container.setAttribute("isportrait", isportrait);
    onResize();
}

function callUnityResize(objName, objCallback) {
    onResize();
    ourInstance.Module.SendMessage(objName, objCallback, container.getAttribute("isportrait").toLowerCase());
}

createUnityInstance(canvas, config, (progress) => {
    loadingText.innerHTML = "Loading " + Math.ceil(100 * progress) + "%";
}).then(function(instance) {
    loadingBar.style.display = "none";
    ourInstance = instance;
    callUnityResize();
});
