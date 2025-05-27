import { createRoot } from 'react-dom/client';
import './assets/scss/main.scss';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient({});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
