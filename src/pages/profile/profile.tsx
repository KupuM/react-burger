import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import profileStyles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { getUser } from "../../services/actions/user-info";
import { useDispatch, useSelector } from "../../utils/hooks";
import EditUser from "../../components/edit-user/edit-user";
import OrdersHistory from "../../components/orders-history/orders-history";
import Spinner from "../../components/spinner/spinner";
import { useLocation } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const hasUserEmail = useSelector(state => state.userInfo.userData.user.email);
    const { pathname } = useLocation();
    const isOrderPage = pathname.indexOf('orders') !== -1;

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={`${profileStyles.wrapper} ${isOrderPage ? profileStyles.columns2 : profileStyles.columns3}`}>
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
                        <Route path={`${path}/orders`}>
                            <OrdersHistory />
                        </Route>
                    </Switch>
                )}
            </div>
        </div>
    );
}

export default Profile;
