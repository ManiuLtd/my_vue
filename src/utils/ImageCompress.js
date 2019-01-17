/**
 *  图片压缩工具类
 *  1. 图片 > 800k 进行压缩，压缩质量为 50%
 *  2. 宽 > 720px, 进行图片宽高等比压缩
 * */
export default class ImageCompress {

  /**
   * @param ext 图片后缀，必填， 转base64位的时候需要
   * @param quality 图片压缩质量
   * */
  constructor(file, newWidth = 720, quality = 0.6){
    this.file = file;
    // quality值越小，所绘制出的图像越模糊
    this.quality = quality;  // 默认图片质量为1
    this.newWidth = newWidth;
  }

  compress(callback){
    let reader = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    reader.readAsDataURL(this.file);
    reader.onload = ()=>{
      let re = reader.result;
      this.canvasData(re,callback)
    }
  }

  async canvasData(path,callback){
    let img = new Image();
    img.src = path;
    img.onload = ()=>{
      let that = img;
      // 默认按比例压缩
      let w = that.width;
      let h = that.height;
      // let scale = w / h;
      // if(w > this.newWidth){
      //   w = this.newWidth;
      //   h = this.newWidth / scale;
      // }
      //生成canvas
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = w;
      let anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 回调函数返回base64的值
      let base64 = canvas.toDataURL(this.file.type, this.quality);
      callback(base64);
    }
  }

}
