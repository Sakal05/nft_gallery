import { useState } from "react";
import { NFTCard } from "../components/nftCard";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFT, setNFTs] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(false);

  const onWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };
  const onCollectionAddressChange = (event) => {
    setCollectionAddress(event.target.value);
  };
  const onFetchCollection = (event) => {
    setFetchCollection(e.target.checked);
  };

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "lmutszYXhdQYY2AHL8MzNaHqsgr9vOew";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    if (!collectionAddress.length) {
      const fetchURL = `${baseURL}?owner=${walletAddress}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          type={"text"}
          onChange={onWalletAddressChange}
          placeholder="Add your wallet address"
          disabled={fetchCollection}
        ></input>
        <input
          type={"text"}
          onChange={onCollectionAddressChange}
          placeholder="Add the collection address"
        ></input>
        <label className="text-gray-600 ">
          <input
            type={"checkbox"}
            className="mr-2"
            onChange={() => {
              fetchCollection ? fetchNFTsForCollection() : fetchNFTs();
            }}
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={fetchNFTs}
        >
          Let's go!{" "}
        </button>
      </div>
      <div className='flex flex-wrap gap-12 mt-4 w-5/6 justify-center'>
        {
          NFT.length && NFT.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  );
};

export default Home;
