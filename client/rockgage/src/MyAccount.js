import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button} from 'react-bootstrap'

export default function MyAccount({ rockgageToken, rockgageWallet, account }) {

  const [loading, setLoading] = useState(true)

  const [tokenSymbol, setTokenSymbol] = useState("")
  const [balanceOf, setBalanceOf] = useState(0)
  const [createAccount, setCreateAccount] = useState(true)
  const [balanceUSD, setBalanceUSD] = useState(0)
  const [balanceROCK, setBalanceROCK] = useState(0)
  const [pledgedAmountUSD, setPledgedAmountUSD] = useState(0)
  const [pledgedAmountReceivedROCK, setPledgedAmountReceivedROCK] = useState(0)


  const loadAccountInfo = async () => {
  
      // dsplay an nft for the Reserve token.

 //     const tokenSymbol = await rockgageToken.symbol()
 //     setTokenSymbol(tokenSymbol)
 //     const balanceOf = await rockgageToken.balanceOf(account)
    try {
        const balanceUSD = await rockgageWallet.balanceUSD(account);
        const balanceROCK = await rockgageWallet.balanceROCK(account);
        const pledgedAmountUSD = await rockgageWallet.pledgedAmountUSD(account);
        const pledgedAmountReceivedROCK = await rockgageWallet.pledgedAmountReceivedROCK(account);
        setBalanceUSD(ethers.utils.formatEther(balanceUSD))
        setBalanceROCK(ethers.utils.formatEther(balanceROCK))
        setPledgedAmountUSD(ethers.utils.formatEther(pledgedAmountUSD))
        setPledgedAmountReceivedROCK(ethers.utils.formatEther(pledgedAmountReceivedROCK))
        setCreateAccount(false)

    }
    catch(error) {
              console.log("Account needs to be created." + error)
              setCreateAccount(true)
    }
  setLoading(false)
  }

  const createWallet = async () => {
      try {
          await rockgageWallet.createUserCashAccount(account);
          setCreateAccount(false)
        } catch(error) {
          console.log("Wallet create failed." + error)
          setCreateAccount(true)
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

  if (createAccount) return (
    <div className="flex justify-center">
    <div className="px-5 container">
      <br/><br/>
      <h2>My Wallet</h2>       
      <br/><br/> 
      <main style={{ padding: "1rem 0" }}>
        <Button onClick={createWallet} variant="primary" size="lg">
                Create A Wallet
        </Button>
      </main>
      </div>
      </div>
  )


  return (                   
      <div className="flex justify-center">
        <div className="px-5 container">
          <br/>
          <h2>My Wallet</h2> 
          <br/><br/> 
          <p>Balance: ${balanceROCK} ROCK</p>
          <p>Balance: ${balanceUSD} USD</p>
          <p>Pledged Amount: ${pledgedAmountUSD} USD</p>
          <p>Received Amount: ${pledgedAmountReceivedROCK} ROCK</p>                        
          <br/>
          {/* <h5>Token Amount: ${balanceOf} RCK</h5>   */}   

          <h5>Investments</h5><h6> (in $rocks)</h6>       
          <br/>
          <p>Mortgages:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Bonds:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Investment Pools:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Mortgage Pools:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>PayDay Pools:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Mortgage Swaps:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Equity Pledged:&nbsp;Available:&nbsp;$0&nbsp;Used:&nbsp;$0&nbsp;<a href="#">View</a></p>
          </div>
          </div>
);
}