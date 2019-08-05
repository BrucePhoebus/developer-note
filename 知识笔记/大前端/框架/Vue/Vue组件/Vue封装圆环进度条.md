# Vue封装圆环进度条

## 参考使用

#### 实现1：SVG实现

``` html
<template>
    <div class="LoopProgress" :style="'width:'+width+';'+'height:'+height+';'">
        <svg viewBox="0 0 96 96" :class="'svg-circle-progress'+' svg-circle-progress'+colorkey" style="width: 96px; height: 96px;">
            <circle r="40" cx="48" cy="48" fill="none" 
            stroke-miterlimit="20" stroke-width="10" 
            class="svg-progress" 
            style="stroke-dasharray: 275, 279.602;stroke:#eee;">
            </circle>
            <circle r="40" cx="48" cy="48" fill="none" 
            stroke-miterlimit="20" stroke-width="10" 
            :class="'svg-progress'+' svg-progress'+colorkey" 
            style="stroke-dasharray: 1, 279.602;stroke:#fdd835;">
            </circle>
        </svg>
        <div class="mask">
            <span>{{pvalue}}</span>
            <span>{{psymbol}}</span>
        </div>
        <div class="svg-title">
            {{title}}
        </div>
    </div>
</template>

<script>

	import $ from  'jquery';

    export default ({
        props: ['psymbol','pvalue','progress','color','width','height','title','colorkey'],
        methods:{
            calcProgress(){
                let self = this;
                self.progress = parseInt(self.progress);
                $('.svg-progress'+self.colorkey).css('stroke',self.color);
                $('.svg-progress'+self.colorkey).css('stroke-dasharray',(self.progress/100)*250+', 279.602');
            }
        },
        mounted(){
            this.calcProgress();
        },
        // 销毁子组件后重建，避免第一个数据不更新的问题
        destroyed() {
            // this.$parent.showChart = true;
        },
    })
</script>

<style scoped>
.LoopProgress{
    display:inline-block;
    position:relative;
    width:210px;
    height:100px;
}
svg:not(:root) {
    overflow: hidden;
}
.svg-circle-progress {
    position: relative;
    transform: rotate(-90deg);
}
.svg-progress{
    stroke: #2196f3;
    stroke-linecap: round;
    transition: all .3s linear;
}
.mask{
    position:absolute;
    top:23px;
    left:24px;
}
.mask span{
    font-size:14px;
}
.mask span:first-child{
    font-size:34px;
}
.svg-title{
    display: inline-block;
    width:105px;
    position:absolute;
    right:0;
    bottom:0;
    font-size:14px;
}
</style>
```

> 注：原则上不应该使用JQ，因为Vue是数据驱动，应该用变量控制变化，而不是操作DOM


**父组件使用该组件**

	首先当然是import引入父组件，然后在父组件components属性中注册该组件dateTools

``` html
<dateTools
	:dateToolsKey="1"
	:trainDateList="trainDateList"
	ref="topDateTools1"
	@topDateEvent1="topDateFun1"
></dateTools>
<dateTools
	:dateToolsKey="2"
	:trainDateList="trainDateList2"
	ref="topDateTools2"
	@topDateEvent2="topDateFun2"
></dateTools>
```

#### 实现2：CSS3实现

``` html
<template>
    <div class="LoopProgress" :style="'width:'+width+';'+'height:'+height+';'">
        <!--背景圆-->
        <div :class="'circle'+' circle'+colorkey">
            <!--左半边圆-->
            <div :class="'circle_left'+' circle_left'+colorkey">
                <div :class="'clip_left'+' clip_left'+colorkey">
                     
                </div>
            </div>
            <!--右半边圆-->
            <div :class="'circle_right'+' circle_right'+colorkey">
                <div :class="'clip_right'+' clip_right'+colorkey"></div>
            </div>
            <div class="mask">
                <span>{{progress}}</span>%
            </div>
        </div>
        
        <div class="circle-title">
            {{title}}
        </div>

    </div>
</template>

<script>

	import $ from  'jquery';

    export default ({
        props: ['progress','color','width','height','title','colorkey'],
        methods:{
            calcProgress(){
                let self = this;
                self.progress = parseInt(self.progress);
                $('.circle'+self.colorkey).css('background-color',self.color);
                if(self.progress<=50){
                    $('.circle_right'+self.colorkey).css('transform','rotate('+(self.progress*3.6)+'deg)');
                }else{
                    $('.circle_right'+self.colorkey).css({
                        'transform':'rotate(0deg)',
                        "background":self.color
                    });
                    $('.circle_left'+self.colorkey).css('transform','rotate('+((self.progress-50)*3.6)+'deg)');
                }
            }
        },
        mounted(){
            this.calcProgress();
        },
        // 销毁子组件后重建，避免第一个数据不更新的问题
        destroyed() {
            // this.$parent.showChart = true;
        },
    })
</script>

<style scoped>
.LoopProgress{
    display:inline-block;
    position:relative;
}
.circle {
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 50%;
    /* background: red; */
}
        
.clip_left,.clip_right{
    width:100px;
    height:100px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index:100;
}
.circle_left,.circle_right{
    width:100px;
    height:100px;
    position: absolute;
    border-radius: 50%;
    top: 0px;
    left: 0px;
    background: #eee;
    z-index:101;
}
/*出于展示用的改变背景色*/
/* .circle_left{
    background: green;
}
.circle_right{
    background: pink;
} */
.circle_right,.clip_right {
    clip:rect(0,auto,auto,50px);
}
.circle_left,.clip_left{
    clip:rect(0,50px,auto,0);
}
        
/*
*当top和left取值为auto时，相当于0
*当bottom和right取值为auto时，相当于100%
*/
.mask {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    left: 12px;
    top: 12px;
    background: #FFF;
    position: absolute;
    text-align: center;
    line-height: 76px;
    font-size: 16px;
    z-index:102;
}
/* .circle_right{
    transform: rotate(55deg);
} */
.circle-title{
    display:inline-block;
    position:absolute;
    bottom:0;
    right:0;
    width:105px;
}
</style>
```

**父组件使用该组件**

	首先当然是import引入父组件，然后在父组件components属性中注册该组件dateTools

``` html
<dateTools
	:dateToolsKey="1"
	:trainDateList="trainDateList"
	ref="topDateTools1"
	@topDateEvent1="topDateFun1"
></dateTools>
<dateTools
	:dateToolsKey="2"
	:trainDateList="trainDateList2"
	ref="topDateTools2"
	@topDateEvent2="topDateFun2"
></dateTools>
```

> 参考：[vue自己封装圆环进度条](https://www.cnblogs.com/sdorm/p/9238414.html)
