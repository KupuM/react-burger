import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import PropTypes from "prop-types";

const ProtectedRoute = ({children, ...rest}) => {
    const history = useHistory();
    return (
        <Route
            {...rest}
            render={({location}) => getCookie('accessToken') ? (
                children
            ) : (
                <Redirect to={history.location.state?.from || "/login"} />
            )}
        />
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
}

export default ProtectedRoute;
