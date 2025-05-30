import { IconType } from "react-icons";
import {
  FiActivity,
  FiAirplay,
  FiAperture,
  FiBarChart2,
  FiBook,
  FiBookmark,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiCpu,
  FiFileText,
  FiFolderPlus,
  FiGift,
  FiGrid,
  FiHome,
  FiLayers,
  FiMail,
  FiMap,
  FiMessageSquare,
  FiPackage,
  FiRss,
  FiShare2,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: IconType;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "navigation", label: "Dashboards", isTitle: true },
  {
    key: "dashboards",
    label: "Dashboard",
    isTitle: false,
    icon: FiAirplay,
    url: "/",
  },
  { key: "apps", label: "Apps", isTitle: true },
  {
    key: "apps-calendar",
    label: "Calendar",
    isTitle: false,
    icon: FiCalendar,
    url: "/apps/calendar",
  },

  {
    key: "apps-ecommerce",
    label: "Store",
    isTitle: false,
    icon: FiShoppingCart,
    children: [
      {
        key: "categories-groups",
        label: "Category Group",
        url: "/store/category-groups",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-categories",
        label: "Categories",
        url: "/store/categories",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-products",
        label: "Products",
        url: "/store/products",
        parentKey: "apps-ecommerce",
      },

      {
        key: "ecommerce-customers",
        label: "Customers",
        url: "/store/customers",
        parentKey: "apps-ecommerce",
      },
      {
        key: "ecommerce-orders",
        label: "Orders",
        url: "/store/orders",
        parentKey: "apps-ecommerce",
      },
    ],
  },

  {
    key: "apps-tickets",
    label: "Tickets",
    isTitle: false,
    icon: FiAperture,
    children: [
      {
        key: "tickets-list",
        label: "List",
        url: "/apps/tickets/list",
        parentKey: "apps-tickets",
      },
      {
        key: "tickets-details",
        label: "Details",
        url: "/apps/tickets/details",
        parentKey: "apps-tickets",
      },
    ],
  },

  {
    key: "apps-setting",
    label: "Settings",
    isTitle: false,
    icon: FiAperture,
    children: [
      {
        key: "settings-list",
        label: "Category menu",
        url: "/apps/settings/category-menu",
        parentKey: "apps-tickets",
      },

      {
        key: "config",
        label: "Config",
        url: "/apps/settings/config",
        parentKey: "apps-tickets",
      },
      {
        key: "contact-us",
        label: "Contact Us",
        url: "/apps/settings/contact-us",
        parentKey: "apps-tickets",
      },
    ],
  },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    icon: FiHome,
    label: "Dashboard",
    isTitle: true,
    children: [
      {
        key: "ds-dashboard-1",
        label: "Dashboard 1",
        url: "/dashboard-1",
        parentKey: "dashboard",
      },
    ],
  },

  {
    key: "ecommerce-dashboard",
    label: "Dashboard",
    url: "/store/dashboard",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-products",
    label: "Products",
    url: "/store/products",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-details",
    label: "Product Details",
    url: "/store/product-details",
    parentKey: "apps-ecommerce",
  },

  {
    key: "ecommerce-customers",
    label: "Customers",
    url: "/store/customers",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-orders",
    label: "Orders",
    url: "/store/orders",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-order-details",
    label: "Order Details",
    url: "/store/order/details",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-sellers",
    label: "Sellers",
    url: "/store/sellers",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-shopping-cart",
    label: "Shopping Cart",
    url: "/store/shopping-cart",
    parentKey: "apps-ecommerce",
  },
  {
    key: "ecommerce-checkout",
    label: "Checkout",
    url: "/store/checkout",
    parentKey: "apps-ecommerce",
  },

  {
    key: "apps",
    icon: FiGrid,
    label: "Apps",
    isTitle: true,
    children: [
      {
        key: "apps-calendar",
        label: "Calendar",
        isTitle: false,
        icon: FiCalendar,
        url: "/apps/calendar",
        parentKey: "apps",
      },

      {
        key: "apps-tickets",
        label: "Tickets",
        isTitle: false,
        icon: FiAperture,
        parentKey: "apps",
        children: [
          {
            key: "tickets-list",
            label: "List",
            url: "/apps/tickets/list",
            parentKey: "apps-tickets",
          },
          {
            key: "tickets-details",
            label: "Details",
            url: "/apps/tickets/details",
            parentKey: "apps-tickets",
          },
        ],
      },
    ],
  },
  {
    key: "base-ui",
    icon: FiBriefcase,
    label: "UI Elements",
    isTitle: true,
    children: [
      {
        key: "base-ui-buttons",
        label: "Buttons",
        url: "/ui/buttons",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-cards",
        label: "Cards",
        url: "/ui/cards",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-avatars",
        label: "Avatars",
        url: "/ui/avatars",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-portlets",
        label: "Portlets",
        url: "/ui/portlets",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-tabs-accordions",
        label: "Tabs & Accordions",
        url: "/ui/tabs-accordions",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-modals",
        label: "Modals",
        url: "/ui/modals",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-progress",
        label: "Progress",
        url: "/ui/progress",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-notifications",
        label: "Notifications",
        url: "/ui/notifications",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-offcanvas",
        label: "Offcanvas",
        url: "/ui/offcanvas",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-placeholders",
        label: "Placeholders",
        url: "/ui/placeholders",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-spinners",
        label: "Spinners",
        url: "/ui/spinners",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-images",
        label: "Images",
        url: "/ui/images",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-carousel",
        label: "Carousel",
        url: "/ui/carousel",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-listgroups",
        label: "List Groups",
        url: "/ui/listgroups",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-embedvideo",
        label: "Embed Video",
        url: "/ui/embedvideo",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-dropdown",
        label: "Dropdowns",
        url: "/ui/dropdowns",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-ribbons",
        label: "Ribbons",
        url: "/ui/ribbons",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-tooltips-popovers",
        label: "Tooltips & Popovers",
        url: "/ui/tooltips-popovers",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-general",
        label: "General UI",
        url: "/ui/general",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-typography",
        label: "Typography",
        url: "/ui/typography",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-grid",
        label: "Grid",
        url: "/ui/grid",
        parentKey: "base-ui",
      },
    ],
  },
  {
    key: "components",
    icon: FiPackage,
    label: "Components",
    isTitle: true,
    children: [
      {
        key: "extended-ui",
        label: "Extended UI",
        isTitle: false,
        icon: FiLayers,
        badge: { variant: "info", text: "Hot" },
        parentKey: "components",
        children: [
          {
            key: "extended-ui-nestable",
            label: "Nestable List",
            url: "/extended-ui/nestable",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-dragdrop",
            label: "Drag and Drop",
            url: "/extended-ui/dragdrop",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-rangesliders",
            label: "Range Sliders",
            url: "/extended-ui/rangesliders",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-animation",
            label: "Animation",
            url: "/extended-ui/animation",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-sweet-alert",
            label: "Sweet Alert",
            url: "/extended-ui/sweet-alert",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-loading-buttons",
            label: "Loading Buttons",
            url: "/extended-ui/loading-buttons",
            parentKey: "extended-ui",
          },
        ],
      },
      {
        key: "widgets",
        label: "Widgets",
        isTitle: false,
        icon: FiGift,
        url: "/ui/widgets",
        parentKey: "components",
      },
      {
        key: "icons",
        label: "Icons",
        isTitle: false,
        icon: FiCpu,
        parentKey: "components",
        children: [
          {
            key: "icon-feather",
            label: "Feather Icons",
            url: "/ui/icons/feather",
            parentKey: "icons",
          },
          {
            key: "icon-mdiicons",
            label: "Material Design Icons",
            url: "/ui/icons/mdi",
            parentKey: "icons",
          },
          {
            key: "icon-dripicons",
            label: "Dripicons",
            url: "/ui/icons/dripicons",
            parentKey: "icons",
          },
          {
            key: "icon-font-awesome",
            label: "Font Awesome 5",
            url: "/ui/icons/font-awesome",
            parentKey: "icons",
          },
          {
            key: "icon-themify",
            label: "Themify",
            url: "/ui/icons/themify",
            parentKey: "icons",
          },
          {
            key: "icon-simple-line",
            label: "Simple Line",
            url: "/ui/icons/simple-line",
            parentKey: "icons",
          },
          {
            key: "icon-weather",
            label: "Weather",
            url: "/ui/icons/weather",
            parentKey: "icons",
          },
        ],
      },
      {
        key: "forms",
        label: "Forms",
        isTitle: false,
        icon: FiBookmark,
        parentKey: "components",
        children: [
          {
            key: "form-basic",
            label: "General Elements",
            url: "/ui/forms/basic",
            parentKey: "forms",
          },
          {
            key: "form-advanced",
            label: "Form Advanced",
            url: "/ui/forms/advanced",
            parentKey: "forms",
          },
          {
            key: "form-validation",
            label: "Validation",
            url: "/ui/forms/validation",
            parentKey: "forms",
          },
          {
            key: "form-wizard",
            label: "Wizard",
            url: "/ui/forms/wizard",
            parentKey: "forms",
          },
          {
            key: "form-upload",
            label: "File Uploads",
            url: "/ui/forms/upload",
            parentKey: "forms",
          },
          {
            key: "form-editors",
            label: "Editors",
            url: "/ui/forms/editors",
            parentKey: "forms",
          },
        ],
      },
      {
        key: "tables",
        label: "Tables",
        isTitle: false,
        icon: FiGrid,
        parentKey: "components",
        children: [
          {
            key: "table-basic",
            label: "Basic Tables",
            url: "/ui/tables/basic",
            parentKey: "tables",
          },
          {
            key: "table-advanced",
            label: "Advanced Tables",
            url: "/ui/tables/advanced",
            parentKey: "tables",
          },
        ],
      },
      {
        key: "charts",
        label: "Charts",
        isTitle: false,
        parentKey: "components",
        icon: FiBarChart2,
        children: [
          {
            key: "chart-apex",
            label: "Apex Charts",
            url: "/ui/charts/apex",
            parentKey: "charts",
          },
          {
            key: "chart-chartjs",
            label: "Chartjs",
            url: "/ui/charts/chartjs",
            parentKey: "charts",
          },
        ],
      },
      {
        key: "maps",
        label: "Maps",
        isTitle: false,
        icon: FiMap,
        parentKey: "components",
        children: [
          {
            key: "maps-vectormaps",
            label: "Vector Maps",
            url: "/ui/vectormaps",
            parentKey: "maps",
          },
        ],
      },
      {
        key: "menu-levels",
        label: "Menu Levels",
        isTitle: false,
        icon: FiShare2,
        parentKey: "components",
        children: [
          {
            key: "menu-levels-1-1",
            label: "Level 1.1",
            url: "/",
            parentKey: "menu-levels",
            children: [
              {
                key: "menu-levels-2-1",
                label: "Level 2.1",
                url: "/",
                parentKey: "menu-levels-1-1",
                children: [
                  {
                    key: "menu-levels-3-1",
                    label: "Level 3.1",
                    url: "/",
                    parentKey: "menu-levels-2-1",
                  },
                  {
                    key: "menu-levels-3-2",
                    label: "Level 3.2",
                    url: "/",
                    parentKey: "menu-levels-2-1",
                  },
                ],
              },
              {
                key: "menu-levels-2-2",
                label: "Level 2.2",
                url: "/",
                parentKey: "menu-levels-1-1",
              },
            ],
          },
          {
            key: "menu-levels-1-2",
            label: "Level 1.2",
            url: "/",
            parentKey: "menu-levels",
          },
        ],
      },
    ],
  },
  {
    key: "pages",
    icon: FiFileText,
    label: "Pages",
    isTitle: true,
    children: [
      {
        key: "error-pages",
        label: "Errors",
        isTitle: false,
        parentKey: "pages",
        children: [
          {
            key: "page-error-404",
            label: "Error - 404",
            url: "/error-404",
            parentKey: "error-pages",
          },
          {
            key: "page-error-404-two",
            label: "Error - 404 Two",
            url: "/error-404-two",
            parentKey: "error-pages",
          },
          {
            key: "page-error-404-alt",
            label: "Error - 404-alt",
            url: "/pages/error-404-alt",
            parentKey: "error-pages",
          },
          {
            key: "page-error-500",
            label: "Error - 500",
            url: "/error-500",
            parentKey: "error-pages",
          },
          {
            key: "page-error-500-two",
            label: "Error - 500 Two",
            url: "/error-500-two",
            parentKey: "error-pages",
          },
        ],
      },
    ],
  },
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    icon: FiHome,
    label: "Dashboard",
    isTitle: true,
    children: [
      {
        key: "ds-dashboard-1",
        label: "Dashboard 1",
        url: "/dashboard-1",
        parentKey: "dashboard",
      },
      {
        key: "ds-dashboard-2",
        label: "Dashboard 2",
        url: "/dashboard-2",
        parentKey: "dashboard",
      },
      {
        key: "ds-dashboard-3",
        label: "Dashboard 3",
        url: "/dashboard-3",
        parentKey: "dashboard",
      },
      {
        key: "ds-dashboard-4",
        label: "Dashboard 4",
        url: "/dashboard-4",
        parentKey: "dashboard",
      },
    ],
  },
  {
    key: "apps",
    icon: FiGrid,
    label: "Apps",
    isTitle: true,
    children: [
      {
        key: "apps-calendar",
        label: "Calendar",
        isTitle: false,
        icon: FiCalendar,
        url: "/apps/calendar",
        parentKey: "apps",
      },
      {
        key: "apps-chat",
        label: "Chat",
        isTitle: false,
        icon: FiMessageSquare,
        url: "/apps/chat",
        parentKey: "apps",
      },
      {
        key: "apps-ecommerce",
        label: "Ecommerce",
        isTitle: false,
        icon: FiShoppingCart,
        parentKey: "apps",
        children: [
          {
            key: "ecommerce-dashboard",
            label: "Dashboard",
            url: "/store/dashboard",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-products",
            label: "Products",
            url: "/store/products",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-details",
            label: "Product Details",
            url: "/store/product-details",
            parentKey: "apps-ecommerce",
          },

          {
            key: "ecommerce-customers",
            label: "Customers",
            url: "/store/customers",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-orders",
            label: "Orders",
            url: "/store/orders",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-order-details",
            label: "Order Details",
            url: "/store/order/details",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-sellers",
            label: "Sellers",
            url: "/store/sellers",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-shopping-cart",
            label: "Shopping Cart",
            url: "/store/shopping-cart",
            parentKey: "apps-ecommerce",
          },
          {
            key: "ecommerce-checkout",
            label: "Checkout",
            url: "/store/checkout",
            parentKey: "apps-ecommerce",
          },
        ],
      },
      {
        key: "apps-crm",
        label: "CRM",
        isTitle: false,
        icon: FiUsers,
        parentKey: "apps",
        children: [
          {
            key: "crm-dashboard",
            label: "Dashboard",
            url: "/apps/crm/dashboard",
            parentKey: "apps-crm",
          },
          {
            key: "crm-contacts",
            label: "Contacts",
            url: "/apps/crm/contacts",
            parentKey: "apps-crm",
          },
          {
            key: "crm-opportunities",
            label: "Opportunities",
            url: "/apps/crm/opportunities",
            parentKey: "apps-crm",
          },
          {
            key: "crm-leads",
            label: "Leads",
            url: "/apps/crm/leads",
            parentKey: "apps-crm",
          },
          {
            key: "crm-customers",
            label: "Customers",
            url: "/apps/crm/customers",
            parentKey: "apps-crm",
          },
        ],
      },
      {
        key: "apps-email",
        label: "Email",
        isTitle: false,
        icon: FiMail,
        parentKey: "apps",
        children: [
          {
            key: "email-inbox",
            label: "Inbox",
            url: "/apps/email/inbox",
            parentKey: "apps-email",
          },
          {
            key: "email-read-email",
            label: "Read Email",
            url: "/apps/email/details",
            parentKey: "apps-email",
          },
          {
            key: "email-compose-email",
            label: "Compose Email",
            url: "/apps/email/compose",
            parentKey: "apps-email",
          },
        ],
      },
      {
        key: "apps-social",
        label: "Social Feed",
        isTitle: false,
        icon: FiRss,
        url: "/apps/social-feed",
        badge: { variant: "pink", text: "Hot" },
        parentKey: "apps",
      },
      {
        key: "apps-companies",
        label: "Companies",
        isTitle: false,
        icon: FiActivity,
        url: "/apps/companies",
        parentKey: "apps",
      },
      {
        key: "apps-projects",
        label: "Projects",
        isTitle: false,
        icon: FiBriefcase,
        parentKey: "apps",
        children: [
          {
            key: "project-list",
            label: "List",
            url: "/apps/projects/list",
            parentKey: "apps-projects",
          },
          {
            key: "project-details",
            label: "Details",
            url: "/apps/projects/:id/details",
            parentKey: "apps-projects",
          },
          {
            key: "project-create-project",
            label: "Create Project",
            url: "/apps/projects/create",
            parentKey: "apps-projects",
          },
        ],
      },
      {
        key: "apps-tasks",
        label: "Tasks",
        isTitle: false,
        icon: FiClipboard,
        parentKey: "apps",
        children: [
          {
            key: "task-list",
            label: "List",
            url: "/apps/tasks/list",
            parentKey: "apps-tasks",
          },
          {
            key: "task-details",
            label: "Details",
            url: "/apps/tasks/details",
            parentKey: "apps-tasks",
          },
          {
            key: "task-kanban",
            label: "Kanban Board",
            url: "/apps/tasks/kanban",
            parentKey: "apps-tasks",
          },
        ],
      },
      {
        key: "apps-contacts",
        label: "Contacts",
        isTitle: false,
        icon: FiBook,
        parentKey: "apps",
        children: [
          {
            key: "contacts-list",
            label: "Members List",
            url: "/apps/contacts/list",
            parentKey: "apps-contacts",
          },
          {
            key: "contacts-profile",
            label: "Profile",
            url: "/apps/contacts/profile",
            parentKey: "apps-contacts",
          },
        ],
      },
      {
        key: "apps-tickets",
        label: "Tickets",
        isTitle: false,
        icon: FiAperture,
        parentKey: "apps",
        children: [
          {
            key: "tickets-list",
            label: "List",
            url: "/apps/tickets/list",
            parentKey: "apps-tickets",
          },
          {
            key: "tickets-details",
            label: "Details",
            url: "/apps/tickets/details",
            parentKey: "apps-tickets",
          },
        ],
      },
      {
        key: "apps-file-manager",
        label: "File Manager",
        isTitle: false,
        icon: FiFolderPlus,
        url: "/apps/file-manager",
        parentKey: "apps",
      },
    ],
  },
  {
    key: "extra-pages",
    icon: FiFileText,
    label: "Pages",
    isTitle: true,
    children: [
      {
        key: "page-starter",
        label: "Starter",
        url: "/pages/starter",
        parentKey: "extra-pages",
      },
      {
        key: "page-timeline",
        label: "Timeline",
        url: "/pages/timeline",
        parentKey: "extra-pages",
      },
      {
        key: "page-sitemap",
        label: "Sitemap",
        url: "/pages/sitemap",
        parentKey: "extra-pages",
      },

      {
        key: "page-faq",
        label: "FAQs",
        url: "/pages/faq",
        parentKey: "extra-pages",
      },
      {
        key: "page-search-result",
        label: "Search Results",
        url: "/pages/serach-results",
        parentKey: "extra-pages",
      },
      {
        key: "page-pricing",
        label: "Pricing",
        url: "/pages/pricing",
        parentKey: "extra-pages",
      },
      {
        key: "page-maintenance",
        label: "Maintenance",
        url: "/maintenance",
        target: "_blank",
        parentKey: "extra-pages",
      },
      {
        key: "page-upcoming",
        label: "Coming Soon",
        url: "/upcoming",
        parentKey: "extra-pages",
      },
      {
        key: "page-gallery",
        label: "Gallery",
        url: "/pages/gallery",
        parentKey: "extra-pages",
      },

      {
        key: "page-error-404",
        label: "Error - 404",
        url: "/error-404",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-404-two",
        label: "Error - 404 Two",
        url: "/error-404-two",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-404-alt",
        label: "Error - 404-alt",
        url: "/pages/error-404-alt",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-500",
        label: "Error - 500",
        url: "/error-500",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-500-two",
        label: "Error - 500 Two",
        url: "/error-500-two",
        parentKey: "extra-pages",
      },
    ],
  },
  {
    key: "base-ui",
    icon: FiBriefcase,
    label: "UI Elements",
    isTitle: true,
    children: [
      {
        key: "base-ui-buttons",
        label: "Buttons",
        url: "/ui/buttons",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-cards",
        label: "Cards",
        url: "/ui/cards",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-avatars",
        label: "Avatars",
        url: "/ui/avatars",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-portlets",
        label: "Portlets",
        url: "/ui/portlets",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-tabs-accordions",
        label: "Tabs & Accordions",
        url: "/ui/tabs-accordions",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-modals",
        label: "Modals",
        url: "/ui/modals",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-progress",
        label: "Progress",
        url: "/ui/progress",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-notifications",
        label: "Notifications",
        url: "/ui/notifications",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-offcanvas",
        label: "Offcanvas",
        url: "/ui/offcanvas",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-placeholders",
        label: "Placeholders",
        url: "/ui/placeholders",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-spinners",
        label: "Spinners",
        url: "/ui/spinners",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-images",
        label: "Images",
        url: "/ui/images",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-carousel",
        label: "Carousel",
        url: "/ui/carousel",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-listgroups",
        label: "List Groups",
        url: "/ui/listgroups",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-embedvideo",
        label: "Embed Video",
        url: "/ui/embedvideo",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-dropdown",
        label: "Dropdowns",
        url: "/ui/dropdowns",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-ribbons",
        label: "Ribbons",
        url: "/ui/ribbons",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-tooltips-popovers",
        label: "Tooltips & Popovers",
        url: "/ui/tooltips-popovers",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-general",
        label: "General UI",
        url: "/ui/general",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-typography",
        label: "Typography",
        url: "/ui/typography",
        parentKey: "base-ui",
      },
      {
        key: "base-ui-grid",
        label: "Grid",
        url: "/ui/grid",
        parentKey: "base-ui",
      },
    ],
  },
  {
    key: "components",
    icon: FiPackage,
    label: "Components",
    isTitle: true,
    children: [
      {
        key: "extended-ui",
        label: "Extended UI",
        isTitle: false,
        icon: FiLayers,
        badge: { variant: "info", text: "Hot" },
        parentKey: "components",
        children: [
          {
            key: "extended-ui-nestable",
            label: "Nestable List",
            url: "/extended-ui/nestable",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-dragdrop",
            label: "Drag and Drop",
            url: "/extended-ui/dragdrop",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-rangesliders",
            label: "Range Sliders",
            url: "/extended-ui/rangesliders",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-animation",
            label: "Animation",
            url: "/extended-ui/animation",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-sweet-alert",
            label: "Sweet Alert",
            url: "/extended-ui/sweet-alert",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-loading-buttons",
            label: "Loading Buttons",
            url: "/extended-ui/loading-buttons",
            parentKey: "extended-ui",
          },
        ],
      },
      {
        key: "icons",
        label: "Icons",
        isTitle: false,
        icon: FiCpu,
        parentKey: "components",
        children: [
          {
            key: "icon-feather",
            label: "Feather Icons",
            url: "/ui/icons/feather",
            parentKey: "icons",
          },
          {
            key: "icon-mdiicons",
            label: "Material Design Icons",
            url: "/ui/icons/mdi",
            parentKey: "icons",
          },
          {
            key: "icon-dripicons",
            label: "Dripicons",
            url: "/ui/icons/dripicons",
            parentKey: "icons",
          },
          {
            key: "icon-font-awesome",
            label: "Font Awesome 5",
            url: "/ui/icons/font-awesome",
            parentKey: "icons",
          },
          {
            key: "icon-themify",
            label: "Themify",
            url: "/ui/icons/themify",
            parentKey: "icons",
          },
          {
            key: "icon-simple-line",
            label: "Simple Line",
            url: "/ui/icons/simple-line",
            parentKey: "icons",
          },
          {
            key: "icon-weather",
            label: "Weather",
            url: "/ui/icons/weather",
            parentKey: "icons",
          },
        ],
      },
      {
        key: "forms",
        label: "Forms",
        isTitle: false,
        icon: FiBookmark,
        parentKey: "components",
        children: [
          {
            key: "form-basic",
            label: "General Elements",
            url: "/ui/forms/basic",
            parentKey: "forms",
          },
          {
            key: "form-advanced",
            label: "Form Advanced",
            url: "/ui/forms/advanced",
            parentKey: "forms",
          },
          {
            key: "form-validation",
            label: "Validation",
            url: "/ui/forms/validation",
            parentKey: "forms",
          },
          {
            key: "form-wizard",
            label: "Wizard",
            url: "/ui/forms/wizard",
            parentKey: "forms",
          },
          {
            key: "form-upload",
            label: "File Uploads",
            url: "/ui/forms/upload",
            parentKey: "forms",
          },
          {
            key: "form-editors",
            label: "Editors",
            url: "/ui/forms/editors",
            parentKey: "forms",
          },
        ],
      },
      {
        key: "tables",
        label: "Tables",
        isTitle: false,
        icon: FiGrid,
        parentKey: "components",
        children: [
          {
            key: "table-basic",
            label: "Basic Tables",
            url: "/ui/tables/basic",
            parentKey: "tables",
          },
          {
            key: "table-advanced",
            label: "Advanced Tables",
            url: "/ui/tables/advanced",
            parentKey: "tables",
          },
        ],
      },
      {
        key: "charts",
        label: "Charts",
        isTitle: false,
        parentKey: "components",
        icon: FiBarChart2,
        children: [
          {
            key: "chart-apex",
            label: "Apex Charts",
            url: "/ui/charts/apex",
            parentKey: "charts",
          },
          {
            key: "chart-chartjs",
            label: "Chartjs",
            url: "/ui/charts/chartjs",
            parentKey: "charts",
          },
        ],
      },
      {
        key: "maps",
        label: "Maps",
        isTitle: false,
        icon: FiMap,
        parentKey: "components",
        children: [
          {
            key: "maps-vectormaps",
            label: "Vector Maps",
            url: "/ui/vectormaps",
            parentKey: "maps",
          },
        ],
      },
      {
        key: "menu-levels",
        label: "Menu Levels",
        isTitle: false,
        icon: FiShare2,
        parentKey: "components",
        children: [
          {
            key: "menu-levels-1-1",
            label: "Level 1.1",
            url: "/",
            parentKey: "menu-levels",
            children: [
              {
                key: "menu-levels-2-1",
                label: "Level 2.1",
                url: "/",
                parentKey: "menu-levels-1-1",
                children: [
                  {
                    key: "menu-levels-3-1",
                    label: "Level 3.1",
                    url: "/",
                    parentKey: "menu-levels-2-1",
                  },
                  {
                    key: "menu-levels-3-2",
                    label: "Level 3.2",
                    url: "/",
                    parentKey: "menu-levels-2-1",
                  },
                ],
              },
              {
                key: "menu-levels-2-2",
                label: "Level 2.2",
                url: "/",
                parentKey: "menu-levels-1-1",
              },
            ],
          },
          {
            key: "menu-levels-1-2",
            label: "Level 1.2",
            url: "/",
            parentKey: "menu-levels",
          },
        ],
      },
    ],
  },
  {
    isTitle: true,
    key: "widgets",
    label: "Other page",
    icon: FiGift,
    url: "/ui/widgets",
    children: [
      {
        key: "widgets1",
        label: "Widgets",
        url: "/ui/widgets",
        parentKey: "widgets",
      },
    ],
  },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
