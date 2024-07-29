import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "./datatables.scss";

const DatatableTables = ({ date, propsData }) => {
  if (!propsData || propsData.length === 0) {
    return (
      <div className="page-content">
        <Breadcrumbs title={date} breadcrumbItem="Expenditure" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>No data available</CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  const keys = Object.keys(propsData[0]);

  const columns = keys.map((key) => {
    return { label: key, field: key };
  });

  const rows = propsData.map((obj) => {
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  });

  const data = {
    columns: columns,
    rows: rows,
  };

  return (
    <div className="page-content">
      <Breadcrumbs title={date} breadcrumbItem="Expenditure" />
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DatatableTables;
