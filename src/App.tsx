import { Fragment, useEffect } from "react";

import "nouislider/dist/nouislider.css";
import "jsvectormap/dist/css/jsvectormap.min.css";
import "react-datepicker/dist/react-datepicker.min.css";

import "@/assets/scss/Default.scss";
import "@/assets/scss/Icons.scss";

import AllRoutes from "@/routes/Routes.tsx";
import AppProvidersWrapper from "@/components/AppProvidersWrapper.tsx";
import { changeFavicon } from "@/utils";
import { currentBrand } from "@/brands/activeBrand.ts";

function App() {
  useEffect(() => {
    if (currentBrand.favicon) {
      changeFavicon(currentBrand.favicon);
      document.title = currentBrand.name;
    }
  }, []);

  return (
    <>
      <Fragment>
        <AppProvidersWrapper>
          <AllRoutes />
        </AppProvidersWrapper>
      </Fragment>
    </>
  );
}

export default App;
