import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children, ...rest}) => {
    const loggedIn = useSelector((state) => state.userInfo.loggedIn);

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

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
}

export default ProtectedRoute;
