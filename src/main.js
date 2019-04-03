import Vue from 'vue'
import AppJSX from './AppJSX'

Vue.config.productionTip = false

new Vue({
  render: h => h(AppJSX),
}).$mount('#app')
