// 初始化
// 回显数据
let data1 = JSON.parse(localStorage.getItem('xiugai'))
// 初始化图片
var $image = $('#image');
// 1.1 获取裁剪区域的 DOM 元素
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview',
};
// 3. 初始化裁剪区域
$image.cropper(options);

// 图片回显
$image
  .cropper('destroy') // 销毁旧的裁剪区域
  .attr('src', 'http://big-event-api-t.itheima.net' + data1.cover_img) // 重新设置图片路径
  .cropper(options); // 重新初始化裁剪区域
// 下拉分类渲染
listfenlei()
function listfenlei() {
  $.ajax({
    type: "get",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status != 0) {
        return console.log(res.message);

      }
      console.log(res.message)
      console.log(res);
      let listdata = template('relelist', res)
      $('.layui-form [name =cate_id ]').html(listdata)
      // layui内置方法  重新渲染下拉列表
      layui.form.val('releaseform', data1)
      // layui.form.render()用于重新渲染下拉列表
      layui.form.render()

      // 初始化富文本编辑器
      initEditor()




    }
  });
}

$('.chageimg').on('click', function (e) {
  $('#release').click()
})
$('#release').on('change', function (e) {
  // 注意文件的获取
  let fails = e.target.files[0]
  if (e.target.files.length === 0) return

  // 创建一个url地址
  var newImgURL = URL.createObjectURL(fails)

  $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
})

// 获取内容
var zhuangtai = '发布'
$('#caogao').on('click', function (e) {
  zhuangtai = '草稿'
})

$('#releaseform').on('submit', function (e) {
  let mao = tinyMCE.activeEditor.getContent()
  // let mao = tinyMCE.editors['content'].setContent();
  e.preventDefault()
  let data = new FormData($(this)[0])
  data.append('state', zhuangtai)
  data.append('Id', data1.Id)
  // data.splice('content', mao)
  // 这里  对formdata的
  data.set('content', mao)
  console.log(data);
  // 将裁剪区域 裁剪的文件 拿出来
  $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      data.append('cover_img', blob)
      pushArt(data)
    })

});

// 定义一个发表文章的函数
function pushArt(data) {
  $.ajax({
    type: "post",
    url: "/my/article/edit",
    data: data,
    contentType: false,
    processData: false,
    success: function (res) {
      if (res.status != 0) {
        return layui.layer.msg('修改文章失败')
      }
      layui.layer.msg('修改文章成功')
      location.href = '/text/Articlelist.html'


    }
  });

}

