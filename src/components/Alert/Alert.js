import React, { Fragment, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { FaTimes } from "react-icons/fa";

const useStyles = createUseStyles(theme => ({
   '@keyframes slideRight': {
      from: {
         opacity: 0,
         transform: 'translateX(-10px) scale(0.98)'
      },
      to: {
         opacity: 1,
         transform: 'translateX(0px) scale(1)'
      }
   },
   alert: {
      animation: '$slideRight ease-in 0.3s',
      padding: '20px',
      background: '#FFF0F3',
      borderLeft: '5px solid #FFB3C0',
      borderRadius: '4px',
      fontSize: '.875rem',
      margin: '10px 0px'
      //display: 'flex',
      //justifyContent: 'space-between'
   },
   success: {
      background: '#fafffa',
      borderLeft: '5px solid #d4ffb3'
   },
   title: {
      fontWeight: 700
   },
   link: {
      cursor: 'pointer'
   }
}));

export function Alert(props) {
   const classes = useStyles();
   const [isVisible, setVisibility] = useState(true);
   const type = classes[props.type] ? ' ' + classes[props.type] : '';
   return <>
      <div className={classes.alert + type}>
         <summary className={classes.title}>{props.title}</summary>
         {props.children}
      </div>
   </>
}
export default Alert;