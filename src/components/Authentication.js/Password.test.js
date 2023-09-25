import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../store/oneStore"
import Password from "./Password"


describe("Password component", () => {
    test("renders Forget Password as a text", () => {
        //Arrange
        render(<Provider store={store}><Password/></Provider>);
    
        //Assert
        const buttonElement = screen.getByText("Forget Password");
        expect(buttonElement).toBeInTheDocument();
    })
})