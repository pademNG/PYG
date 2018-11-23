$(function (){

    init();
    
    function init(){
        getCategories();
    }

    function getCategories() {
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
            dataType: "json",
            success: function (result) {
                console.log(result);
                console.log(result.data);
                var html = template('categoriesTel',{data:result.data});
                $('.pyg_left').html(html);
            }
        });
    }
})