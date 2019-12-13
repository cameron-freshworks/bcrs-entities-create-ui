// Vue Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'

// Launch Darkly Feature Flags
// import { withFlagProvider } from 'ld-vue'

// Styles
import '@/assets/styles/base.scss'
import '@/assets/styles/layout.scss'
import '@/assets/styles/overrides.scss'
import '@mdi/font/css/materialdesignicons.min.css'

// Base App
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuetify)

const vuetify = new Vuetify({ iconfont: 'mdi' })

new Vue({
  vuetify,
  router,
  store,
  // mixins: [withFlagProvider({ clientSideId: window['ldClientId'] })],
  render: (h) => h(App),
}).$mount('#app');
