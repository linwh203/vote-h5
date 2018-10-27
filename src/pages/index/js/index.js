
require('./libs/flexible');

import Vue from 'vue'
import App from './App'
// supports both of Vue 1.0 and Vue 2.0
import VueLazyload from 'vue-lazyload';
import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
import 'babel-polyfill';


Vue.use(MintUI);
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  /*error: 'dist/error.png',
  loading: 'dist/loading.gif',
  try: 3 // default 1*/
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

