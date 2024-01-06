export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));
//helper function to delay things so we can see the button "submitting" on the form submission. exported to Dashboard.

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};
//first how many budgets exist? existingBudgetLength will fetch anything with the key of "budgets". Use that to return a template string.

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
//fetches any data in my localstorage and returns it to me

// Get all items from local storage- ExpenseItem.jsx. Data.filter, look at each item's key to see does it equal to the value.
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//delete item from local storage in ExpenseItem.jsx. First grab existingData for whatever key I passed in. Then, if the id we passed in as second argument- if that exists- filter out each item, item.id does not equal to id. As long as it doesn't have the id we passed in- keep it!
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(), //gives me id, easier than Math.random
    name: name,
    createdAt: Date.now(),
    amount: +amount, //whatever amount is passed in, but default is string, so quick convert +amount
    color: generateRandomColor(),
  };

  //also want to see existing budgets, ("budgets") is the key that we pass, check back up on our fetchData function. Either give me budgets if they exist or give me an empty array. Assuming there are exisint budgets, I will spread them, then pass in newItem.
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

/* total spent by budget- BudgetItem.jsx. 

Recap: pass in our budgetId, then it will grab all of our expenses and loop through those expenses. With this reduce method we get access to everything we are looping through as well as a total value. 
First loop, check if the expenses' budgetId match the one I passed in. 
If it doesn't just return 0. Then goes through second item, and boom budgetId is the same- then it will return 0 += the expense amount, for EX) 5$. This will be the total amount I've spent. 
Then the next time it loops around, boom it matches again, so it takes the 5$ and adds to it the expense.amount from this loop through. 
In the end it will simply give me a number.  

*/
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING- BudgetItem.jsx
// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency- take in amount, pass in first thing as undefined, so it will use the Locale of whoever is visiting the site. Set the style to USD. Will return back as a string.
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

//Format date- ExpenseItem.jsx
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
