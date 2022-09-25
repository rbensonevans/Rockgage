import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

export default function MortgageSwap({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])
  const loadListedItems = async () => {
      // Load all unsold items
   // const itemCount = await marketplace.itemCount()
   const itemCount = 8;

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
      }
    }
  
    setListedItems(listedItems)
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
            <h2>Mortgage Swap</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button  variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
                </Col>
                ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}