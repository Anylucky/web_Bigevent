$(function () {
    // 获取分类列表数据
    listreledata()
    // 初始化富文本编辑器
    initEditor()
    function listreledata() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status != 0) {
                    return console.log('列表数据获取失败');

                }
                console.log('列表数据获取成功');
                console.log(res);
                let moban = template('relelist', res)
                console.log(moban);
                $('[name = cate_id]').html(moban)
                // layui重新渲染机制  别忘了
                layui.form.render()

            }
        });
    }


    // 初始化裁剪区域
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    // 上传文件事件

    $('.chageimg').on('click', function (e) {
        $('#release').click()
    })
    $('#release').on('change', function (e) {
        console.log(111);

        let fails = e.target.files[0]
        if (e.target.files.length === 0) {
            return

        }
        // 创建一个url地址
        var newImgURL = URL.createObjectURL(fails)


        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    var zhuangtai = '发布'
    $('#caogao').on('click', function (e) {
        zhuangtai = '草稿'
    })

    $('#releaseform').on('submit', function (e) {
        e.preventDefault()
        let data = new FormData($(this)[0])
        data.append('state', zhuangtai)
        // 将裁剪区域 裁剪的文件 拿出来
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                data.append('cover_img', blob)
                pushArt(data)
            })

    });

    // 定义一个发表文章的函数
    function pushArt(data) {
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('发表文章失败')
                }
                layui.layer.msg('发表文章成功')
                location.href = '/text/Articlelist.html'


            }
        });

    }
})