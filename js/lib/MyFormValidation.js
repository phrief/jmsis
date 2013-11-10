/**//**  
 * @author jemry  
 */  
$(document).ready(function(){       
         
/**//* 设置默认属性 */       
$.validator.setDefaults({       
    submitHandler: function(form) {    
        form.submit();    
    }       
});    
// 字符验证       
jQuery.validator.addMethod("stringCheck", function(value, element) {       
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
}, "只能包括中文字、英文字母、数字和下划线");   
  
// 中文字两个字节       
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {       
    var length = value.length;       
    for(var i = 0; i < value.length; i++){       
        if(value.charCodeAt(i) > 127){       
        length++;       
        }       
    }  
    return this.optional(element) || ( length >= param[0] && length <= param[1] );       
}, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");   
  
// 身份证号码验证       
jQuery.validator.addMethod("isIdCardNo", function(value, element) {       
    return this.optional(element) || isIdCardNo(value);       
}, "请正确输入您的身份证号码");    
     
// 手机号码验证       
jQuery.validator.addMethod("isMobile", function(value, element) {       
    var length = value.length;   
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
    return this.optional(element) || (length == 11 && mobile.test(value));       
}, "请正确填写您的手机号码");       
     
// 电话号码验证       
jQuery.validator.addMethod("isTel", function(value, element) {       
    var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678   
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的电话号码");   
  
// 联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isPhone", function(value,element) {   
    var length = value.length;   
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
    var tel = /^\d{3,4}-?\d{7,9}$/;   
    return this.optional(element) || (tel.test(value) || mobile.test(value));   
  
}, "请正确填写您的联系电话");   
     
// 邮政编码验证       
jQuery.validator.addMethod("isZipCode", function(value, element) {       
    var tel = /^[0-9]{6}$/;       
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的邮政编码");    
  
//开始验证   
$('#form1').validate({   
    /**//* 设置验证规则 */  
    rules: {   
        niname: {   
            required:true,   
            stringCheck:true,   
            byteRangeLength:[3,15]   
        },   
        title: {   
            required:true,   
            stringCheck:true,   
            byteRangeLength:[1,50]   
        },    
        addr: {   
            //required:true,   
            stringCheck:true,   
            byteRangeLength:[0,50]   
        },   
        email:{   
            required:true,   
            email:true  
        },   
        tel:{   
            //required:true,   
            isPhone:true  
        },  
        mobile:{   
            //required:true,   
            isPhone:true  
        },   
        qq:{   
            //required:true,   
            stringCheck:true,   
            byteRangeLength:[0,30]   
        },  
        msn:{   
            //required:true,   
            stringCheck:true,   
            byteRangeLength:[0,100]   
        },
          content:{   
            required:true,   
            stringCheck:true,   
            byteRangeLength:[8,300]   
        }      
    },   
       
    /**//* 设置错误信息 */  
    messages: {   
        niname: {       
            required: "请填写您的姓名",   
            stringCheck: "只能包括中文字、英文字母、数字和下划线",   
            byteRangeLength: "姓名须在3-15个字符之间(一个中文字算2个字符)"       
        }, 
		title: {       
            required: "请填写标题",   
            stringCheck: "只能包括中文字、英文字母、数字和下划线",   
            byteRangeLength: "标题须在3-15个字符之间(一个中文字算2个字符)"       
        }, 
		addr: {       
            //required: "请填写您的联系地址",   
            stringCheck: "只能包括中文字、英文字母、数字和下划线",   
            byteRangeLength: "联系地址在0-50个字符之间(一个中文字算2个字符)"       
        }, 
        email:{   
            required: "请输入一个Email地址",   
            email: "请输入一个有效的Email地址"  
        },   
        tel:{   
            //required: "请输入您的联系电话",   
            isPhone: "请输入一个有效的联系电话（包括区号：010-87654321）"  
        },  
        mobile:{   
            //required: "请输入您的联系电话",   
            isPhone: "请输入一个有效的联系电话"  
        },   
        qq:{   
            //required: "请输入您的qq",   
            stringCheck: "请正确输入您的qq",   
            byteRangeLength: "请正确输入您的qq"  
        },  
        msn:{   
            //required: "请输入您的MSN",   
            stringCheck: "请正确输入您的MSN",   
            byteRangeLength: "请正确输入您的MSN"  
        },
        content:{   
            required: "请输入您留言",   
            stringCheck: "请正确输入您的留言",   
            byteRangeLength: "留言须在8-300个字符间（中文占两个字符）"  
        }   
    },   
       
    /**//* 设置验证触发事件 */  
    focusInvalid: false,   
    onkeyup: false,   
       
    /**//* 设置错误信息提示DOM */  
    errorPlacement: function(error, element) {       
        error.appendTo( element.parent());       
    },     
       
});   
  
});