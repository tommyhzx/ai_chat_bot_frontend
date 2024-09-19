import { createRouter, createWebHistory } from 'vue-router'
import ChatBox from '../components/ChatBot.vue'
// import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'ChatBox', component: ChatBox }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router