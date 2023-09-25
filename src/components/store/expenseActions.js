
import { expenseActions } from "./expense-context";

export const fetchExpenseData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses.json"
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();

      return data;
    };

    try {
      const expenseData = await fetchData();
      // console.log(expenseData);
      if(expenseData !== null){
        const expenseArray = Object.keys(expenseData).map((key) => ({
          name: key,
          ...expenseData[key],
        }));
        dispatch(expenseActions.replaceExpense({ items: expenseArray }));
      } else{
        return;
      }

    } catch (error) {
      alert(error.message);
    }
  };
};
