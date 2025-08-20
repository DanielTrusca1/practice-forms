import { required, minLength, maxLength, onlyLetters } from "./MyForm";

test("required with undefined value to return an error message", () => {
    expect(required(undefined)).toBe("Required");
})
