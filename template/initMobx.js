import { observable } from 'mobx'

const runtimeMobx = window.g_plugins.mergeConfig('mobx');
let config = { <%= MobxConfigure %> } || {}
config = {...config,...(runtimeMobx.config || {})};

const globalStore = {
  <%= RegisterStores %>
}

const mobx_stores = observable({
  ...(config.initState || {}),
  ...globalStore,
})


window.mobx_app = {
  mobx_stores,
  devTools:config.devTools || false
}