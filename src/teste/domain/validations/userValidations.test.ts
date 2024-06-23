import { UserValidator } from "../../../main/domain/validations/userValidations";

describe("UserValidator", () => {
    describe("validateName", () => {
        it("should throw an error if name is empty", () => {
            expect(() => UserValidator.validateName("")).toThrow("Name can't be blank or empty.");
        });

        it("should throw an error if name is less than 3 characters", () => {
            expect(() => UserValidator.validateName("Jo")).toThrow("Name must be at least 3 characters long.");
        });

        it("should not throw an error if name is valid", () => {
            expect(() => UserValidator.validateName("John")).not.toThrow();
        });
    });

    describe("validateEmail", () => {
        it("should throw an error if email is empty", () => {
            expect(() => UserValidator.validateEmail("")).toThrow("Invalid email format.");
        });

        it("should throw an error if email is invalid", () => {
            expect(() => UserValidator.validateEmail("invalid-email")).toThrow("Invalid email format.");
        });

        it("should not throw an error if email is valid", () => {
            expect(() => UserValidator.validateEmail("john.doe@example.com")).not.toThrow();
        });
    });

    describe("validatePassword", () => {
        it("should throw an error if password is empty", () => {
            expect(() => UserValidator.validatePassword("")).toThrow("Password must be at least 6 characters long.");
        });

        it("should throw an error if password is less than 6 characters", () => {
            expect(() => UserValidator.validatePassword("12345")).toThrow("Password must be at least 6 characters long.");
        });

        it("should not throw an error if password is valid", () => {
            expect(() => UserValidator.validatePassword("securepassword")).not.toThrow();
        });
    });
});
