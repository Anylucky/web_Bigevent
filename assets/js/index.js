$(function () {
    gitusermsg()

    var layer = layui.layer
    $('#outuser').on('click', function (e) {
        layer.confirm('请问您确认登出么?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = 'login.html'
            //do something

            layer.close(index);
        });
    })
})

// 获取个人信息
function gitusermsg() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // 获取信息需要认证
        headers: {
            Authorization: localStorage.getItem('token') || ''

        },
        success: function (res) {
            if (res.status !== 0) return console.log(res.message);
            console.log(res);
            // 成功后 进行渲染页面
            gituserimg(res.data)
        }

    }

    )
}
function gituserimg(data) {
    //  获取账号名称或者 昵称
    let userwlcome = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + userwlcome)
    $('#tobusername').html(userwlcome)
    if (data.user_pic !== null) {
        $('.text-user').hide()
        // 修改图片的url
        $('.layui-nav-img').attr('src', data.user_pic).show()

    } else {
        //获取名称的第一个大写字母
        let bigname = userwlcome[0].toUpperCase()
        $('.layui-nav-img').hide()
        // 进行填充
        $('.text-user').html(bigname).show()
    }



    // const userimg = data.nickname || data.username
    // $('#welcome').html('欢迎&nbsp;' + userimg)
    // $('#tobusername').html(userimg)

    // if (data.user_pic !== null) {
    //     $('.text-user').hide()
    //     $('.layui-nav-img').attr('src', data.user_pic).show()
    // } else {
    //     const textusername = userimg[0].toUpperCase()
    //     $('.layui-nav-img').hide()
    //     $('.text-user').html(textusername).show()
    // }


}