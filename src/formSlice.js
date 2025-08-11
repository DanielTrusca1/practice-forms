import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: { name: "", email: "", "backup-email": "", username: "" },
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: () => ({
      name: "",
      email: "",
      "backup-email": "",
      username: "",
    }),
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
