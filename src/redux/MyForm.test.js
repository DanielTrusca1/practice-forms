import React from "react";

// Test My Form SUBMIT functionality
import { fireEvent, render, screen } from "@testing-library/react";

// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

// Import the component to test + Redux dependencies
import { Provider } from "react-redux";
import MyForm from "./MyForm";
import { store } from "./store";

// Test field level validation
import { required, minLength, maxLength, onlyLetters } from "./MyForm";

test("required with undefined value to return an error message", () => {
  expect(required(undefined)).toBe("Name is required");
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
  expect(onlyLetters("123abcdefg")).toBe("Only letters allowed");
  expect(onlyLetters("abcdefg")).toBe(undefined);
});

test("render the redux form component", () => {
  render(
    <Provider store={store}>
      <MyForm onAccept={jest.fn()} />
    </Provider>
  );

  // Target all input fields
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const backupEmailInput = screen.getByPlaceholderText("Backup-Email");
  const usernameInput = screen.getByPlaceholderText("Username");

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(backupEmailInput).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
});

const user = userEvent.setup();

test("shows name is required", async () => {
  render(
    <Provider store={store}>
      <MyForm onAccept={jest.fn()} />
    </Provider>
  );

  const nameInput = screen.getByPlaceholderText("Name");
  let errorMessage;
  const submitButton = screen.getByText("Submit");

  await user.click(submitButton);

  errorMessage = screen.getByText("Name is required");
  expect(errorMessage).toBeInTheDocument();
});

test("shows error message if email is invalid", async () => {
  render(
    <Provider store={store}>
      <MyForm onAccept={jest.fn()} />
    </Provider>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  const backupEmailInput = screen.getByPlaceholderText("Backup-Email");

  let errorMessage;

  const submitButton = screen.getByText("Submit");

  // Test invalid email
  fireEvent.click(submitButton);

  errorMessage = screen.queryAllByText("Invalid email adress")[0];
  expect(errorMessage).toBeInTheDocument();

  // Test valid email

  user.type(emailInput, "abcde@gmail.com");
  user.type(backupEmailInput, "abcde@gmail.com");
  fireEvent.click(submitButton);
});
