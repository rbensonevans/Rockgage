import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'


function renderSoldItems(items) {
  return (
    <>
      <h2>Sells</h2>
      <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {/*
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Footer>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}*/}
      </Row>
    </>
  )
}

export default function BondTrader({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [soldItems, setSoldItems] = useState([])
  const [listedItems, setListedItems] = useState([])

  const loadListedItems = async () => {
     // Load all unsold items
   // const itemCount = await marketplace.itemCount()
   const itemCount = 8;
   
    let soldItems = []

    let listedItems = []

    let itemX = ({
      itemId: 1,
      nft: null,
      tokenId: 1,
      price: 3,
      seller: null,
      sold: false
    })

    for (let i = 1; i <= itemCount; i++) {
      //const item = await marketplace.items(i)
      const item = itemX
      if (!item.sold) {
        // get uri url from nft contract
        //const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        //const response = await fetch(uri)
        //const metadata = await response.json()
        // get total price of item (item price + fee)
        //const totalPrice = await marketplace.getTotalPrice(item.itemId)
        //const totalPrice = await marketplace.getTotalPrice(item.itemId)
        const totalPrice = 150000
        // Add item to items array
        listedItems.push({
          totalPrice,
          itemId: itemX.tokenId,
          seller: itemX.seller,
          name: "1 Jack Street",
          description: "offce building",
          image: ""
        })

        soldItems.push({
          totalPrice,
          itemId: itemX.tokenId,
          seller: itemX.seller,
          name: "1 Jack Street",
          description: "offce building",
          image: ""
        })
      }
    }
  
    setListedItems(listedItems)
    setSoldItems(soldItems)
    setLoading(false)
  }
  useEffect(() => {
    loadListedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 py-3 container">
            <h2>Buys</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
            {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}