import React, { useState, useEffect } from "react";
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

const AddEmployee = () => {
  const [designations, setDesignations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/designations`
        );
        setDesignations(response.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchDesignations();
  }, []);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must only contain letters"),
    last_name: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must only contain letters"),
    address: Yup.string().nullable(),
    email_address: Yup.string()
      .email("Email must be valid")
      .required("Email address is required"),
    phone: Yup.string()
      .nullable()
      .matches(/^[0-9]*$/, "Phone number must only contain numbers"),
    salary: Yup.string()
      .required("Salary is required")
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, "Salary must only contain numbers"),
    designation_id: Yup.string().required("Designation is required"),
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
      .post(`${process.env.REACT_APP_API_URL}/employees`, data)
      .then(() => {
        navigate("/employees");
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-8 mt-4 text-center text-primary">
        Add Employee
      </h1>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                label="First Name"
                {...register("first_name")}
                placeholder="Enter the first name of the employee"
              />
              {errors.first_name && (
                <div className="text-red-500">{errors.first_name.message}</div>
              )}
            </div>

            <div className="mb-5">
              <Input
                label="Last Name"
                {...register("last_name")}
                placeholder="Enter the last name of the employee"
              />
              {errors.last_name && (
                <div className="text-red-500">{errors.last_name.message}</div>
              )}
            </div>

            <div className="mb-5">
              <Input
                label="Address"
                {...register("address")}
                placeholder="Enter the address of the employee"
              />
              {errors.address && (
                <div className="text-red-500">{errors.address.message}</div>
              )}
            </div>

            <div className="mb-5">
              <Input
                label="Email Address"
                {...register("email_address")}
                placeholder="Enter the email address of the employee"
                type="email"
              />
              {errors.email_address && (
                <div className="text-red-500">
                  {errors.email_address.message}
                </div>
              )}
            </div>

            <div className="mb-5">
              <Input
                label="Phone Number"
                {...register("phone")}
                placeholder="Enter the phone number of the employee"
              />
              {errors.phone && (
                <div className="text-red-500">{errors.phone.message}</div>
              )}
            </div>

            <div className="mb-5">
              <Input
                label="Salary"
                {...register("salary")}
                placeholder="Enter the salary of the employee"
              />
              {errors.salary && (
                <div className="text-red-500">{errors.salary.message}</div>
              )}
            </div>

            <div className="mb-5 w-full">
              <Select
                label="Designation"
                {...register("designation_id")}
                placeholder="Select the designation of the employee"
                className="w-full"
              >
                {designations.map((designation) => (
                  <SelectItem key={designation.id} value={designation.id}>
                    {designation.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.designation_id && (
                <div className="text-red-500">
                  {errors.designation_id.message}
                </div>
              )}
            </div>

            <div className="mb-5">
              <Button auto color="primary" type="submit">
                Submit
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

export default AddEmployee;
