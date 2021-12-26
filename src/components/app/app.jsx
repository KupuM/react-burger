import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory}  from "react-router-dom"
import { ForgotPassword, Ingredient, Login, Main, Page404, Profile, Register, ResetPassword } from "../../pages/index";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../services/actions/user-info";
import ProtectedRoute from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

const App = () => {
    const ModalSwitch = () => {
        const dispatch = useDispatch();
        const token = localStorage.getItem("refreshToken");
        const { email } = useSelector((state) => state.userInfo.userData);
        const location = useLocation();
        const history = useHistory();
        let background = location.state && location.state.background;

        useEffect(() => {
            if (token && !email) {
                dispatch(refreshToken());
            }
        }, [dispatch, token, email]);

        const handleCloseModal = () => {
            history.goBack();
        };
        
        return (
            <div className="App">
                <AppHeader />
                <Switch location={background || location}>
                    <Route path="/" exact>
                        <Main />
                    </Route>
                    <Route path="/ingredients/:ingredientId" exact>
                        <Ingredient />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <ProtectedRoute path="/profile">
                        <Profile />
                    </ProtectedRoute>
                    <Route path="/profile">
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
                </Switch>
                {background && (
                    <Route
                        path="/order"
                        children={
                            <Modal onClose={handleCloseModal}>
                                <OrderDetails />
                            </Modal>
                        }
                    ></Route>
                )}
                {background && (
                    <Route
                        path="/ingredients/:ingredientId"
                        children={
                            <Modal onClose={handleCloseModal}>
                                <IngredientDetails />
                            </Modal>
                        }
                    ></Route>
                )}
            </div>
        );
    };

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
};

export default App;
