$(function () {
  var laypage = layui.laypage
  // 暂定一个对象
  var data1 = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  // 定义layui的提示信息
  var layer = layui.layer
  getlistArt()
  function getlistArt() {
    // 发起请求
    $.ajax({
      type: 'GET',
      url: "/my/article/list",
      data: data1,
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        console.log(res);
        let mao = template('listArt', res)
        console.log(mao);
        $('tbody').html(mao)
        console.log(res);


        getlistjump(res.total)

      }
    });
  }

  // 定义美化时间  
  template.defaults.imports.listtime = function (data) {
    let dt = new Date(data)
    let y = dt.getFullYear()
    let m = addzero(dt.getMonth() + 1)
    let d = addzero(dt.getDate())

    let hh = addzero(dt.getHours())
    let mi = addzero(dt.getMinutes())
    let ss = addzero(dt.getSeconds())

    return y + '年' + m + '月' + d + '日' + hh + ':' + mi + ':' + ss


  }

  // 为时间补领零
  function addzero(data) {
    return data < 10 ? '0' + data : data
  }

  var form = layui.form

  // 分类渲染
  listfenlei()
  function listfenlei() {
    $.ajax({
      type: "get",
      url: "/my/article/cates/",
      success: function (res) {
        if (res.status != 0) {
          return console.log(res.message);

        }
        console.log(res.message)
        console.log(res);
        let listdata = template('xialaliebiao', res)
        $('.layui-form [name =cate_id ]').html(listdata)
        form.render()
      }
    });
  }

  // 监听表单的提交事件
  $('#layui-form').on('submit', function (e) {
    // 阻止默认事件
    e.preventDefault();
    let cate_id = $('[name = cate_id]').val();
    let state = $('[name = state]').val();
    p.cate_id = cate_id
    p.state = state
    getlistArt()
  })



  // 定义转页函数
  function getlistjump(data) {
    laypage.render({
      elem: 'pagination' //注意，这里的 test1 是 ID，不用加 # 号
      , count: data,
      //数据总数，从服务端得到
      limit: data1.pagesize,
      curr: data1.pagenum,
      jump: function (obj, first) {
        data1.pagenum = obj.curr
        data1.pagesize = obj.limit
        if (!first) {
          getlistArt()

        }
      },
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 5, 7, 10]


    });

  }

  // 添加删除事件
  $('tbody').on('click', '.btn-delete', function (e) {
    // 记录当前页面按钮的个数
    let btn = $('.btn-delete').length
    let deleid = $(this).attr('list-delete')
    // 弹出层
    layer.confirm('确定删除么?', { icon: 3, title: '提示' }, function (index) {
      // 发起请求
      $.ajax({
        type: "GET",
        url: "/my/article/delete/" + deleid,
        success: function (res) {
          if (res.status != 0) {
            return layer.msg('删除失败')
          }
          layer.msg('删除成功')
          //重新渲染页面
          getlistArt()
          if (btn === 1) {
            // 让页码值减一
            data1.pagenum = data1.pagenum === 1 ? 1 : data1.pagenum - 1


          }

        }
      });


      layer.close(index);
    });
  })
})