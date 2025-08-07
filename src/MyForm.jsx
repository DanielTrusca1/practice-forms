import React from "react";
import { useForm } from "react-hook-form";

export default function MyForm() {
  const { register } = useForm();

  return (
    <div>
      <form>
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <input name="backup-email" placeholder="Backup Email" />
        <input type="submit" />
      </form>
    </div>
  );
}
