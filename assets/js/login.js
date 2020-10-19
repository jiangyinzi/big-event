$(function () {
    // 点击去注册的按钮 显示去注册的盒子 隐藏登录的盒子
    $('#link_res').on('click', function () {
        $('.login').hide();
        $('.res').show()
    })


    // 点击登录的按钮 显示登录的盒子 隐藏注册的盒子
    $('#link_login').on('click', function () {
        $('.login').show();
        $('.res').hide()
    })


    // 表单验证部分
    // 从layui中获取form对象 只要导入layui.js就有layui这个对象
    var form = layui.form
    form.verify({
        // 自定义一个密码的正则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义一个确认密码的正则
        repwd: function (value) {
            // 先获取密码框输入的内容和确认密码框内的内容比对 不一致就return提示信息
            var pwd = $('.res [name = password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 给注册表单监听提交事件
    var layer = layui.layer;
    $('#form_res').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 提交注册的请求
        $.ajax({
            type:'post',
            url: '/api/reguser',
            data: {
                username: $('#form_res [name=username]').val(),
                password: $('#form_res [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } 
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        })
    })

    // 给登录表单监听提交事件
    $('#form_login').submit(function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起登录的请求
        console.log($(this).serialize())
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })
    })
})