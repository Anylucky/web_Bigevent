$(function () {
  // 去注册板块
  $('#logouserinBtn').on('click', function () {
    $('.logouserin').hide();
    $('.logouseradd').show();
  })
  // 去登录按钮
  $('#logouseraddBtn').on('click', function () {
    $('.logouserin').show();
    $('.logouseradd').hide();
  })

  // 表单验证
  var form = layui.form
  // leyui弹出框
  var layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd1 = $('.logouseradd [name = password]').val()
      if (pwd1 !== value) {
        return '两次密码输入的不一致'
      }
    }
  })

  // 监听新建用户提交事件
  $('#adduser').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: {
        username: $('.logouseradd [name = username]').val(),
        password: $('.logouseradd [name = userpassword]').val()

      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功,请登录')
        $('#logouseraddBtn').click()

      }
    })
  })
  // 监听用户登录事件
  $('#userin').on('submit', function (e) {
    e.preventDefault()
    // console.log($(this).serialize());
    const username = $('')
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res.status);
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})