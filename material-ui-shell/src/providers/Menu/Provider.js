import PropTypes from 'prop-types'
import React, {
  useState,
  useEffect,
  useLayoutEffect
} from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Provider = ({
  appConfig,
  children,
  persistKey = 'menu'
}) => {
  const { menu } = appConfig || {}
  const { useMini = true } = menu || {}
  const [isDesktopOpen, setDesktopOpen] = useState(false) //add
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [useMiniMode, setMiniMode] = useState(useMini)
  const [isAuthMenuOpen, setAuthMenuOpen] = useState(false)
  const [isMini, setMini] = useState(true) //add
  // const [isMini, setMini] = useState(false)

  const isDesktop = useMediaQuery('(min-width:600px)')
  const isDesktopKey = `${persistKey}:isDesktopOpen`
  const isMiniKey = `${persistKey}:isMini`
  const isUseMiniModeKey = `${persistKey}:isUseMiniModeKey`

  //used couple the state of the two menus until refactoring of state
  const toggleMenuState = (setTo) => {//add
    setDesktopOpen((typeof setTo === "boolean") ? setTo : !isDesktopOpen)
    setMobileOpen((typeof setTo === "boolean") ? setTo : !isMobileOpen)
}
  //used as a debounce for the window listener
  function debounce(callback, ms) { //add
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        callback.apply(this, arguments)
      }, ms)
    }
  }
  useEffect(() => { //add
  // useLayoutEffect(() => { //do I use this???

    const debouncedHandleResize = debounce(() => {
      if(!isDesktop) {
        toggleMenuState(false)
        setMini(false)
      }
    }, 1000)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  useEffect(() => {
    const persistDesktopOpen = localStorage.getItem(isDesktopKey)
    const persistMini = localStorage.getItem(isMiniKey)
    const persistMiniMode = localStorage.getItem(isUseMiniModeKey)
    if (persistDesktopOpen) {
      setDesktopOpen(persistDesktopOpen === 'true')
    }
    if (persistMini) {
      setMini(persistMini === 'true')
    }
    if (persistMiniMode) {
      setMiniMode(persistMiniMode === 'true')
    }
  }, [isDesktopKey, isMiniKey, isUseMiniModeKey])

  useEffect(() => {
    try {
      localStorage.setItem(isDesktopKey, JSON.stringify(isDesktopOpen))
    } catch (error) {
      console.warn(error)
    }
  }, [isDesktopOpen, isDesktopKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMiniKey, JSON.stringify(isMini))
    } catch (error) {
      console.warn(error)
    }
  }, [isMini, isMiniKey])

  useEffect(() => {
    try {
      localStorage.setItem(isUseMiniModeKey, JSON.stringify(useMiniMode))
      if (!useMiniMode) {
        setMini(useMiniMode)
      }
    } catch (error) {
      console.warn(error)
    }
  }, [useMiniMode, isUseMiniModeKey])

  return ( 
    <Context.Provider 
      value = {{
        isDesktop,
        isDesktopOpen,
        isMobileOpen,
        setDesktopOpen,
        setMobileOpen,
        isAuthMenuOpen,
        setAuthMenuOpen,
        isMini,
        setMini,
        useMiniMode,
        setMiniMode,
        toggleMenuState, //add
      }}
      > 
      {children}
    </Context.Provider>
  )
}


Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider