//@@  https://www.bilibili.com/video/BV1Rb4y1H77n/?p=7              视频
//@@  https://xiaoman.blog.csdn.net/article/details/123940636       文章  小满Linux（第三章Linux权限）


// ^^创建用户
// adduser xp01
// passwd  xp01
// ssh xp01@182.61.37.168


// ^^普通用户尝试读写 文件
// echo aaa>text01.txt


// ^^增加权限
// chmod 777 text01.txt


//@@  https://www.bilibili.com/video/BV1Rb4y1H77n/?p=6              视频
//@@  https://xiaoman.blog.csdn.net/article/details/123934127    文章  小满Linux（第二章Linux文件属性）


// ^^  ls -l 查看文件属性信息
// 文件的开头对应是 -             -rw-r--r--    1 root  root         0 Oct 22 01:34 text01.txt
// 目录开头对应的是d              drwxr-xr-x. 102 root  root     12288 Sep 16 02:27 etc
// 快捷方式对应的是l              lrwxrwxrwx.   1 root  root         7 Nov  3  2020 bin -> usr/bin
// U盘对应的是b
// 鼠标键盘等硬件对应的c


// ^^文件权限
// 该文件的创建者-该文件所在的用户组-该文件所在的用户组
// drwxr-xr-x. 102        root  root     12288    Sep 16 02:27 etc
//             文件数量                   体积     创建日期




//@@  https://www.bilibili.com/video/BV1Rb4y1H77n/?p=14             视频
//@@  https://xiaoman.blog.csdn.net/article/details/124546293   文章  小满Linux 中文提示（第十章Nginx-Go-Access-日志分析器）


//^^配置  中文   提示
// localectl  set-locale LANG=zh_CN.UTF8
//重启后    date


//^^ 安装 goaccess
// 意外情况   不安全证书请    sudo yum install -y ca-certificates   文章https://www.cnblogs.com/zh76412950/p/16060227.html
// 意外情况   error: *** Missing development libraries for ncurses        文章https://m.656463.com/wenda/CentOS63zmazlibncurses5dev_63
// wget http://tar.goaccess.io/goaccess-1.2.tar.gz
// tar -xzvf goaccess-1.2.tar.gz
// cd goaccess-1.2/
// ./configure
// make
// make install

// 全局使用 goaccess -V

// ^^切到 nginx 文件
// #  whereis nginx
// nginx: /usr/local/nginx /usr/local/nginx/sbin/nginx
// # cd /usr/local/nginx
// # ls
// client_body_temp  conf  fastcgi_temp  html  logs  proxy_temp  sbin  scgi_temp  uwsgi_temp
// # cd logs
// # ls
// access.log  error.log  nginx.pid
// 日志文件    usr/local/nginx/logs/access.log


//^^配置链接   goaccess  和 nginx/log(链接文件)    goaccess access.log -a -o ../html/goaccess.html --real-time-html --log-format=COMBINED
//访问  8.134.38.36:8765/goaccess.html



