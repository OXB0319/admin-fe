
import request from '@/utils/request'

const URLs = {
    GET_CATEGORY_LIST: 'category/list',
    UPDATE_CATEGORY:'category/update',
    ADD_CATEGORY: 'category/add',
    DELETE_CATEGORY: 'category/delete',
}

export default {
    apis: {
        getCategoryList: async function() {
            return await request({
                url: URLs.GET_CATEGORY_LIST,
                method:"get"
            })
        },
        updateCategory: async function(category) {
            return await request({
                url: URLs.UPDATE_CATEGORY,
                method:"post",
                data: category
            })
        },
        addCategory: async function(category){
            return await request({
                url: URLs.ADD_CATEGORY,
                method:"post",
                data: category
            })
        },
        deleteCategory: async function(category){
            return await request({
                url: URLs.DELETE_CATEGORY,
                method:"post",
                data: category
            })
        }
    }
}
