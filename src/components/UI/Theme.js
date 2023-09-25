import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../store/themeStore';

const Theme = () => {
    const isDark = useSelector(state => state.theme.isDarkTheme);
    const dispatch = useDispatch();


    const toggleThemeHandler = () => {
        dispatch(themeActions.toggleTheme())
    }

    const mainTheme = isDark ? 'dark-theme' : 'light-theme';

  return (
    <div className={mainTheme}>
    <button onClick={toggleThemeHandler}>
      {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
    </div>
  )
}

export default Theme;
