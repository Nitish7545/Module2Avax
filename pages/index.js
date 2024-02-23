import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import WalletAbi from "../artifacts/contracts/Assessment.sol/VotingSystem.json";

export default function HomePage() {
  const [amitWallet, setAmitWallet] = useState(undefined);
  const [amitAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [voterCounts, setVoterCounts] = useState({});

  const registerAddrRef = useRef();
  const ageRef = useRef();
  const voteAddrRef = useRef();
  const partyCodeRef = useRef();

  const contractAddress = "0xA087Dfc6b8B903Ff60C79878c7dB3dBE0eD082C6";
  const atmABI = WalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setAmitWallet(window.ethereum);
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
    }
  };

  const connectToMetamask = async () => {
    if (!amitWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await amitWallet.request({ method: "eth_requestAccounts" });
    accoundHandler(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(amitWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const registerNewVoter = async () => {
    const addr = registerAddrRef.current.value;
    const age = Number(ageRef.current.value);

    if (!addr) {
      alert('Address is required');
      return;
    }

    try {
      if (atm) {
        let tx = await atm.RegisterNewVoter(addr, age);
        await tx.wait();
        registerAddrRef.current.value = '';
        ageRef.current.value = 0;
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG", error);
    }
  };

  const vote = async () => {
    const addr = voteAddrRef.current.value;
    const partyCode = Number(partyCodeRef.current.value);

    try {
      if (atm) {
        let tx = await atm.vote(addr, partyCode);
        await tx.wait();
        updateVoterCounts();
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG", error);
    }
  };

  const updateVoterCounts = async () => {
    try {
      if (atm) {
        const counts = {};
        for (let i = 0; i <= 9999; i++) {
          const count = await atm.getVoteCount(i);
          if (count > 0) {
            counts[i] = count;
          }
        }
        setVoterCounts(counts);
      }
    } catch (error) {
      console.log("ERROR FETCHING VOTER COUNTS:", error);
    }
  };


  useEffect(() => {
    getWalletAddress();
  }, []);

  useEffect(() => {
    if (atm) {
      updateVoterCounts();
    }
  }, [atm]);

  return (
    <main className="container" style={{backgroundColor:"red"}}>
      <header>
        <h1>Voting System</h1>
      </header>
      <div className="content" style={{backgroundColor:"whiteSmoke", color:"black"}}>
        {!amitAccount ? (
          <button onClick={connectToMetamask}>Start Voting </button>
        ) : (
          <>
            <div className="button-group">
              <div className="btn-input">
                <button onClick={registerNewVoter}>Register New Voter</button>
                <div>
                  <input ref={registerAddrRef} type="text" placeholder="Voter Address" />
                  <input ref={ageRef} type="number" placeholder="Age" />
                </div>
              </div>
              <div className="btn-input">
                <button onClick={vote}>Click to Vote</button>
                <div>
                  <input ref={voteAddrRef} type="text" placeholder="Address" />
                  <input ref={partyCodeRef} type="number" placeholder="Party Code" />
                </div>
              </div>
            </div>
            <div className="voting-count">
              <h2>Voter Counts</h2>
              <div className="party-list">
                <div className="party-list">
                  {Object.entries(voterCounts).map(([partyCode, count]) => (
                    <div className="party-vote" key={partyCode}>
                      <p>Party Code: {partyCode}</p>
                      <p>Votes: {count}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
  main {
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #ffffff; 
    background-color: #2c3e50; 
  }

  .btn-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1em;
  }

  input {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #3498db; 
    color: #ffffff; 
    border: 1px solid #3498db;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.2s, transform 0.2s;
    margin: 0.4em;
  }

  .btn-input > div {
    display: flex;
  }

  .container {
    text-align: center;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to bottom, #2c3e50, #34495e);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #ffffff; 
  }

  header {
    margin-bottom: 30px;
    font-size: 36px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
    border-radius: 8px;
  }

  .button-group {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    display: block;
    padding: 10px 20px;
    font-size: 16px;
    background: blue; 
    color: #ffffff;
    border: 1px solid #e74c3c;
    font-weight: bold;
    cursor: pointer;
    width: 20vw;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, background 0.2s;
  }

  button:hover {
    transform: scale(1.05);
    background: lime; 
  }

  .voting-count {
    margin-top: 20px;
  }

  .party-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .party-vote {
    background-color: #3338da;
    color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 45%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`}</style>

    </main>
  );
}
