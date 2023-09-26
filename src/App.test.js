import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import App from "./App";
import store from "./components/store/oneStore";
import { render } from "@testing-library/react";


jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("App component", () => {
  beforeEach(() => {
    useSelector.mockImplementation(() => ({
      auth: {
        isLoggedIn: false,
      },
      theme: {
        isDarkTheme: false,
      },
    }));
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  test("renders Header component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const headerElement = screen.getByText("Header", {exact: false});
    expect(headerElement).toBeInTheDocument();
  });


  test("renders Expense component", () => {
    render(
        <BrowserRouter>
        <Provider store={store}>
            <App/>
            </Provider></BrowserRouter>
    );

    const expenseElement = screen.getByText("Expense", {exact: false});
    expect(expenseElement).toBeInTheDocument();
  })
});
