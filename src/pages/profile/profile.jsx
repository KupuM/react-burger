import React, { useEffect } from "react";
import { Switch, Route, Redirect, useRouteMatch, useHistory } from "react-router-dom";
import profileStyles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { getUser } from "../../services/actions/user-info";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import EditUser from "../../components/edit-user/edit-user";
import OrdersHistory from "../../components/orders-history/orders-history";
import Spinner from "../../components/spinner/spinner";

const Profile = () => {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const history = useHistory();
    const hasUserEmail = useSelector(state => state.userInfo.userData.user.email, shallowEqual);
    const accessToken = useSelector(state => state.userInfo.userData.accessToken, shallowEqual);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        !accessToken ? (
            <Redirect to={history.location.state?.from || '/login'} /> 
        ) : (
            <div className={profileStyles.wrapper}>
                <div className={profileStyles.leftBlock}>
                    <ProfileNav />
                    <p className={profileStyles.infoText}>В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                <div className={profileStyles.centerBlock}>
                    {!hasUserEmail ? 
                    (
                        <Spinner />
                    ) : (
                        <Switch>
                            <Route path={path} exact>
                                <EditUser />
                            </Route>
                            <Route path={`${path}/history`} >
                                <OrdersHistory />
                            </Route>
                        </Switch>                        
                    )}
                </div>
            </div>
        )
    );
}

export default Profile;
