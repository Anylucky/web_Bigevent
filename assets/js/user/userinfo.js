$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length < 6) {
                return '昵称长度需在1-6之间'
            }
        }
    })
    getusermsg()


    // 获取用户基本信息
    function getusermsg() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return console.log(res.message);

                }
                console.log(res);
                console.log('获取用户基本信息成功');
                form.val('userinfo', res.data)
            }
        })
    }

    // 重置按钮
    $('#reset').on('click', function (e) {
        e.preventDefault()
        getusermsg()
    })
    var layer = layui.msg
    // 监听表的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                console.log('提交信息成功');
                window.parent.gitusermsg()
            }
        })
    })
})