//dev
import DevFavImage from "./DEV/favicon.ico";
import TechnolandImage from "./DEV/favicon.ico";
//Technoland
import DevLogo from "./DEV/logo.png";
import TechnolandLogo from "./DEV/logo.png";

const allBrands = {
  DEV: {
    favicon: DevFavImage,
    name: "Dev",
    logo: DevLogo,
  },
  Technoland: {
    favicon: TechnolandImage,
    name: "Technoland",
    logo: TechnolandLogo,
  },
};

const brandName = import.meta.env.VITE_BRAND_NAME as string;

export const currentBrand =
  allBrands[brandName as unknown as keyof typeof allBrands];
