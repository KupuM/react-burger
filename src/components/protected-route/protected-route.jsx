import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import PropTypes from "prop-types";

const ProtectedRoute = ({children, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({location}) => getCookie('accessToken') ? (
                children
            ) : (
                <Redirect to="/login" />
            )}
        />
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    rest: PropTypes.shape({
        path: PropTypes.object.isRequired,
    }),
}

export default ProtectedRoute;
