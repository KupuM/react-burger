import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import profileStyles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { getUser } from "../../services/actions/user-info";
import { useDispatch, useSelector } from "react-redux";
import EditUser from "../../components/edit-user/edit-user";
import OrdersHistory from "../../components/orders-history/orders-history";
import Spinner from "../../components/spinner/spinner";

const Profile = () => {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const hasUserEmail = useSelector(state => state.userInfo.userData.user.email);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.leftBlock}>
                <ProfileNav />
                <p className={profileStyles.infoText}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={profileStyles.centerBlock}>
                {!hasUserEmail ? (
                    <Spinner />
                ) : (
                    <Switch>
                        <Route path={path} exact>
                            <EditUser />
                        </Route>
                        <Route path={`${path}/history`}>
                            <OrdersHistory />
                        </Route>
                    </Switch>
                )}
            </div>
        </div>
    );
}

export default Profile;
