/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Coin from "../../../assets/coin.png";
import Nft from "../../../assets/nft.png";
import Solana from "../../../assets/solana2.png";
import Achivement from "../../../assets/achivement.png";
import Tags from "../../../assets/tags.png";
import {
  getAllTokens,
  getTransactionHistory,
  getWalletPortfolio,
} from "../../../api";
import { NETWORK } from "../../../helpers/conts";
import { RadioChangeEvent, message } from "antd";
import { useSearchParams } from "react-router-dom";

type portfolioInfo = {
  id: string;
  avatarUrl: string;
  description: string;
  title: string | number;
  to?: string;
};

type RecentSearch = {
  time: string;
  address: string;
};

export default function useWallet() {
  const [messageApi, contextHolder] = message.useMessage();

  const [searchParrams, setSearchParrams] = useSearchParams();

  const network = searchParrams.get("network") || NETWORK.DEV_NET;

  const [currentWalletAddress, setWalletAddress] = React.useState("");
  const [topTokens, setTopTokens] = React.useState(5);

  const [pieChartData, setPieChartData] = React.useState<any[]>([]);
  const [lineChartData, setLineChartData] = React.useState<any[]>([]);

  const [recentSearchWallet, setRecentSearchWallet] = React.useState<
    Array<RecentSearch>
  >([]);
  const [portfolioInfo, setPortfolio] = React.useState<Array<portfolioInfo>>(
    []
  );

  const [allTokens, setAllTokens] = React.useState<any>([]);

  const handleSelectTopValue = ({ target: { value } }: RadioChangeEvent) => {
    setTopTokens(value);
  };
  const handleCardClick = (address: string) => {
    setWalletAddress(address);
    searchParrams.set("wl", address);
    setSearchParrams(searchParrams);
  };
  const handleSearch = (address: string) => {
    if (address === "") {
      return;
    }
    const cloneValue = [...recentSearchWallet];

    const isDulicate =
      cloneValue.filter((x) => x.address === address).length > 0;
    if (!isDulicate) {
      cloneValue.push({ time: new Date().toDateString(), address });
    }

    setRecentSearchWallet(cloneValue);
    setWalletAddress(address);
    setSearchParrams(`wl=${address}`);
    localStorage.setItem("RECENT_WALLET_SEARCH", JSON.stringify(cloneValue));
    messageApi.open({ type: "success", content: "search successful" });
  };
  const prepareChartData = async (
    allTokens: any[],
    transactionsHistory: any[]
  ) => {
    return {
      pie:
        allTokens !== null
          ? allTokens
              .sort((a, b) => b.balance - a.balance)
              .map((token) => {
                return {
                  name: token.info.symbol,
                  value: token.balance,
                };
              })
          : [],
      line:
        transactionsHistory !== null
          ? transactionsHistory.map((transaction: any) => {
              console.log(transaction);

              if (transaction.parsed) {
                const { timestamp, actions } = transaction.parsed;
                const countTransaction = actions.filter((action: any) =>
                  action.type.includes("TRANSFER")
                ).length;
                return {
                  name: new Date(timestamp).toDateString(),
                  sender: countTransaction,
                  receiver: countTransaction,
                };
              }
              return undefined;
            })
          : [],
    };
  };
  const initApp = React.useCallback(async (walletAddress: string) => {
    const promiseAllToken = getAllTokens(network, walletAddress);
    const promisWalletPortfolio = getWalletPortfolio(network, walletAddress);
    const promiseTransactionsHistory = getTransactionHistory(
      network,
      walletAddress,
      15
    );
    try {
      const [walletPortfolio, allTokens, transactionsHistory] =
        await Promise.all([
          promisWalletPortfolio,
          promiseAllToken,
          promiseTransactionsHistory,
        ]);

      if (allTokens.details) {
        const allTokensInfo = allTokens.details as Array<any>;
        setAllTokens(
          allTokensInfo.map((token: any) => {
            return {
              key: token.address,
              name: token.info.name,
              address: token.address,
              balance: token.balance,
              symbol: token.info.symbol,
              image: token.info.image,
            };
          })
        );
      }
      if (walletPortfolio.details) {
        const { sol_balance, num_tokens, num_nfts }: any =
          walletPortfolio.details;
          console.log(walletPortfolio.details);
          
        setPortfolio([
          {
            id: "1",
            avatarUrl: Solana,
            description: "Balance",
            title: `${sol_balance || 0}`,
          },
          {
            id: "2",
            avatarUrl: Nft,
            description: "NFTs",
            title: `${num_nfts || 0}`,
          },
          {
            id: "3",
            avatarUrl: Coin,
            description: "Tokens",
            title: `${num_tokens || 0}`,
          },
          {
            id: "4",
            avatarUrl: Tags,
            description: "Tags",
            title: 0,
            to: "tags",
          },
          {
            id: "5",
            avatarUrl: Achivement,
            description: "Goals",
            title: 0,
            to: "goal",
          },
        ]);
      }

      const { pie, line } = await prepareChartData(
        allTokens.details as unknown as any[],
        transactionsHistory.details as unknown as any[]
      );

      setPieChartData(pie);
      setLineChartData(line);
    } catch (error: any) {
      console.log("error", error);

      messageApi.open({ type: "error", content: error.message });
    }
  }, []);

  React.useEffect(() => {
    const value = localStorage.getItem("RECENT_WALLET_SEARCH");
    if (value) {
      setRecentSearchWallet(JSON.parse(value));
    }
  }, []);

  React.useEffect(() => {
    const walletAddress = searchParrams.get("wl");
    if (walletAddress !== null) {
      setWalletAddress(walletAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParrams]);

  React.useEffect(() => {
    if (currentWalletAddress !== "") {
      initApp(currentWalletAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWalletAddress]);
  return {
    allTokens,
    contextHolder,
    pieChartData,
    topTokens,
    searchParrams,
    handleSearch,
    handleCardClick,
    handleSelectTopValue,
    lineChartData,
    portfolioInfo,
    recentSearchWallet,
  };
}
