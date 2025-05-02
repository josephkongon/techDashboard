import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { getMenuItems } from "@/helpers/menu";

// components
import AppMenu from "./Menu";

import profileImg from "@/assets/images/users/user-1.jpg";

import { FiLock, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { useLayoutContext } from "@/context/useLayoutContext.tsx";
import { currentBrand } from "@/brands/activeBrand.ts";

/* user box */
const UserBox = () => {
  // get the profilemenu
  const ProfileMenus = [
    {
      label: "My Account",
      icon: FiUser,
      redirectTo: "#",
    },
    {
      label: "Settings",
      icon: FiSettings,
      redirectTo: "#",
    },
    {
      label: "Lock Screen",
      icon: FiLock,
      redirectTo: "/auth/lock-screen",
    },
    {
      label: "Logout",
      icon: FiLogOut,
      redirectTo: "/auth/logout",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="user-box text-center">
      <img
        src={profileImg}
        alt=""
        title="Mat Helme"
        className="rounded-circle avatar-md"
      />
      <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          id="dropdown-notification"
          as="a"
          onClick={toggleDropdown}
          className="cursor-pointer text-dark h5 mt-2 mb-1 d-block"
        >
          Geneva Kennedy
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-pro-dropdown">
          <div onClick={toggleDropdown}>
            {(ProfileMenus || []).map((item, index) => {
              return (
                <Link
                  to={item.redirectTo}
                  className="dropdown-item notify-item"
                  key={index + "-profile-menu"}
                >
                  <i className={`${item.icon} me-1`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-muted">Admin Head</p>
    </div>
  );
};

/* sidebar content */
const SideBarContent = () => {
  return (
    <>
      <UserBox />

      {/* <div id="sidebar-menu"> */}
      <AppMenu menuItems={getMenuItems()} />
      {/* </div> */}

      <div className="clearfix" />
    </>
  );
};

interface LeftSidebarProps {
  isCondensed: boolean;
  hideLogo?: boolean;
}

const LeftSidebar = ({ isCondensed, hideLogo }: LeftSidebarProps) => {
  const menuNodeRef: any = useRef(null);

  const { orientation } = useLayoutContext();

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="app-menu" ref={menuNodeRef}>
        {!hideLogo && (
          <div className="logo-box">
            <Link to="/" className="logo logo-dark text-center">
              <span className="logo-sm">
                <img src={currentBrand?.logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img
                  src={
                    orientation === "two-column"
                      ? currentBrand.logo
                      : currentBrand.logo
                  }
                  alt=""
                  height="20"
                />
              </span>
            </Link>
            <Link to="/" className="logo logo-light text-center">
              <span className="logo-sm">
                <img src={currentBrand?.logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img
                  src={
                    orientation === "two-column"
                      ? currentBrand.logo
                      : currentBrand.logo
                  }
                  alt=""
                  height="20"
                />
              </span>
            </Link>
          </div>
        )}

        {!isCondensed && (
          <SimpleBar className="scrollbar show h-100" scrollbarMaxSize={320}>
            <SideBarContent />
          </SimpleBar>
        )}
        {isCondensed && <SideBarContent />}
      </div>
    </React.Fragment>
  );
};

LeftSidebar.defaultProps = {
  isCondensed: false,
};

export default LeftSidebar;
