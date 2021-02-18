import React, { Fragment } from "react";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   inputMain: {
      color: '#4a5568',
      fontSize: '16px',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '.5rem',
      paddingBottom: '.5rem',
      lineHeight: '1.5',
      display: 'block',
      borderWidth: '1px',
      borderRadius: '.5rem',
      outline: 'none',
      borderColor: '#e2e8f0',
      backgroundColor: '#fff',
      border: '0 solid #e2e8f0',
      width: '100%',
      marginTop: '.5rem',
      '&:focus': {
         boxShadow: `0 0 0 3px ${theme.colorPrimary + '42'}`,
         outlineColor: 'rgba(0,0,0,0)',
         outlineOffset: '2px',
         outlineStyle: 'solid',
         borderColor: theme.colorPrimary
      }
   },
   inputWrapper: {
      display: 'flex'
   }
}));

export const Input = (props) => {
   const classes = useStyles();
   return <div className={classes.inputWrapper}>
   <input className={classes.inputMain} placeholder={props.placeholder}></input>
   </div> 
}
export default Input;