$(function () {
  let layer = layui.layer
  getlist()
  // 获取表格信息
  function getlist() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message)

        }
        console.log(res.message);
        let listmsg = template('listmesg', res)
        $('#biaoge').html(listmsg)

      }
    });

  }
  // 为弹出层index添加全局变量
  var outpail = null
  // w为类别添加事件
  $('#addlist').on('click', function () {
    outpail = layer.open(
      {
        skin: 'ride',
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类'
        , content: $('#listscr').html()
      }
    )

    // 通过代理的形式为表单添加事件
    $('body').on('submit', '#listscrform', function (e) {
      e.preventDefault()
      $.ajax({
        type: "post",
        url: "/my/article/addcates",
        data: $('#listscrform').serialize(),
        success: function (res) {
          if (res.status != 0) {
            return layer.msg(res.message)

          }
          // 提示成功消息
          layer.msg(res.message)
          // 成功后重新渲染
          getlist()
          // 关闭弹出层
          layer.close(outpail)
        }
      });
    })

  });
  var num1212 = null
  // 编辑事件
  $('tbody').on('click', '#Revise', function (e) {
    e.preventDefault()
    // 弹框
    num1212 = layui.layer.open({
      type: 1,
      content: $('#listscrRevise').html(),
      area: ['500px', '300px'],
      title: '添加文章分类'
    });
    // 获取数据
    let idd = $(this).attr('data-id')
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + idd,
      success: function (res) {
        if (res.status != 0) {
          return console.log('获取数据失败');

        }
        console.log('获取数据成功')
        layui.form.val('Reviseform', res.data)

      }
    });




  })
  // 监听事件

  $('body').on('submit', '#listscrformRevise', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: $('#listscrformRevise').serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layui.layer.msg('修改失败')

        }
        layui.layer.msg('修改成功')
        getlist()
        layer.close(num1212)
      }
    });

  });

  // var outRevise = null
  // // 通过代理的形式为编辑提供事件
  // $('tbody').on('click', '#Revise', function (e) {
  //   e.preventDefault()
  //   outRevise = layer.open(
  //     {
  //       skin: 'ride',
  //       type: 1,
  //       area: ['500px', '250px'],
  //       title: '添加文章分类'
  //       , content: $('#listscrRevise').html()
  //     }
  //   )
  //   console.log($('#Revise'));
  //   var id = $(this).attr('data-id')
  //   console.log($('#Revise').attr('data-id'));
  //   $.ajax({
  //     type: "get",
  //     url: "/my/article/cates/" + id,
  //     success: function (res) {
  //       if (res.status != 0) {
  //         return console.log(res.message);

  //       }
  //       console.log(res.message);
  //       console.log(res.data);
  //       layui.form.val('Reviseform', res.data);

  //     }
  //   });


  //   // 为更新按钮设置代理事件
  //   $('body').on('submit', '#listscrformRevise', function (e) {
  //     e.preventDefault()
  //     $.ajax({
  //       type: "post",
  //       url: "/my/article/updatecate",
  //       data: $('#listscrformRevise').serialize(),
  //       success: function (res) {
  //         if (res.status != 0) {
  //           return layer.msg(res.message)

  //         }
  //         layer.msg(res.message)
  //         // 成功后关闭弹出层
  //         layer.close(outRevise)
  //         // 再次获取信息
  //         getlist()

  //       }
  //     });

  //   })
  // })



  // 删除文章按钮
  $('#biaoge').on('click', '#Revisedelete', function (e) {
    e.preventDefault()
    let deletebtn = $(this).attr('data-id')

    //弹出层
    layui.layer.confirm('确定删除么?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: "get",
        url: "/my/article/deletecate/" + deletebtn,
        success: function (res) {
          if (res.status != 0) {
            return layer.msg('删除失败')

          }
          getlist()
          layer.msg('删除成功')


        }
      });

      layui.layer.close(index);
    });
  })
  // 删除文章按钮
  // $('#biaoge').on('click', '#Revisedelete', function (e) {
  //   e.preventDefault()
  //   let id = $(this).attr('data-id')
  //   console.log(id);
  //   layui.layer.confirm('确定删除么?', { icon: 3, title: '提示' }, function (index) {

  //     $.ajax({
  //       type: "get",
  //       // 细节 少个斜杠就无法发送请求
  //       url: "/my/article/deletecate/" + id,
  //       success: function (res) {
  //         if (res.status != 0) {

  //           return layer.msg(res.message)

  //         }

  //         layer.msg(res.message)
  //         getlist()



  //       }
  //     });

  //     layer.close(index);
  //   });
  // });
})