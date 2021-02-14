import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export function Layout(props) {
   return <div>

      {/*top menu*/}
      <div style={{ height: '60px', display: 'flex', flexDirection: 'row', boxShadow: '0px 2px 5px 0px rgb(0 0 0 / 50%)' }}>
         <span>1</span>
         <span>2</span>
      </div>

      {/*main row*/}
      <div style={{ display: 'flex' }}>

         {/*menu*/}
         <div style={{marginRight: '30px'}}>
            <nav>
               <ul>
                  <li>
                     <Link to="/login">Login</Link>
                  </li>
                  <li>
                     <Link to="/">Home</Link>
                  </li>
                  <li>
                     <Link to="/about">About</Link>
                  </li>
                  <li>
                     <Link to="/users">Users</Link>
                  </li>
                  <li>
                     <a href="/test">Test</a>
                  </li>
               </ul>
            </nav>
         </div>

         {/*content*/}
         <div>
            {props.children}
         </div>

      </div>



   </div>
}

export default Layout;