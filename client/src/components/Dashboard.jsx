import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import style from '../styles/dashboard.css';


const Dashboard = ({name}) => {
  return (
    <div className={style.app}>
       <div className={style.title}>Welcome back {name}!</div>
       <Link to="/story"><button className={style.button}>Continue my adventure</button></Link>
       <button className={style.button}>See my profile</button>
    </div>
  )
}

export default Dashboard;