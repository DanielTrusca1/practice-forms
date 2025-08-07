import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  console.log(errors);

  // Watch email and backup-email fields state
  const email = watch("email");
  const backupEmail = watch("backupEmail");
  const [timer, setTimer] = useState(null);

  // Autofill backup-email field
  useEffect(() => {
    if (timer) clearTimeout(timer);

    // If backup-email is not provided
    if (!backupEmail) {

      // Set timer to 1 second after email field suffers changes
      const newTimer = setTimeout(() => {
        setValue("backup-email", email);
      }, 1500);

      setTimer(newTimer);
    }
  }, [email]);

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

        <input
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Must be a valid email adress",
            },
          })}
          placeholder="Email"
        />
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
        <input type="submit" />
      </form>
    </div>
  );
}
