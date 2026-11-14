import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { makeStore, type RootState } from '../store';

interface Options {
  route?: string | { pathname: string; state?: unknown };
  state?: Partial<RootState>;
}

/** Render with the store, the query client and a memory router. */
export function renderApp(ui: ReactElement, { route = '/', state }: Options = {}) {
  const store = makeStore(state);
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const view = render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </QueryClientProvider>
    </Provider>,
  );
  return { store, ...view };
}
