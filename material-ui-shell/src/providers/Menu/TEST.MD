Had this on the backburner,

What i was thinking was


```
//action.js
  const SET_MINI_MODE = 'SET_MINI_MODE'
  const SET_MENU_OPEN = 'SET_MENU_OPEN'
  const SET_MINI_SWITCH_VISIBILITY = 'SET_MINI_SWITCH_VISIBILITY' 

  const setMiniMode = (dispatch, payload) => dispatch({ type:SET_MINI_MODE, payload})
  const setMenuOpen = (dispatch, payload) => dispatch({ type:SET_MENU_OPEN, payload})
  const setMiniSwitchVisibility = (dispatch, payload) => dispatch({ type:SET_MINI_SWITCH_VISIBILITY, payload})

  export const initialState = {
    miniMode: useMediaQuery('(min-width:600px)'),
    menuOpen: true,
    setMiniSwitchVisibility: useMini
  }
```

```
//store.js
  import { initialStateStuff } from './someWhere';


 import {
    SET_MINI_MODE,
    SET_MENU_OPEN,
    SET_MINI_SWITCH_VISIBILITY
  } from './actions'

  const initializeState = {
    miniMode: useMediaQuery('(min-width:600px)'),
    menuOpen: true,
    setMiniSwitchVisibility: useMini
  }
  const reducer = (state, action) => {
    const { type, payload } = action

  switch (type) {
    case SET_MINI_MODE:
      return { ...state, miniMode: payload }
    case SET_MENU_OPEN:
      return { ...state, menuOpen: payload }
    case SET_MINI_SWITCH_VISIBILITY:
      return { ...state, setMiniSwitchVisibility: payload }
    default:
      return state
  }
}

export { reducer }
```