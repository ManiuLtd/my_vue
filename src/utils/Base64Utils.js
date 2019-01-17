/**
 *
 * */
export default class Base64Utils{

  constructor(){}

  /**
   *
   * @param url 图片路径
   * @param ext 图片格式
   * @param callback 结果回调
   */
  getBase64Image(url, ext, callback) {
    let canvas = document.createElement("canvas");   //创建canvas DOM元素
    let ctx = canvas.getContext("2d");
    let img = new Image;
    img.src = url;
    img.onload = function () {
      canvas.height = img.width; //指定画板的高度,自定义
      canvas.width = img.height; //指定画板的宽度，自定义
      ctx.drawImage(img, 0, 0, img.width, img.height); //参数可自定义
      let dataURL = canvas.toDataURL("image/" + ext);
      callback.call(this, dataURL); //回掉函数获取Base64编码
      canvas = null;
    };
  }
}
