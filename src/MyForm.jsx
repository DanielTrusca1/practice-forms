/*
todo
*/

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useBlocker, useNavigate } from "react-router";

// Import input components
import SelectCountry from "./SelectCountry";
import HobbiesInput from "./HobbiesInput";
import CustomInput from "./CustomInput";

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState: { isDirty },
    formState,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      "backup-email": "",
      username: "",
    },
  });

  // Watch email and backup-email fields state
  const email = watch("email");
  const backupEmail = watch("backup-email");

  // Block navigation if the form has changes
  const navigate = useNavigate();
  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));

  const leave = () => {
    navigate("/about");
  };

  return (
    <div className="form">
      <button onClick={leave}>Go to a different page</button>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <CustomInput
          name="name"
          label="Name"
          register={register}
          error={errors.name}
          rules={{
            required: "This field is required.",
            minLength: {
              value: 3,
              message: "Minimum length is 3",
            },
            maxLength: 50,
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only letters are allowed",
            },
          }}
        />

        <div>
          <input
            {...register("email", {
              required: "This field is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Must be a valid email adress",
              },
            })}
            onBlur={async () => {
              // Autofill backup-email field
              // If backup-email is not provided
              if (!backupEmail) {
                setValue("backup-email", email);
              }
            }}
            placeholder="Email"
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input
            {...register("backup-email", {
              required: "This field is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Must be a valid email adress",
              },
            })}
            placeholder="Backup Email"
          />
          <p>{errors["backup-email"]?.message}</p>
        </div>

        <SelectCountry />

        <HobbiesInput />

        <div className="input">
          <input
            {...register("username", {
              required: "This field is required.",
              validate: async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s delay
                return value.toLowerCase().startsWith("john")
                  ? "Username already taken"
                  : true;
              },
            })}
            onChange={async (e) => {}}
            placeholder="Userame"
          />
          {formState.isValidating && <p className="inner-tip">Loading...</p>}
          <p>{errors.username?.message}</p>
        </div>

        <input type="submit" />
      </form>

      {blocker.state === "blocked" && (
        <div className="modal">
          <p>This form has unsaved changes</p>
          <p>
            <button type="button" onClick={() => blocker.proceed()}>
              Leave
            </button>{" "}
            <button type="button" onClick={() => blocker.reset()}>
              Stay here
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
