let loadingView = require('./loading-view')

export default class Loading {

  constructor(content = '处理中 ...'){
    this.content = content;
    this.view = loadingView;
  }

  show(){
    if(!this.loadingView){
      this.loadingView = document.createElement('div');
      this.loadingView.innerHTML = this.view({
        content: this.content
      });
      document.body.appendChild(this.loadingView);
    }else{
      this.loadingView.style.display= 'block'
    }


  }

  close(){
    setTimeout(()=>{
      this.loadingView.style.display= 'none'
    },200);
  }
}
