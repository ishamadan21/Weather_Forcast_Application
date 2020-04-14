import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DayWeather from './dayWeather'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'



const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/daywise" component={DayWeather} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

