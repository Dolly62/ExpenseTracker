import { render, screen } from "@testing-library/react";
import ExpenseList from "./ExpenseList";
import { Provider } from "react-redux";
import store from "../store/oneStore";

describe("ExpenseList component", () => {
  test("should download pdf correctly", () => {
    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    const downloadBtn = screen.getByText("Download Expense", { exact: false });
    expect(downloadBtn).toBeInTheDocument();
  });
});
