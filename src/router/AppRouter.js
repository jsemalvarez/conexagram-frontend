import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from '../pages/HomePage';
import { AuthRouter } from './AuthRouter';
import { Loading } from '../components/ui/Loading';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return ( <Loading />);
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ HomePage } 
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/auth/login" />   
                    
                </Switch>
            </div>
        </Router>
    )
}
