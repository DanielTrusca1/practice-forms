/*
todo
*/

import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
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
    getValues,
    setValue,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      "backup-email": "",
      username: "",
    },
  });

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
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <CustomInput
              label="Name"
              {...field}
              register={register}
              error={errors.name}
            />
          )}
          rules={{
            required: "This field is required.",
            minLength: { value: 3, message: "Minimum length is 3" },
            maxLength: { value: 50, message: "Maximum length is 50" },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only letters are allowed",
            },
          }}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <CustomInput
              label="Email"
              {...field}
              register={register}
              error={errors.email}
              onBlur={() => {
                field.onBlur();
                if (!getValues("backup-email"))
                  setValue("backup-email", getValues("email"));
              }}
            />
          )}
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Must be a valid email adress",
            },
          }}
        />

        <Controller
          control={control}
          name="backup-email"
          render={({ field }) => (
            <CustomInput
              label="Backup Email"
              {...field}
              register={register}
              error={errors["backup-email"]}
            />
          )}
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Must be a valid email adress",
            },
          }}
        />

        <SelectCountry />

        <HobbiesInput />

        <div className="input">
          <Controller
            control={control}
            name="username"
            render={({ field, formState : {isValidating} }) => (
              <CustomInput
                label="Username"
                {...field}
                register={register}
                error={errors.username}
                isValidating={isValidating}
              />
            )}
            rules={{
              required: "This field is required.",
              validate: async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s delay
                return value.toLowerCase().startsWith("john")
                  ? "Username already taken"
                  : true;
              },
            }}
          />
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
