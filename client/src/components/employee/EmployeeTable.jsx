import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Link,
} from "@nextui-org/react";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import axios from "axios";

const EmployeeTable = ({ employees, onEmployeeDelete }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`);
        onEmployeeDelete(id); // Call the prop function to update the state in parent
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableColumn>First Name</TableColumn>
        <TableColumn>Last Name</TableColumn>
        <TableColumn>Address</TableColumn>
        <TableColumn>Phone Number</TableColumn>
        <TableColumn>Email Address</TableColumn>
        <TableColumn>Salary</TableColumn>
        <TableColumn>Designation</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {employees?.length > 0 &&
          employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.first_name}</TableCell>
              <TableCell>{emp.last_name}</TableCell>
              <TableCell>{emp.address}</TableCell>
              <TableCell>{emp.phone}</TableCell>
              <TableCell>{emp.email_address}</TableCell>
              <TableCell>{emp.salary}</TableCell>
              <TableCell>{emp.designation.name}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  as={Link}
                  href={`/employees/edit/${emp.id}`}
                  isIconOnly
                  color="primary"
                >
                  <IoPencil />
                </Button>
                <Button size="sm" isIconOnly color="danger" onClick={() => handleDelete(emp.id)}>
                  <IoTrashBin />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
