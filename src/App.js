import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import axios from "axios";
import "./App.css";

//class based component
const App = () => {
  const [users, setusers] = useState([]);
  const [user, setuser] = useState({});
  const [repos, setrepos] = useState([]);
  const [loading, setloading] = useState(false);
  const [alert, setalert] = useState(null);

  //Search GitHub users
  const searchUsers = async (text) => {
    setloading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GIT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET}`
    );
    setusers(res.data.items);
    setloading(false);
  };

  //Get informations for single user
  const getUser = async (username) => {
    setloading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GIT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET}`
    );
    setuser(res.data);
    setloading(false);
  };

  //Get user's repos
  const getUserRepos = async (username) => {
    setloading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GIT_ID}&client_secret=${process.env.REACT_APP_GIT_SECRET}`
    );
    setrepos(res.data);
    setloading(false);
  };

  //Clear users form state
  const clearUsers = () => {
    setusers([]);
    setloading(false);
  };

  //alert
  const setAlert = (msg, type) => {
    setalert({ msg, type });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
