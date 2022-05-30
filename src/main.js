import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV, faPhone, faPaperPlane, faChevronLeft, faChevronDown, faUserTie } from "@fortawesome/free-solid-svg-icons";

library.add(faEllipsisV, faPhone, faPaperPlane, faChevronLeft, faChevronDown, faUserTie);
import './index.css'

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(createPinia()).mount('#app')
