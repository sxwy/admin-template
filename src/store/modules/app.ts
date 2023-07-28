import { defineStore } from 'pinia'

interface AppState {
  /** 侧边栏是否折叠 */
  isSidebarCollapse: boolean
}

export const useAppStore = defineStore('app', {
  state(): AppState {
    return {
      isSidebarCollapse: false
    }
  },
  actions: {
    /** 切换侧边栏折叠状态 */
    toggleSidebarCollapseState() {
      this.isSidebarCollapse = !this.isSidebarCollapse
    }
  }
})
