# 青松云商商户版项目

## 项目说明
    青松云商商户版项目

## 安装说明
    1. clone 当前项目
    git clone https://code.aliyun.com/yishikejinew/merchant.git
    2. 开发分支创建拉取
    git checkout -b dev origin/dev
    3. 安装
    cnpm install
    4. 运行
    npm run dev
    5. 如若提示css错误，安装
    npm i vant -S

## 规范
    1. vue中使用 v-text ，代替 {{}} 这种方式，原因如下：
       a.加载，刷新时会闪烁这个双括号，然后再出数据
       b. 如果加载不出来，双括号，以及里面的内容会展示在页面上

## 测试账号信息
```
13693019404
123456
```
```
13693019433
123456
```
