import React from "react";

// Test My Form SUBMIT functionality
import { render, screen } from "@testing-library/react";

// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

// Import the component to test + Redux dependencies
import { Provider } from "react-redux";
import { reduxForm } from "redux-form";
import MyForm from "./MyForm";
import { store } from "./store";

// Test field level validation
import { required, minLength, maxLength, onlyLetters } from "./MyForm";

test("required with undefined value to return an error message", () => {
  expect(required(undefined)).toBe("Required");
});
test("required with string value to return undefined", () => {
  expect(required("abc")).toBe(undefined);
});

test("minimum length validation", () => {
  expect(minLength(3)()).toBe("Must be at least 3 chars");
  expect(minLength(3)("a")).toBe("Must be at least 3 chars");
  expect(minLength(3)("aaaaa")).toBe(undefined);
});

test("maximum length validation", () => {
  expect(maxLength(50)()).toBe(undefined);
  expect(maxLength(50)("a".repeat(60))).toBe("Must be at most 50 chars");
  expect(maxLength(50)("aaa")).toBe(undefined);
});

test("onlyLetters validation", () => {
  expect(onlyLetters("123abcdefg")).toBe("Only letter allowed");
  expect(onlyLetters("abcdefg")).toBe(undefined);
});

const TestForm = reduxForm({ form: "test" })(MyForm);

test("approve or reject form submission", async () => {
  const mockSubmit = jest.fn();

  render(
    <Provider store={store}>
      <TestForm onSubmit={mockSubmit} />
    </Provider>
  );

  // Test for submit rejection
  // -------------------------

  userEvent.click(screen.getByRole("button", { name: "Submit" }));

  expect(mockSubmit).not.toHaveBeenCalled();

  // Test for submit acceptance
  // --------------------------
  // Target all input fields
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const usernameInput = screen.getByPlaceholderText("Username");

  // Fill all input fields with valid data
  userEvent.type(nameInput, "ABCDE");
  userEvent.type(emailInput, "abcde@gmail.com");
  userEvent.type(usernameInput, "ABCDE");

  userEvent.click(screen.getByRole("button", { name: "Submit" }));

  expect(mockSubmit).toHaveBeenCalled();
});
