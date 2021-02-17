import React, { Fragment } from "react";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   main: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '.75rem',
      paddingBottom: '.75rem',
      background: '#4299e1',
      borderRadius: '.25rem',
      border: 'none',
      color: '#fff',
      fontFamily: 'inherit',
      outline: 'none',
      cursor: 'pointer',
      '&:hover': {
         filter: 'brightness(90%)'
      }
   },
   fullWidth: {
      width: '100%'
   }
}));

export const Button = (props) => {
   const classes = useStyles('test');
   return <button className={classes.main + (props.fullWidth ? ' ' + classes.fullWidth : '')} onClick={props.onClick}>{props.children}</button>
}
export default Button;