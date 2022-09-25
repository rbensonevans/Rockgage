import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function GlobalRatings({ marketplace, nft, account }) {
 
  const [loading, setLoading] = useState(true)

  const loadAccountInfo = async () => {
  
      // dsplay an nft for the Reserve token.

      //const tokenSymbol = await rockgageToken.symbol()
      //const balanceOf = await rockgageToken.balanceOf(account)

      //setTokenSymbol(tokenSymbol)
      //setBalanceOf(balanceOf)
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
          <h2>Global Ratings</h2>       
          <br/>
          <h6>Increase Your Global Ratings</h6>  
          <br/><br/>        
          <p>ENS</p>
          <p>WorldCoin</p>
          <p>Credit Score</p>

        </div>
    </div>
  );
}