// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 为按钮绑定文件提交按钮
$('#shangcuan').on('click', function () {
    $('#fileimg').click()
})
let layer = layui.layer
$('#fileimg').on('change', function (e) {
    console.log(e);
    console.log(e.target.files);
    let fileslist = e.target.files
    if (fileslist.length < 0) {
        return layer.msg('请上传图片')
    }

    // 开始裁剪同步到裁剪区
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域


})
$('#sureimg').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
    console.log(dataURL);
    $.ajax({
        type: "post",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL
        },

        success: function (res) {
            if (res.status != 0) {
                return layer.msg('用户头像更新失败')

            }
            layer.msg('更新成功')
            window.parent.gitusermsg()

        }
    });
})
