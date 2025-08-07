import React from "react";
import { useForm } from "react-hook-form";

export default function MyForm() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit((data) => {
        console.log(data)
      })}>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("backup-email")} placeholder="Backup Email" />
        <input type="submit" />
      </form>
    </div>
  );
}
