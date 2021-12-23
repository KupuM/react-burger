import React from "react";
//import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForgotPassword, Ingredients, Login, Main, Page404, Profile, Register, ResetPassword } from "../../pages/index";

const App = () => {
    return (
        <div className="App">
            <AppHeader />
            <Router>
                <Routes>
                    <Route path="/" exact>
                        <Main />
                    </Route>
                    <Route path="/ingredients/:id" exact>
                        <Ingredients />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/profile" exact>
                        <Profile />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Route path="/forgot-password" exact>
                        <ForgotPassword />
                    </Route>
                    <Route path="/reset-password" exact>
                        <ResetPassword />
                    </Route>
                    <Route>
                        <Page404 />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
