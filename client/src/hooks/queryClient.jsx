import { QueryClient } from 'react-query';

const defaultQueryClientOptions = {
    queries: {
        staleTime: 600000, // 10 minutes
        cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    },
}

const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
});

export default queryClient;
