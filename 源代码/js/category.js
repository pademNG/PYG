$(function () {

    var Category;
    var leftScroll;

    // 调用函数
    init();
    function init() {
        getCategories();
        eventList();
    }

    // 绑定事件
    function eventList() {
        $('.pyg_left').on('tap', 'li', function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).index();
            getRight(index);
            leftScroll.scrollToElement(this);
        })
    }

    // 左边导航部分
    function getLeft() {
        var html = template('categoriesTel', {
            data: Category
        });
        $('.pyg_left').html(html);
        leftScroll = new IScroll('.pyg_left');
    }

    // 右边分类导航部分
    function getRight(index) {
        var childrens = Category[index].children;
        $('.pyg_right').html(childrens);
        var html = template('catesTelRight', {
            data: childrens
        });
        $('.pyg_right').html(html);

        var imgH = $(".pyg_right img").length;
        $(".pyg_right img").on('load', function () {
            imgH--;
            if (imgH == 0) {
                var rightScroll = new IScroll(".pyg_right");
            }
        });
    }

    // 本地存储
    function sendCategories() {
        if (localStorage.getItem("cates")) {
            var catesStr = localStorage.getItem("cates");
            var localData = JSON.parse(catesStr);
            if (Date.now() - localData.time > 10 * 1000) {
                getCategories();
            } else {
                Category = localData.data;
                getLeft();
                getRight(0);
            }
        } else {
            getCategories();
        }

    }

    // 请求数据
    function getCategories() {
        $.ajax({
            type: "get",
            url: "categories",
            dataType: "json",
            success: function (result) {
                if (result.meta.status == 200) {
                    Category = result.data;
                    var obj = {
                        data: Category,
                        time: Date.now()
                    };
                    var jsonCategory = JSON.stringify(obj);
                    localStorage.setItem('cates', jsonCategory);

                    getLeft();
                    getRight(0);

                } else {
                    sendCategories();
                }

            }
        });
    }

    // 设置字体-rem
    setFont();
    function setFont() {
        // 基础值
        var baseVal = 100;
        // 设计稿宽度
        var pageW = 375;
        // 屏幕宽度
        var screenW = document.querySelector('html').offsetWidth;
        // 设置字体大小
        var fs = baseVal * screenW / pageW;
        document.querySelector('html').style.fontSize = fs + "px";
    }

})