import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import avatar2 from "../../assets/images/users/avatar-2.png";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu" style={{ height: "calc(100vh - 110px)" }}>
        <div className="h-100">
          <div className="user-wid text-center py-3">
            <div className="user-img">
              <img
                src={avatar2}
                alt=""
                className="avatar-md mx-auto rounded-circle"
              />
            </div>

            <div className="mt-2"></div>
          </div>
          <div data-simplebar className="h-100">
            {props.type !== "condensed" ? (
              <SidebarContent />
            ) : (
              <SidebarContent />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
