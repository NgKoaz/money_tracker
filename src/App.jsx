import './App.css'
import {useEffect, useState} from "react"

function App() {
  const [name, setName] = useState('')
  const [datetime, setDatetime] = useState('')
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState('')

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  async function getTransactions() {
    const URL = process.env.REACT_APP_API_URL + '/transaction';
    const respone = await fetch(URL)
    return await respone.json()
  }

  function addNewTransaction(ev) {
    const URL = process.env.REACT_APP_API_URL + '/transaction';
    ev.preventDefault();
    const price = name.split(' ')[0]
    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        price,
        name:name.substring(price.length + 1), 
        description, 
        datetime
      })
    }).then(response => {
      response.json().then(json => {
        setName('')
        setDatetime('')
        setDescription('')
        getTransactions().then(setTransactions)
      })
    })
      
  }
  let balance = 0
  for (const transaction of transactions){
    balance += transaction.price
  }
  balance = balance.toFixed(2)
  const fraction = balance.split('.')[1]
  balance = balance.split('.')[0]
  return (
    <main className="App">
      <h1>${balance}<span>.{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input 
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'+200 new Samsung tv'}
          />
          <input 
            value={datetime} 
            onChange={ev => setDatetime(ev.target.value)}
            type="datetime-local" />
        </div>
        <div className="description">
          <input 
            type="text" 
            placeholder={'description'} 
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
        </div>
        <button 
          type="submit"

        >add new transaction</button> 
        {transactions.length}
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + ((transaction.price > 0) ? "green" : "red")}>{(transaction.price > 0 ? ("+" + transaction.price) : transaction.price)}</div>
              <div className="datetime">{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
