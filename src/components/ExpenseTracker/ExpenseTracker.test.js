import { render, screen } from "@testing-library/react";
import ExpenseTracker from "./ExpenseTracker";
import { Provider } from "react-redux";
import store from "../store/oneStore";

describe("ExpenseTracker component", () => {
  test("renders the Expense Tracker title", () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    //Assert
    const titleElement = screen.getByText("Add Your Daily Expense", {
      exact: false,
    });
    expect(titleElement).toBeInTheDocument();
  });
});
