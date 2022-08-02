import styles from "../styles/Home.module.css";
import { useMoralisQuery } from "react-moralis";
import { useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    );
    const { isWeb3Enabled, account } = useMoralis();
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <p>Loading...</p>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes);
                            const { price, nftAddress, markeplaceAddress, tokenId, seller } =
                                nft.attributes;
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    seller={seller}
                                    markeplaceAddress={markeplaceAddress}
                                />
                            );
                        })
                    )
                ) : (
                    <div>web 3 currently not enabled</div>
                )}
            </div>
        </div>
    );
}
