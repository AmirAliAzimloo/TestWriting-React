import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./index";

describe("Register Page", () => {
  test("Inputs should be initially empty", () => {

    // SingleEllement // like one input
    //getEllemnt => vaghti safhe az aval mikhaym yek elementi ro dashte bashe
    //queryEllement => vaghti bad az yek amalkardi mikhaym yek elementi ro dashte bashe
    //findEllement => vaghti mikhaym async/await ro handel konim

    // MultipleEllement // like options of dropdown
    // getAll...
    // queryyAll...
    // findAll...


    // Arrange
    render(
    <BrowserRouter>
    <Register/>
    </BrowserRouter>
    )
    const emailElement = screen.getByRole("textbox",{name:"Email"})
    const passwordElement = screen.getByLabelText("Password")
    const confirmPasswordElement = screen.getByLabelText("Confirm Password")
    // Act
    // Change event - click event or ...
    // Assert
    expect(emailElement.value).toBe("")
    expect(passwordElement.value).toBe("")
    expect(confirmPasswordElement.value).toBe("")
  });
});
