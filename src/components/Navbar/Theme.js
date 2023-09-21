import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../store/themeStore';

const Theme = () => {
    const isDark = useSelector(state => state.theme.isDarkTheme);
    const dispatch = useDispatch();

    const toggleThemeHandler = () => {
        dispatch(themeActions.toggleTheme())
    }

  return (
    <button onClick={toggleThemeHandler}>
      {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
  )
}

export default Theme;
