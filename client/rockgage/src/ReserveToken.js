import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function ReserveToken ({ rockgageToken, rockgageWallet, exchangeRate, account }) {

  const [loading, setLoading] = useState(true)

  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenTotalSupply, setTokenTotalSupply] = useState(0)
  const [balanceOf, setBalanceOf] = useState(0)
  const [getDisplayName, setGetDisplayName] = useState(0)
  const [balanceROCK, setBalanceROCK] = useState(0)
  const [systemMetricsIssuedAmountROCK, setSystemMetricsIssuedAmountROCK] = useState(0)

  const loadAccountInfo = async () => {
  
      // Future: display an nft or image for the Reserve token.

      const tokenName = await rockgageToken.name()
      const tokenSymbol = await rockgageToken.symbol()
      const tokenTotalSupply = await rockgageToken.totalSupply()
      const balanceOf = await rockgageToken.balanceOf(account)
      const getDisplayName = await exchangeRate.getDisplayName("ROCK-USD")
      const systemMetricsIssuedAmountROCK = await rockgageWallet.systemMetricsIssuedAmountROCK()
      setTokenName(tokenName)      
      setTokenSymbol(tokenSymbol)
      setTokenTotalSupply(tokenTotalSupply)
      setSystemMetricsIssuedAmountROCK(systemMetricsIssuedAmountROCK)
      setBalanceOf(balanceOf)
      setGetDisplayName(getDisplayName)
      console.log("DisplayName is:" + getDisplayName)
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
          <h2>$ROCK</h2>   
          <br/>    
          <h6>A Mortgage-Backed Stablecoin</h6>       
          <br/><br/>
          <a href="#">Exchange</a>      
          <br/><br/>
          <p>Token Name:&nbsp;{tokenName}</p>
          <p>Token Symbol:&nbsp;{tokenSymbol}</p>
          <p>Token Total Supply:&nbsp;${ethers.utils.formatEther(tokenTotalSupply)}&nbsp;{tokenSymbol}</p>
          <p>Token Balance:&nbsp;${ethers.utils.formatEther(systemMetricsIssuedAmountROCK)}&nbsp;{tokenSymbol}</p>
          <p>Exchange Rate:&nbsp;{getDisplayName}</p>

{/*          <p>Exchange Rate:&nbsp;1&nbsp;{tokenSymbol}&nbsp;/&nbsp;1&nbsp;USD</p> */}
        </div>
    </div>
  );
}