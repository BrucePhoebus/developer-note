# Vue原生实现省市区组件

## 概述

#### 简述

	有些时候，网上的UI库的样式跟项目的不兼容和不符合需求，这时候我们就需要手动造轮子了，自己原生实现一个需求的组件

#### 实现思路

* 首先是布局，使用三个select控制省市区三个下拉框，具体样式CSS控制没什么好说的

	* 其中每个select使用for循环出option，根据省市区数据生成DOM列表

* 然后是在页面加载后获取`省级`数据(或直接本地导入)，其次是每次选完省后立马根据省的编码获取对应省的所有市级数据，同样获取区/县数据

> 关于数据的来源因为省市区数据基本是定死的，所有可以选择直接使用本地数据或者使用指定来源获取，不需要外部父组件传值

* 最后是接口的暴露，每次选中值后向外暴露选中了什么

## 实现

#### citySelect.vue

``` html
<template>
	<div class="city-select">
		<select v-model="selectedProvince" name="province">
			<option v-for="(item, index) in provinces"
				v-if="item.level === 1"
				:value="item">
				{{ item.name }}
			</option>
		</select>

		<select v-model="selectedCity" name="city">
			<option
				v-for="(item, index) in cities"
				:value="item">
				{{ item.name }}
			</option>
		</select>
			
		<select v-model="selectedBlock" name="block">
			<option
				v-for="(item, index) in blocks"
				:value="item">
				{{ item.name }}
			</option>
		</select>
	</div>
</template>

<script>
/**
 * 省 市 区/县城 三联动选择器
 */
import provinces from './provinces.js'
import Vue from 'vue'
export default {
    name: 'app',
	data() {
        return {
            selectedProvince: provinces[0],
            selectedCity: 0,
            selectedBlock: 0,
            cities: 0,
            provinces,
            blocks: 0
        }
    },
    created() {
        // 数据初始化，默认选中北京市，默认选中第一个; 北京市数据为总数据的前18个
        let beijing = this.provinces.slice(0, 19)
        this.cities = beijing.filter(item => {
            if (item.level === 2) {
                return true
            }
        })
        this.selectedCity = this.cities[0]
        this.blocks = beijing.filter(item => {
            if (item.level === 3) {
                return true
            }
        })
        this.selectedBlock = this.blocks[0]
    },
    watch: {
        selectedProvince(newVal, oldVal) {
            // 港澳台数据只有一级,特殊处理
            if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
                this.cities = [newVal]
                this.blocks = [newVal]
            } else {
                this.cities = this.provinces.filter(item => {
                    if (item.level === 2 && item.sheng && newVal.sheng === item.sheng) {
                        return true
                    }
                })
            }
            var _this = this
            // 此时在渲染DOM,渲染结束之后再选中第一个
            Vue.nextTick(() => {
                _this.selectedCity = _this.cities[0]
                _this.$emit('input', _this.info)
            })
        },
        selectedBlock() {
            var _this = this
            Vue.nextTick(() => {
                _this.$emit('input', _this.info)
            })
        },
        selectedCity(newVal) {
            // 选择了一个市，要选择区了 di是城市的代表，sheng
            if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
                this.blocks = [newVal]
                this.cities = [newVal]
            } else {
                this.blocks = this.provinces.filter(item => {
                    if (item.level === 3 && item.sheng && item.sheng == newVal.sheng && item.di === newVal.di && item.name !== '市辖区') {
                        return true
                    }
                })
            }
            var _this = this
            Vue.nextTick(() => {
                _this.selectedBlock = _this.blocks[0]
                // 触发与 v-model相关的 input事件
                _this.$emit('input', _this.info)
            })
        }
    },
    computed: {
        info() {
            return {
                province: this.selectedProvince,
                city: this.selectedCity,
                block: this.selectedBlock
            }
        }
    }
} 
</script> 

<style lang="stylus" scoped>
    .city-select select
 	outline 0
</style>
```

#### 组件使用

``` html
<template>
    <div id="app">
        <h5>vue 省市区三联动 demo</h5>
        <city-select v-model="cityInfo"></city-select>
        <h6>v-model的值是 <code>{{ cityInfo }}</code></h6>
        <h6>从v-model得知,你选择了 <i>{{ cityName }}</i></h6>
    </div>
</template>
<script>
    import CitySelect from './components/CitySelect.vue'
    export default {
        data() {
            return {
                cityInfo: '',
            }
        },
        components: {
            CitySelect
        },
        computed: {
            cityName() {
                const names = [];
                this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')
                this.cityInfo.city && names.push(this.cityInfo.city.name + ' ')
                this.cityInfo.block && names.push(this.cityInfo.block.name + ' ')
                return names.join('')
            }
        }
    }
</script>
<style lang="stylus">
    h6
        padding 10px
        border 1px dotted
    h6 i
        color #f00
        border 1px dotted #ccc
</style>
```

> 参考：[vue省市区三联动下拉选择组件的实现](https://www.zhangshengrong.com/p/bYXxwMWNZj/)

