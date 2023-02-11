import { useState, useEffect } from "react";
import { NFTCard } from "../components/nftCard";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFT, setNFTs] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreTitle, setViewMoreTitle] = useState("View More");
  const [numberElementToViewMore, setNumberElementToViewMore] = useState(6);
  const [pageKey, setPageKey] = useState("");

  const onWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };
  const onCollectionAddressChange = (event) => {
    setCollectionAddress(event.target.value);
  };
  const onFetchCollection = (event) => {
    setFetchCollection(e.target.checked);
  };

  const onViewMore = (event) => {
    if (viewMore === false) {
      setNumberElementToViewMore(NFT.length);
      setViewMore(true);
      setViewMoreTitle("View Less");
    } else if (viewMore === true) {
      setNumberElementToViewMore(6); 
      setViewMore(false);
      setViewMoreTitle("View More");
    }
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
      setPageKey(pageKey)
    }
  };

  useEffect(() => {
    fetchNFTs("");
  }, []);

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "lmutszYXhdQYY2AHL8MzNaHqsgr9vOew";
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
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
          Let's go!
        </button>
      </div>
      <div className="flex flex-wrap gap-12 mt-4 w-5/6 justify-center">
        {NFT.length &&
          NFT.slice(0, numberElementToViewMore).map((nft) => {
            return <NFTCard nft={nft}></NFTCard>;
          })}
        { pageKey && viewMore===true && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onViewMore}
          value={viewMore}
        >
          {viewMoreTitle}
        </button>
      </div>
    </div>
  );
};

export default Home;
