import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
type RouteParam = {
  payee1: string;
  payee2: string;
}
const AddExpense = () => {
  const [price, setPrice] = useState(0);
  const [payee, setPayee] = useState("");
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");

  const [expenses, setExpenses] = useState([]);
  const history = useHistory();

  const { payee1, payee2 } = useParams<RouteParam>();
  let ids = 0;


  const saveOrUpdate = (e: FormEvent) => {

    e.preventDefault();

    if (validationForm()) {

      const expense = { date, product, price, payee };
      axios.post("http://localhost:3001/expense", expense);

      history.push("/expense");
    }
  }
  const [errors, setErrors] = useState({
    payee: "",
    product: "",
    price: "",
    date: ""
  });

  const validationForm = () => {

    let valid = true;
    const errorsCopy = { ...errors };
    if (payee?.trim()) {
      errorsCopy.payee = '';

    }
    else {
      errorsCopy.payee = 'Payee is required';
      valid = false;
    }
    if (product?.trim()) {
      errorsCopy.product = '';

    }
    else {
      errorsCopy.product = 'Product is required';
      valid = false;
    }
    if (price != 0 && !Number.isNaN(price)) {
      errorsCopy.price = '';
    }
    else {
      errorsCopy.price = "Price is required";
      valid = false;
    }
    if (date?.trim()) {
      errorsCopy.date = '';
    }
    else {
      errorsCopy.date = "date is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <Container>
      <Form.Label >Payee</Form.Label>
      <Form.Select aria-label="Default select example" value={payee} onChange={(e) => setPayee(e.target.value)}>



        <option>Open this select menu</option>
        <option value={payee1}>{payee1}</option>
        <option value={payee2}>{payee2}</option>

      </Form.Select>

      {errors.payee && <div style={{ color: "red" }}>{errors.payee}</div>}

      <Form.Label >Product</Form.Label>
      <Form.Control
        type="text"
        value={product}
        onChange={e => setProduct(e.target.value)}
      />
      {errors.product && <div style={{ color: "red" }}>{errors.product}</div>}

      <Form.Label >Price</Form.Label>
      <Form.Control
        type="text"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
      />
      {errors.price && <div style={{ color: "red" }}>{errors.price}</div>}
      <Form.Label >Date</Form.Label>
      <Form.Control
        type="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {errors.date && <div style={{ color: "red" }}>{errors.date}</div>}

      <Button variant="primary" onClick={(e) => saveOrUpdate(e)}>Submit</Button>{' '}
    </Container>
  )
}
export default AddExpense;