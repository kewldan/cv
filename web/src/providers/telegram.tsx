'use client'

import {
  backButton,
  closingBehavior,
  init,
  initData,
  miniApp,
  swipeBehavior,
  themeParams,
  viewport,
} from '@telegram-apps/sdk-react'
import type { PropsWithChildren } from 'react'
import { useClientOnce } from '@/hooks/useClientOnce'
import { useDidMount } from '@/hooks/useDidMount'

export default function TelegramProvider({ children }: PropsWithChildren) {
  const loaded = useDidMount()

  useClientOnce(() => {
    try {
      init()
      ;(async () => {
        if (backButton.isSupported()) backButton.mount()

        if (swipeBehavior.isSupported()) {
          swipeBehavior.mount()
          swipeBehavior.disableVertical()
        }

        miniApp.mountSync()
        themeParams.mountSync()
        initData.restore()
        await viewport.mount()
        viewport.bindCssVars()
        viewport.expand()
        closingBehavior.mount()
      })()
    } catch {
      window.location = 'https://t.me/GradesTrackBot' as Location & string
    }
  })

  if (!loaded) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        Загрузка
      </div>
    )
  }

  return children
}
