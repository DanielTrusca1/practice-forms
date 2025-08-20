// Test My Form SUBMIT functionality
import {render, screen} from '@testing-library/react'


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
})

