//dev
import DevFavImage from "./DEV/favicon.ico";
import DevLogo from "./DEV/logo.png";

const allBrands = {
  DEV: {
    favicon: DevFavImage,
    name: "Dev",
    logo: DevLogo,
  },
};

const brandName = import.meta.env.VITE_BRAND_NAME as string;

export const currentBrand =
  allBrands[brandName as unknown as keyof typeof allBrands];
