$(function (){
    // 拦截器
    $.ajaxSettings.beforeSend = function (xhr, ajaxObj) {
        ajaxObj.url = "http://api.pyg.ak48.xyz/api/public/v1/" + ajaxObj.url;
        $("body").addClass('loadding');
    }
    $.ajaxSettings.complete = function () {
        $("body").removeClass("loadding");
      }

})