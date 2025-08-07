import React from "react";
import { useForm } from "react-hook-form";

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div>
          <input
            {...register("name", {
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
            })}
            placeholder="Name"
          />
          <p>{errors.name?.message}</p>
        </div>

        <input {...register("email")} placeholder="Email" />
        <input {...register("backup-email")} placeholder="Backup Email" />
        <input type="submit" />
      </form>
    </div>
  );
}
