import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/HomePage/Home";
import Login from "./components/pages/LoginPage/Login";
import Posts from "./components/pages/PostsPage/Post";
import Profile from "./components/pages/ProfilePage/Profile";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Detail from "./components/pages/PostsPage/Detail";

export default function App() {
  // const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  // const [userId, setUserId] = useState(localStorage.getItem("USERID"));

  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem("TOKEN", token);
  //   } else {
  //     localStorage.removeItem("TOKEN");
  //   }
  //   if (userId) {
  //     localStorage.setItem("USERID", userId);
  //   } else {
  //     localStorage.removeItem("USERID");
  //   }
  // }, [token, userId]);

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" className="text-decoration-none text-secondary">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/posts"
                  className="text-decoration-none text-secondary"
                >
                  Posts
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/profile"
                  className="text-decoration-none text-secondary"
                >
                  Profile
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/login"
                  className="text-decoration-none text-secondary"
                >
                  Login
                </Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/posts" exact >
            <Posts />
          </Route>
          <Route path="/posts/:id" >
            <Detail />
          </Route>
          <Route
            path="/profile"
            exact
            render={() => {
              if (!userId) {
                return (
                  <Login exact setToken={setToken} setUserId={setUserId} />
                );
              }
              return <Profile />;
            }}
          />

          <Route path="/login">
            <Login exact setToken={setToken} setUserId={setUserId} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
