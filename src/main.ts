import './public-path'
import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 公共样式
import '@/styles/index.scss'
import '@/assets/icons'
import 'normalize.css'
// 自定义指令引入
import * as directives from '@/directives'
// 权限控制
// import './permission'
// 全局组件引入
import SvgIcon from '@/components/SvgIcon/index.vue'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import { getSetting } from '@/utils/setting'
// // 主题颜色风格初始化
// theme(getSetting('theme'))
// 基于 vue3+ ts+ Element-plus 二次封装组件
import TuiPlus from '@wocwin/t-ui-plus'

let instance: ReturnType<typeof createApp> | null

function render(props = {}) {
  if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  }
  const { container } = props as any
  instance = createApp(App)
  instance?.use(router)
  instance?.use(store)
  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    instance.component(key, component)
  }
  // 注册ElementPlus
  instance.use(ElementPlus, {
    locale // 语言设置
    // size: Cookies.get('size') || 'medium' // 尺寸设置
  })
  // 全局组件祖册
  instance.component(
    'SvgIcon',
    // 如果这个组件选项是通过 `export default` 导出的，那么就会优先使用 `.default`，否则回退到使用模块的根
    SvgIcon.default || SvgIcon
  )
  instance.use(TuiPlus)
  // 全局自动注册baseComponents下的基础组件
  // const requireComponent = require.context(
  //   './components/baseComponents',
  //   true,
  //   /\.vue$/
  // )
  // // 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
  // requireComponent.keys().forEach(filePath => {
  //   const componentConfig = requireComponent(filePath)
  //   const fileName = validateFileName(filePath)
  //   const componentName =
  //     typeof fileName == 'string' && fileName.toLowerCase() === 'index'
  //       ? capitalizeFirstLetter(componentConfig.default.name)
  //       : fileName
  //   instance?.component(
  //     componentName,
  //     componentConfig.default || componentConfig
  //   )
  // })

  // 自定义指令
  Object.keys(directives).forEach(key => {
    instance?.directive(key, (directives as { [key: string]: Directive })[key])
  })
  instance?.mount(container ? container.querySelector('#app') : '#app')
  console.log('开始加载相关内容')
}
/**
 * 首字母大写
 * @param str 字符串
 * @example heheHaha
 * @return {string} HeheHaha
 */
function capitalizeFirstLetter(str) {
  return str && str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 对符合'xx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/def/basicTable.vue
 * @return {string} BasicTable
 */
function validateFileName(str) {
  return (
    /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
  )
}
//TODO:非qiankun环境下单独运行
//@ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('并不是qiankun渲染')
  render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log(
    '应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法'
  )
  render(props)
  instance!.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange
  instance!.config.globalProperties.$setGlobalState = props.setGlobalState
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  if (instance!._container === null) {
    throw Error('instance._container is null')
  }
  if (instance) {
    // instance.$destroy()
    instance = null
  }
  await store.dispatch('tagsView/delAllViews')
  // instance?.unmount("#app");
  // instance!._container.innerHTML = "";
  // instance = null;
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props)
}
