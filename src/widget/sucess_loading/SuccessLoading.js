let loadingView = require('./loading-view')

export default class SuccessLoading {

  constructor(content = '正在加载 ...'){
    this.content = content;
    this.view = loadingView;
  }

  show(){
    this.loadingView = document.createElement('div');
    this.loadingView.innerHTML = this.view({
      content: this.content
    });
    document.body.appendChild(this.loadingView);
    setTimeout(()=>{
      let d = 1;
      // 移除动画
      this.loadingView.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
      this.loadingView.style.opacity = '0';
      // 移除元素
      setTimeout(()=>{
        document.body.removeChild(this.loadingView);
      },200);
    },1000);
  }

  close(){

  }
}
