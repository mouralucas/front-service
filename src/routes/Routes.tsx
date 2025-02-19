import {lazy, ReactElement, FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WithoutNav from './WithoutNav'
import Landing from '../pages/Landing'
import WithNav from "./WithNav";
import Login from '../pages/user/Login'
import RequireAuth from "../services/auth/RequireAuth";

const Error404: FC = lazy(() => import('../pages/errors/404'))

// Finance imports
const InvestmentDashboard: FC = lazy(() => import('../pages/finance/investment/dashboard/Landing'))
const InvestmentRecords: FC = lazy(() => import('../pages/finance/investment/records/Landing'))
const FinanceTransactions: FC = lazy(() => import('../pages/finance/transactions/records/Landing'))
const FinanceTransactionsDashboard: FC = lazy(() => import('../pages/finance/transactions/dashboard/Landing'))
const FinanceAdmin: FC = lazy(() => import('../pages/finance/administration/Landing'))

// Library imports
const LibraryLanding: FC = lazy(() => import('../pages/library/home/Landing.tsx'))
const LibraryBackoffice: FC = lazy(() => import('../pages/library/backoffice/Landing'));
const LibraryItem: FC = lazy(() => import('../pages/library/home/Item'));

const Le: FC = lazy(() => import('../pages/Leticia.tsx'))

function RolfRoutes(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithNav/>}>
                    {/* Default page */}
                    <Route element={<Landing/>} path={'/'}></Route>

                    {/* Letiça */}
                    <Route element={<Le></Le>} path={'/letiça'}/>

                    {/* Finance */}
                    <Route element={<RequireAuth><InvestmentDashboard/></RequireAuth>} path="/finance/investment"/>
                    <Route element={<RequireAuth><InvestmentRecords/></RequireAuth>} path="/finance/investment/records"/>
                    <Route element={<RequireAuth><FinanceTransactions/></RequireAuth>} path="/finance/transaction"/>
                    <Route element={<RequireAuth><FinanceTransactionsDashboard/></RequireAuth>} path="/finance/transaction/dashboard"/>
                    <Route element={<RequireAuth><FinanceAdmin/></RequireAuth>} path="/finance/admin"/>

                    {/* Library */}
                    <Route element={<RequireAuth><LibraryLanding/></RequireAuth>} path={'/library/records'} />
                    <Route element={<RequireAuth><LibraryBackoffice/></RequireAuth>} path={'/library/backoffice'} />
                    <Route element={<RequireAuth><LibraryItem /></RequireAuth>} path={'/library/item'} />
                </Route>
                <Route element={<WithoutNav/>}>
                    <Route element={<Login />} path={'/login'}/>
                    <Route element={<Error404/>} path="*"/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RolfRoutes;