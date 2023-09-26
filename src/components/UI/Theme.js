import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../store/themeStore';
import classes from "./Theme.module.css";
import { FiMoon, FiSun } from "react-icons/fi";

const Theme = () => {
    const isDark = useSelector(state => state.theme.isDarkTheme);
    const dispatch = useDispatch();


    const toggleThemeHandler = () => {
        dispatch(themeActions.toggleTheme())
    }


  return (
    <button className={`${classes.btn} ${isDark ? classes.dark: classes.light}`} onClick={toggleThemeHandler}>
      {isDark ? <FiSun/> : <FiMoon title='Mode'/>}
    </button>
  )
}

export default Theme;
