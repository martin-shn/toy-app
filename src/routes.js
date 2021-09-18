import {HomePage} from './pages/home-page.jsx'
import {AboutUs} from './pages/about-us.jsx'
import {ToyApp} from './pages/toy-app.jsx'
import {ToyDetails} from './pages/toy-details.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'
import { Signup } from './pages/signup.jsx'
import { Dashboard } from './pages/dashboard.jsx'
import { Admin } from './pages/admin.jsx'
import { UserDetails } from './pages/user-details.jsx'
import { UserEdit } from './pages/user-edit.jsx'

const routes = [
    {
        path:'/toy/edit/:toyId',
        component: ToyEdit,
    },
    {
        path:'/toy/:toyId',
        component: ToyDetails,
    },
    {
        path:'/toy',
        component: ToyApp,
    },
    {
        path:'/user/edit/:userId',
        component: UserEdit,
    },
    {
        path:'/user/:userId',
        component: UserDetails,
    },
    {
        path:'/about',
        component: AboutUs,
    },
    {
        path:'/signup',
        component: Signup,
    },
    {
        path:'/admin',
        component: Admin,
    },
    {
        path:'/dashboard',
        component: Dashboard,
    },
    {
        path:'/',
        component: HomePage,
    }
]

export default routes;
