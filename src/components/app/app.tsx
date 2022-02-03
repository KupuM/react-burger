import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory}  from "react-router-dom"
import { ForgotPassword, Login, Main, Page404, Profile, Register, ResetPassword } from "../../pages/index";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/actions/user-info";
import ProtectedRoute from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getBurgerIngredients } from "../../services/actions/burgers";
import { LocationState } from "../../utils/types";

const App = () => {
    const ModalSwitch = () => {
        const dispatch = useDispatch();
        const location = useLocation<LocationState>();
        const history = useHistory();
        const background = location.state && location.state.background;

        useEffect(() => {
            dispatch(getBurgerIngredients());
            dispatch(getUser());
        }, [dispatch]);

        const handleCloseModal = () => {
            history.goBack();
        };
        return (
            <div className="App">
                <AppHeader />
                <Switch
                    //@ts-ignore
                    location={background || location}
                >
                    <Route path="/" exact>
                        <Main />
                    </Route>
                    <Route path="/ingredients/:ingredientId" exact>
                        <IngredientDetails />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <ProtectedRoute path="/profile">
                        <Profile />
                    </ProtectedRoute>
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
