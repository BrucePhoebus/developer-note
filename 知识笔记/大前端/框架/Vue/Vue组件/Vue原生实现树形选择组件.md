# Vue原生实现树形选择组件

## 实现

#### 参考实现

``` html
 <!DOCTYPE html>
 <html lang="en">

 <head>
     <meta charset="UTF-8">
     <link rel="icon" href="https://v1-cn.vuejs.org/images/logo.png" rel="external nofollow" type="image/x-icon">
     <title>Vue Tree Select Example</title>
     <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
 </head>

 <body>

     <!-- 递归引用的模板 -->
     <template id="one-select" style="display: none;">
         <ul>
             <li v-for="(node, key, index) in tree">
                 <div v-if="key != 'selected'">
                     <div v-on:click="nodeClick(node, index)" v-bind:class="[node.selected == null ? 'tree-select-null' : (node.selected == 'half' ? 'tree-select-half' : 'tree-select-full'), 'tree-select', 'inline-block']"></div>

                     <div class="inline-block">{{ key }}</div>
                     <div v-if="key != ''">
                         <one-select v-bind:tree="node" v-bind:isroot="false"></one-select>
                     </div>
                 </div>
             </li>
         </ul>
     </template>

     <!-- 整体树容器 -->
     <div id="tree">
         <one-select v-bind:isroot="true" v-bind:tree="tree"></one-select>
     </div>

     <textarea id="treeDataJSON" style="display: none;">
{
 "客户管理": {
  "我的客户": {
   "新分配": {},
   "跟进中": {},
   "签单客户": {},
   "长期客户": {}
  },
  "长期客户权限": {
   "设为长期客户": {},
   "还原长期客户": {}
  }
 },
 "采购列表": {
  "添加异常客情": {},
  "添加采购单": {},
  "采购退货单列表": {},
  "供应商管理": {},
  "供应商联系人": {},
  "品牌列表": {
   "宝洁": {},
   "乐视": {
    "乐视网": {},
    "乐视手机": {
     "乐视手机 1": {},
     "乐视手机 2": {},
     "乐视手机 3": {},
     "乐视手机 4": {},
     "乐视手机 5": {
      "体验超深层级": {
       "继续体验超深层级": {
        "依然体验超深层级": {},
        "依然体验超深层级 2": {}
       }
      }
     }
    },
    "乐视电视": {}
   },
   "可口可乐": {},
   "圣象": {}
  }
 }
}
</textarea>

     <script>
         // 初始数据
         var treeDataJSON = document.getElementById("treeDataJSON").value;
         var treeData = JSON.parse(treeDataJSON);
         Vue.component('one-select', {
             name: 'one-select',
             template: '#one-select',
             props: ['tree', 'isroot'],
             created: function() {
                 var realTree = Object.assign({}, this.tree);
                 delete realTree.selected;
                 if (Object.keys(realTree).length === 0) { // 判断最低级，再刷新父级
                     this.refreshAllParentNodes(this.$parent);
                 }
             },
             methods: {
                 nodeClick: function(node, index) {
                     if (node.selected === 'full' || node.selected === 'half') {
                         Vue.set(node, 'selected', null);
                     } else {
                         Vue.set(node, 'selected', 'full');
                     }
                     this.refreshAllParentNodes(self.$parent);
                     this.refreshAllParentNodes(this);
                     this.refreshAllSonNodes(this.$children[index], node.selected);
                 },
                 refreshAllSonNodes: function(node, status) {
                     if (node instanceof Vue && node.$children.length) {
                         for (index in node.$children) {
                             Vue.set(node.$children[index].tree, 'selected', status);
                             // 递归计算子级
                             this.refreshAllSonNodes(node.$children[index], status);
                         }
                     }
                 },
                 refreshAllParentNodes: function(node) {
                     if (node instanceof Vue) {
                         var status = null;
                         var nullCount = 0;
                         var halfCount = 0;
                         var fullCount = 0;
                         for (index in node.$children) {
                             if (typeof node.$children[index].tree.selected === 'undefined') {
                                 nullCount++;
                             } else if (node.$children[index].tree.selected === null) {
                                 nullCount++;
                             } else if (node.$children[index].tree.selected === 'half') {
                                 halfCount++;
                             } else if (node.$children[index].tree.selected === 'full') {
                                 fullCount++;
                             }
                         }
                         if (fullCount === node.$children.length) {
                             status = 'full';
                         } else if (nullCount === node.$children.length) {
                             status = null;
                         } else {
                             status = 'half';
                         }
                         Vue.set(node.tree, 'selected', status);

                         // 递归计算父级
                         this.refreshAllParentNodes(node.$parent);
                     }
                 },
                 log: function(o) {
                     console.log(o);
                 }
             }
         });
         vm = new Vue({
             el: '#tree',
             data: {
                 tree: treeData
             },
             methods: {
                 // 返回最终数据
                 getResult: function() {
                     return Object.assign({}, this.tree);
                 }
             }
         });
     </script>

     <style>
         #tree {
             width: 500px;
             margin: 0 auto;
             margin-top: 50px;
         }

         li {
             list-style: none;
             line-height: 25px;
         }

         .inline-block {
             display: inline-block;
         }

         .tree-select {
             width: 13px;
             height: 13px;
             line-height: 16px;
             margin: 3px;
             display: inline-block;
             vertical-align: middle;
             border: 0 none;
             cursor: pointer;
             outline: none;
             background-color: transparent;
             background-repeat: no-repeat;
             background-attachment: scroll;
             background-image: url('selects.png');
         }

         .tree-select-null {
             background-position: 0 0;
         }

         .tree-select-full {
             background-position: -14px 0;
         }

         .tree-select-half {
             background-position: -14px -28px;
         }
     </style>

 </body>

</html>
```

###### 简述

###### 基本特性

* 完美的多级联动效果

* 支持无限多的分级

* 有 全选、半选、不选 三种状态

> 参考：[基于 Vue 的树形选择组件的示例代码](https://www.zhangshengrong.com/p/OQNzQlpaRY/)

