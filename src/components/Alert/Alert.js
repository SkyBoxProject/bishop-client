import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   alert: {
      padding: '20px',
      background: '#FFF0F3',
      borderLeft: '5px solid #FFB3C0',
      borderRadius: '4px'
   },
   title: {
      fontWeight: 700
   }
}));

export function Alert(props) {
   const classes = useStyles();
   return <div className={classes.alert}>
      <summary className={classes.title}>{props.title}</summary>
      {props.children}
   </div>
}
export default Alert;