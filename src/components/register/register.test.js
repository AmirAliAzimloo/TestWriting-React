import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Register from "./index";
import { act } from "react-dom/test-utils";
import { utils } from "../helper";

const getElement = (element) => {
  const elements = {
    "Email": screen.getByRole("textbox", { name: "Email" }),
    "Password": screen.getByLabelText("Password"),
    "Confirm Password": screen.getByLabelText("Confirm Password"),
    "Button" : screen.getByRole("button",{name:"Submit"})
  };
  if (elements[element]) return elements[element];
};

const changeElement = (element,value)=>{
  // az act estefade mikonim chon dare yek state taghiir peyda mikone va yek amalkarde async mahsoob mishe
  act(()=>{
    userEvent.type(getElement(element),value)
  })
}

describe("Register Page", () => {

  // run this before each test
  beforeEach(() => {
    // Arrange
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  test("Inputs should be initially empty", () => {
    // SingleEllement // like one input
    //getEllemnt => vaghti safhe az aval mikhaym yek elementi ro dashte bashe
    //queryEllement => vaghti bad az yek amalkardi mikhaym yek elementi ro dashte bashe
    //findEllement => vaghti mikhaym async/await ro handel konim

    // MultipleEllement // like options of dropdown
    // getAll...
    // queryyAll...
    // findAll...

    

    // Act
    // Change event - click event or ...
    // Assert

    expect(getElement("Email").value).toBe("");
    expect(getElement("Password").value).toBe("");
    expect(getElement("Confirm Password").value).toBe("");
  }); 

  test("should be able to type into inputs and get value",()=>{
    changeElement("Email","amiraliazimloo123@gmail.com")
    expect(getElement("Email").value).toBe("amiraliazimloo123@gmail.com")
  })

  // spyOn => jasoosi kardan az bakhsh haye proje
  test("button should be disabled when all inputs are empty",()=>{
    expect(getElement("Button")).toHaveClass("btn")
    expect(getElement("Button")).toBeDisabled()

    // jest spyOn
    // mikhaym bbinim aya isEmpty bad az ezafe shodane data ha call khahad shod ya na
    const isEmpti = jest.spyOn(utils,"isEmpty")
    utils.isEmpty(getElement("Email").value)
    utils.isEmpty(getElement("Password").value)
    utils.isEmpty(getElement("Confirm Password").value)
    expect(isEmpti).toHaveBeenCalledTimes(3)
  })
});
