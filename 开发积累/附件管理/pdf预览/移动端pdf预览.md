# 移动端PDF预览实现文档

## Vue组件实现

#### $mount()挂载实现

> 通过$mount()创建实例挂载到引用组件中实现组件封装

**插件安装**

	因为使用的是pdfjs-dist插件，所以使用之前需要安装

```bash
cnpm install -S pdfjs-dist
```

**index.js**

```js
import PDF from './pdf'

var $vm
export default {
  install (Vue, options) {
    if (!$vm) {
      const PDFPlugin = Vue.extend(PDF);
      $vm = new PDFPlugin().$mount();
      document.body.appendChild($vm.$el);
    }
    Vue.prototype.$showPDF = function (url, showMultiPage) {
      $vm.showPDF(url, showMultiPage);
    }
  }
}
```

*分析*

1. 在js中将pdf组件实例挂载到引用组件中，然后通过添加原型方法让引用组件直接使用该方法，实现组件调用
2. 这个可以使两个组件不存在父子关系，也就是实现pdf组件完全独立出去，只要调用指定引用方法就可以实现组件调用
3. 问题也是因为这样引用不存在父子关系，所有很多交互即无法实现，数据只能单项传输，即，组件调用之后便跟引用组件无关，所有行为都是封装组件独立处理的

> 注：如果需要实现数据交互，需要实现父子关系，即通过标签引入，导入父组件后，将子组件在父组件components属性中注册，这样父组件才能调用，这样也相当于子组件是父组件的一部分

**pdf.vue**

```Vue
<template>
	<div class="container">
		<canvas :class="newClass" id="canvas"></canvas>
		<div class="foot" v-if='pdfObj && pdfObj.numPages > 1'>
			<van-button class='pdf-btn' size="small" v-if="pageNum>1" @click="onPrevPage">上一页</van-button>
			<van-button class='pdf-btn' size="small" v-if="pageNum<pdfObj.numPages" @click="onNextPage">下一页</van-button>
		</div>
		<div class="flex-btn">
			<van-button class='pdf-btn' size="small" @click="scalePlus" >放大</van-button>
			<van-button class='pdf-btn' size="small" @click="subScale">缩小</van-button>
		</div>
	</div>
</template>
<script>

	import PDFJS from 'pdfjs-dist'

	export default {
		data () {
			return {
				showMultiPage: true,
				pdfObj: null,

				pageNum: 1,
				scale: 2,
				pageRendering: false,
				pageNumPending: null,

				newClass: 'pdf-content'
			}
		},
		methods: {
			showPDF (url) {
				let _this = this;

				PDFJS.getDocument(url).then(pdf => {
					_this.pdfObj = pdf;
					if (pdf.numPages <= 1) {
						_this.newClass = 'new-pdf-content';
					}
					_this.renderPage(1);
				});
			},
			renderPage (num) {
				const _this = this;
				this.pageRendering = true;
				this.pdfObj.getPage(num).then(pdf => {
					var viewport = pdf.getViewport(_this.scale);
					let canvas = document.getElementById('canvas');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					}
					var renderTask = pdf.render(renderContext);

					// Wait for rendering to finish
					renderTask.promise.then(() => {
						_this.pageRendering = false;
						if (_this.pageNumPending !== null) {
							// New page rendering is pending
							this.renderPage(_this.pageNumPending);
							_this.pageNumPending = null;
						}
					})
				})
			},
			queueRenderPage (num) {
				if (this.pageRendering) {
					this.pageNumPending = num;
				} else {
					this.renderPage(num);
				}
			},
			onPrevPage () {
				if (this.pageNum <= 1) {
					return
				}
				this.pageNum--;
				this.queueRenderPage(this.pageNum);
			},
			onNextPage () {
				if (this.pageNum >= this.pdfObj.numPages) {
					return
				}
				this.pageNum++;
				this.queueRenderPage(this.pageNum);
			},
			// 放大
			scalePlus () {
				console.log(this.scale);
				this.scale = this.scale + 0.1;
			},
			// 缩小
			subScale () {
				console.log(this.scale);
				if (this.scale > 1.2) {
					this.scale = this.scale - 0.1;
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		text-align: center;
		top: 0;
		left: 0;
		padding: 0;
		background-color: rgba(0, 0, 0, 0.75);
	}

	.pdf-content {
		width: 100%;
		height: calc(100% - 40px);
	}

	.new-pdf-content {
		width: 100%;
		height: 100%;
	}

	.foot {
		position: fixed;
		transform: translate(-50%, 0);
		left: 50%;
	}

	.pdf-btn {
		margin: 0 5px;
	}

	.flex-btn {
		position: fixed;
		right: 0;
		display: none;
	}

</style>
```

