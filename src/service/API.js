/** 定义所有接口地址*/
export const BASEURL = process.env.API_URL;
export const LOGIN = BASEURL + "/dologin";  //登录
export const SEND_CHECKCODE = BASEURL + "/check_code";  //发送验证码
export const REG_PARTNER = BASEURL + "/admin/reg/partner.html";  //商户注册
export const FORGETPWD = BASEURL + "/admin/user/forget_pwd.html";  //忘记密码
export const SET_LOGIN_PASS = BASEURL + "/admin/user/set_pwd.html";  //设置登录密码
export const ORDER_TOTAL_PARTNER_PAY = BASEURL + '/statis/order_total_partner_pay'; // 商户的订单交易统计
export const ORDER_TOTAL_NUM = BASEURL + '/statis/order_total_num'; // 订单统计
export const PARTNER_LINK_MAN = BASEURL + "/partner/partner-link-man.html";  //修改获取商户联系人
export const DEL_PARTNER_LINK_MAN = BASEURL + "/partner/del-link-man.html";  //删除商户联系人
export const ADD_PARTNER_LINK_MAN = BASEURL + "/partner/add-partner-link-man.html";  //添加商户联系人
export const PARTNER_ACCEPT_INFO = BASEURL + "/partner/partner-accept-info.html"; // 受理人信息
export const PARTNER_DEBT_INFO = BASEURL + "/partner/partner-debt-info.html";  //修改获取用户负债信息
export const SHOP_SETUP = BASEURL + "/shop/wap_setup.html";  //创建店铺
export const PARTNER_INFO = BASEURL + '/shop/partner_info.html'; //店铺管理信息
export const BANK_MANAGE = BASEURL + '/partner/bank-manage.html'; //银行卡管理信息
export const BANK_BIND_CONFIRM = BASEURL + '/partner/confirm-bind-card.html'; //银行卡管理信息
export const BANK_SEND_SMS = BASEURL + '/partner/confirm-bind-card-code.html'; //商户绑卡补发短信验证码
export const PARTNER_TIED_CARD_CHECKCODE = BASEURL + "/partner/check-tied-card-code.html";  // 绑卡短信验证
export const BANK_SET_DEFAULT_BANK = BASEURL + '/partner/set-default-bank.html'; //银行卡默认设置
export const BUSINESS_STATUS = BASEURL + '/partner/business-status.html'; //获取商户营业或停业
export const MESSAGE = BASEURL + '/admin/message.html'; //消息中心
export const LOGOUT = BASEURL +  "/logout"; //商户退出接口
export const CATE_OPTIONS = BASEURL + '/gcate/cate_options.html'; //获取商品分类
export const PARTNER_ASSET_INFO = BASEURL + "/partner/partner-asset-info.html"; // 商户资产
export const PARTNER_MANAGE_INFO = BASEURL + "/partner/partner-manage-info.html"; // 商户经营信息
export const PARTNER_DATURM_INFO = BASEURL + "/partner/partner-daturm-info.html"; // 商户上传资料获取修改
export const PARTNER_TRADE_INFO = BASEURL + "/partner/trade-info.html"; // 获取信贷系统行业数据
export const SHOP_COUPON_INFO = BASEURL + "/shop/coupon-info.html"; // 店铺优惠活动
export const EDIT_SHOP_COUPON_INFO = BASEURL + "/shop/coupon-edit.html"; // 编辑店铺优惠活动
export const DEL_SHOP_COUPON_INFO = BASEURL + "/shop/coupon-del.html"; // 编辑店铺优惠活动
export const SHOP_BASE_INFO = BASEURL + "/shop/base-info.html";
export const SHOP_DISTRIBUT_INFO = BASEURL + "/shop/distribut-info.html"; // 店铺配送信息
export const WAP_GEOGRAPHY_POSITION = BASEURL + "/wap/geography_position.html"; // 获取城市列表
export const CERTIFICATION = BASEURL + '/partner/baseinfo.html'; //商户实名认证&商户资料提交
export const PARTNER_BASE_INFO = BASEURL + '/partner/partner-base-info.html'; //商户基本信息修改
export const GOODS_LIST = BASEURL + '/goods/goods_list.html'; //商品列表页信息
export const GOODS_EDIT_SPEC_PRICE = BASEURL + "/goods/edit_spec_price.html";  //添加编辑商品规格
export const BANK_INFO = BASEURL + '/partner/bank_info.html'; //银行卡号获取开户行接口
export const ATTRIBUTE_DATA = BASEURL +  '/goods/get_attr_data.html';  // 获取一级分类属性
export const DEL_IAMGE = BASEURL +  '/upload/del.html';  // 删除图片接口
export const message_remind = BASEURL +  '/admin/message_remind.html';  // 获取消息通知，未读消息数量接口
export const READ_MULTIMSG = BASEURL + '/admin/read_multimsg.html'; //设置首页通知已读
export const ORDER_LIST = BASEURL + '/order/list'; //订单列表
export const GOODS_BRANDS = BASEURL + '/goods/brands.html';   //获取商品品牌
export const PARTNER_WALLET = BASEURL + '/partner/wallet.html';   //我的钱包页面
export const PARTNER_CASH_WITHDRAWAL = BASEURL + '/partner/cash-withdrawal.html';   //商户提现页面
export const PARTNER_VERIFY_PASSWD = BASEURL + '/partner/verify-trader-passwd.html';   //验证交易明细
export const GOODS_TRANSACTION_DETAIL = BASEURL + '/order/transaction/detail.html';   //获取商户交易明细
export const PARTNER_MODIFY_PASSWD = BASEURL + '/partner/modify-trader-passwd.html';   //修改交易明细
export const WEIXIN_USER = BASEURL + '/wechat/user_info.html';   //微信绑定
export const PARTNER_HAS_TRADE_PASSWD = BASEURL + '/partner/has-trade-passwd.html';   // 商户是否有交易密码
export const SET_UP_TRADER_PASSWD = BASEURL + '/partner/set-up-trader-passwd.html';   // 设置/找回交易密码
export const MODIFY_TRADER_PASSWD = BASEURL + '/partner/modify-trader-passwd.html';   // 修改交易密码
export const PARTNER_MEMBERS = BASEURL + '/partner/members.html';   //推广赚佣金--会员管理
export const PARTNER_CASH_BENEFITS = BASEURL + '/partner/cash-benefits.html';   //推广赚佣金--现金福利
export const FEED_ADD = BASEURL + '/feed/add.html';   //帮助与反馈
export const ADD_EDIT_SPEC = BASEURL + '/goods/edit_goods_pro.html';   //添加｜编辑商品规格
