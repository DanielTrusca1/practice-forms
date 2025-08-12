import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", email: "", backupEmail: "", username: "" };

const formSlice = createSlice({
  name: "form",
  initialState: { ...initialState, isDirty: false },
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
      state.isDirty = Object.keys(initialState).some(
        (key) => state[key] !== initialState[key]
      );
    },
    resetForm: () => ({ ...initialState, isDirty: false }),
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
