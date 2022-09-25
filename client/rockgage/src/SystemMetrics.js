import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function SystemMetrics({ rockgageWallet, account }) {
 
  const [loading, setLoading] = useState(true)
  const [pledgedAmountUSD, setPledgedAmountUSD] = useState(0)
  const [systemMetricsIssuedAmountROCK, setSystemMetricsIssuedAmountROCK] = useState(0)

  const loadAccountInfo = async () => {
  
      // dsplay an nft for the Reserve token.

      //const tokenSymbol = await rockgageToken.symbol()
      //const balanceOf = await rockgageToken.balanceOf(account)

      const pledgedAmountUSD = rockgageWallet.pledgedAmountUSD(account)
      //setPledgedAmountUSD(ethers.utils.formatEther(pledgedAmountUSD))
      setPledgedAmountUSD(ethers.utils.formatEther(10000000))

      const systemMetricsIssuedAmountROCK = rockgageWallet.systemMetricsIssuedAmountROCK()
      //setSystemMetricsIssuedAmountROCK(ethers.utils.formatEther(systemMetricsIssuedAmountROCK)))     
      setSystemMetricsIssuedAmountROCK(100000)

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
          <br/>
          <h2>System Metrics</h2>       
          <h6>The Global Economy Valued in $ROCKs</h6>       
          <br/>
          <p>Total Amount (in circulation) :&nbsp;$100,000,000 ROCK</p>
          <p>Total Equity Pledged:&nbsp;$100,000,000 USD</p>
          <br/>

          <h5>Total Investments (in $ROCKs)</h5>       
          <br/>

          <p>Total Mortgages:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0</p>
          <p>Total Bonds:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0</p>
          <p>Total Investment Pools:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0</p>
          <p>Total Mortgage Pools:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0</p>
          <p>Total PayDay Pools:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0</p>
          <p>Total Mortgage Swaps:&nbsp;Assets:&nbsp;$0&nbsp;Liabilities:&nbsp;$0</p>


        </div>
    </div>
  );
}