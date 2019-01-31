该包安装后，可以运行 si pwd 来查看当前目录下的 img 图片是否有压缩<br><br><br>


## 不检测
不检测的文件<br>
node_modules|bin|lib|public|scripts|build|config|deploy|activityLifeNotBad|home<br><br>

不检测的文件<br>
auth.js | README.md<br><br><br>


## 判断图片是否压缩
imgUrlFormat 标识图片已经压缩<br>
?x-oss-process=     标识是阿里云压缩方式<br>
?imageView2     标识是七牛云压缩方式<br>
?imageMogr2     标识是七牛云智能压缩方式<br><br><br>


## 不压缩
unCompress   图片添加标识，表示图片不需要压缩<br>
data:image/XXX;base64    标识是base64图片，不需要压缩<br>
asset.yit.com   手动上传到阿里云的图片不压缩<br>
img.yit.com   手动上传到七牛云的图片不压缩<br>