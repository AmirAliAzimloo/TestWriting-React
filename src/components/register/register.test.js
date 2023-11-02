import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./index";

const getElement=(element)=>{
  const elements={
    "Email":screen.getByRole("textbox", { name: "Email"}),
    "Password": screen.getByLabelText("Password"),
    "Confirm Password": screen.getByLabelText("Confirm Password"),
  }
  if( elements[element])  return elements[element]
}
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

    // Act
    // Change event - click event or ...
    // Assert

    expect(getElement("Email").value).toBe("");
    expect(getElement("Password").value).toBe("");
    expect(getElement("Confirm Password").value).toBe("");
  });
});
