'use client'

import { miniApp, themeParams, useSignal } from '@telegram-apps/sdk-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function ThemeManager() {
  const { setTheme, theme } = useTheme()
  const miniAppMounted = useSignal(miniApp.isMounted)

  useEffect(() => {
    setTheme(themeParams.isDark() ? 'dark' : 'light')
  }, [setTheme])

  useEffect(() => {
    if (!miniAppMounted) return

    if (theme === 'dark') {
      miniApp.setHeaderColor('#0a0a0a')
      miniApp.setBottomBarColor('#0a0a0a')
      miniApp.setBackgroundColor('#0a0a0a')
    } else if (theme === 'light') {
      miniApp.setHeaderColor('#ffffff')
      miniApp.setBottomBarColor('#ffffff')
      miniApp.setBackgroundColor('#ffffff')
    }
  }, [miniAppMounted, theme])

  return null
}
