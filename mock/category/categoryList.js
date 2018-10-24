/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

var rootPath = global.apiMap.default.path;
module.exports = {
    api: rootPath + '/api/category_list',
    response: function (req, res) {
        res.json({
            code:'200',
            message:'',
            data:[{

            }]
        });
    }
}