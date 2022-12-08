import { useEffect, useState } from 'react'

export const useIsDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>()

  useEffect(() => {
    if ((typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
      return
    }
    setIsDarkMode(false)
  }, [])

  typeof window !== 'undefined' &&  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    setIsDarkMode(!isDarkMode)
  })

  return isDarkMode
}
