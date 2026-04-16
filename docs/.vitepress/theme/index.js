import DefaultTheme from 'vitepress/theme'
import LoginGuard from './components/LoginGuard.vue'
import ProgressTracker from './components/ProgressTracker.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: LoginGuard,
  enhanceApp({ app }) {
    app.component('ProgressTracker', ProgressTracker)
  },
}
