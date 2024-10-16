import logo from './logo.svg';
import './App.css';

//import the web3js module
import { Web3 } from "web3";
import { useState } from "react";

const ADDRESS = "0xc4Ed7a1C6C571B2eACDfF964667F40992D400338";
const ABI = [{ "inputs": [{ "internalType": "uint256", "name": "_startingPoint", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "decreaseCounter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCouhnter", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "increaseCounter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];


function App() {
  const [counter, setCounter] = useState("none");

  //initialising the web3 object from the injectect provider
  const web3 = new Web3(window.ethereum);

  //initialising the ADdress and the ABI
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //interacting with the reading functions
  async function getCouhnter() {
    const result = await myContract.methods.getCouhnter().call();

    //to make it visible in the front end
    setCounter(result.toString());
  }

  //interact with the writing functions
  //increasing function
  async function increaseCounter() {
    //confirm or connect your account i.e wallet
    const accountsConnect = await web3.eth.requestAccounts();

    //the increasing function
    const Transaction = await myContract.methods.increaseCounter().send({ from: accountsConnect[0] });

    getCouhnter();
  }

  async function decreaseCounter() {
    //confirm or connect your account i.e wallet
    const connectedAccounts = await web3.eth.requestAccounts();

    //the decreasing function
    const Transaction = await myContract.methods.decreaseCounter().send({ from: connectedAccounts[0] });

    getCouhnter();
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getCouhnter}>Get current counter</button>
        <hr />
        <button onClick={increaseCounter}>Increase Counter</button>
        <hr />
        <button onClick={decreaseCounter}>Decrease Counter</button>
        <hr />
        <p>Counter: {counter} </p>
      </header>
    </div>
  );
}

export default App;
