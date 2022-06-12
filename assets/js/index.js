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
        headers: {
            Authorization: localStorage.getItem('token') || ''

        },
        success: function (res) {
            if (res.status !== 0) return console.log(res.message);
            console.log(res);
            gituserimg(res.data)
        }
       
    }

    )
}
function gituserimg(data) {
    const userimg = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;' + userimg)

    if (data.user_pic !== null) {
        $('.text-user').hide()
        $('.layui-nav-img').attr('url', data.user_pic).show()
    } else {
        const textusername = userimg[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-user').html(textusername).show()
    }


}