import Vue from 'vue'
import Router from 'vue-router'

const StoreSelectTime = r => require.ensure([], () => r(require('../page/StoreSelectTime')), 'StoreSelectTime');
const AddActivity = r => require.ensure([], () => r(require('../page/AddActivity')), 'AddActivity');
const CreateStore = r => require.ensure([], () => r(require('../page/CreateStore')), 'CreateStore');
const Category = r => require.ensure([], () => r(require('../page/Category')), 'Category');
const Brand = r => require.ensure([], () => r(require('../page/Brand')), 'Brand');
const Trade = r => require.ensure([], () => r(require('../page/Trade')), 'Trade');
const GoodsCat = r => require.ensure([], () => r(require('../page/GoodsCat')), 'GoodsCat');
const Spec = r => require.ensure([], () => r(require('../page/Spec')), 'Spec');
const SpecEdit = r => require.ensure([], () => r(require('../page/SpecEdit')), 'SpecEdit');
const Register = r => require.ensure([], () => r(require('../page/Register')), 'Register');
const Login = r => require.ensure([], () => r(require('../page/Login')), 'Login');
const ForgetPwd = r => require.ensure([], () => r(require('../page/ForgetPwd')), 'ForgetPwd');
const Main = r => require.ensure([], () => r(require('../page/Main')), 'Main');
const Home = r => require.ensure([], () => r(require('../page/Home')), 'Home');
const Order = r => require.ensure([], () => r(require('../page/Order')), 'Order');
const Mine = r => require.ensure([], () => r(require('../page/Mine')), 'Mine');
const InviteCode = r => require.ensure([], () => r(require('../page/InviteCode')), 'InviteCode');
const DataStatistics = r => require.ensure([], () => r(require('../page/DataStatistics')), 'DataStatistics');
const StoreManage = r => require.ensure([], () => r(require('../page/StoreManage')), 'StoreManage');
const ShopList = r => require.ensure([], () => r(require('../page/ShopList')), 'ShopList');
const ShopMsg = r => require.ensure([], () => r(require('../page/ShopMsg')), 'ShopMsg');
const ShopMsgEdit = r => require.ensure([], () => r(require('../page/ShopMsgEdit')), 'ShopMsgEdit');
const ShopActive = r => require.ensure([], () => r(require('../page/ShopActive')), 'ShopActive');
const ShopActiveList = r => require.ensure([], () => r(require('../page/ShopActiveList')), 'ShopActiveList');   //  满减活动页面（满减活动列表）
const ShopActiveEdit = r => require.ensure([], () => r(require('../page/ShopActiveEdit')), 'ShopActiveEdit');   //  编辑满减活动页面
const ShopDb = r => require.ensure([], () => r(require('../page/ShopDistribution')), 'ShopDistribution');
const ShopDbTime = r => require.ensure([], () => r(require('../page/ShopDbTime')), 'ShopDbTime');
const ShopCreate = r => require.ensure([], () => r(require('../page/ShopCreate')), 'ShopCreate');
const AddShopSuccess = r => require.ensure([], () => r(require('../page/AddShopSuccess')), 'AddShopSuccess');
const AddProduct = r => require.ensure([], () => r(require('../page/AddProduct')), 'AddProduct');
const AddGoods = r => require.ensure([], () => r(require('../page/AddGoods')), 'AddGoods');
const GoodsEdit = r => require.ensure([], () => r(require('../page/GoodsEdit')), 'GoodsEdit');
const StoreInfo = r => require.ensure([], () => r(require('../page/StoreInfo/StoreInfo')), 'StoreInfo');  //商户资料
const RegisterSuccess = r => require.ensure([], () => r(require('../page/RegisterSuccess')), 'RegisterSuccess');  //注册成功页面
const StoreCertification = r => require.ensure([], () => r(require('../page/StoreCertification')), 'StoreCertification');  //注册成功页面
const ReviewProcessing = r => require.ensure([], () => r(require('../page/ReviewProcessing')), 'ReviewProcessing');  //认证中
const MessageCenter = r => require.ensure([], () => r(require('../page/MessageCenter')), 'MessageCenter');  //消息中心
const Setting = r => require.ensure([], () => r(require('../page/Setting')), 'Setting');  //设置页面
const StoreCode = r => require.ensure([], () => r(require('../page/StoreCode')), 'StoreCode');  //商家二维码页面
const DataStatisticsSelectTime = r => require.ensure([], () => r(require('../page/DataStatisticsSelectTime')), 'DataStatisticsSelectTime');  //数据统计 选择时间
const BasicInformation = r => require.ensure([], () => r(require('../page/StoreInfo/BasicInformation')), 'BasicInformation');  //基本信息
const BasicInformationEdit = r => require.ensure([], () => r(require('../page/StoreInfo/BasicInformationEdit')), 'BasicInformationEdit');  //基本信息
const AssetInfo = r => require.ensure([], () => r(require('../page/StoreInfo/AssetInfo')), 'AssetInfo');  //产品信息
const UploadData = r => require.ensure([], () => r(require('../page/StoreInfo/UploadData')), 'UploadData');  //上传资料
const UploadDataEdit = r => require.ensure([], () => r(require('../page/StoreInfo/UploadDataEdit')), 'UploadDataEdit');  //上传资料
const ManageInfo = r => require.ensure([], () => r(require('../page/StoreInfo/ManageInfo')), 'ManageInfo');  //经营信息
const LoanInfo = r => require.ensure([], () => r(require('../page/StoreInfo/LoanInfo')), 'LoanInfo');  //负债信息
const AcceptInfo = r => require.ensure([], () => r(require('../page/StoreInfo/AcceptInfo')), 'AcceptInfo');  //受理信息
const ContactInfo = r => require.ensure([], () => r(require('../page/StoreInfo/ContactInfo')), 'ContactInfo');  //联系人信息
const EditContactInfo = r => require.ensure([], () => r(require('../page/StoreInfo/EditContactInfo')), 'EditContactInfo');  //编辑联系人信息
const ContactList = r => require.ensure([], () => r(require('../page/StoreInfo/ContactList')), 'ContactList');  //联系人信息列表展示
const ContactDetails = r => require.ensure([], () => r(require('../page/StoreInfo/ContactDetails')), 'ContactDetails');  //联系人信息详情页
const ContactNothing = r => require.ensure([], () => r(require('../page/StoreInfo/ContactNothing')), 'ContactNothing');  //联系人信息详情页
const PropertyInfo = r => require.ensure([], () => r(require('../page/StoreInfo/PropertyInfo')), 'PropertyInfo');  //资产信息
const Certification = r => require.ensure([], () => r(require('../page/Certification')), 'Certification');  //实名认证
const BankCardManage = r => require.ensure([], () => r(require('../page/BankCardManage')), 'BankCardManage');  //银行卡管理
const OrderDetails = r => require.ensure([], () => r(require('../page/OrderDetails')), 'OrderDetails');  //订单详情
const OrderDetailsRemarks = r => require.ensure([], () => r(require('../page/OrderDetailsRemarks')), 'OrderDetailsRemarks');  //订单备注
const Address = r => require.ensure([], () => r(require('../page/Address')), 'Address');  //银行卡管理
const ReviewSuccess = r => require.ensure([], () => r(require('../page/ReviewSuccess')), 'ReviewSuccess');  //认证成功页面
const LoginSuccess = r => require.ensure([], () => r(require('../page/LoginSuccess')), 'LoginSuccess');  //登录成功页面
const ReviewFailure = r => require.ensure([], () => r(require('../page/ReviewFailure')), 'ReviewFailure');  //登录成功页面
const ReviewRefuse = r => require.ensure([], () => r(require('../page/ReviewRefuse')), 'ReviewRefuse');  //认证拒绝
const OrderTrack = r => require.ensure([], () => r(require('../page/OrderTrack')), 'OrderTrack');  //登录成功页面
const GoodDetails = r => require.ensure([], () => r(require('../page/GoodDetails')), 'GoodDetails');  //商品详情页面
const AddGoodSuccess = r => require.ensure([], () => r(require('../page/AddGoodSuccess')), 'AddGoodSuccess');  //商品添加成功页面
const ProductInfo = r => require.ensure([], () => r(require('../page/StoreInfo/ProductInfo')), 'ProductInfo');  //商品信息
const MineLoginPwd = r => require.ensure([], () => r(require('../page/MineLoginPwd')), 'MineLoginPwd');  //  我的 -- 设置登录密码页面
const PayPassword = r => require.ensure([], () => r(require('../page/PayPassword')), 'PayPassword');  //  我的 -- 设置交易密码页面(有交易密码情况[修改]、[忘记])
const PayPwdSet = r => require.ensure([], () => r(require('../page/PayPwdSet')), 'PayPwdSet');  //  我的 -- 设置交易密码页面(无交易密码情况)
const PayPwdSetInput = r => require.ensure([], () => r(require('../page/PayPwdSetInput')), 'PayPwdSetInput');  //  我的 -- 修改交易密码输入框
const PayPwdReviseInput = r => require.ensure([], () => r(require('../page/PayPwdReviseInput')), 'PayPwdReviseInput');  //  我的 -- 设置交易密码输入框
const TradePwd = r => require.ensure([], () => r(require('../page/TradePwd')), 'TradePwd');  //  我的 -- 修改交易密码页面
const WithdrawalsTip = r => require.ensure([], () => r(require('../page/WithdrawalsTip')), 'WithdrawalsTip');  //  我的钱包 -- 提现成功页面
const BaiduAddress = r => require.ensure([], () => r(require('../page/BaiduAddress')), 'BaiduAddress');  //  搜索位置页面
const Wallet = r => require.ensure([], () => r(require('../page/Wallet')), 'Wallet');  //  我的钱包
const BillingRecord = r => require.ensure([], () => r(require('../page/BillingRecord')), 'BillingRecord');  // 交易明细
const Withdraw = r => require.ensure([], () => r(require('../page/Withdraw')), 'Withdraw');  // 提现
const Feedback = r => require.ensure([], () => r(require('../page/Feedback')), 'Feedback');  // 帮助与反馈
const Promotion = r => require.ensure([], () => r(require('../page/Promotion')), 'Promotion');  // 推广赚现金
const AddBankCard = r => require.ensure([], () => r(require('../page/AddBankCard')), 'AddBankCard');  // 添加银行卡
const BankCardActivate = r => require.ensure([], () => r(require('../page/BankCardActivate')), 'BankCardActivate');  // 激活银行卡
const AddBankCardVeri = r => require.ensure([], () => r(require('../page/AddBankCardVeri')), 'AddBankCardVeri');  // 添加银行卡
const AddBankCardSuccess = r => require.ensure([], () => r(require('../page/AddBankCardSuccess')), 'AddBankCardSuccess');  // 添加银行卡成功
const MemberManagement = r => require.ensure([], () => r(require('../page/MemberManagement')), 'MemberManagement');  // 会员管理
const CashBenefit = r => require.ensure([], () => r(require('../page/CashBenefit')), 'CashBenefit');  // 现金福利
const ProductAttribute = r => require.ensure([], () => r(require('../page/ProductAttribute')), 'ProductAttribute');  // 现金福利
const ProductSpec = r => require.ensure([], () => r(require('../page/ProductSpec')), 'ProductSpec');  // 商品规格
//  协议部分
const RegisterAgreement = r => require.ensure([], () => r(require('../page/Arguments/RegisterAgreement')), 'RegisterAgreement');  //注册服务协议
const GoodsRelease = r => require.ensure([], () => r(require('../page/Arguments/GoodsRelease')), 'GoodsRelease');  //注册服务协议
const StoreService = r => require.ensure([], () => r(require('../page/Arguments/StoreService')), 'StoreService');  //开店服务协议
const CooperativeBank = r => require.ensure([], () => r(require('../page/CooperativeBank')), 'CooperativeBank');  //开店服务协议
const QuickPayment = r => require.ensure([], () => r(require('../page/Arguments/QuickPayment')), 'QuickPayment');  //开店服务协议


