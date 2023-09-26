import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../store/themeStore';
import classes from "./Theme.module.css";

const Theme = () => {
    const isDark = useSelector(state => state.theme.isDarkTheme);
    const dispatch = useDispatch();


    const toggleThemeHandler = () => {
        dispatch(themeActions.toggleTheme())
    }


  return (
    <button className={`${classes.btn} ${isDark ? classes.dark: ""}`} onClick={toggleThemeHandler}>
      {isDark ? "Light" : "Dark"}
    </button>
  )
}

export default Theme;
