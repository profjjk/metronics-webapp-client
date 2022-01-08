import { Redirect } from 'react-router-dom';
import { useData, useCustomers, useUser, useJobs } from '../../react-query';
// import { CustomerForm } from '../../components';
import { Header, CustomersTable, CustomerHistory, CustomerForm } from './sections';
import { ServiceForm } from '../../components';

const CustomerPage = () => {
    const { user } = useUser();
    const { status: customerStatus, data: customers, error: customerError } = useCustomers();
    const { status: jobStatus, data: jobs, error: jobError } = useJobs();
    const customer = useData('selectedCustomer');
    const view = useData('view');

    // REDIRECT
    if (!user) {
        return <Redirect to={'/login'} />
    }

    switch(customerStatus || jobStatus) {
        case "loading":
            return <h1 className="text-center">Loading</h1>;
        case "error":
            return <h4 className="text-center">Error: {customerError.message} {jobError.message}</h4>;
        default:
            if (view === 'customerForm') {
                return (
                    <main className={"container"}>
                        <Header />
                        <CustomerForm />
                        {customer ? <CustomerHistory jobs={jobs.data} customerId={customer._id} /> : <></>}
                    </main>
                )
            } else if (view === 'serviceForm') {
                return (
                    <main className={"container"}>
                        <Header />
                        <ServiceForm />
                    </main>
                )
            } else {
                return (
                    <main className={"container"}>
                        <Header />
                        <CustomersTable customers={customers.data} />
                    </main>
                )
            }
    }
}

export default CustomerPage;
