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

    // const itemCount = await marketplace.itemCount()
    const dummyData = [
      {
        totalPrice: 100.00,
        itemId: 0,
        owner: "John Doe",
        seller: "Jane Doe",
        name: "Digital Artwork",
        description: "A unique digital artwork created by a renowned artist.",
        image: "https://img.freepik.com/premium-photo/woman-s-face-is-made-up-geometric-shapes-cyberpunk-colorful-fractalism-cubism_834088-1.jpg",
        viewitem: true
      },
      {
        totalPrice: 200.00,
        itemId: 1,
        owner: "Bob Smith",
        seller: "Alice Johnson",
        name: "Rare Collectible",
        description: "A limited edition collectible item.",
        image: "https://www.thesprucecrafts.com/thmb/EkTsqmYBb6cfIrdRF5kEY9bTy7A=/2100x1400/filters:no_upscale():max_bytes(150000):strip_icc()/henry-graves-watch-5a83732fc5542e00377fbe48.jpg",
        viewitem: true
      },
      {
        totalPrice: 50.00,
        itemId: 2,
        owner: "Mike Brown",
        seller: "Emily Davis",
        name: "Digital Music",
        description: "A unique digital music track.",
        image: "https://www.stratamericas.com/wp-content/uploads/2018/04/1.jpeg",
        viewitem: true
      },
      {
        totalPrice: 300.00,
        itemId: 3,
        owner: "Sarah Lee",
        seller: "David Kim",
        name: "Virtual Real Estate",
        description: "A unique virtual real estate property.",
        image: "https://i1.wp.com/www.affinityvr.com/wp-content/uploads/2019/11/dreamstime_xxl_131387439.jpg",
        viewitem: true
      },
      {
        totalPrice: 400.00,
        itemId: 4,
        owner: "Kevin White",
        seller: "Lisa Nguyen",
        name: "Digital Art Collection",
        description: "A collection of unique digital artworks.",
        image: "https://www.seegreatart.art/wp-content/uploads/2022/03/SA-Render-Master-Based-on-Sao-Paulo-1900x1436.jpg",
        viewitem: true
      }
    ];

    // uncomment this 
    // let items = []
    // for (let i = 1; i <= itemCount; i++) {
    //   const item = await marketplace.items(i)
    //   if (!item.sold) {

    //     const uri = await marketplace.tokenURI(item.tokenId)

    //     const response = await fetch(uri)
    //     const metadata = await response.json()

    //     const totalPrice = await marketplace.getTotalPrice(item.itemId)

    //     items.push({
    //       totalPrice,
    //       itemId: item.itemId,
    //       owner: metadata.owner,
    //       seller: item.seller,
    //       name: metadata.name,
    //       description: metadata.description,
    //       image: metadata.image,
    //       viewitem:false,
    //     })
    //   }
    // }
    // setItems(items)
    setLoading(false)
    setItems(dummyData)

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
            <Cards item={item} buyMarketItem={buyMarketItem} marketplace={marketplace} setNFTitem={setNFTitem}/>
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