import React, { useEffect, useState } from "react";
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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const axiosAPI = axios.create();

const ExpenditureData = (props) => {
  const userLoggedIn = "DEEPAK";

  const initialFieldState = {
    description: "",
    trainer: "",
    detail_description: "",
    card: "",
    amount: "",
    date: new Date(),
    file: "",
  };

  const [inputFields, setInputFields] = useState([initialFieldState]);

  const handleDateChange = (date, index) => {
    const fields = [...inputFields];
    fields[index]["date"] = date;
    setInputFields(fields);
  };

  const handleChange = (event, index) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0]; // Get the selected file
      const fileName = file ? file.name : ""; // Extract file name
      const fields = [...inputFields];
      fields[index][name] = fileName; // Update state with file name
      setInputFields(fields);
    } else {
      const fields = [...inputFields];
      fields[index][name] = value;
      setInputFields(fields);
    }
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, initialFieldState]);
  };

  const handleRemoveFields = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  const handleSubmit = async () => {
    // Check if any field is empty
    const hasEmptyFields = inputFields.some((field) =>
      Object.values(field).some((value) => value === "")
    );
    if (hasEmptyFields) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const date = new Date();
    const dataToSend = inputFields.map((field) => ({
      ...field,
      userLoggedIn: userLoggedIn,
      UploadDate: getCurrentDate(),
      UploadTime: getCurrentTime(),
    }));
    console.log(dataToSend);
    try {
      const res = await axiosAPI.post(
        "http://localhost:5000/api/Expenditure/AddExpenditure",
        dataToSend
      );
      if (res.status === 200) {
        alert("Data sent successfully");
      } else {
        alert("Failed to send data");
      }
    } catch (err) {
      console.log(err);
      alert("Error occurred while sending data.");
    }
  };

  const [description, setDescription] = useState([]);
  useEffect(() => {
    DescriptionfetchData();
  }, []);

  const DescriptionfetchData = async () => {
    try {
      const response = await axiosAPI.get(
        "http://localhost:5000/api/Description/GetDescription"
      );
      setDescription(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    TrainersfetchData();
  }, []);

  const TrainersfetchData = async () => {
    try {
      const response = await axiosAPI.get(
        "http://localhost:5000/api/Trainer/GetTrainer"
      );
      setTrainers(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  function getCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note the +1 here to adjust for zero-indexed months
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <>
      <div className="page-content">
        <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Add New Expenditure</CardTitle>
                <form className="outer-repeater">
                  <div data-repeater-list="outer-group" className="outer">
                    <div data-repeater-item className="outer">
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Mentor
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            type="text"
                            disabled
                            value={userLoggedIn}
                            className="form-control"
                          />
                        </Col>
                      </FormGroup>
                      <div className="inner-repeater mb-4">
                        <div className="inner form-group mb-0 row">
                          <Label className="col-form-label col-lg-2">
                            Expenditure Details
                          </Label>
                          <div className="inner col-lg-10 ml-md-auto">
                            {inputFields.map((field, key) => (
                              <div
                                key={key}
                                className="mb-3 row align-items-center"
                              >
                                <FormGroup className="mb-4" row>
                                  <Row>
                                    <Col lg="6">
                                      <Input
                                        onChange={(e) => handleChange(e, key)}
                                        name="description"
                                        type="select"
                                        className="form-control"
                                        placeholder="Expenditure Name"
                                      >
                                        <option>Select Description</option>
                                        {description.map((item, index) => (
                                          <option key={index}>
                                            {item.description}
                                          </option>
                                        ))}
                                      </Input>
                                    </Col>
                                    <Col lg="6">
                                      <Input
                                        onChange={(e) => handleChange(e, key)}
                                        name="trainer"
                                        type="select"
                                        className="form-control"
                                        placeholder="Expenditure Name"
                                      >
                                        <option>Select Trainer</option>
                                        {trainers.map((item, index) => (
                                          <option key={index}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </Input>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup className="mb-4" row>
                                  <Col lg="12">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      name="detail_description"
                                      type="textarea"
                                      className="form-control"
                                      placeholder="Describe your expenditure"
                                    />
                                  </Col>
                                </FormGroup>
                                <Col md="2">
                                  <select
                                    className="form-control"
                                    name="card"
                                    onChange={(e) => handleChange(e, key)}
                                  >
                                    <option value="">Select Card</option>
                                    <option value="T-Hub Card">
                                      T-Hub Card
                                    </option>
                                    <option value="College Card">
                                      College Card
                                    </option>
                                    <option value="Accounts">Accounts</option>
                                  </select>
                                </Col>
                                <Col md="2">
                                  <div className="mt-4 mt-md-0">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      name="amount"
                                      placeholder="Amount"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </Col>
                                <Col md="2" className="pr-0 mt-1">
                                  <DatePicker
                                    className="form-control"
                                    selected={field.date}
                                    onChange={(date) =>
                                      handleDateChange(date, key)
                                    }
                                    placeholderText="Select Date"
                                  />
                                </Col>
                                <Col md="4">
                                  <div className="mt-4 mt-md-0">
                                    <Input
                                      onChange={(e) => handleChange(e, key)}
                                      type="file"
                                      name="file"
                                      className="form-control"
                                      defaultValue={field.file}
                                    />
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="mt-2 mt-md-0 d-grid">
                                    <Button
                                      color="primary"
                                      onClick={() => handleRemoveFields(key)}
                                      block
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </Col>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Row className="justify-content-end">
                          <Col lg="10">
                            <Button color="success" onClick={handleAddFields}>
                              Add Expenditure
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </form>
                <Row className="justify-content-end">
                  <Col lg="10">
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ExpenditureData;
