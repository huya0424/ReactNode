import React from 'react';
import { HashRouter  as Router, Route, Redirect } from 'react-router-dom'
import Header from './components/Header/Index'
import './App.css'
import Home from './pages/Home/Home'
import Topics from './pages/Topics/Index'
import Profile from './pages/Profile/Index'

function App() {
    return (
        <>
            <Header />
            
            <Router>
                <div className="box">
                    <Route exact path="/" component={Home} />
                    <Route path="/topics/:id" component={Topics} />
                    <Route path="/user/:id" component={Profile} />
                    <Route exact path="/topics" render={() => <Redirect to="/" />} />
                    <Route exact path="/user" render={() => <Redirect to="/" />} />
                </div>
            </Router>
        </>
    );
}

export default App;
