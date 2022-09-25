import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

export default function MortgagePledge({ rockgageToken, rockgageWallet, account }) {
  const [loading, setLoading] = useState(true)

  // const [tokenSymbol, setTokenSymbol] = useState("")
  const [balanceOf, setBalanceOf] = useState(0)
  const [createAccount, setCreateAccount] = useState(false)
  const [balanceUSD, setBalanceUSD] = useState(0)
  const [balanceROCK, setBalanceROCK] = useState(0)
  const [pledgedAmountUSD, setPledgedAmountUSD] = useState(0)
  const [pledgedAmountReceivedROCK, setPledgedAmountReceivedROCK] = useState(0)
    
    
    const loadAccountInfo = async () => {
  // const tokenSymbol = await rockgageToken.symbol()
    //      setTokenSymbol(tokenSymbol)

  const balanceOf = await rockgageToken.balanceOf(account) 
  setBalanceOf(ethers.utils.formatEther(balanceOf))

        // check for wallet 
  try {
          const balanceUSD = await rockgageWallet.balanceUSD(account);
          const balanceROCK = await rockgageWallet.balanceROCK(account);
          const pledgedAmountUSD = await rockgageWallet.pledgedAmountUSD(account);
          const pledgedAmountReceivedROCK = await rockgageWallet.pledgedAmountReceivedROCK(account);
          setBalanceUSD(ethers.utils.formatEther(balanceUSD))
          setBalanceROCK(ethers.utils.formatEther(balanceROCK))
          setPledgedAmountUSD(ethers.utils.formatEther(pledgedAmountUSD))
          setPledgedAmountReceivedROCK(ethers.utils.formatEther(pledgedAmountReceivedROCK))
  } catch(error) {
          <main style={{ padding: "1rem 0" }}>
              <Button  variant="primary" size="lg">
                First Create A Wallet in MyWallet
              </Button>
            </main>
        }
 
        setLoading(false)
    }

    const pledgeMortgageEquity = async () => {
      try {
            await rockgageWallet.pledgeMortgage(account);
        } catch(error) {
          console.log("Pledge Mortgage Equity failed." + error)
        }
}


    useEffect(() => {
      loadAccountInfo()
    }, [])

    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    )

    return (
        <div className="flex justify-center">
          <div className="px-5 container">
            <br/><br/>
            <h2>Mortgage Pledge</h2>       
            <br/><br/>
            <Button onClick={pledgeMortgageEquity} variant="primary" size="lg">
                        Pledge $10,000 USD
            </Button>
          <br/><br/> 
          <p>Balance: ${balanceROCK} ROCK</p>
          <p>Balance: ${balanceUSD} USD</p>
          <p>Pledged Amount: ${pledgedAmountUSD} USD</p>
          <p>Received Amount: ${pledgedAmountReceivedROCK} ROCK</p>                        
          <br/>
          <p>Token Amount: ${balanceOf} RCK</p>
          </div>
      </div>
    );  
}
