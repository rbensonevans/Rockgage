import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { Buffer } from 'buffer';
import axios from "axios";

const CreateTokenizedMortgage = ({ marketplace, nft }) => {
  const [metadataUploadStatus, setMetadataUploadStatus] = useState(false)
  const [metadataURI, setMetadataURI] = useState('')
  const [imageUploadStatus, setImageUploadStatus] = useState(false)
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // this function upload the file to IPFS
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const form = new FormData();
        form.append("file", file);
        
        const options = {
          method: 'POST',
          url: 'https://api.nftport.xyz/v0/files',
          headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: 'a6425758-88b5-446c-957d-5a6481d3faf7'
          },
          data: form
        };
        
        setImageUploadStatus(false);
        axios.request(options).then(function (response) {
          console.log(response.data);
          if (response.data.response === "OK") {
            setImageUploadStatus(true);
            setImage(response.data.ipfs_url)
          }
        }).catch(function (error) {
          console.error(error);
        });
      } catch (error){
        console.log("upload error: ", error)
      }
    }
  }

  const createNFT = async () => {
    console.log("name: ", name)
    console.log("description: ", description)
    console.log("image: ", image)

 //   if (!image || !name || !description) return

      try{
          const options = {
            method: 'POST',
            url: 'https://api.nftport.xyz/v0/metadata',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'a6425758-88b5-446c-957d-5a6481d3faf7'
            },
            data: {
              name: name,
              description: description,
              file_url: image
            }
          };

          setMetadataUploadStatus(false);
          axios.request(options).then(function (response) {
            console.log(response.data);
            if (response.data.response === "OK") {
              setMetadataUploadStatus(true);
              setMetadataURI(response.data.metadata_uri)
              mintThenList() // mint to SKALE
              // NFTPort reports a 429 error (too_many_request).
              // call after SKALE mints
              // mintToNFTPortPolygon();
            }
          }).catch(function (error) {
            console.error(error);
          }); 
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }

  const mintToNFTPortPolygon = async () => {
    try{
      const options = {
        method: 'POST',
        url: 'https://api.nftport.xyz/v0/mints/customizable',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'a6425758-88b5-446c-957d-5a6481d3faf7'
        },
        data: {
          chain: 'polygon',
          contract_address: '0x2d22add30b7922a81e7256f3435fed9890277c4a',
          metadata_uri: metadataURI,
          mint_to_address: '0x692F1dB7f64054f4D26b16e4901755e8bDf182A2'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    } catch(error) {
      console.log("mintToNFTPort Polygon: ", error)
    }
  }




  const mintThenList = async () => {
    console.log("metadataURI: ", metadataURI)

    //if (!metadataUploadStatus) return;

    // metadataURI points to the NFT metadata on IPFS.
    // mint nft 
    await(await nft.mint(metadataURI)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    console.log("minted SKALE nft id: ", id)
    //mintToNFTPortPolygon();
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control 
                onChange={(e) => setName(e.target.value)} 
                size="lg" 
                required type="text" 
                placeholder="Name" 
              />
              <Form.Control 
                onChange={(e) => setDescription(e.target.value)} 
                size="lg" 
                required as="textarea" 
                placeholder="Description" 
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                Mint To SKALE Network
                </Button>
                <br/><br/>
                <Button onClick={mintToNFTPortPolygon} variant="primary" size="lg">
                 Mint To NFTPort & Polygon
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateTokenizedMortgage