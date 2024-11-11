import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import axios from "axios";
import { Button, Spinner, Link, Spacer } from "@nextui-org/react";
import EmployeeTable from "../components/employee/EmployeeTable";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleEmployeeDelete = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 mt-4 text-center text-primary">Employees</h2>

      <Button
        startContent={<FaArrowLeftLong />}
        size="sm"
        className="mb-2"
        as={Link}
        href="/"
      >
        Back to Homepage
      </Button>

      <Spacer y={0.5} />

      <Button
        href="/employees/add"
        as={Link}
        variant="solid"
        startContent={<CiSquarePlus />}
        className="mb-6"
      >
        Add Employee
      </Button>

      {employees.length === 0 ? (
        <Spinner className="flex" label="Loading..." color="primary" size="lg" />
      ) : (
        <EmployeeTable employees={employees} onEmployeeDelete={handleEmployeeDelete} />
      )}
    </div>
  );
};

export default Employees;

