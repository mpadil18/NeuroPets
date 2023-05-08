import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './auth'; // import your authentication hook

function ProtectedRoute({ children, ...rest }) {
    const { currentUser } = useAuth(); // get the current user from your authentication hook
    return (
        <Route {...rest} render={({ location }) =>
            currentUser ? (children) : (<Redirect to={{ pathname: '/login', state: { from: location }, }} />)} />);
}