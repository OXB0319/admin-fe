/**
 * @file
 * Created by hanan on 16/10/15.
 */


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

// 根目录
const rootPath = process.env.spaRootPath || '';
console.log(rootPath);

export const constantRouterMap = [{
    path: '',
    component: Layout,
    redirect: '/contentManage/category',
    // alwaysShow:false,
    // children:[{
    //     path: 'contentManage',
    //     name: 'contentManage',
    //     component: r => require(['@/views/contentManage/contentManage'], r),
    //     meta: { title: 'contentManage', icon: 'dashboard', noCache: true },
    //     children:[
    //         {
    //             path: 'category',
    //             component: r => require(['@/views/hello'], r),
    //             name: 'category',
    //             meta: { title: '分类管理' }
    //         },
    //         {
    //             path: 'content',
    //             component: r => require(['@/views/hello'], r),
    //             name: 'content',
    //             meta: { title: '所有内容' }
    //         },
    //         {
    //             path: 'commit',
    //             component: r => require(['@/views/hello'], r),
    //             name: 'commit',
    //             meta: { title: '评论管理' }
    //         }]
    // }]
    },
    {
        path: '/contentManage',
        component: Layout,
        meta: { title: 'contentManage', icon: 'file-text', noCache: true },
        children:[
            {
                path: 'category',
                component: r => require(['@/views/contentManage/categoryManage'], r),
                name: 'category',
                meta: { title: 'categoryManage', icon: 'th-large' }
            },
            {
                path: 'document',
                component: r => require(['@/views/contentManage/documentManage'], r),
                name: 'document',
                meta: { title: 'contentAll', icon: 'file-text-o' },
            },
            {
                path: 'comments',
                component: r => require(['@/views/contentManage/commentManage'], r),
                name: 'comments',
                meta: { title: 'commentManage', icon: 'comment' }
            },
            {
                path: 'document/detail',
                component: r => require(['@/views/contentManage/document/detail'], r),
                name: 'documentDetail',
                hidden:true,
                meta: { title: '内容详情', icon: 'th-large' },
            },
            {
                path: 'comment/detail',
                component: r => require(['@/views/contentManage/document/detail'], r),
                name: 'contentDetail',
                hidden:true,
                meta: { title: '内容详情', icon: 'th-large' },
            }
        ]
    },
    {
        path: '/404',
        component: r => require(['@/views/errorPage/404'], r),
        hidden: true
    },
    {
        path: '/login',
        component: r => require(['@/views/login/index'],r),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: r => require(['@/views/login/authredirect'],r),
        hidden: true
    },
    {
        path: '/wormManage',
        component: Layout,
        meta: { title: 'wormManage', icon: 'gears', noCache: true },
        children:[
            {
                path: 'wormSetting',
                component: r => require(['@/views/wormManage/wormSetting'], r),
                name: 'wormSetting',
                meta: { title: 'wormSetting', icon: 'gear' }
            },
            {
                path: 'templateManage',
                component: r => require(['@/views/wormManage/templateManage'], r),
                name: 'templateManage',
                meta: { title: 'templateManage', icon: 'file-text-o' }
            }]
    },
]

const routerMap = constantRouterMap.concat([{
        path: '',
        component: Layout,
        redirect: '/spa/hello',
    },
    {
        path: '/login',
        component: r => require(['@/views/login/index'],r),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: r => require(['@/views/login/authredirect'],r),
        hidden: true
    }])

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})


export const asyncRouterMap = [
     { path: '*', redirect: '/404', hidden: true }
]
