<!--
 * @Description: 面试或工作业务中遇到的各种JSON数据处理需求
 * @Date: 2019-08-09 09:57:53
 * @LastEditors: phoebus
 * @LastEditTime: 2019-08-09 10:17:27
 -->
# js处理JSON数据

## 业务类

#### 根据checkedKeys将treeData处理成result

``` js
const treeData = [{
        key: '0-0',
        children: [{
            key: '0-0-0',
            children: [{
                    key: '0-0-0-0'
                },
                {
                    key: '0-0-0-1'
                },
                {
                    key: '0-0-0-2'
                },
            ],
        }, ],
    },
    {
        key: '0-1',
        children: [{
                key: '0-1-0-0'
            },
            {
                key: '0-1-0-1'
            },
            {
                key: '0-1-0-2',
                children: [{
                    key: '0-1-0-2-0-0'
                }]
            },
        ],
    },
    {
        key: '0-2'
    }
];
const checkedKeys = ['0-0-0-1', '0-1-0-2-0-0'];
const result = [{
        key: '0-0',
        children: [{
            key: '0-0-0',
            children: [{
                key: '0-0-0-1'
            }, ],
        }],
    },
    {
        key: '0-1',
        children: [{
            key: '0-1-0-2',
            children: [{
                key: '0-1-0-2-0-0'
            }]
        }, ],
    },
]
```

**解决思路**

	简单说就是找children属性中的key值为 checkedKeys值
	最简单就是使用递归实现，其次也能将树结构拉平后再查找

``` js
// 递归实现
function checkedKey(tree, checkedKeys) {
	// 区分JSON是数组还是对象
	if (Array.isArray(tree)) {
		return tree.map(node => checkedKey(node, checkedKeys)).filter(node => !!node);
	} else if(tree.children){
		let children = checkedKey(tree.children, checkedKeys);
		return children.length ? {...tree, children} : null;
	}

	return checkedKeys.includes(tree.key) ? tree : null;
}
```


