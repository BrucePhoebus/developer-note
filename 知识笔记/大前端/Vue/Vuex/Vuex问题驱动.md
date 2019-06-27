# Vuex问题驱动

## 常见问题

#### 如何在计算属性混入VUEX： state

```js
// 此处要实现{{num}}的写法,需要通过计算属性进行写
<h3 > {{$store.state.num}} - {{num}} < /h3>

computed: {
    num() {
        return this.$store.state.num; // 这里就是计算属性的写法
    }
},
```

#### Vue使用Vuex改数据要写多个commit的问题

	vuex 单向数据流， 推荐的commit 改变state数据， 写起来非常繁琐， 因为改数据可能要写很多commit函数。

**demo**

```js
// mutations中的函数
save(state, {
        path,
        data
    }) {
        if (!path) {
            throw new Error('need path');
        }
        const keyPath = path.split('.')
        let needSave = state;
        for (let i = 0; i < keyPath.length - 1; i++) {
            needSave = needSave[keyPath[i]];
            if (!needSave) {
                throw new Error( `error path: ${keyPath[i]}` );
            }
        }
        needSave[keyPath[keyPath.length - 1]] = data;
    },
    // 使用
    vuex.commit('save', {
        path: 'a.b.c',
        data: val
    });
// 结果
state.a.b.c = '我是需要保存的数据';
```

#### 通过计算属性处理双向绑定某个vuex中的值

```js
//如果要双向绑定某个vuex中的值。
<input v - model = "c" >

computed: {
	c: {
		get() {
			return vuex.state.a.b.c
		},
		set(val) {
			vuex.commit('save', {
				path: 'a.b.c',
				data: val
			})
		}
	}
}
// 这样就做到了在组件中双向绑定，并且使用commit改变state中的值，vuex使用严格模式也不会报错了。
```

###### 多页面（MPA）中刷新页面state值被重置问题

* 一是使用localstorage本地保存
* 二是使用vuex-alone插件使之默认保存state状态值
