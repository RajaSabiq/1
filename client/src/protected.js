import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Protected({ component: Cmp, ...rest }) {

    return <Route
        {...rest}
        render={(props) => (
            Cookies.get('token') !== undefined && localStorage.getItem('token') ? (
                <>
                    <Cmp {...props} />
                </>
            ) :
                <Redirect to='/login' />
        )} />
}
