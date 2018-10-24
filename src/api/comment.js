
import request from '@/utils/request'

const URLs = {
    GET_COMMENT_LIST: 'comment/list',
}

export default {
    apis: {
        getCommentList: async function(commentSearcheVo) {
            return await request({
                url: URLs.GET_COMMENT_LIST,
                method: "post",
                data: commentSearcheVo
            })
        }
    }
}
