import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function UserRisk({ rockgageWallet, account }) {

  const [loading, setLoading] = useState(true)
  const [userRisk, setUserRisk] = useState(0)
  const [pledgedAmountUSD, setPledgedAmountUSD] = useState(0)
  const [balanceROCK, setBalanceROCK] = useState(0)

  const loadAccountInfo = async () => {
  
      // dsplay an nft for the Reserve token.

      //const tokenSymbol = await rockgageToken.symbol()
      //const balanceOf = await rockgageToken.balanceOf(account)
      //setTokenSymbol(tokenSymbol)
      //setBalanceOf(balanceOf)
      
      const averageMortgage = 100000 // hardcode; later add to smartcontract
      //const pledgedAmountUSD = rockgageWallet.pledgedAmountUSD(account)
      //const userRisk = ethers.utils.formatEther((pledgedAmountUSD/100000)*100);
      //const balanceROCK = rockgageWallet.balanceROCK(account)
      //setUserRisk(ethers.utils.formatEther(userRisk))
      //setPledgedAmountUSD(ethers.utils.formatEther(pledgedAmountUSD))
      //setBalanceROCK(ethers.utils.formatEther(balanceROCK))

      // Overflow issues hardcode for now.
      setUserRisk(2)
      setPledgedAmountUSD(0)
      setBalanceROCK(0)
      setLoading(false)
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
          <h2>User Risk</h2>       
          <br/><br/>
          <button>
          <a noref="#">Risk Level: {userRisk}%</a>
          </button>
          <br/><br/>

          <p>Total Mortgage :&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Total  :&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0&nbsp;<a href="#">View</a></p>
          <p>Equity Pledged:&nbsp;Available:&nbsp;${pledgedAmountUSD}&nbsp;Used:&nbsp;${balanceROCK}&nbsp;<a href="#">View</a></p>

        </div>
    </div>
  );
}