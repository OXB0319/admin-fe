
import request from '@/utils/request'

const URLs = {
    GET_CONTENT_LIST: 'document/list',
    GET_CONTENT_DETAIL: 'document/detail',
    UPDATE_CONTENT:'document/update',
    DELETE_CONTENT: 'document/delete',
    FIND_CONTENT: 'document/find',
    GET_SOURCE:'document/source'
}

export default {
    apis: {
        getContentList: async function() {
            return await request({
                url: URLs.GET_CONTENT_LIST,
                method:"get"
            })
        },
        findContentList: async function(data) {
            return await request({
                url: URLs.FIND_CONTENT,
                method:"post",
                data:data
            })
        },
        getContentDetail: async function(contentId) {
            return await request({
                url: URLs.GET_CONTENT_DETAIL + '/' + contentId,
                method:"get"
            })
        },
        getContentSource: async function() {
            return await request({
                url: URLs.GET_SOURCE,
                method:"get"
            })
        },
        updateContent: async function(content) {
            return await request({
                url: URLs.UPDATE_CONTENT,
                method:"post",
                data: content
            })
        },
        deleteContent: async function(content){
            return await request({
                url: URLs.DELETE_CONTENT,
                method:"post",
                data: content
            })
        }
    }
}
