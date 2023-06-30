/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  createNFT,
  getTransactionHistory,
  getWalletPortfolio,
} from "../../api";
import {
  convertImageUrlToBlob,
  signAndConfirmTransactionFe,
} from "../../utils";
import { tagsData } from "../../helpers/conts";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";

export default function useTags() {
  const [messageApi, contextHolder] = message.useMessage();

  const [searchParams] = useSearchParams();

  const [network] = React.useState("devnet");
  const [saveMinted, setSaveMinted] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  //   const [status, setStatus] = React.useState("Awaiting Upload");
  const [minted, setMinted] = React.useState();
  const [isAllowMint, setisAllowMint] = React.useState(false);
  const [attr] = React.useState(
    JSON.stringify([{ trait_type: "edification", value: "100" }])
  );
  const [dispResponse, setDispResp] = React.useState("");
  const [tags] = React.useState(tagsData);
  const [selectedTag, setSelectedTag] = React.useState(tagsData[0]);

  const callback = (signature: any, result: any) => {
    console.log("Signature ", signature);
    console.log("result ", result);

    if (signature.err === null) {
      setMinted(saveMinted);
      messageApi.open({
        type: "success",
        content: "Successfully Signed and Minted.",
      });
      setLoading(false);
    }
  };
  const handleSelectedSrc = (tag: any) => {
    setSelectedTag(tag);
  };
  const checkCondition = async (selectedItem: any) => {
    const wallet = searchParams.get("wl");
    if (wallet) {
      const res = await getWalletPortfolio(network, wallet);
      const resHistory = await getTransactionHistory(network, wallet, 10);
      const txnHistory: any[] = resHistory.details || [];
      console.log("txnHistory", txnHistory);

      const { num_tokens, num_nfts, tokens }: any = res.details;
      switch (selectedItem.condition.type) {
        case "NFT":
          console.log(num_nfts >= selectedItem.condition.quanlity, num_nfts);

          return num_nfts >= selectedItem.condition.quanlity;
        case "TOKEN":
          return (
            num_tokens >= selectedItem.condition.quanlity &&
            tokens.filter((x: any) => x.balance >= 1)
          );

          default:
            return false
      }
    }
  };

  const handleMintNFT = async () => {
    messageApi.open({
      type: "info",
      content: "Awaiting Upload",
    });
    setLoading(true);

    const formData = new FormData();
    const wallet = searchParams.get("wl");
    const fileToMint = await convertImageUrlToBlob(
      selectedTag.src,
      `${selectedTag.name}.png`
    );
    if (wallet) {
      formData.append("network", network);
      formData.append("wallet", wallet);
      formData.append("name", selectedTag.title);
      formData.append("symbol", selectedTag.name);
      formData.append("description", selectedTag.des);
      formData.append("attributes", JSON.stringify(attr));
      formData.append("external_url", "");
      formData.append("max_supply", "1");
      formData.append("royalty", "99");
      formData.append("file", fileToMint);
    }
    const res = await createNFT(formData);

    if (res) {
      messageApi.open({
        type: "success",
        content: "Transaction Created. Signing Transactions. Please Wait.",
      });
      const transaction = res.data.result.encoded_transaction; //encoded transaction
      setSaveMinted(res.data.result.mint);
      const ret_result = await signAndConfirmTransactionFe(
        network,
        transaction,
        callback
      ); //signing the encoded transaction
      console.log(ret_result);
      setDispResp(res.data);
    }
  };
  React.useEffect(() => {
    checkCondition(selectedTag).then((isAllowed) => {
      console.log("isAllowed", isAllowed);

      setisAllowMint(isAllowed);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);
  return {
    tags,
    // status,
    isAllowMint,
    isLoading,
    minted,
    contextHolder,
    selectedTag,
    dispResponse,
    handleMintNFT,
    handleSelectedSrc,
  };
}
