//封装login 自定义验证方法

//手机验证规则
export function checkPhone(rule, value, callback){
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 验证参数的合法
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("手机号格式不正确"));
    }
  }

  //邮箱验证规则
  export function checkEmail(rule, value, callback){
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 验证参数的合法
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱不合法"));
    }
  }

