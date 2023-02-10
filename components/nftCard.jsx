export const NFTCard = ({ nft }) => {
  return (
    <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
        <a href="">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
        </a>
      </div>
      <div className="flex flex-col y-gap-5  px-2 py-3 bg-slate-100 rounded-b-md h-130 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600 text-ellipsis	overflow-hidden">Id: {nft.id.tokenId}</p>
          {/* <p className="text-gray-600">{nft.contract.address}</p> */}
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600 text-ellipsis	overflow-hidden ">{nft.description}</p>
          
        </div>
      </div>
    </div>
  );
};

