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

