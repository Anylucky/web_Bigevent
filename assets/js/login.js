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
})