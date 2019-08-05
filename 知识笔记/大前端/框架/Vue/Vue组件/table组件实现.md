# table组件实现

## table组件

```js
<template>
  <div class="table_box">
    <table width="100%">
      <thead>
        <slot name="tablebox_head"></slot>
      </thead>
    </table>
    <div class="table_box_list" :class="{ 'classBg': isBackGround }">
      <table width="100%">
        <slot name="tablebox_body"></slot>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isBackGround: true
      }
    }
  }
</script>
<style scoped>
  .table_box{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
  }
  table {
    color: #1b222d;
    font-size:14px;
    line-height: 36px;
    text-align: center;
    background: #fff;
  }
  table thead {
    /*font-weight: bold;*/
    color: #1b222d;
    background: #b8cde1;
    word-break: keep-all;
    white-space:nowrap;
    overflow: hidden;
  }
  table tbody tr{
    border-bottom:#dde2e6 solid 1px;
  }
  table tbody tr:last-child{
    border-bottom: none;
  }
  table tbody tr:hover{
    background:#eff5fb;
  }
  table span{
    padding:0 5px;
  }
  .table_box_list{
    /*box-shadow: -1px 1px 3px #697d98;*/
    border:1px solid #b8cde1;
    position: absolute;
    left:0;
    bottom:0px;
    top:36px;
    right:0;
    overflow-y:auto;
  }
  .summaryBox .table_box_list{
    /*box-shadow: -1px 1px 3px #697d98;*/
    border:1px solid #b8cde1;
    position: absolute;
    left:0;
    bottom:12px;
    top:36px;
    right:0;
    overflow-y:auto;
  }
  .light {
    color: #63a2ff;
    cursor: pointer;
  }
  .classBg{
    background:#fff url(../../assets/icon/empty1.png) no-repeat center !important;
  }
  .red{}
</style>
```
