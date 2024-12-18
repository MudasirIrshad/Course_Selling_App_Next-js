import "@/styles/globals.css";
import type { AppProps } from "next/app";
import  connectDatabase  from "@/lib/mongoose";
import Appbar from "@/components/Appbar";
export default function App({ Component, pageProps }: AppProps) {

  return<>
  <Appbar/>
  <Component {...pageProps} />;
  </> 
}
connectDatabase();
