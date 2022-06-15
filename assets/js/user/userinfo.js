$(function () {

    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length < 6) {
                // layui内置弹出提示不用设置
                return '昵称长度需在1-6之间'
            }
        }

    })
    // 调用layui的信息提示
    let layermsg = layui.layer
    // 获取用户基本信息
    gitusermsg()
    function gitusermsg() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                    return console.log('获取信息失败');

                }
               console.log('获取信息成功');
                // 将用户信息获取到表中
                form.val('userinfo', res.data)

            }
        });
    }
    // 重置按钮
    $('#reset').on('click', function (e) {
        // 重新获取信息就行
        gitusermsg()
    })

    // 用户提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        let formmessage = $(this).serialize()
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: formmessage,
            success: function (res) {
                if (res.status != 0) {
                    return layermsg.msg(res.message)

                }
                layermsg.msg(res.message)
                // 重新渲染页面
                window.parent.gitusermsg()

            }
        });
    });






    // getusermsg()


    // // 获取用户基本信息
    // function getusermsg() {
    //     $.ajax({
    //         method: 'get',
    //         url: '/my/userinfo',
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return console.log(res.message);

    //             }
    //             console.log(res);
    //             console.log('获取用户基本信息成功');
    //             form.val('userinfo', res.data)
    //         }
    //     })
    // }

    // // 重置按钮
    // $('#reset').on('click', function (e) {
    //     e.preventDefault()
    //     getusermsg()
    // })
    // var layer = layui.msg
    // // 监听表的提交事件
    // $('.layui-form').on('submit', function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/userinfo',
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message)

    //             }
    //             layer.msg(res.message)
    //             console.log('提交信息成功');
    //             window.parent.gitusermsg()
    //         }
    //     })
    // })
})