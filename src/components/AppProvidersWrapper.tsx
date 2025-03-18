import { AuthProvider } from "@/context/useAuthContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { ChildrenType } from "@/types/component-props.ts";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AuthProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
};
export default AppProvidersWrapper;
