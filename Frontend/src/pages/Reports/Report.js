import React from "react";
import { Row } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import PieChart from "../AllCharts/echart/piechart";

const Report = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard 2" /> */}
        <Row>
          <PieChart />
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Report;
