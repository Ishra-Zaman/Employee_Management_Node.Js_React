import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, Input, Button, Select, SelectItem, Link } from "@nextui-org/react";
import axios from "axios";

const EditDesignation = () => {
  const { designationId } = useParams();
  const navigate = useNavigate();

  const [designationData, setDesignationData] = useState({
    name: "",
    description: "",
    status: "active", 
  });

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/designations/${designationId}`)
      .then((response) => {
        console.log("Fetched Designation Data:", response.data); 
        setDesignationData({
          ...response.data,
          status: response.data.status || "active", 
        });
      })
      .catch((error) =>
        console.error("Error fetching designation data:", error)
      );
  }, [designationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignationData({
      ...designationData,
      [name]: value,
    });
  };

  const handleStatusChange = (selectedKey) => {
    setDesignationData({
      ...designationData,
      status: selectedKey, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/designations/${designationId}`,
        designationData
      )
      .then(() => {
        navigate("/designations");
      })
      .catch((error) => console.error("Error updating designation:", error));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 mt-4 text-center text-primary">
        Edit Designation
      </h2>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Input
                label="Designation Name"
                name="name"
                value={designationData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-5">
              <Input
                label="Description"
                name="description"
                value={designationData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5 w-full">
              <Select
                label="Status"
                name="status"
                selectedKeys={new Set([designationData.status])} 
                onSelectionChange={(selected) => handleStatusChange(selected.anchorKey)} 
                className="w-full"
                required
              >
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
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
            <Link href="/designations" passHref>
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

export default EditDesignation;
