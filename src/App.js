import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/courses/CoursesPage';

import Header from './components/common/Header';
import PageNotFound from './components/common/PageNotFound';

function App() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        {/* 
          Router declaration 
            - exact --> match the exact path, otherwise it will match with all subpath (i.e. child path)
          */}
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          <Route path="/courses" component={CoursesPage}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>


      </div>
    </div>
  );
}

export default App;
