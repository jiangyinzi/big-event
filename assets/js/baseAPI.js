// 每次调用$.get或者是$.post或者是$.ajax都会先调用一下ajaxPrefilter，把书写的参数传进去拼接一下url地址
$.ajaxPrefilter(function (option) {
    // 拼接url地址
    option.url = 'http://ajax.frontend.itheima.net' + option.url

    // 自动添加请求头
    if(option.url.indexOf(/my/) !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    
    // 全局统一挂在complete回调函数
    option.complete = function(res) {
         //调用complete函数 不论成功或者失败都会调用的函数
        
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 清空token
                localStorage.removeItem('token')
                // 强制在login页面
                location.href = '/login.html'
            }
        }
})