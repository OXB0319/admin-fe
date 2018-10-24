import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

import OpreateIcon from '@/components/OperateIcon'

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('operate-icon', OpreateIcon)


const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
