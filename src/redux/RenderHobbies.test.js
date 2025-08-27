import React from "react";

import { render, screen } from "@testing-library/react";
import { store } from "./store";
import { Provider } from "react-redux";
import MyForm from "./MyForm";
import userEvent from "@testing-library/user-event";

// User events object setup
const user = userEvent.setup();

test("add hobbies", async () => {
  render(
    <Provider store={store}>
      <MyForm onAccept={jest.fn()} />
    </Provider>
  );

  // Arrange
  const addButton = screen.getByText("+ Add Hobbie");
  let previousHobbies;

  // In case there are no hobbies currently
  if(!screen.queryAllByPlaceholderText(/Hobby #\d+/)) 
    previousHobbies = 0;
  else
    previousHobbies = screen.queryAllByPlaceholderText(/Hobby #\d+/).length;

  // Action
  await user.click(addButton);

  // Assert
  const hobbies = screen.queryAllByPlaceholderText(/Hobby #\d+/);
  expect(hobbies.length).toBe(previousHobbies + 1);
});

test("remove hobbies", async () => {
  render(
    <Provider store={store}>
      <MyForm onAccept={jest.fn()} />
    </Provider>
  );

  // Arrange
  const addButton = screen.getByText("+ Add Hobbie");

  // Action 
  // Add 3 hobbies
  await user.click(addButton);
  await user.click(addButton);
  await user.click(addButton);

  // Select Hobby 1
  const removeButton = screen.getAllByText("x")[0];

  // Delete Hobby 1
  await user.click(removeButton);

  // Assert
  const hobbies = screen.getAllByPlaceholderText(/Hobby #\d+/);
  expect(hobbies.length).toBe(2);
});
