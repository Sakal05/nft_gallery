import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export const NFTCard = ({ nft }) => {
  const [copyValue, setCopyValue] = useState("");
  const value = nft.contract.address;
  return (
    <div className="w-1/4 flex flex-col h-auto ">
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
          <p className="text-gray-600 text-ellipsis	overflow-hidden">
            Id: {nft.id.tokenId}
          </p>
          <div className="flex">
            <p className="text-gray-600 text-ellipsis	overflow-hidden">
              {nft.contract.address}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                navigator.clipboard.writeText(value);
                setCopyValue(true);
              }}
            >
              {copyValue ? copyValue : <FontAwesomeIcon icon={faCopy} />}
            </button>
          </div>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600 text-ellipsis	overflow-hidden ">
            {nft.description}
          </p>
        </div>
      </div>
    </div>
  );
};
