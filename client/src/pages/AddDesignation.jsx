import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AddDesignation = () => {
  const navigate = useNavigate(); 

  const validationSchema = Yup.object({
    name: Yup.string().required("Designation Name is required"),
    description: Yup.string().nullable(),
    status: Yup.string().required("Status is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/designations`, data)
      .then(() => {
        navigate("/designations");
      })
      .catch((error) => console.error("Error adding designation:", error));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-8 mt-4 text-center text-primary">
        Add Designation
      </h1>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                label="Designation Name"
                {...register("name")}
                placeholder="Enter the name of the designation"
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-5">
              <Input
                label="Description"
                {...register("description")}
                placeholder="Enter the description of the designation"
                multiline
                rows={1}
              />
            </div>

            <div className="mb-5 w-full">
              <Select
                label="Status"
                {...register("status")}
                placeholder="Select the status of the designation"
                className="w-full"
                status={errors.status ? "error" : "default"}
              >
                <SelectItem value="" disabled>
                  Select Status
                </SelectItem>
                {[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ].map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
              {errors.status && (
                <span className="text-red-500">{errors.status.message}</span>
              )}
            </div>

            <div className="mb-5">
              <Button auto color="primary" type="submit">
                Submit
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

export default AddDesignation;
