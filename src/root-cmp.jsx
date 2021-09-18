import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router'

import routes from './routes.js'

import {AppHeader} from './cmps/app-header.jsx'
import {AppFooter} from './cmps/app-footer.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <AppHeader />
                <main className="main-container">
                    <Switch>
                        {routes.map(route=> <Route key={route.path} component={route.component} path={route.path} /> )}
                    </Switch>
                </main>
                <div className="main-container">
                    <AppFooter />
                </div>
            </div>
        )
    }
}


