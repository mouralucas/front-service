import {lazy, ReactElement, FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WithoutNav from './WithoutNav'
import Landing from '../pages/Landing'
import WithNav from "./WithNav.tsx";
import Login from '../pages/Login'

const Investment: FC = lazy(() => import('../pages/finance/investment/landing'))
const FinanceLanding: FC = lazy(() => import('../pages/finance/records/Landing.tsx'))

function RolfRoutes(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithNav/>}>
                    <Route element={<Landing/>} path={'/'}></Route>
                    <Route element={<Landing/>} path={'/test'}/>

                    <Route element={<Investment/>} path="/finance/investment"/>
                    <Route element={<FinanceLanding/>} path="/finance/records"/>
                </Route>
                <Route element={<WithoutNav/>}>
                    <Route element={<Login />} path={'/login'}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RolfRoutes;