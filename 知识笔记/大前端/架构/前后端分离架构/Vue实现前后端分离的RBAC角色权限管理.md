# Vue实现前后端分离的RBAC角色权限管理

## 概述

#### 项目概述

* 项目背景

	后台管理系统，不同角色拥有不同权限

* 实现技术

	Vue + Vuex + UI(Element-UI...)

* 关于前后端实现

	一方面这需要后端比较好的支持，当然前端只考虑我需要什么样的数据，后端这么方便给我
	前端根据后端返回的数据，通过动态路由和Vuex持久化数据管理

#### 思路

* 首先用户登录成功后，从后台拉取当前用户权限可显示的菜单和可用的权限列表等数据

	* 其中权限路由直接通过动态路由挂载到路由实例上
	* 当前用户权限的菜单则保持在`Vuex store`的`nav`(菜单导航)中
	* 用户权限信息依然保持在`Vuex store`中，命名为`auth`(或permissionInfo都行)

* 在用户切换路由时，判断是否存在`auth`(用户权限信息)，如果不存在，则重新获取`用户权限信息`

* 然后判断当前访问地址 to.meta.alias 是否在用户可用权限列表中，如果不存在，则提示`无权限`；否则进入访问页面(路由)

## 实现

#### Vuex定义数据持久化

* 定义好菜单`nav`和用户信息等对象数据存储

``` js
// 登录用户信息
const user = {
  name: '', // 用户名
  avatar: '', // 用户头像
  auth: [], // 用户权限
  hasAuth: false // 是否已经加载用户权限
};
// 导航菜单
const nav = [];
```

* 通过action异步获取数据

``` js
// 获取用户权限
const getUserAuth = async ({commit}) => {
  const res = await http.post('YOUR_URL', {});
  if (res === null) return;
  console.log('getUserAuth', res.param);
  commit('SET_USER_AUTH', res.param.auth);
  commit('SET_SIDE_NAV', res.param.nav);
};
```

> 实际上大部分方法使用同步(mutations)即可

* 部分`mutation`代码

