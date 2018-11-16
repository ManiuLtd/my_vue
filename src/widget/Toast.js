//Toast 组件
export default class Toast {

  constructor(msg ='',duration = 2000){
    this.msg = msg;
    this.duration = duration;
    this.initView();
  }

  initView(){
    this.toastView = document.createElement('div');
    this.toastView.innerHTML = this.msg;
    this.toastView.style.cssText = 'width: 60%;min-width: 150px;opacity: 0.7;height: 60px;color: rgb(255, 255, 255);' +
      'line-height: 60px;text-align: center;border-radius: 10px;position: fixed;top: 40%;left: 20%;' +
      'z-index: 999999;background: rgb(0, 0, 0);font-size: 16px;';
  }

  show(){
    document.body.appendChild(this.toastView);
    this.removeToast();
  }

  removeToast(){
    setTimeout(()=>{
       let d = 0.5;
       // 移除动画
       this.toastView.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
       this.toastView.style.opacity = '0';
       // 移除元素
       setTimeout(()=>{
         document.body.removeChild(this.toastView);
       },d * 1000);
     },this.duration);
  }
}
