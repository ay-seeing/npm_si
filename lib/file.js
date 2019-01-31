var fs = require('fs')
var path = require('path')
var readline = require('readline')
var utils = require('./utils.js')

module.exports = {
    pwd: function(fileName){
        // const [node, path, ...argv] = process.argv
        // process.argv.forEach((val, index) => {
        //     console.log(`${index}: ${val}`);
        // });
        // return
        // console.log('参数'+process)
        fileName = fileName || ''
        var configPath = path.join(process.cwd(), fileName)
        // console.log('当前路径：'+ configPath)
        this.readDir(configPath, (opt)=>{
            let {dirPath, fileName} = opt
            // 读取整个文件
            // console.log('done'+dirPath)
            // this.readFile(dirPath+'/'+fileName).then((data)=>{
            //     console.log('成功'+data)
            // }, (err)=>{
            //     console.log('失败'+err)
            // }).catch((reason)=>{
            //     console.log('报错')
            // })


            // 逐行读取文件
            this.readFileLine(dirPath+'/'+fileName).then((data)=>{
                // 如果有没压缩的图片则打印出来
                if(data.errImg.length){
                    utils.log('没有压缩的图片', 'red')    // 设置打印颜色为红色
                    utils.log(`文件地址 ${data.filePath}`)
                    utils.log(data.errImg.join('\n'))
                }
            }, (err)=>{
                console.log(err)
            })
        })
    },
    
    /**
     * 读取文件夹
     * readDir方法
     * @param url 文件夹路径
     * @param callback 回调函数
     * 
     */
    readDir:function(url, callback){
        let self = this
        let dirPath = path.join(url)

        // 根据文件路径读取文件，返回文件列表
        fs.readdir(dirPath, (err, files)=>{
            if(err) throw err;
            // 遍历读取到的文件列表
            files.forEach((fileName)=>{
                // 获取当前文件的决定路径
                let filePath = path.join(url, fileName)
                // console.log(fileName)

                fs.stat(filePath, (err, stats)=>{
                    var isFile = stats.isFile();//是文件
                    var isDir = stats.isDirectory();//是文件夹 
                    // auth.js|README.md 等文件不检测
                    if(isFile && !/(auth.js|README.md)/i.test(fileName)){
                        // 打印路径
                        // console.log(filePath)
                        callback && callback({dirPath, fileName})
                        
                        // 读取内容
                        // var content = fs.readFileSync(filePath, 'utf-8');
                        // console.log('===='+content);
                    }
                    // node_modules|bin|lib 等文件夹不检测
                    if(isDir && !/(node_modules|bin|lib|public|scripts|build|config|deploy|activityLifeNotBad|home)/i.test(fileName)){
                        // console.log(filePath)
                        // console.log(self)
                        self.readDir(filePath, callback)
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
        let file = path.resolve(filePath)
        // file = filePath

        fs.writeFile(file, data, 'utf-8', (err)=>{
            if(err){
                deferred.reject(err)
            }else{
                deferred.resolve(true)
            }
        })
        return dererred.promise
    },
    /**
     * 读文件
     * @param filePath 文件路径 
     */
    readFile: (filePath)=>{
        let deferred = utils.getDefer()
        let file = path.resolve(filePath)
        // let file = filePath

        fs.readFile(file, (err, data)=>{
            // console.log(deferred)
            if(err){
                deferred.reject(err)
            }else{
                deferred.resolve(data)
            }
        })
        return deferred.promise
    },
    /**
     * 逐行读文件
     * @param filePath 文件路径
     * @param callback 回调函数， 使用 promise后不需要回调函数了
     */
    readFileLine: function(filePath, callback){
        let self = this
        let deferred = utils.getDefer()
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
        objReadline.on('line', (line)=> {
            lineNum++
            arr.push(line);
            // console.log('line:'+ line);

            // 判断图片是否有压缩
            self.formatImgFn({line, lineNum, lineNumstart, img, errImg})
            
        })
        objReadline.on('close',function () {
        // console.log(arr);
            // callback && callback(arr);
            // console.log(filePath)
            deferred.resolve({filePath, errImg})
        })
        return deferred.promise
    },
    /*
     *判断图片是压缩
     * 
     */
    formatImgFn: (opt)=>{
        let {line, lineNum, lineNumstart, img, errImg} = opt
        // console.log(this)
        if(line.indexOf('<img ')!=-1 || img.length){
            // 判断当前行的图片是否已经结束，没有则说明图片结束在下一行
            if(/<img(\s.+?)>/.test(line)){
                formatImg({lineTxt: line, errImg, lineNum})
            }else{
                lineNumstart = !lineNumstart ? lineNum : lineNumstart
                img += img!='' ? '\n'+line : line
                if(line.indexOf('>')!=-1){
                    formatImg({lineTxt: img, errImg, lineNum: lineNumstart})
                    // 置空 img 和 lineNumstart
                    img = ''
                    lineNumstart = 0
                }
            }
        }

        function formatImg(opt){
            let {lineTxt, errImg, lineNum} = opt
            // 判断如果没有添加压缩方法 imgUrlFormat ，且不是 base64，且没有加不压缩标识符
            if(!/(imgUrlFormat|unCompress)/ig.test(lineTxt) && !/data\:image\/\w+?\;base64/ig.test(lineTxt) && !/(\？x-oss-process=|\?imageView2|\?imageMogr2)/ig.test(lineTxt) && !/(\/\/)?(asset|img)\.yit\.com/ig.test(lineTxt) ){
                errImg.push('第'+lineNum+'行的 '+lineTxt.trim())
            }
        }
    }
    
}