# IE兼容说明

## js判断浏览器是不是IE

```js
function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
	}
} else {
    return false;
}
```

