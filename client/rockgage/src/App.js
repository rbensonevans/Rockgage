import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navbar.js';
import Home from './Home.js'
import CreateTokenizedMortgage from './CreateTokenizedMortgage.js'
import ListRealEstate from './ListRealEstate.js'
import MyAccount from './MyAccount.js'
import GlobalRatings from './GlobalRatings.js'
import UserRisk from './UserRisk.js'
import ReserveToken from './ReserveToken.js'
import PayDayLoan from './PayDayLoan.js'
import BondTrader from './BondTrader.js'
import InvestmentPools from './InvestmentPools.js'
import MortgageOrigination from './MortgageOrigination.js'
import MortgagePledge from './MortgagePledge.js'
import MortgageSwap from './MortgageSwap.js'
import SystemMetrics from './SystemMetrics.js'
import MarketplaceAbi from './contractsData/Marketplace.json'
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/NFT.json'
import NFTAddress from './contractsData/NFT-address.json'
import RockgageTokenAbi from './contractsData/RockgageToken.json'
import RockgageTokenAddress from './contractsData/RockgageToken-address.json'
import ExchangeRateAbi from './contractsData/ExchangeRate.json'
import ExchangeRateAddress from './contractsData/ExchangeRate-address.json'
import RockgageWalletAbi from './contractsData/RockgageWallet.json'
import RockgageWalletAddress from './contractsData/RockgageWallet-address.json'

import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import { Button } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  const [rockgageToken, setRockgageToken] = useState({})
  const [exchangeRate, setExchangeRate] = useState({})
  const [rockgageWallet, setRockgageWallet] = useState({})

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    const rockgageToken = new ethers.Contract(RockgageTokenAddress.address, RockgageTokenAbi.abi, signer)
    const exchangeRate = new ethers.Contract(ExchangeRateAddress.address, ExchangeRateAbi.abi, signer)
    const rockgageWallet = new ethers.Contract(RockgageWalletAddress.address, RockgageWalletAbi.abi, signer)
  
    setMarketplace(marketplace)
    setNFT(nft)
    setRockgageToken(rockgageToken)
    setExchangeRate(exchangeRate)
    setRockgageWallet(rockgageWallet)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
      <Navigation web3Handler={web3Handler} account={account} />
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              <Route path="/create-tokenized-mortgage" element={
                <CreateTokenizedMortgage marketplace={marketplace} nft={nft} />
              } />
              <Route path="/list-real-estate" element={
                <ListRealEstate marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-account" element={
                <MyAccount rockgageToken={rockgageToken} rockgageWallet={rockgageWallet} account={account} />
              } />
              <Route path="/global-ratings" element={
                <GlobalRatings marketplace={marketplace} account={account} />
              } />
              <Route path="/user-risk" element={
                <UserRisk  rockgageWallet={rockgageWallet} account={account} />
              } />
              <Route path="/reserve-token" element={
                <ReserveToken rockgageToken={rockgageToken} rockgageWallet={rockgageWallet} exchangeRate={exchangeRate} account={account} />
              } />
              <Route path="/pay-day-loan" element={
                <PayDayLoan marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/bond-trader" element={
                <BondTrader marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/investment-pools" element={
                <InvestmentPools marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/mortgage-origination" element={
                <MortgageOrigination marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/mortgage-pledge" element={
                <MortgagePledge rockgageToken={rockgageToken} rockgageWallet={rockgageWallet} account={account} />
              } />
              <Route path="/mortgage-swap" element={
                <MortgageSwap marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/system-metrics" element={
                <SystemMetrics rockgageWallet={rockgageWallet} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
