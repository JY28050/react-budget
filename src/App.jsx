import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main, { mainLoader } from "./UI/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logoutAction } from "./action/logout"
import { deleteBudget } from "./action/deleteBudget";

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader, budgetAction } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;

/*
{
    path: "/",                         //individual path
    element: <Dashboard />,           //element I want to show
    loader: dashboardLoader,         //when i hit that route, I want to execute this function
    errorElement: <Error />,        //whenever there is an error, show this
},

The children route will be displayed through Outlet in Main.jsx. Our dashboard is our first children route, and we want that to be the base path "/", could also do index:true. 


*/
