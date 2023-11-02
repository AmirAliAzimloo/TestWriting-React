import { render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Register from "./index";
import { act } from "react-dom/test-utils";
import { utils } from "../helper";
import { ERROR_MESSAGE } from "../../constants";

const getElement = (element) => {
  const elements = {
    Email: screen.getByRole("textbox", { name: "Email" }),
    Password: screen.getByLabelText("Password"),
    "Confirm Password": screen.getByLabelText("Confirm Password"),
    Button: screen.getByRole("button", { name: "Submit" }),
  };
  if (elements[element]) return elements[element];
};

const changeElement = (element, value) => {
  // az act estefade mikonim chon dare yek state taghiir peyda mikone va yek amalkarde async mahsoob mishe
  act(() => {
    userEvent.type(getElement(element), value);
  });
};

// simulation the navigation behavior
const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));

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

  test("should be able to type into inputs and get value", () => {
    changeElement("Email", "amiraliazimloo123@gmail.com");
    expect(getElement("Email").value).toBe("amiraliazimloo123@gmail.com");
  });

  // spyOn => jasoosi kardan az bakhsh haye proje
  test("button should be disabled when all inputs are empty", () => {
    expect(getElement("Button")).toHaveClass("btn");
    expect(getElement("Button")).toBeDisabled();

    // jest spyOn
    // mikhaym bbinim aya isEmpty bad az ezafe shodane data ha call khahad shod ya na
    const isEmpti = jest.spyOn(utils, "isEmpty");
    utils.isEmpty(getElement("Email").value);
    utils.isEmpty(getElement("Password").value);
    utils.isEmpty(getElement("Confirm Password").value);
    expect(isEmpti).toHaveBeenCalledTimes(3);
  });

  // enable & disable Submit btn
  test("button should be enabled when all inputs are filled", () => {
    changeElement("Email", "stackjs@gmail.com");
    changeElement("Password", "123456");
    changeElement("Confirm Password", "123456");

    expect(getElement("Button")).toBeEnabled();
    // bala ba paiin mosavii hastan
    expect(getElement("Button")).not.toBeDisabled();
  });

  // tests for error handelnig
  describe("handle errors and navigate", () => {
    beforeEach(() => {
      // aval ke safhe render shod nabayad error ha vojood dashte bashan
      expect(screen.queryByText(ERROR_MESSAGE.EMAIL)).not.toBeInTheDocument();
      expect(
        screen.queryByText(ERROR_MESSAGE.PASSWORD)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(ERROR_MESSAGE.CONFIRM_PASSWORD)
      ).not.toBeInTheDocument();
    });

    // Email
    test("should show email error message on invalid email", () => {
      changeElement("Email", "amiraliazimloo123");
      changeElement("Password", "1234567");
      changeElement("Confirm Password", "1234567");

      act(() => {
        userEvent.click(getElement("Button"));
      });

      expect(screen.getByText(ERROR_MESSAGE.EMAIL)).toBeInTheDocument();
    });

    // Password
    test("should show Password error message on invalid Password", () => {
      changeElement("Email", "amiraliazimloo123@gmail.com");
      changeElement("Password", "12");
      changeElement("Confirm Password", "12");

      act(() => {
        userEvent.click(getElement("Button"));
      });

      expect(screen.getByText(ERROR_MESSAGE.PASSWORD)).toBeInTheDocument();
    });

    // Confirm Password
    test("should show Confirm Password error message on invalid Confirm Password", () => {
      changeElement("Email", "amiraliazimloo123@gmail.com");
      changeElement("Password", "1234567");
      changeElement("Confirm Password", "12");

      act(() => {
        userEvent.click(getElement("Button"));
      });

      expect(
        screen.getByText(ERROR_MESSAGE.CONFIRM_PASSWORD)
      ).toBeInTheDocument();
    });

    // mock
    // har functioni ke bar asare yek rooydadi farakhooni mishe vase iin ke dar mohiite test btoonim shabih sazi dashte bashim be vasiile mock iin shabih sazi ro anjam midim
    test("should call the navigation",()=>{
      changeElement("Email","amiraliazimloo123@gmail.com")
      changeElement("Password","1234567")
      changeElement("Confirm Password","1234567")

      act(()=>{
        userEvent.click(getElement("Button"))
      })

      // ecpect call navigation function with products route
      expect(mockedUsedNavigate).toHaveBeenCalledWith('products')


    });

    // snapshot testing
    test("snappshot",()=>{
      // some codes
    })
  });
});
