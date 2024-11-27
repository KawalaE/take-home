import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Entrypoint } from "./components/Entrypoint";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen items-center justify-center py-32  dark:bg-slate-900 bg-gray-50 dark:text-gray-200 text-gray-950 pt-28 sm:pt-36">
        <Entrypoint />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
