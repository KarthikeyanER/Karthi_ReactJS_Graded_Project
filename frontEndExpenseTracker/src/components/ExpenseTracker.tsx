import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AddExpense from "./AddExpense";

type Expense = {
    id: number;
    date: Date;
    product: string;
    price: number;
    payee: string;
}
const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);


    useEffect(() => {

        axios.get("http://localhost:3001/expense")
            .then((respose) => setExpenses(respose.data))
            .catch(error => console.log(error));



    }, []);
    console.log(expenses);
    let payee1 = "";
    let payee2 = "";
    let payment1 = 0;
    let payment2 = 0;
    let total = 0;
    let pay = 0;
    let finalPayee = "";
    const findingPayee = () => {
        expenses.map((expense, index) => {
            if (index == 0) {
                payee1 = expense.payee;
            }
            if (payee1 != expense.payee) {
                payee2 = expense.payee;
            }
        })
        console.log("payee1:" + payee1);
        console.log("payee2" + payee2);
    }



    const findingPayments = () => {



        expenses.map((expense) => {
            if (expense.payee == payee1) {

                payment1 = payment1 + expense.price;
            }
            else {
                payment2 = payment2 + expense.price;
            }
        })
        console.log("payment1:" + payment1);
        console.log("payment2:" + payment2);
    }

    const findPayableAmount = () => {
        total = payment1 + payment2;
        console.log(total);
        if (payment1 > payment2) {
            pay = payment1 - payment2;
            finalPayee = payee1;
        }
        else {
            pay = payment2 - payment1;
            finalPayee = payee2;
        }

        console.log("total:" + total);
        console.log("finalPayee:" + finalPayee);
        console.log("pay:" + pay);
    }

    const callFunction = () => {
        let count = 0;
        if (count == 0) {
            findingPayee();
            findingPayments();
            findPayableAmount();
            count++;
        }
    }
    callFunction();
    console.log("payee1:" + payee1);
    console.log("payee2" + payee2);
    console.log("payment1:" + payment1);
    console.log("payment2:" + payment2);
    console.log("total:" + total);
    console.log("finalPayee:" + finalPayee);
    console.log("pay:" + pay);
    const history = useHistory();
    const addExpense = (payee1: string, payee2: string) => {
        history.push(`/add-expense/${payee1}/${payee2}`)

    }
    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>

            <Button variant="primary" onClick={() => addExpense(payee1, payee2)}>Add Expense</Button>{' '}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product Purchased</th>
                        <th>Price</th>
                        <th>Payee</th>

                    </tr>

                </thead>
                <tbody>
                    {
                        expenses.map((expense) =>
                            <tr key={expense.id}>
                                <td>{expense.date}</td>
                                <td>{expense.product}</td>
                                <td>{expense.price}</td>
                                <td>{expense.payee}

                                </td>



                            </tr>
                        )
                    }


                </tbody>

            </Table>
            <hr />
            <Table striped bordered hover variant="dark">

                <tbody>
                    <tr>
                        <td>Total:</td>
                        <td>{total}</td>

                    </tr>
                    <tr>
                        <td>{payee1} paid:</td>
                        <td>{payment1}</td>

                    </tr>

                    <tr>
                        <td>{payee2} paid:</td>
                        <td>{payment2}</td>

                    </tr>

                    <tr>
                        <td>Pay {finalPayee}</td>
                        <td>{pay}</td>

                    </tr>


                </tbody>

            </Table>
        </Container>
    )
}
export default ExpenseTracker;