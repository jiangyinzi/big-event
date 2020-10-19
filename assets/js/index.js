$(function () {
    getData()
    var layer = layui.layer
     // 给退出注册一个点击事件
     $('#exit').on('click',function() {
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1 清空本地存储的值
            localStorage.removeItem('token')
            // 2返回login页面
           location.href = '/login.html'
            layer.close(index);
          })
    })
})

// 先获取一下后台的数据渲染一下页面的头像
function getData() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // // 请求头 根据接口文档要求来写 值就是我们登录时保存在 localStorage的值
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            } else {
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
        }
    })
}

// 定义一个渲染用户头像的函数
function renderAvatar(user) {
    var name = user.nickname || user.username
    // 先渲染文字部分 
    if (user.nickname != '') {
        // 如果客户有昵称的话就渲染昵称
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    } else {
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    }
    // 渲染头像部分
    if (user.user_pic != null) {
        // 如果有user_pic 让img显示给它设置src属性 隐藏span
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 如果没有user_pic 让img隐藏 显示span
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0]).show()
    }

   
}