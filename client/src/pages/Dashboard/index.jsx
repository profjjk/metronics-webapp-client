import { Redirect } from "react-router-dom";
import { useUser } from "../../hooks";
import { WaitListTable, RestockTable, MessagesTable } from "../../components";
import { SideNavbar } from "../../components";
import './style.scss';

const DashboardHome = () => {
    const { user } = useUser();

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    return (
        <>
            <header>
                <SideNavbar />
            </header>
            <main className={"container"} id={"dashboard"}>
                <h1>Dashboard</h1>
                <MessagesTable />
                <WaitListTable />
                <RestockTable />
            </main>
        </>
    )
}

export default DashboardHome;

// TODO: Add some interesting data on the top bar...
// - Number of jobs completed this year
// - Total number of customers
// - Unpaid invoices (need to add to data)
// - Total amount billed (need to add to data)