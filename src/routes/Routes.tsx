import { lazy, ReactElement, FC, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithoutNav from './WithoutNav'
import Landing from '../pages/Landing'
import WithNav from "./WithNav";
import Login from '../features/users/pages/Login.tsx'
import RequireAuth from "../services/auth/RequireAuth";
import CircularLoader from "../components/Loader.tsx";

const Error404: FC = lazy(() => import('../pages/errors/404'))

// Finance imports
const Investment: FC = lazy(() => import('../features/finance/transactions/pages/LandingPage.tsx'))
const InvestmentDashboard: FC = lazy(() => import('../features/finance/investment/pages/DashboardPage.tsx'))
const InvestmentActive: FC = lazy(() => import('../features/finance/investment/pages/InvestmentsActive.tsx'))
const InvestmentSettled: FC = lazy(() => import('../features/finance/investment/pages/InvestmentsSettled.tsx'))
const FinanceTransactions: FC = lazy(() => import('../features/finance/transactions/pages/TransactionsPage.tsx'))
const FinanceTransactionsDashboard: FC = lazy(() => import('../features/finance/transactions/pages/DashboardPage.tsx'))
const FinanceAdmin: FC = lazy(() => import('../features/finance/investment/pages/AdministrationPage.tsx'))

// Library imports
const LibraryLanding: FC = lazy(() => import('../pages/library/home/LandingV2.tsx'))
const LibraryBackoffice: FC = lazy(() => import('../pages/library/backoffice/Landing'));
const LibraryItem: FC = lazy(() => import('../pages/library/home/Item'));

const DesignTesting: FC = lazy(() => import('../pages/DesignTests.tsx'))

function RolfRoutes(): ReactElement {
    return (
        <BrowserRouter>
            <Suspense fallback={<CircularLoader />}>
                <Routes>
                    <Route element={<WithNav />}>
                        {/* Default page */}
                        <Route element={<Landing />} path={'/'}></Route>

                        {/* Design Testing */}
                        <Route element={<DesignTesting></DesignTesting>} path={'/testing'} />

                        {/* Finance */}
                        <Route element={<RequireAuth><Investment /></RequireAuth>} path="/finance"/>
                        <Route element={<RequireAuth><InvestmentDashboard /></RequireAuth>} path="/finance/investment" />
                        <Route element={<RequireAuth><InvestmentActive /></RequireAuth>} path="/finance/investment/active" />
                        <Route element={<RequireAuth><InvestmentSettled /></RequireAuth>} path="/finance/investment/settled" />
                        <Route element={<RequireAuth><FinanceTransactions /></RequireAuth>} path="/finance/transaction" />
                        <Route element={<RequireAuth><FinanceTransactionsDashboard /></RequireAuth>} path="/finance/transaction/dashboard" />
                        <Route element={<RequireAuth><FinanceAdmin /></RequireAuth>} path="/finance/admin" />

                        {/* Library */}
                        <Route element={<RequireAuth><LibraryLanding /></RequireAuth>} path={'/library/records'} />
                        <Route element={<RequireAuth><LibraryBackoffice /></RequireAuth>} path={'/library/backoffice'} />
                        <Route element={<RequireAuth><LibraryItem /></RequireAuth>} path={'/library/item'} />

                        {/* Settings */}
                        <Route element={<RequireAuth><FinanceAdmin /></RequireAuth>} path="/config/financeiro" />
                    </Route>
                    <Route element={<WithoutNav />}>
                        <Route element={<Login />} path={'/login'} />
                        <Route element={<Error404 />} path="*" />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default RolfRoutes;