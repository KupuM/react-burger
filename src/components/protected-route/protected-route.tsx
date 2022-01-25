import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProtectedRouteProps {
    path: string;
    children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRouteProps>= ({children, ...rest}) => {
    const loggedIn = useSelector((state: any) => state.userInfo.loggedIn);

    return (
        <Route
            {...rest}
            render={({location}) => loggedIn ? (
                children
            ) : (
                <Redirect 
                to={{
                    pathname: '/login',
                    state: {from: location}
                    }} 
                />
            )}
        />
    )
}

export default ProtectedRoute;