``` js
// 设置用户权限
const SET_USER_AUTH = (state, auth) => {
  state.user.auth = auth.concat('欢迎使用');
  state.user.hasAuth = true;
};
// 设置导航菜单
const SET_SIDE_NAV = (state, nav) => {
  // 导航菜单
  let _nav = [{
    name: '欢迎使用',
    url: "/main",
    iconCls: 'fa fa-bookmark'
  }];
  // 权限菜单对应的路由地址
  const route = {
    "系统管理": {iconCls: 'fa fa-archive', url: ''},
    "Pmsadmin/Oragnize/list": {iconCls: '', url: '/system/organization'},
    "Pmsadmin/Admin/list": {iconCls: '', url: '/system/user/index'},
    "Pmsadmin/Role/list": {iconCls: '', url: '/system/auth'},
    "Pmsadmin/Log/record": {iconCls: '', url: '/system/logs'},
    "项目管理": {iconCls: 'fa fa-unlock-alt', url: ''},
    "Pmsadmin/Project/list": {iconCls: '', url: '/project/list/index'},
    "Pmsadmin/House/list": {iconCls: '', url: '/project/house'},
    "Pmsadmin/Pack/list": {iconCls: '', url: '/project/pack'},
    "广告位": {iconCls: 'fa fa-edit', url: ''},
    "Pmsadmin/Place/list": {iconCls: '', url: '/adsplace/list'},
    "投诉建议": {iconCls: 'fa fa-tasks', url: ''},
    "Pmsadmin/Scategory/list": {iconCls: '', url: '/complain/type'},
    "Pmsadmin/Complain/list": {iconCls: '', url: '/complain/list'},
    "Pmsadmin/Suggest/list": {iconCls: '', url: '/complain/suggestion'},
    "报事报修": {iconCls: 'fa fa-user', url: ''},
    "Pmsadmin/Rcategory/list": {iconCls: '', url: '/rcategory/type'},
    "Pmsadmin/Rcategory/info": {iconCls: '', url: '/rcategory/public'},
    "Pmsadmin/Repair/list": {iconCls: '', url: '/rcategory/personal'},
    "便民服务": {iconCls: 'fa fa-external-link', url: ''},
    "Pmsadmin/Bcategory/list": {iconCls: '', url: '/bcategory/type'},
    "Pmsadmin/Service/list": {iconCls: '', url: '/bcategory/list'},
    "首座推荐": {iconCls: 'fa fa-file-text', url: ''},
    "Pmsadmin/stcategory/list": {iconCls: '', url: '/stcategory/type'},
    "Pmsadmin/Store/list": {iconCls: '', url: '/stcategory/list'},
    "招商租赁": {iconCls: 'fa fa-leaf', url: ''},
    "Pmsadmin/Bussiness/list": {iconCls: '', url: '/bussiness/list'},
    "Pmsadmin/Company/list": {iconCls: '', url: '/bussiness/company'},
    "Pmsadmin/Question/list": {iconCls: '', url: '/bussiness/question'},
    "停车找车": {iconCls: 'fa fa-ra', url: ''},
    "Pmsadmin/Cplace/list": {iconCls: '', url: '/cplace/cmanage'},
    "Pmsadmin/Clist/list": {iconCls: '', url: '/cplace/clist'},
    "Pmsadmin/Cquestion/list": {iconCls: '', url: '/cplace/cquestion'},
  };
  for (let key in nav) {
    let item = nav[key];
    let _temp = {};
    let subItems = []; // 二级菜单临时数组
    if (item.children && item.children.length > 0) {
      // 二级菜单
      item.children.forEach(subItem => {
        subItems.push(Object.assign({}, {
          name: subItem.name || '',
          url: route[subItem.url].url || '',
          iconCls: route[subItem.url].iconCls || '',
        }))
      });
      // 一级菜单
      _temp = Object.assign({}, {
        name: item.name || '',
        url: item.url || '',
        iconCls: route[item.name].iconCls || '',
        children: subItems.slice(0)
      });
      _nav.push(_temp);
    }
  }
  state.nav = _nav;
};
```

> 这是炒人家的文章，不过感觉这样写路由太粗糙了，如果要实现权限管理，那么最好路由权限控制也一起做了，也就是路由、菜单等一系列的用户权限信息都由后端返回，这样可以减免一些不必要的路由加载，加载的都是当前用户权限有的

#### 路由与侧边菜单分离

``` js
// 侧边菜单相关代码 Main.vue
<template>
<!-- ... -->
    <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-aliyun" 
                 @open="handleopen"
                 @close="handleclose"
                 @select="handleselect"
                 :collapse="collapsed"
                 unique-opened router>
            <template v-for="(item,index) in nav">
                <!-- 二级菜单 -->
                <el-submenu :index="index+''"
                            v-if="item.children && item.children.length > 0">
                    <!-- 二级菜单顶级 -->
                    <template slot="title">
                        <i :class="['icon',item.iconCls]"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <!-- 二级菜单下级 -->
                    <el-menu-item-group>
                        <!--<span slot="title">{{item.name}}</span>-->
                        <!-- && child.url-->
                        <template v-for="child in item.children">
                            <!--无三级菜单-->
                            <el-menu-item
                                    :index="child.url"
                                    :key="child.url"
                                    v-if="!child.children">
                                {{child.name}}
                            </el-menu-item>
                            <!--有三级菜单-->
                            <el-submenu
                                    :index="child.url"
                                    :key="child.url"
                                    v-if="child.children">
                                <span slot="title">{{child.name}}</span>
                                <el-menu-item v-for="subChild in child.children"
                                              :index="subChild.url"
                                              :key="subChild.url">
                                    {{subChild.name}}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 一级菜单 -->
                <el-menu-item v-if="!item.children"
                              :index="item.url">
                    <i :class="['icon',item.iconCls]"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
    
            </template>
        </el-menu>
    </aside>
<!-- ... -->
</template>

<script>
    export default {
        // ...
        computed: {
          // 从 Vuex 中获取导航菜单
          nav() {
            return this.$store.state.nav;
          }
        }
        // ...
    }
</script>
```

