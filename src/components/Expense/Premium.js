import React from 'react'
import { useHistory } from "react-router-dom";
import classes from "./Premium.module.css";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';

const Premium = () => {
    const total = useSelector(state => state.expenses.total);

    const [isPremium, setIsPremium] = useState(false);

    const history = useHistory();

    useEffect(() => {
      if(total > 5000){
        setIsPremium(true)
      }else{
        setIsPremium(false)
      }
    }, [total]);

    const toggleThemeHandler = () => {
history.push('/theme-toggler')
    }


  return (
    <Fragment>
      {isPremium && (
    <button className={classes.premiumBtn} onClick={toggleThemeHandler}>
      Premium
    </button>
      )}
    </Fragment>
  )
}

export default Premium
