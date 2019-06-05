# E2E单元测试之nightwatch自动化测试框架

## 描述

* nightwatch是一个基于Selenium WebDriver API的e2e自动化测试框架， 可以使用js方法与css选择器来编写运行在Selenium服务器上的端到端测试

* 这是一款 Test Runner 来着， 它负责读取我们的测试脚本， 为我们提供 API 来操作浏览器， 帮我们控制 Selenium

* 是一个老牌的 e2e 测试工具, 中文名**"守夜者"**, 使用 W3C WebDriver API 协议来驱动浏览器

* WebDriver 是各大浏览器都实现的通用标准, 这也使得它的兼容性特别好, 支持各大浏览器

## 特点

* 语法简洁干净
* 支持CSS选择器和XPath选择器， 只要编写的测试用例符合规范， 就无须再初始化其他对象和类。 
* 内置命令行测试运行器， 可以按组或单个运行测试。 
* 可以持续集成
* 易扩展

## API

> [在线文档](http://nightwatchjs.org/)

#### Expect

* Expect是0.7版本的时候引入的一种BDD（行为驱动测试）风格的接口， 也是为了执行断言， 使用链式的语法， 和直接的断言相比， expect读起来更加语义化， 就像写句子（但是单词之间用的. 连接的）
	* this.demoTest = function (browser) {

		* browser.expect.element('#main').to.be.present;
		* browser.expect.element('#main').to.be.visible;
		* browser.expect.element('#main').to.have.css('display').which.does.not.equal('block');
		* browser.expect.element('#q').to.be.an('input');
		* browser.expect.element('body').to.not.have.attribute('data-attr');

	* }; 
	* <div class="se-preview-section-delimiter"></div>
* Expect提供的语言连词不直接进行断言（真正的断言是末尾的那个词）， 可以随意组合， 顺序不影响结果。 
	* to 、 be 、 been 、 is 、 that、 which、 and、 has、 have、 with、 at、 does

#### Assert

* Assert这部分包含两套有同样方法的方法库： assert和verify， 其中， 若是当前执行的断言没有成功， assert会停止执行剩余的断言并立即结束， verify会打印错误日志然后继续淡定的执行接下来的断言

```js
browser
    .url(devServer)
    .waitForElementVisible('body', 2000)
    .assert.attributeContains('body', 'class', 'directory') // 属性值
    .assert.elementPresent('input') // 有当前元素
    .assert.attributeEquals('#search', 'placeholder', 'Search') // 属性值
    .assert.cssProperty('#search', 'position', 'fixed') // CSS属性值
    .assert.elementPresent('#wrapper')
    .end() <
    div class = "se-preview-section-delimiter" > < /div>
```

* Commands用来在页面上执行一些命令比如点击、 关掉当前窗口、 清除cookie、 获取到某元素的值等

```js
this.demoTest = function(browser) {
    browser.click("#main ul li a.first", function(response) {
        this.assert.ok(browser === this, "Check if the context is right.");
        this.assert.ok(typeof response == "object", "We got a response object.");
    });
    browser.clearValue('input\[type=text\]');
    browser.pause(1000);
    browser.saveScreenshot('/path/to/fileName.png');
    browser.closeWindow();
};
```

* WebDriver Protocol

## nightwatch安装

	由于nightwatch需要Selenium才能工作， 所以这两样东西我们要一起安装(vue - cli安装时会提示， 如果选y会自动安装)

```bash
npm install selenium-server

npm install nightwatch
```

!> tips： 由于selenium是java服务， 要想启动必须安装jdk， 且版本必须大于等于1.8！ ！ ！ （selenium3.0以上需大于等于1.8， 2.0可以无视）

## Selenium + Nightwatch 自动化测试环境搭建

#### 必要环境

1. 首先要安装 Java 7 或更高 ， ([http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)) 并且 java 命令可正常执行才能测试噢~~ 最简单的判断方法就是打开自己的终端， 输入 java 并回车， 看看是不是有 Java 运行

2. [Node. JS](https://nodejs.org/en/download/) , 而且要确保 npm 命令可用

#### 创建项目

	新建一个目录， 起名为 "my-test-toolkit"，
	然后在目录内使用终端运行 npm init - y 生成项目配置文件package.json

1. 安装 Selenium 与 Nightwatch

* 安装 selenium-standalone

```bash
npm install selenium-standalone --save-dev
```

* 安装 Nightwatch

```bash
npm install nightwatch --save-dev
```

#### 项目配置

###### 配置 Nightwatch

1. 在项目根目录建立文件 "nightwatch.json"， 这个文件用来存放 Nightwatch 的配置信息。 创建完毕之后， 在文件内写入以下内容： 

```json
{
	"src_folders": ["tests"],
	"output_folder": "reports",
	"custom_commands_path": "",
	"custom_assertions_path": "",
	"page_objects_path": "",
	"globals_path": "",
	"selenium": {
		"start_process": true,
		"server_path": "",
		"log_path": "",
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.chrome.driver": ""
		}
	},
	"test_settings": {
		"default": {
			"launch_url": "http://localhost",
			"selenium_port": 4444,
			"selenium_host": "localhost",
			"silent": true,
			"screenshots": {
				"enabled": false,
				"path": ""
			},
			"desiredCapabilities": {
				"browserName": "firefox",
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		},
		"chrome" : {
			"desiredCapabilities": {
			"browserName": "chrome",
			"javascriptEnabled": true,
			"acceptSslCerts": true
			}
		}
	}
}
```

> nightwatch.json 的文件名是 不可以 修改的， 因为 Nightwatch 每次启动的时候都是从它读取配置

2. 接着在项目根目录下创建文件 "nightwatch.conf.js" ， 同样此文件名也是不可以修改的， 因为 Nightwatch 每次启动也会从它这里读取配置

```js
const path = require('path')
module.exports = (function(settings) {
    return settings;
})(require('./nightwatch.json'))
/*
 *  Nightwatch 会从 nightwatch.json 中读取配置。
 *  不过如果存在 nightwatch.conf.js，将会变为首先从后者中读取配置。
 *  nightwatch.conf.js 存在的意义是使用 JavaScript 动态生成配置信息。
 *  如果配置信息是不需要代码修改的，直接使用 nightwatch.json 就可以啦。
 */
```

3. 再次在项目根目录建立文件 "startup.js"， 然后在文件内部写入

```js
require('nightwatch/bin/runner.js')
// 这个文件就是我们测试的入口文件，以后我们要执行测试就要运行这个文件，命令为 node ./startup。入口文件的名字是可以按照喜好更改的，只要运行它就好啦。不过每次输入 node ./startup 太麻烦了，所以我们将这条命令写入 npm scripts 中 ~~~ 打开 "package.json"，在 JSON 对象中建立 "script" 属性，并写入内容：
{
    ...
    "scripts": {
        "start": "node ./startup.js"
    },
    ...
}
```

> 以后每次运行测试只要在项目根目录中执行 npm start 就好了

###### 配置 Selenium

	Selenium 是自动化测试环境， 它提供了测试服务器、 启动浏览器、 网页自动操作等功能， 同时暴露 API 给 Nightwatch 供我们使用

> 接下来将要告诉 Nightwatch 我们的 Selenium 安装在哪里， 启动浏览器的 Driver 程序在哪里， 然后建立 Selenium 的安装脚本与手工启动脚本， 以便不时之需

	

* Driver 是让 Selenium 打开系统上已安装的浏览器的程序。 

1. 建立 Selenium 的配置信息

	在项目根目录下建立文件夹 "build"，
	并在其中创建文件 "selenium-conf.js"

**并写入如下信息**

```js
const process = require('process');

module.exports = {
    // Selenium 的版本配置信息。请在下方链接查询最新版本。升级版本只需修改版本号即可。
    // https://selenium-release.storage.googleapis.com/index.html
    selenium: {
        version: '2.53.1',
        baseURL: 'https://selenium-release.storage.googleapis.com'
    },
    // Driver 用来启动系统中安装的浏览器，Selenium 默认使用 Firefox，如果不需要使用其他浏览器，则不需要额外安装 Driver。
    // 在此我们安装 Chrome 的 driver 以便使用 Chrome 进行测试。
    driver: {
        chrome: {
            // Chrome 浏览器启动 Driver，请在下方链接查询最新版本。
            // https://chromedriver.storage.googleapis.com/index.html
            version: '2.22',
            arch: process.arch,
            baseURL: 'https://chromedriver.storage.googleapis.com'
        }
    }
}
```

> 本配置信息包含 Selenium 本体配置与 Driver 配置。 我们将在稍后动态载入这些配置。  本文件的目的是为了更好管理 Selenium 的版本

2. 告诉 Nightwatch， 我的 Selenium 与 Driver 在哪里

	再次打开项目根目录下的 "nightwatch.conf.js"
	文件， 并这样编辑

```js
const seleniumConfig = require('./build/selenium-conf')
const path = require('path')

module.exports = (function(settings) {

    // 告诉 Nightwatch 我的 Selenium 在哪里。 
    settings.selenium.server_path = `${path.resolve()}/node_modules/selenium-standalone/.selenium/selenium-server/${seleniumConfig.selenium.version}-server.jar` 
    // 设置 Chrome Driver, 让 Selenium 有打开 Chrome 浏览器的能力。 
    settings.selenium.cli_args['webdriver.chrome.driver'] = `${path.resolve()}/node_modules/selenium-standalone/.selenium/chromedriver/${seleniumConfig.driver.chrome.version}-${seleniumConfig.driver.chrome.arch}-chromedriver` 
    return settings;

})(require('./nightwatch.json'))
```

3. 建立 Selenium 安装脚本， 一键安装 Selenium

	selenium - standalone 只是用来安装和管理 Selenium 的工具么？ 所以现在是时候用它来安装 Selenium 了。 我们将通过调取 selenium - standalone 的内置方法来实现自动安装。 在 "build"
	文件夹中建立文件 "selenium-setup.js"

**并写入如下信息**

```js
const selenium = require('selenium-standalone')
const seleniumConfig = require('./selenium-conf.js')

selenium.install({
    version: seleniumConfig.selenium.version,
    baseURL: seleniumConfig.selenium.baseURL,
    drivers: seleniumConfig.driver,
    logger: function(message) {
        console.log(message)
    },
    progressCb: function(totalLength, progressLength, chunkLength) {}
}, function(err) {
    if (err) {
        throw new Error( `Selenium 安装错误: ${err}` );
    }
    console.log('Selenium 安装完成.');
}
})
```

* 同样为了方便， 我们将安装命令写入 npm scripts 中： 

```json
{
	...
	"scripts": {
		"start": "node ./startup.js",
		"selenium-setup": "node ./build/selenium-setup.js"
	},
	...
}
```

* 然后在项目根目录执行 npm run selenium-setup 安装 Selenium.
* 当提示安装完成后
* Selenium 与其 Driver 会安装到 "node_modules/selenium-standalone/.selenium" 中

###### 目录结构

```bash
| -- build
|      | -- selenium-conf.js        # Selenium 版本信息配置。
|      | -- selenium-setup.js       # Selenium 安装命令脚本。
|      | -- selenium-start.js       # Selenium 启动命令脚本。
|
| -- nightwatch.conf.js             # Nightwatch 动态配置文件。
| -- nightwatch.json                # Nightwatch 配置文件。
| -- package.json                   # 项目信息配置文件。
| -- startup.js                     # 测试启动入口文件。
```

!> 注意 "desiredCapabilities" 下的 "browserName" 项

	这是测试时将使用的浏览器， 可以修改为 chrome、 internet explorer、 phantomjs， 这里在介绍时只安装了 Chrome 的 Driver， 如果需要使用其他浏览器， 要安装相应的 Driver 才可以正常使用
	默认浏览器为 Firefox， 如果使用 Firefox 的话， 不需要额外进行 Driver 的配置
	所以， 如果需要使用 Chrome 的话要将 "browserName"
	修改为 "chrome"

![](https://img.mubu.com/document_image/20e7b5dc-2481-4839-8963-c1dd5c3c234a-1337009.jpg)

#### 编写测试用例

###### 编写一个简单的测试用例

	在 "tests"
	目录中建立一个测试用例文件 "demo.js"

1. 这个 Demo 将打开 Bing， 搜索 "what is microsoft"， 然后保存成截图后退出

2. 打开 "demo.js"， 添加以下内容： 

```js
module.exports = {
    'Find the answer.': function(client) {
        // TODO...
    }
}
```

> module.exports 导出一个对象， 对象的 Key 即为测试用例名称， 可以编写多个测试用例， Nightwatch 将依次执行
> client 是代码运行时 Nightwatch 提供的对象， 所有对浏览器进行的操作都将使用此对象调取
> 比如 client.click("CSS Selector")、 client.getCookie(function () {...})， 可以简单理解为 Selenium 的控制软件

3. 具体代码

```js
module.exports = {
    'Find the answer.': function(client) {
        // 定义 Bing 页面中的节点.
        const searchInput = '#sb_form_q'
        const searchBtn = '#sb_form_go'
        const question = 'what is microsoft'
        // 启动浏览器并打开 bing.com.
        client.url('http://bing.com').maximizeWindow()
        // 确保 "body" 和输入框可以使用.
        client.expect.element('body').to.be.present
        client.expect.element(searchInput).to.be.visible
        client.pause(2000) // 稍等两秒.
        // 输入 "what is microsoft" 然后搜索.
        client.setValue(searchInput, question)
        client.click(searchBtn)
        client.pause(2000)
        // 截一张图然后保存到 "reports/answer.png".
        client.expect.element('body').to.be.present
        client.saveScreenshot('reports/answers.png')
        client.end()
    }
}
```

###### 编写另一个简单的测试用例

> 这个 demo 将打开 Bilibili 直播 ， 然后执行以下步骤

1. 打开首页并等待加载完毕； 
2. 检查登陆按钮是否存在； 
3. 点击登陆按钮； 
4. 填写用户名与密码； 
5. 点击登陆； 
6. 等待页面加载； 
7. 通过 Cookie 检查是否已登陆； 
8. 确保登陆后的用户导航面板存在； 
9. 鼠标移至头像处打开导航面板； 
10. 点击退出登陆； 
11. 等待页面刷新后检查 Cookie 是否已退出登陆； 
12. 结束测试。 

**代码**

```js
// Account setting.
const accountConfig = {
    username: 'USERNAME',
    password: 'PASSWORD',
    uid: '10000'
}
module.exports = {
    'Bilibili Live Login Test': function(client) {
        client.url('http://live.bilibili.com').maximizeWindow()
        // Page Init.
        client.expect.element('body').to.be.present.before(3000)
        client.expect.element('.top-nav-login-btn.last').to.be.visible
        // Login.
        client.click('.top-nav-login-btn.last')
        client.waitForElementVisible('#bilibili-quick-login', 2000)
        client.frame(0)
        client.pause(2000)
        client.setValue('#login-username', accountConfig.username)
        client.setValue('#login-passwd', accountConfig.password)
        client.click('#login-submit')
        // Wait and check page has been reloaded.
        client.frameParent()
        client.pause(4000)
        client.expect.element('body').to.be.present.before(3000)
        // Check cookies to ensure we are signed in.
        client.getCookies(function(result) {
            result.value.forEach((value, index, array) => {
                if (value.name === 'DedeUserID') client.assert.equal(parseInt(value.value, 10), accountConfig.uid)
            })
        })
        // Move to User Avatar.
        client.expect.element('.user-avatar-link').to.be.visible
        client.moveToElement('.user-avatar-link', 5, 5)
        client.pause(800)
        client.expect.element('#top-nav-user-panel').to.be.visible
        // Logout.
        client.click('#top-nav-logout-link')
        client.pause(5000)
        client.expect.element('body').to.be.present.before(3000)
        // Check cookies again to ensure we are off.
        client.getCookies(function(result) {
            var logout = true
            result.value.forEach((value, index, array) => {
                if (value.name === 'LIVE_LOGIN_DATA') logout = false
            })
            client.assert.equal(logout, true)
        })
        client.pause(1000)
        client.end()
    }
}
```

## nightwatch实现vue应用e2e测试

#### 依赖

	vue - cli 目前依赖的还是 Nightwatch @0 .9.x
	vue - cli 安装的 Nightwatch 会依赖一个 Selenium Server, 一个 java 程序

	
![](https://img.mubu.com/document_image/db9e8847-28a8-48e3-893f-dd45c680fe54-1337009.jpg)
	

3. Nightwatch@1.0 可以直接驱动浏览器, 因此我们直接安装 Nightwatch@1.0 即可, 无需 Selenium Server

```bash
npm install nightwatch@1.0.8
```

#### 目录(vue-cli会自动生成该文件夹)

```bash
├── e2e
│   ├── custom-assertions
│   │   └── elementCount.js 自定义的断言方法
│   ├── nightwatch.conf.js nightwatch的配置文件
│   ├── reports
│   │   ├── CHROME_61.0.3163.100_Windows NT_edit.xml
│   │   └── CHROME_61.0.3163.100_Windows NT_test.xml
│   ├── runner.js  用来起服务
│   └── specs
│       └── test.js 测试用例
```

#### vue-cli 中选择使用 e2e tests

	vue - cli 会自动帮我们安装 selenium - server 和 chromedriver 等必要工具
	哪怕你完全不懂 selenium, chromedriver 这些工具也可以尽情的写 e2e 测试, 开箱即用

**在 vue-cli@3.0 中添加 Nightwatch**

```bash
vue add @vue/e2e-nightwatch
```

**运行 e2e 测试**

```bash
vue-cli-service test:e2e
```

#### nightwatch.conf.js--配置文件

**mini**

```js
module.exports = {
    "webdriver": {
        "server_path": "/usr/bin/safaridriver", // 浏览器 driver 的 bin 执行路径
        "start_process": true, // 需要启动 driver
        "port": 9515 // driver 启动的端口, 一般是 9515 或 4444
    },
    "test_settings": {
        "default": {
            "desiredCapabilities": {
                "browserName": "safari" // 浏览器的名字叫 safari
            }
        }
    }
}
```

**例**

```js
require('babel-register')
var config = require('../../config')
module.exports = {
    src_folders: ['test/e2e/specs'], // 测试用例存放目录
    output_folder: 'test/e2e/reports', // 测试报告存放目录
    custom_assertions_path: ['test/e2e/custom-assertions'], // 自定义断言方法存放地址
    selenium: {
        start_process: true,
        server_path: require('selenium-server').path, // selenium服务的地址
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path // webDriver的地址，可以添加多个，这里只用了chrome的
        }
    },
    test_settings: {
        default: {
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            globals: {
                devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        }
    }
}
```

#### 启动服务的js--runner.js

```js
process.env.NODE_ENV = 'testing'
var server = require('../../build/dev-server.js')
server.ready.then(() => {
    // 1. start the dev server using production config
    // 2. run the nightwatch test suite against it
    // to run in additional browsers:
    //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
    //    2. add it to the --env flag below
    // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox` 
    // For more information on Nightwatch's config file, see
    // http://nightwatchjs.org/guide#settings-file
    var opts = process.argv.slice(2)
    if (opts.indexOf('--config') === -1) {
        opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js'])
    }
    if (opts.indexOf('--env') === -1) {
        opts = opts.concat(['--env', 'chrome'])
    }
    var spawn = require('cross-spawn')
    var runner = spawn('./node_modules/.bin/nightwatch', opts, {
        stdio: 'inherit'
    })
    runner.on('exit', function(code) {
        server.close()
        process.exit(code)
    })
    runner.on('error', function(err) {
        server.close()
        throw err
    })
})
```

#### 测试用例--specs文件夹中都是测试用例

**simpleTest**

```js
module.exports = {
    'Basic e2e Test'(browser) {
        browser
            .url('http://so.com') // 打开 so.com 网页
            .waitForElementVisible('body') // 确认能看到 body 元素
            .setValue('#input', 'Nightwatch') // 在搜索框输入 Nightwatch
            .click('#search-button') // 点击搜索
            .pause(1000) // 等待1秒钟
            .assert.containsText('#container', 'Nightwatch') // 查询结果包含 Nightwatch
            .end()
    }
}
```

**测试结果： 通过**

![](https://img.mubu.com/document_image/ac3cb482-4014-41cb-b773-546523d55979-1337009.jpg)

**举个例子test.js**

```js
module.exports = {
    'default e2e tests': function(browser) {
        const devServer = browser.globals.devServerURL
        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            // 查看有否搜索框，并且赋值
            .assert.elementPresent('input')
            .setValue('input', 'j')
            // 查看有否搜索按钮，并且点击
            .assert.elementPresent('.contact-list-wrap:nth-child(1) button')
            .pause(1000)
            .click('.contact-list-wrap:nth-child(1) button')
            .pause(1000)
            // 查看搜索后的第一项
            .assert.elementPresent('.el-table')
            .click('.el-table .el-table__row:nth-child(1)')
            .pause(3000)
            // 3秒后关闭弹窗
            .click('.el-dialog__close')
            .pause(3000)
            // 3秒后点击删除
            .click('.el-table .el-table__row:nth-child(1) .el-button--default')
            .pause(1000)
            // 1秒后取消删除
            .click('.el-message-box__btns .el-button--default')
            .pause(3000)
            // 3秒后点击删除
            .click('.el-table .el-table__row:nth-child(1) .el-button--default')
            .pause(1000)
            // 1秒后确认删除
            .click('.el-message-box__btns .el-button--primary')
            .pause(5000)
            .end()
    }
}
```

#### 调用命令 node test/e2e/runner.js即可启动服务， 等几秒后， 会自动打开chrome进行测试

> [关于测试的前端页面可以看这里](http://www.cnblogs.com/junhua/p/7675811.html)

	
![](https://img.mubu.com/document_image/c64b59c3-9879-44c9-a39e-6e4c18801584-1337009.jpg)

	

> [nightwatch实现vue应用e2e测试](https://www.cnblogs.com/junhua/p/7772246.html)
> [Selenium + Nightwatch 自动化测试环境搭建](https://www.cnblogs.com/saryli/p/6861864.html)

!> Nightwatch@1.0 可以直接驱动浏览器, 因此我们直接安装 Nightwatch@1.0 即可, 无需 Selenium Server