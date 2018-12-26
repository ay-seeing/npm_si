var Promise = require("es6-promise").Promise

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
    }//,
    
    
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