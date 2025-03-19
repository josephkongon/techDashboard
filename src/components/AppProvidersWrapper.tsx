import { AuthProvider } from "@/context/useAuthContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { ChildrenType } from "@/types/component-props.ts";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "@/redux";
import { Provider as ReduxProvider } from "react-redux";

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <AuthProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </AuthProvider>
        </CookiesProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
export default AppProvidersWrapper;