#### 路由切换前进行鉴权

	在每个路由中都添加了 meta 属性，用于判断权限(鉴权)

``` js
/* 
	定义路由
 */
// ...
// 系统管理
{
path: '/system',
component: Main,
name: '系统管理',
redirect: '/system/organization',
children: [{
  path: '/system/organization',
  component: () => import ('@/views/System/Organization.vue'),
  name: '组织结构',
  // requiresAuth 用于确认此地址是否需要验证
  // alias 用于获取后端返回rbac权限对应的前端路由地址和导航菜单图标
  meta: {requiresAuth: true, alias: 'Pmsadmin/Oragnize/list'}
},
  {
    path: '/system/user',
    component: () => import ('@/views/System/User.vue'),
    name: '人员管理',
    redirect: '/system/user/index',
    children: [
    {
      path: '/system/user/index',
      component: () => import ('@/views/System/UserList.vue'),
      name: '职员列表',
      meta: {requiresAuth: true, alias: 'Pmsadmin/Admin/list'}
    }
    ]
  },
  {
    path: '/system/auth',
    component: () => import ('@/views/System/Auth.vue'),
    name: '角色管理',
    meta: {requiresAuth: true, alias: 'Pmsadmin/Role/list'}
  }
]
}
// ...


/* 
	在路由钩子beforeEach 全局路由守卫方法中进行权限逻辑判断
 */

router.beforeEach((to, from, next) => {
  document.title = `${configs.title} - ${to.name}`;
  const {hasAuth, auth} = store.state.user;
  // 未拿到权限，则获取
  if (!hasAuth) {
    store.dispatch('getUserAuth');
    console.log('重新获取用户权限');
    // next();
  }
  // 如果未登录，跳转
  if (window.localStorage.getItem('IS_LOGIN') === null && to.path !== '/login') {
    console.log('未登录状态');
    next({
      path: '/login',
      query: {redirect: to.fullPath}
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  } else {
    // 需要鉴权的路由地址
    console.log(to, auth.indexOf(to.meta.alias), auth);
    if (to.meta.requiresAuth) {
      if (auth.indexOf(to.meta.alias) > -1) {
        console.log('有权限进入');
        next();
      } else {
        if(auth.length > 0) {
          Message.error({
            message: '当前用户权限不足，无法访问',
            showClose: true,
          });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  }
});
```

#### 后端方面返回数据

``` js
{
    "status": 200,
    "info": "数据查询成功！",
    "param": {
		// 这个表示菜单数据
        "nav": {
            "1": {
                "name": "系统管理",
                "url": "",
                "children": [
                    {
                        "name": "组织结构",
                        "url": "Pmsadmin/Oragnize/list"
                    },
                    {
                        "name": "人员管理",
                        "url": "Pmsadmin/Admin/list"
                    },
                    {
                        "name": "角色管理",
                        "url": "Pmsadmin/Role/list"
                    },
                    {
                        "name": "日志管理",
                        "url": "Pmsadmin/Log/record"
                    }
                ]
            },
            "61": {
                "name": "广告位",
                "url": "",
                "children": [
                    {
                        "name": "广告位列表",
                        "url": "Pmsadmin/Place/list"
                    }
                ]
            }
        },
		// 用户权限信息
        "auth": [
            "系统管理",
            "Pmsadmin/Oragnize/list",
            "Pmsadmin/Admin/list",
            "Pmsadmin/Role/list",
            "Pmsadmin/Log/record",
            "广告位",
            "Pmsadmin/Place/list"
        ]
    }
}
```

> [参考实例代码](https://github.com/kfw001/admin-auth)

> 参考：[利用 Vue.js 实现前后端分离的RBAC角色权限管理](https://segmentfault.com/a/1190000011152257)
