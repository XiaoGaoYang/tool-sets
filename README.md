# voice-machine

## 一、安装

#### 方法一

+ 直接安装[打包好的apk文件](https://yunpan.cn/ckZECRVhiDZFa)(访问密码 **4704**)

#### 方法二

+ 本项目采用react-native框架构建，首先需要[安装react-native环境](http://reactnative.cn/docs/0.31/getting-started.html#content)
+ 进入项目根目录
+ 执行`npm install`命令，安装项目中用到的模块
+ 由于项目中用到的一个模块`react-native-voise`过于老旧，不适应新版本的`react-native`，所以需要下载这里提供的[修改过后的文件](https://yunpan.cn/cMIn6g6cgnvhk)（访问密码 **13bf**）替换掉`node_modules/react-native-voise`文件夹下的内容
+ 执行`react-native start`命令运行Packger，将资源进行打包
+ 执行`react-native run-android`命令编译并安装应用到手机上

## 二、功能

#### 已实现

+ 聊天窗口界面
+ 使用百度语音API进行语音识别
+ 使用图灵机器人API进行基本的对话
+ 将对话记录进行存储
+ 实现页面间切换
+ 添加"再按一次退出应用"提示
+ 功能选择界面
+ 设置界面
+ 清除聊天记录功能
+ 快递查询功能

#### 未实现

+ 图片本地存储
+ 豆瓣高分电影推荐
+ 图书馆书籍查询
+ 等等……

#### 未解决问题

+ `ToastAndroid.show()`的`duration`参数无效

## 三、使用截图

+ 天气查询与笑话  
<img src="./screenshots/3.png" alt="天气查询" width="300">

+ 英语翻译  
<img src="./screenshots/2.png" alt="英语翻译" width="300">

+ 语音识别  
<img src="./screenshots/1.png" alt="语音识别" width="300">