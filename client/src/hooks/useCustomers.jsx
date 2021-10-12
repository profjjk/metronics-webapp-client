import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchCustomers = async () => {
    try {
        return await API.getCustomers();
    } catch(err) { console.error(err.message) }
}

const useCustomers = () => {
    return useQuery('customers', () => fetchCustomers());
}

export default useCustomers;