> 这是移动端pdf预览实现，所有只有预览效果，PC端的很多功能都无法使用，在这里，pdf下载功能都没有（应该是可以实现的）

*分析*

1. 这个组件只实现的pdf预览功能，也就是只能预览，不能复制下载等操作
2. 这个组件进行了分页处理，如果页数多的话会有页面切换的按钮
3. 组件使用插件pdfjs-dist解析文件或文件流，然后一个个渲染挂载到指定id上
4. 这个方法主要应对base64 PDF文件预览的问题，当然也可以使用url直接解析显示

**引用方式**

```js
import pdf from '../../utils/pdf'
import Vue from 'vue'
Vue.use(pdf);

_this.$showPDF({ data: 'data:application/pdf;base64,' + atob(response.cqxx) });
```

> 注：cqxx是base64 PDF文件，`$showPDF()`方法参数可以是url(`$showPDF(url)`)，也可以是文件流(`$showPDF({ data: FileStreams })`)

!> 这样组件实现暂时有个问题，返回页面没办法杀掉这个PDF预览的DOM，下面优化实现

#### 子组件实现

```js
<template>
	<div class="preview-pdf">
		<canvas :class="newClass" ref="canvas"></canvas>
		<footer v-if="pdfObj && showBtn" class="foot-btn">
			<div v-if="pageNum > 1" style="display: inline-block;">
				<van-button class='pdf-btn' size="small" @click="onPrevPage">上一页</van-button>
			</div>
			<!--<van-button class='pdf-btn' size="small" @click="blobDownload">下载</van-button>-->
			<!--<van-button class='pdf-btn' size="small" @click="scalePlus">放大</van-button>-->
			<div v-if="pageNum < pdfObj.numPages" style="display: inline-block;">
				<van-button class='pdf-btn' size="small" @click="onNextPage">下一页</van-button>
			</div>
		</footer>
	</div>
</template>
<script>

	import { Toast } from 'vant'

	import PDFJS from 'pdfjs-dist'

	export default {
		name: 'preview-pdf',
		props: {
			obj: '',
			showBtn: {
				type: Boolean,
				default: false
			},
		},
		watch: {
			obj: function (newVal) {
				if (!newVal) {
					this.pdfObj = null;
					return;
				}
				this.showPDF(newVal);
			}
		},
		data () {
			return {
				showMultiPage: true,
				pdfObj: null,

				pageNum: 1,
				scale: 2,
				pageRendering: false,
				pageNumPending: null,

				newClass: 'pdf-content',

				pdfUrl: ''
			}
		},
		methods: {
			showPDF (obj) {
				let _this = this;

				if (/base64/.test(obj)) {
					obj = { data: 'data:application/pdf;base64,' + atob(obj.substr(obj.indexOf("base64,") + 7, obj.length)) };
				}

				PDFJS.getDocument(obj).then(pdf => {
					_this.pdfObj = pdf;
					if (pdf.numPages <= 1) {
						_this.newClass = 'new-pdf-content';
					}
					_this.renderPage(1);
				});
			},
			blobDownload() {
				let fileName = this.$store.getters.getPersonCardInfo.cardName || '';
				fileName = fileName + new Date().getTime() + '.pdf';

				if (!/base64/.test(this.obj)) {
					// 如果是url，直接下载
					this.createASignDownload(this.obj, fileName);
					return;
				}

				let blob = this.getBlob(this.obj);

				// window.navigator.msSaveBlob：以本地方式保存文件
				if (typeof window.navigator.msSaveBlob !== 'undefined') {
					window.navigator.msSaveBlob(blob, fileName)
				} else {
					let objectUrl = this.pdfUrl;
					if (!this.pdfUrl) {
						// 创建新的URL表示指定的File对象或者Blob对象
						let URL = window.URL || window.webkitURL;
						objectUrl = URL.createObjectURL(blob);
						this.objectUrl = objectUrl;
					}
					this.createASignDownload(objectUrl, fileName);
				}
				Toast('下载成功！');
			},
			createASignDownload(objectUrl, fileName) {
				// 创建a标签用于跳转至下载链接
				let a = document.createElement('a');
				a.style.display = 'none';
				// download：指示浏览器下载URL而不是导航到它，也可设置下载文件的名称
				if (typeof a.download === 'undefined') {
					// window.location：获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
					window.location = objectUrl;
				} else {
					// href属性指定下载链接
					a.href = objectUrl;
					// download属性指定文件名
					a.download = fileName;
					// 将a标签插入body中
					document.body.appendChild(a);

					var event = document.createEvent("MouseEvents");
					event.initEvent("click", false, false);
					a.dispatchEvent(event);
					// 去除a标签，以免影响其他操作
					a.remove();
				}
			},
			getBlob(base64) {
				return this.b64toBlob(this.getData(base64), this.getContentType(base64));
			},
			getContentType(base64) {
				return /data:([^;]*);/i.exec(base64)[1];
			},
			getData(base64) {
				return base64.substr(base64.indexOf("base64,") + 7, base64.length);
			},
			b64toBlob(b64Data, contentType, sliceSize) {
				contentType = contentType || '';
				sliceSize = sliceSize || 512;

				var byteCharacters = atob(b64Data);
				var byteArrays = [];

				for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
					var slice = byteCharacters.slice(offset, offset + sliceSize);

					var byteNumbers = new Array(slice.length);
					for (var i = 0; i < slice.length; i++) {
						byteNumbers[i] = slice.charCodeAt(i);
					}

					var byteArray = new Uint8Array(byteNumbers);

					byteArrays.push(byteArray);
				}

				var blob = new Blob(byteArrays, { type: contentType });
				return blob;
			},
			renderPage (num) {
				const _this = this;
				this.pageRendering = true;
				this.pdfObj.getPage(num).then(pdf => {
					var viewport = pdf.getViewport(_this.scale);
					let canvas = _this.$refs.canvas;
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					var renderContext = {
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					}
					var renderTask = pdf.render(renderContext);

					renderTask.promise.then(() => {
						_this.pageRendering = false;
						if (_this.pageNumPending !== null) {
							this.renderPage(_this.pageNumPending);
							_this.pageNumPending = null;
						}
					})
				})
			},
			queueRenderPage (num) {
				if (this.pageRendering) {
					this.pageNumPending = num;
				} else {
					this.renderPage(num);
				}
			},
			onPrevPage () {
				if (this.pageNum <= 1) {
					return
				}
				this.pageNum--;
				this.queueRenderPage(this.pageNum);
			},
			onNextPage () {
				if (this.pageNum >= this.pdfObj.numPages) {
					return
				}
				this.pageNum++;
				this.queueRenderPage(this.pageNum);
			},
			// 放大
			scalePlus () {

			},
			// 缩小
			subScale () {

			}
		}
	}
</script>

<style scoped>
	.preview-pdf {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		text-align: center;
		left: 0;
		padding: 0;
	}

	.pdf-content {
		width: 100%;
		height: calc(100% - 100px);
	}

	.new-pdf-content {
		width: 100%;
		height: 100%;
	}

	.pdf-btn {
		margin: 0 5px;
	}

	.foot-btn {
		width: 100%;
	}

</style>
```

> 这样相当于将pdf预览组件作为子组件注入到父组件中，这样可以通过控制父组件数据实现对PDF预览的控制，这样实现效果也比较好

**使用**

```js
<preview-pdf :obj="base64Obj" :showBtn="true"></preview-pdf>

import previewPDF from '../../utils/pdf/previewPDF'

components: {
	'preview-pdf': previewPDF
},

this.base64Obj = 'data:application/pdf;base64,' + base64Data;
```

> 通过控制数据base64Obj控制PDF预览，通过showBtn控制是否显示按钮：切换页面按钮、放大缩小按钮、下载按钮

!> 放大缩小和下载功能比较难实现。。。