Vue.use(Router)

let scrollBehavior = function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop
    }
    return {x: 0, y: to.meta.savedPosition || 0}
  }
}

export default new Router({
  scrollBehavior,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login,
      meta: {rank: 1}
    },
    {
      path: '/register',
      component: Register,
      meta: {keepAlive: true}
    },
    {
      path: '/forgetPwd',
      component: ForgetPwd
    },
    {
      path: '/main',
      component: Main,
      meta: {keepAlive: true},
      children: [
        {
          path: '/',
          component: Home,
          meta: {keepAlive: true},
        },
        {
          path: 'home', //食品详情页
          name: 'home',
          component: Home,
          meta: {keepAlive: true}
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {keepAlive: true}
        },
        {
          path: 'mine',
          name: 'mine',
          component: Mine,
          meta: {keepAlive: true}
        }],
    },
    {
      path: '/dataStatistics',
      component: DataStatistics,
      meta: {keepAlive: true}
    },
    {
      path: '/storeManage',
      component: StoreManage,
      meta: {keepAlive: true}
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      //meta: { keepAlive: true }
    },
    {
      path: '/brand/:id',
      component: Brand,
      meta: {keepAlive: true}
    },
    {
      path: '/trade',
      component: Trade
    },
    {
      path: '/goodsCat',
      component: GoodsCat
    },
    {
      path: '/spec/:id',
      component: Spec,
      meta: {keepAlive: true}
    },
    {
      path: '/specEdit/:id',
      component: SpecEdit,
    },
    {
      path: '/shopList',
      name: 'shopList',
      component: ShopList,
    },
    {
      path: '/shopMsg',
      component: ShopMsg,
      meta: {rank: 1}
    },
    {
      path: '/shopMsgEdit',
      component: ShopMsgEdit,
      meta: {keepAlive: true}
    },
    {
      path: '/shopDb',
      component: ShopDb,
      meta: {keepAlive: true}
    },
    {
      path: '/shopDbTime',
      component: ShopDbTime
    },
    {
      path: '/addProduct',
      component: AddProduct
    },
    {
      path: '/addGoods',
      component: AddGoods,
      meta: {keepAlive: true, isRefresh: false}
    },
    {
      path: '/goodsEdit/:id',
      component: GoodsEdit,
      meta: {keepAlive: true}
    },
    {
      path: '/shopActive',
      component: ShopActive
    },
    {
      path: '/shopActiveList',
      component: ShopActiveList
    },
    {
      path: '/shopActiveEdit',
      component: ShopActiveEdit
    },
    {
      path: '/shopMsg',
      component: ShopMsg
    },
    {
      path: '/addShopSuccess',
      component: AddShopSuccess
    },
    {
      path: '/storeInfo',
      component: StoreInfo,
      meta: {keepAlive: true}
    },
    {
      path: '/registerSuccess/:phone',
      component: RegisterSuccess,
    },
    {
      path: '/storeCertification',
      component: StoreCertification,
      meta: {keepAlive: true}
    },
    {
      path: '/reviewProcessing',
      component: ReviewProcessing
    },
    {
      path: '/messageCenter',
      component: MessageCenter
    },
    {
      path: '/setting',
      component: Setting,
      meta: {keepAlive: true}
    },
    {
      path: '/storeCode',
      component: StoreCode
    },
    {
      path: '/dataStatisticsSelectTime/:id',
      component: DataStatisticsSelectTime
    },
    {
      path: '/basicInformation',
      component: BasicInformation,
      meta: {rank: 1}
    },
    {
      path: '/basicInformationEdit',
      component: BasicInformationEdit,
    },
    {
      path: '/assetInfo',
      component: AssetInfo
    },
    {
      path: '/acceptInfo',
      component: AcceptInfo
    },
    {
      path: '/contactInfo',
      component: ContactInfo
    },
    {
      path: '/editContactInfo',
      component: EditContactInfo
    },
    {
      path: '/contactList',
      component: ContactList
    },
    {
      path: '/contactDetails',
      component: ContactDetails
    },
    {
      path: '/contactNothing',
      component: ContactNothing
    },
    {
      path: '/loanInfo',
      component: LoanInfo
    },
    {
      path: '/manageInfo',
      component: ManageInfo
    },
    {
      path: '/uploadData',
      component: UploadData
    },
    {
      path: '/uploadDataEdit',
      component: UploadDataEdit
    },
    {
      path: '/certification',
      component: Certification,
      meta: {keepAlive: true}
    },
    {
      path: '/bankCardManage',
      component: BankCardManage,
      meta: {keepAlive: true}
    },
    {
      path: '/orderDetails/:id',
      component: OrderDetails,
      meta: {keepAlive: true}
    },
    {
      path: '/orderDetailsRemarks/:id',
      component: OrderDetailsRemarks
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/reviewSuccess',
      component: ReviewSuccess,
      meta: {rank: 1}
    },
    {
      path: '/createStore',
      component: CreateStore,
      meta: {keepAlive: true, rank: 10}
    },
    {
      path: '/loginSuccess',
      component: LoginSuccess,
    },
    {
      path: '/reviewFailure',
      component: ReviewFailure,
      meta: {rank: 1}
    },
    {
      path: '/reviewRefuse',
      component: ReviewRefuse,
      meta: {rank: 1}
    },
    {
      path: '/orderTrack/:id',
      component: OrderTrack
    },
    {
      path: '/goodDetails/:id',
      component: GoodDetails
    },
    {
      path: '/addGoodSuccess',
      component: AddGoodSuccess
    },
    {
      path: '/productInfo',
      component: ProductInfo
    },
    {
      path: '/mineLoginPwd',
      component: MineLoginPwd
    },
    {
      path: '/payPassword',
      component: PayPassword
    },
    {
      path: '/payPwdSet',
      name:'payPwdSet',
      component: PayPwdSet
    },
    {
      path: '/payPwdSetInput',
      name:'payPwdSetInput',
      component: PayPwdSetInput
    },
    {
      path: '/payPwdReviseInput',
      component: PayPwdReviseInput
    },
    {
      path: '/tradePwd',
      component: TradePwd
    },
    {
      path: '/withdrawalsTip',
      component: WithdrawalsTip
    },
    {
      path: '/registerAgreement',
      component: RegisterAgreement
    },
    {
      path: '/goodsRelease',
      component: GoodsRelease
    },
    {
      path: '/storeService',
      component: StoreService
    },
    {
      path: '/baiduAddress',
      component: BaiduAddress,
    },
    {
      path: '/wallet',
      component: Wallet,
    },
    {
      path: '/billingRecord',
      component: BillingRecord
    },
    {
      path: '/withdraw',
      component: Withdraw
    },
    {
      path: '/feedback',
      component: Feedback
    },
    {
      path: '/promotion',
      component: Promotion
    },
    {
      path: '/addBankCard',
      name:'addBankCard',
      component: AddBankCard,
      meta:{keepAlive:true}
    },
    {
      path: '/bankCardActivate',
      name:'bankCardActivate',
      component: BankCardActivate,
      meta:{keepAlive:true}
    },
    {
      path: '/addBankCardVeri',
      name:'addBankCardVeri',
      component: AddBankCardVeri
    },
    {
      path: '/addBankCardSuccess',
      component: AddBankCardSuccess
    },
    {
      path: '/memberManagement',
      component: MemberManagement
    },
    {
      path: '/cashBenefit',
      component: CashBenefit
    },
    {
      path: '/productAttribute',
      name: 'productAttribute',
      component: ProductAttribute
    },
    {
      path: '/productSpec',
      name:'productSpec',
      component: ProductSpec
    },
    {
      path: '/cooperativeBank',
      component: CooperativeBank
    },
    {
      path: '/quickPayment',
      component: QuickPayment
    }
  ]
})
