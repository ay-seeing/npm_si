var Promise = require("es6-promise").Promise

// 命令行颜色地址列表 https://misc.flogisoft.com/bash/tip_colors_and_formatting
let logColor = {
    red: '\x1B[31m',
    green: '\x1B[92m',
    yellow: '\x1B[33m',
    yellow: '\x1B[94m',
    cyan: '\x1B[96m',
    default: '\x1B[0m'
}

module.exports = {
    /**
     * 获取 Defer 对象
     * @return {[type]} [description]
     */
    getDefer: function (){
        var deferred = {};
        deferred.promise = new Promise(function(resolve, reject){
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        return deferred;
    },
    /**
     * promise when 方法
     * @param promises promise数组
     * @returns {[type]} [description]
     */
    when: function(promises) {
        var deffered = this.getDefer();
        Promise.all(promises).then(function(data) {
            deffered.resolve(data);
        }, function(err) {
            deffered.reject(err);
        });
        return deffered.promise;
    },

    /*
     *log设置颜色
     *
     */
    log: function(txt, color){
        switch(color){
            case 'red':
                console.log(`${logColor.red}${txt}${logColor.default}`)
                break;
            case 'green':
                console.log(`${logColor.green}${txt}${logColor.default}`)
                break;
            default: 
                console.log(`${logColor.default}${txt}${logColor.default}`)
                break;
        }
    }
    
    /**
     * readFiles方法
     * @param callback 回调函数
     * 
     */
//     readFiles:function (callback) {
//        var configPath = path.join(process.cwd(), 'src');
//        var config = {};
//        if (fs.existsSync(configPath)) {
//            try {
//                config = eval(fs.readFileSync(configPath,"utf-8"));
//                callback&&callback(config);
//            } catch (e) {
//                console.log("读取cain.config.js文件失败");
//            }
//        }else {
//            console.log("cain.config.js文件不存在，请检查后再试");
//        }
//    }
}