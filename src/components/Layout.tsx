import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

const Layout = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <Header />
        <main className='pt-20'>
            <Outlet />
        </main>

    </QueryClientProvider>
    </>
  );
};

export default Layout;