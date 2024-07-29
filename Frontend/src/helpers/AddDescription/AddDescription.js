import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Label,
  Input,
  FormGroup,
  Col,
  Row,
  Card,
  CardBody,
  Button,
  CardTitle,
} from "reactstrap";
import { Table } from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const axiosAPI = axios.create();
const AddDescription = () => {
  const [newDescription, setNewDescription] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // fetching data initally
  const fetchData = async () => {
    try {
      const response = await axiosAPI.get(
        "http://localhost:5000/api/Description/GetDescription"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };
  //handle Delete
  const handleDelete = async (index) => {
    const isConfirmed = window.confirm("Delete This Description..?");
    if (isConfirmed) {
      const descriptionToDelete = data[index];
      console.log(descriptionToDelete.description);
      try {
        const response = await axiosAPI.delete(
          `http://localhost:5000/api/Description/DeletedDescription/${descriptionToDelete.description}`
        );
        if (response.status === 200) {
          alert("Description deleted successfully");
          const newData = [...data];
          newData.splice(index, 1);
          setData(newData); // Update state after successful deletion
        } else {
          alert("Failed to delete Description");
        }
      } catch (error) {
        console.error("Error occurred while deleting description:", error);
        alert("Error occurred while deleting description");
      }
    }
  };
  const handleNewDataChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleAdd = async () => {
    if (newDescription.trim() === "") {
      alert("Please Enter Valid Name..");
      return;
    }

    if (
      data.some((description) => description.description === newDescription)
    ) {
      alert("description already exists");
      return;
    }

    const addData = { description: newDescription };
    console.log(addData);
    try {
      const response = await axiosAPI.post(
        "http://localhost:5000/api/Description/AddDescription",
        addData
      );
      if (response.status === 200) {
        setData([...data, addData]);
        alert("Description added successfully");
      } else {
        alert("Failed to add Description");
      }
      setNewDescription("");
    } catch (error) {
      console.error("Error occurred while adding Description:", error);
      alert("Error occurred while adding Description");
    }

    setNewDescription("");
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Add Course" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Add New Description</CardTitle>

                <Row className="justify-content-end">
                  <Col lg="10">
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="taskbudget"
                        className="col-form-label col-lg-2"
                      >
                        Enter Name
                      </Label>
                      <Col lg="10">
                        <Input
                          id="taskbudget"
                          name="taskbudget"
                          type="text"
                          placeholder="Enter Name"
                          className="form-control"
                          value={newDescription}
                          onChange={handleNewDataChange}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg="2">
                    <Button onClick={handleAdd} color="primary">
                      Add
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="font-size-18">
                  <Row>
                    <span>List of Existing Description's</span>
                  </Row>
                </CardTitle>

                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Description Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td>
                            <Button
                              color="danger"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddDescription;
