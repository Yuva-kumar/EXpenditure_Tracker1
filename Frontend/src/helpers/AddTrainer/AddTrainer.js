import React, { useState, useEffect } from "react";
import {
  Table,
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

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const axiosAPI = axios.create();

const AddTrainer = ({ Mentor }) => {
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    id: "",
    domain: "",
  });
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // fetching data initally
  const fetchData = async () => {
    try {
      const response = await axiosAPI.get(
        "http://localhost:5000/api/Trainer/GetTrainer"
      );
      setTrainers(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  //fetching domain for select option
  const [domainOptions, setDomainOptions] = useState([]);

  useEffect(() => {
    axiosAPI
      .get("http://localhost:5000/api/Course/GetCourse")
      .then((res) => {
        setDomainOptions(res.data.map((course) => course.course));
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleAddTrainer = () => {
    if (
      newTrainer.name.trim() === "" ||
      newTrainer.id.trim() === "" ||
      newTrainer.domain.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      trainers.some(
        (trainer) =>
          trainer.name.toLowerCase() === newTrainer.name.toLowerCase() &&
          trainer.id === newTrainer.id &&
          trainer.domain.toLowerCase() === newTrainer.domain.toLowerCase()
      )
    ) {
      alert("Trainer already exists.");
      return;
    }
    axiosAPI
      .post("http://localhost:5000/api/Trainer/AddTrainer", newTrainer)
      .then((res) => {
        setTrainers([...trainers, newTrainer]);
        setNewTrainer({ name: "", id: "", domain: "" });
        alert("Saved Succesfully");
      })
      .catch((err) => alert("Not Saved"));
  };

  const handleDeleteTrainer = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this trainer?"
    );
    if (!isConfirmed) return;

    const trainerToDelete = trainers[index]; // Get the trainer object to delete
    axiosAPI
      .delete("http://localhost:5000/api/Trainer/DeleteTrainer", {
        data: trainerToDelete,
      })
      .then((res) => {
        // Optionally, you can update the state to reflect the deletion
        const updatedTrainers = trainers.filter((trainer, i) => i !== index);
        setTrainers(updatedTrainers);
        alert("Trainer deleted successfully");
      })
      .catch((err) => {
        alert("Error deleting trainer");
        console.error("Error deleting trainer:", err);
      });
  };

  return (
    <>
      <div className="page-content">
        <Breadcrumbs title="Tasks" breadcrumbItem="Add Trainer" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">
                  <b> Add New Trainer</b>
                </CardTitle>
                <FormGroup className="mb-4" row>
                  <Label
                    htmlFor="trainerName"
                    className="col-form-label col-lg-2"
                  >
                    Trainer Name
                  </Label>
                  <Col lg="10">
                    <Input
                      id="trainerName"
                      name="trainerName"
                      type="text"
                      placeholder="Enter Name"
                      value={newTrainer.name}
                      onChange={(e) =>
                        setNewTrainer({ ...newTrainer, name: e.target.value })
                      }
                      className="form-control"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-4" row>
                  <Label
                    htmlFor="trainerId"
                    className="col-form-label col-lg-2"
                  >
                    Trainer Id
                  </Label>
                  <Col lg="10">
                    <Input
                      id="trainerId"
                      name="trainerId"
                      type="text"
                      placeholder="Enter ID"
                      value={newTrainer.id}
                      onChange={(e) =>
                        setNewTrainer({ ...newTrainer, id: e.target.value })
                      }
                      className="form-control"
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="mb-4" row>
                  <Label
                    htmlFor="trainerDomain"
                    className="col-form-label col-lg-2"
                  >
                    Domain
                  </Label>
                  <Col lg="10">
                    <Input
                      type="select"
                      name="trainerDomain"
                      id="trainerDomain"
                      value={newTrainer.domain}
                      onChange={(e) =>
                        setNewTrainer({ ...newTrainer, domain: e.target.value })
                      }
                    >
                      <option value="">Select Domain</option>
                      {domainOptions.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>

                <Row>
                  <Col>
                    <Button
                      type="button"
                      color="primary"
                      onClick={handleAddTrainer}
                    >
                      Add Trainer
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
                  <span>
                    <b> List of Trainers</b>
                  </span>
                </CardTitle>
                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Trainer Name</th>
                        <th>Trainer ID</th>
                        <th>Domain</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((trainer, index) => (
                        <tr key={trainer.id}>
                          <td>{index + 1}</td>
                          <td>{trainer.name}</td>
                          <td>{trainer.id}</td>
                          <td>{trainer.domain}</td>
                          <td>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDeleteTrainer(index)}
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
    </>
  );
};

export default AddTrainer;
