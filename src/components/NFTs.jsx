import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { toast } from 'react-toastify';

function NFTs({ marketplace, setNFTitem }) {
  useEffect(() => {
    document.title = "NFT Museum ETH"
  }, []);

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {

    const itemCount = await marketplace.itemCount()
    // const dummyData = [
    //   {
    //     totalPrice: 100.00,
    //     itemId: "NFT-12345",
    //     owner: "John Doe",
    //     seller: "Jane Doe",
    //     name: "Digital Artwork",
    //     description: "A unique digital artwork created by a renowned artist.",
    //     image: "https://example.com/image1.jpg",
    //     viewitem: false
    //   },
    //   {
    //     totalPrice: 200.00,
    //     itemId: "NFT-67890",
    //     owner: "Bob Smith",
    //     seller: "Alice Johnson",
    //     name: "Rare Collectible",
    //     description: "A limited edition collectible item.",
    //     image: "https://example.com/image2.jpg",
    //     viewitem: false
    //   },
    //   {
    //     totalPrice: 50.00,
    //     itemId: "NFT-34567",
    //     owner: "Mike Brown",
    //     seller: "Emily Davis",
    //     name: "Digital Music",
    //     description: "A unique digital music track.",
    //     image: "https://example.com/image3.jpg",
    //     viewitem: false
    //   },
    //   {
    //     totalPrice: 300.00,
    //     itemId: "NFT-90123",
    //     owner: "Sarah Lee",
    //     seller: "David Kim",
    //     name: "Virtual Real Estate",
    //     description: "A unique virtual real estate property.",
    //     image: "https://example.com/image4.jpg",
    //     viewitem: false
    //   },
    //   {
    //     totalPrice: 400.00,
    //     itemId: "NFT-45678",
    //     owner: "Kevin White",
    //     seller: "Lisa Nguyen",
    //     name: "Digital Art Collection",
    //     description: "A collection of unique digital artworks.",
    //     image: "https://example.com/image5.jpg",
    //     viewitem: false
    //   }
    // ];
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {

        const uri = await marketplace.tokenURI(item.tokenId)

        const response = await fetch(uri)
        const metadata = await response.json()

        const totalPrice = await marketplace.getTotalPrice(item.itemId)

        items.push({
          totalPrice,
          itemId: item.itemId,
          owner: metadata.owner,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          viewitem:false,
        })
      }
    }
    setLoading(false)
    setItems(items)
    // setItems(dummyData)

  }

  const buyMarketItem = async (item) => {
    const tx = await (await marketplace.viewitem(item.itemId, { value: 0 }))

    toast.info("Wait till transaction Confirms....", {
      position: "top-center"
    })

    await tx.wait();

    setNFTitem(item)
    item.viewitem = true;
  }



  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
    </main>
  )

  return (
    <div className='flex flex-wrap gradient-bg-welcome   gap-10 justify-center pt-24 pb-5 px-16'>
      {
        (items.length > 0 ?
          items.map((item, idx) => (
            <Cards item={item} buyMarketItem={buyMarketItem} marketplace={marketplace} />
          ))
          : (
            <main style={{ padding: "1rem 0" }}>
              <h2 className='text-white'>No listed assets</h2>
            </main>
          ))}
    </div>
  )
}

export default NFTs