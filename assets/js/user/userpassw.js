$(function () {
    var laymg = layui.layer
    let layer = layui.form
    layer.verify({
        pass: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        same: function (value) {
            console.log(value);
            if (value == $('.layui-form [name = oldPwd]').val()) {

                return '新密码不能和原密码相同'


            }
        },
        pwd: function (value) {
            if (value !== $('.layui-form [name = newPwd]').val()) {

                return '两次密码不一致'


            }
        }
    })

    // 实现重置密码的功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(111121);
                if (res.status != 0) {

                    return laymg.msg(res.message)
                }
                laymg.msg(res.message)
                $('.layui-input').val('')

            }

        });

    });

})