import React from "react";
import PropTypes from "prop-types";
import SidebarNavSection from "./SidebarNavSection";
import debug from "sabio-debug";

const SidebarNav = ({ items, currentUser }) => {
  const _logger = debug.extend("SidebarNav");
  const checkForRoles = (roles) => {
    let result = true;
    const compareRoles = (userRole) => {
      return roles.includes(userRole);
    };

    const matching = currentUser.roles.filter(compareRoles);

    if (matching.length === 0) {
      result = false;
    }
    return result;
  };

  const filterChildren = (child) => {
    let result = true;
    if (Array.isArray(child?.roles) && child?.roles && child.roles[0]) {
      result = checkForRoles(child.roles);
    }
    return result;
  };

  const filterPages = (page) => {
    let result = true;
    if (!page.children) {
      if (page.roles && page.roles[0]) {
        result = checkForRoles(page.roles);
      }
    }
    return result;
  };

  const mapPages = (page) => {
    let children = page.children;
    let newPage = page;
    if (children) {
      newPage.children = children.filter(filterChildren);
      _logger(children, "checking children");
    }
    return newPage;
  };

  const mapItems = (item) => {
    let filteredPages = item.pages.filter(filterPages);
    return (
      <SidebarNavSection
        key={item.title}
        pages={filteredPages.map(mapPages)}
        title={item.title}
      />
    );
  };

  return <ul className="sidebar-nav">{items && items.map(mapItems)}</ul>;
};
SidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
export default SidebarNav;
