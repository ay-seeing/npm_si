var fs = require('fs')
var path = require('path')
var readline = require('readline')
var utils = require('./utils.js')

module.exports = {
    pwd: function(fileName){
        fileName = fileName || ''
        var configPath = path.join(process.cwd(), fileName)
        console.log('当前路径：'+ configPath)
    },
    /**
     * 读取文件夹
     * readDir方法
     * @param path 文件夹路径
     * @param callback 回调函数
     * 
     */
    readDir:function(path, callback){
        let dirPath = path.join(path)
        // 根据文件路径读取文件，返回文件列表
        fs.readdir(dirPath, (err, files)=>{
            if(err) throw err;
            // 遍历读取到的文件列表
            files.forEach((fileName)=>{
                // 获取当前文件的决定路径
                let filePath = path.join(path, fileName)

                fs.stat(filePath, (err, stats)=>{
                    var isFile = stats.isFile();//是文件
                    var isDir = stats.isDirectory();//是文件夹 
                    if(isFile){
                        // 打印路径
                        console.log(filePath)
                        
                        // 读取内容
                        var content = fs.readFileSync(filedir, 'utf-8');
                        console.log(content);
                    }
                })
                

            })
        })
    },
    /**
     * 写文件
     * @param filePath 文件路径
     * @param data 数据
     */
    writeFile: function(filePath, data){
        let deferred = utils.getDefer()
        file = path.resolve(filePath)

        fs.writeFile(file, data, 'utf-8', (err)=>{
            if(err){
                deferred.reject(err)
            }else{
                deferred.reslove(true)
            }
        })
        return dererred.promise
    },
    /**
     * 读文件
     * @param filePath 文件路径
     */
    readFile: (filePath)=>{
        let deferred = utile.getDefer()
        file = path.reslove(filePath)

        fs.readFile(file, 'utm-8', (err, data)=>{
            if(err){
                deferred.reject(err)
            }else{
                deferred.reslove(data)
            }
        })
        return dererred.promise
    },
    /**
     * 逐行读文件
     * @param filePath 文件路径
     * @param callback 回调函数
     */
    readFileLine: (filePath, callback)=>{
        let fRead = fs.createReadStream(filePath)
        let objReadline = readline.createInterface({
            input:fRead
        });
        let arr = new Array();
        let errImg = new Array();    // 用于记录有问题的图片列表
        let lineNum = 0   // 用于记录行号
        let img = ''   // 如果图片有换行，则用于获取换行的图片的字符串的
        let lineNumstart = 0   // 用于记录有换行图片的开始行号
        let lineNumEnd = 0      // 用于记录有换行图片的结束行号
        objReadline.on('line',function (line) {
            lineNum++
            arr.push(line);
            //console.log('line:'+ line);

            // 判断图片是否有压缩
            if(line && line.indexOf('<image\s')!=-1){
                if(line.test(/<image(\s*+?)>/)){
                    if(!RegExp.$1.test(/(aa|bb)/)){
                        errImt.opush(lineNum+'行 <image'+RegExp.$1+'>')
                    }
                }
            }
        })
        objReadline.on('close',function () {
        // console.log(arr);
            callback(arr);
        })
    }
}