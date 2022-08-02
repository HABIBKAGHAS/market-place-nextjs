import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import Header from "../components/header";
import Head from "next/head";
import Image from "next/image";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_DAPP_URL;
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Nft Market Place</title>
                <meta name="description" content="nft marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </>
    );
}

export default MyApp;
