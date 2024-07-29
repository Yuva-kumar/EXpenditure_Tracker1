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
const AddCourse = () => {
  const [newData, setNewData] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // fetching data initally
  const fetchData = async () => {
    try {
      const response = await axiosAPI.get(
        "http://localhost:5000/api/Course/GetCourse"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };
  //handle Delete
  const handleDelete = async (index) => {
    const isConfirmed = window.confirm("Delete This Course..?");
    if (isConfirmed) {
      const courseToDelete = data[index];
      console.log(courseToDelete.course);
      try {
        const response = await axiosAPI.delete(
          `http://localhost:5000/api/Course/DeleteCourse/${courseToDelete.course}`
        );
        if (response.status === 200) {
          alert("Course deleted successfully");
          const newData = [...data];
          newData.splice(index, 1);
          setData(newData); // Update state after successful deletion
        } else {
          alert("Failed to delete course");
        }
      } catch (error) {
        console.error("Error occurred while deleting course:", error);
        alert("Error occurred while deleting course");
      }
    }
  };
  const handleNewDataChange = (event) => {
    setNewData(event.target.value);
  };

  const handleAdd = async () => {
    if (newData.trim() === "") {
      alert("Please Enter Valid Name..");
      return;
    }

    if (data.some((course) => course.course === newData)) {
      alert("Course already exists");
      return;
    }

    const addData = { course: newData };

    try {
      const response = await axiosAPI.post(
        "http://localhost:5000/api/Course/AddCourse",
        addData
      );
      if (response.status === 200) {
        setData([...data, addData]);
        alert("Course added successfully");
      } else {
        alert("Failed to add course");
      }
      setNewData("");
    } catch (error) {
      console.error("Error occurred while adding course:", error);
      alert("Error occurred while adding course");
    }

    setNewData("");
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Add Course" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Add New Technology</CardTitle>

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
                          value={newData}
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
                    <span>List of Existing Courses</span>
                  </Row>
                </CardTitle>

                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Training Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.course}</td>
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

export default AddCourse;
