$(function () {

    init();
    getCatitems();
    getGoodslist();

    function init() {
    getSwiperdata();  
    }

    function getSwiperdata() {
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
            dataType: "json",
            success: function (result) {
                if(result.meta.status==200){
                    // console.log(result);
                    var html = template("sliderTel",{data:result.data});
                    $('.pyg_slider').html(html);

                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                    
                }else{
                    
                }
            }
        });
    }

    function getCatitems(){
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/home/catitems",
            dataType: "json",
            success: function (result) {
                if(result.meta.status==200){
                    var html = template('catesList',{data:result.data})
                    $('.pyg_cates').html(html);
                }else{

                }
            }
        });
    }

    function getGoodslist(){
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/home/goodslist",
            dataType: "json",
            success: function (result) {
                if(result.meta.status==200){
                    var html = template('listTel',{data:result.data})
                    $('.pyg_list').html(html);
                }else{

                }
            }
        });
    }
})