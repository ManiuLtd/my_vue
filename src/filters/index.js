
exports.formatMoney = (value) => {
    if (value) {
        value = Number(value);
        return '￥ ' + value.toFixed(2);
    }
};

//获取出生日期
exports.getBirthdayByIdCard = (UUserCard) => {
    let ic = checkId(UUserCard);
    if(!ic) return '';
    return UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
}

//获取性别
exports.getSexByIdCard = (UUserCard) => {
    let ic = checkId(UUserCard);
    if(!ic) return '';

    if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
        //男
        return "男";
    } else {
        //女
        return "女";
    }
}

//获取年龄
exports.getAgeByIdCard = (UUserCard) => {
    let ic = checkId(UUserCard);
    if(!ic) return '';

    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() -   UUserCard.substring(6, 10) - 1;
    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
        age++;
    }
    if(age <= 0){
        age = 1;
    }
    return age;
}

exports.checkId = (pId)=>{
    //检查身份证号码
    var arrVerifyCode = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2];
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
    if(pId.length != 15 && pId.length != 18) {
        //return "身份证号共有15位或18位"
        return false;
    }
    var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19" + pId.slice(6, 16);
    if(!/^\d+$/.test(Ai)) {
        //return "身份证除最后一位外，必须为数字！"
        return false;
    }
    var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai.slice(12, 14);
    var d = new Date(yyyy, mm, dd), now = new Date();
    var year = d.getFullYear(), mon = d.getMonth(), day = d.getDate();
    if(year != yyyy || mon != mm || day != dd || d > now || year < 1800) {
        //return "身份证输入错误！"
        return false;
    }
    for(var i = 0, ret = 0; i < 17; i++) {
        ret += Ai.charAt(i) * Wi[i]
    }
    Ai += arrVerifyCode[ret %= 11];
    // return pId.length == 18 && pId != Ai ? alert("身份证格式错误！") : Ai;
    return pId.length == 18 && pId != Ai ? false : Ai;
}