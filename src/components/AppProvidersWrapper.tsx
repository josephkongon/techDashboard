import { AuthProvider } from "@/context/useAuthContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { ChildrenType } from "@/types/component-props.ts";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "@/redux";
import { Provider as ReduxProvider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n.ts";

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <AuthProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </AuthProvider>
          </CookiesProvider>
        </I18nextProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
export default AppProvidersWrapper;
