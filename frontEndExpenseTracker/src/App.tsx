import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';
import AddExpense from './components/AddExpense';


function App() {
  return (
    <>

    <Switch>
      <Route path="/" exact><ExpenseTracker></ExpenseTracker></Route>
      <Route path="/add-expense/:payee1/:payee2" exact><AddExpense></AddExpense></Route>
      <Route path="/expense" exact><ExpenseTracker></ExpenseTracker></Route>
    </Switch>
    </>
  
  );
}

export default App;
