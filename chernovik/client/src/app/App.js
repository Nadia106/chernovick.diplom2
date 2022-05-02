import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import User from "./layouts/user";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Navbar from "./components/ui/navBar";
import Books from "./layouts/books";
import LogOut from "./layouts/logOut";
import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <div>
      <AppLoader>
        <Navbar />
        <Switch>
          <Route path="/books/:bookId?" component={Books} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="users/:userId?/:edit?" component={User} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
