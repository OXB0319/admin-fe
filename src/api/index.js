import category from './category'
import content from './content'
import comment from './comment'


var apisArray = [category.apis, content.apis, comment.apis];
var apis = {};

apis = combine(apisArray)

function combine(apiArray){
    let apis = {};
    apiArray.forEach((apiContainer)=>{
      apis = Object.assign(apis, apiContainer)
    })
    return apis;
}

export default {
    apis: apis
}
