import Vue from 'vue'
import App from './App.vue'
import Services from './services'

Vue.config.productionTip = false

Vue.use(Services.factory({ starWars: { url: 'https://swapi.co/api/' } }))

new Vue({
  render: h => h(App)
}).$mount('#app')
