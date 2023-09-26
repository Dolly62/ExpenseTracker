import { render, screen } from "@testing-library/react";
import Auth from "./Auth";
import { Provider } from "react-redux";
import store from "../store/oneStore";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Auth component", () => {
  test("renders 'Login' text if the button was Not clicked", () => {
    //Arrange
    render(<Provider store={store} ><Auth /></Provider>);


    //Assert
    act(() => {
        const outputElement = screen.getByRole("button", {name: "Login"}, { exact: false });
        expect(outputElement).toBeInTheDocument();
    })
  });
  test("renders 'Don't have an account? SignUp' text if the button was clicked", () => {
    //Arrange
    render(<Provider store={store}><Auth/></Provider>);

    //Act
    act(() => {
        const buttonElement = screen.getByRole("button", {name: "Don't have an account? SignUp"}, {exact: false});
        userEvent.click(buttonElement);
    })

    //Assert
        const changedElement = screen.getByText("Welcome!", {exact: false});
        expect(changedElement).toBeInTheDocument();
  });

});
