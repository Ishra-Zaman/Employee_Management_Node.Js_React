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
  Chip,
} from "@nextui-org/react";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import axios from "axios";

const DesignationTable = ({ designations, onDesignationDelete }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this designation?");
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/designations/${id}`);
        onDesignationDelete(id); // Call the prop function to update the state in parent
      } catch (error) {
        console.error("Error deleting designation:", error);
        alert("Failed to delete designation.");
      }
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {designations?.length > 0 &&
          designations.map((dsg) => (
            <TableRow key={dsg.id}>
              <TableCell>{dsg.name}</TableCell>
              <TableCell>{dsg.description}</TableCell>
              <TableCell>
                {dsg.status === "active" ? (
                  <Chip color="success">Active</Chip>
                ) : (
                  <Chip color="danger">Inactive</Chip>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  as={Link}
                  href={`/designations/edit/${dsg.id}`}
                  isIconOnly
                  color="primary"
                >
                  <IoPencil />
                </Button>
                <Button size="sm" isIconOnly color="danger" onClick={() => handleDelete(dsg.id)}>
                  <IoTrashBin />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default DesignationTable;
