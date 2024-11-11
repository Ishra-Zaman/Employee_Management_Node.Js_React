import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, Input, Button, Select, SelectItem, Link } from "@nextui-org/react";
import axios from "axios";

const EditEmployee = () => {
  const { employeeId } = useParams();  
  const navigate = useNavigate();      
  
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    email_address: '',
    phone: '',
    salary: '',
    designation_id: ''
  });

  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`)
      .then(response => {
        setEmployeeData(response.data);
      })
      .catch(error => console.error("Error fetching employee data:", error));

    axios.get(`${process.env.REACT_APP_API_URL}/designations`)
      .then(response => setDesignations(response.data))
      .catch(error => console.error("Error fetching designations:", error));
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value
    });
  };

  const handleDesignationChange = (selectedKey) => {
    setEmployeeData({
      ...employeeData,
      designation_id: selectedKey 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, employeeData)
      .then(() => {
        navigate('/employees');
      })
      .catch(error => console.error("Error updating employee:", error));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 mt-4 text-center text-primary">Edit Employee</h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Input
                label="First Name"
                name="first_name"
                value={employeeData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-5">
              <Input
                label="Last Name"
                name="last_name"
                value={employeeData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-5">
              <Input
                label="Address"
                name="address"
                value={employeeData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5">
              <Input
                label="Email"
                name="email_address"
                value={employeeData.email_address}
                onChange={handleInputChange}
                type="email"
                required
              />
            </div>
            <div className="mb-5">
              <Input
                label="Phone Number"
                name="phone"
                value={employeeData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5">
              <Input
                label="Salary"
                name="salary"
                value={employeeData.salary}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-5 w-full">
              <Select
                label="Designation"
                name="designation_id"
                selectedKeys={new Set([employeeData.designation_id])}  
                onSelectionChange={(selected) => handleDesignationChange(selected.anchorKey)}  
                required
                className="w-full"
              >
                {designations.map((designation) => (
                  <SelectItem key={designation.id} value={designation.id}>
                    {designation.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-5">
              <Button auto color="primary" type="submit">
                Update
              </Button>
            </div>
          </form>

          <div>
            <Link href="/employees" passHref>
              <Button auto color="primary" shadow rounded>
                Go Back
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditEmployee;
