import {HomePage} from './pages/home-page.jsx'
import {AboutUs} from './pages/about-us.jsx'
import {ToyApp} from './pages/toy-app.jsx'
import {ToyDetails} from './pages/toy-details.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'

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
        path:'/about',
        component: AboutUs,
    },
    {
        path:'/',
        component: HomePage,
    }
]

export default routes;
