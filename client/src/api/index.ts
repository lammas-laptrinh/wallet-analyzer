import axios from "axios";
import moment from "moment";

const endpoint = import.meta.env.VITE_APP_BASE_URL ?? "";
const xKey = import.meta.env.VITE_APP_API_KEY ?? "";
// const rpc = import.meta.env.VITE_APP_RPC_MAINNET ?? "";
const cachingEnabled = import.meta.env.VITE_APP_IS_ALLOW_CACHED ?? "";
const cacheRefreshAfterMins = Number(
  import.meta.env.REACT_APP_REFRESH_AFTER_MINS ?? 0
);

export async function createNFT(formData: FormData) {
  return (
    axios({
      // Endpoint to send files
      url: "https://api.shyft.to/sol/v1/nft/create_detach",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": xKey,
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },

      // Attaching the form data
      data: formData,
    })
      // Handle the response from backend here
      .then(async (res) => {
        console.log(res);
        if (res.data.success === true) {
          return res;
        }
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
        return undefined;
      })
  );
}

export async function getTransactionHistory(
  network: string,
  address: string,
  txNum: number
) {
  let data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };

  // const ifCached = await getCacheData(network, address);
  // if (ifCached.success === true) {
  //   data = {
  //     success: true,
  //     type: "TRANSACTIONS",
  //     details: ifCached.details,
  //   };
  // } else {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${endpoint}/wallet/transaction_history?network=${network}&wallet=${address}&tx_num=${txNum}`,
    headers: {
      "x-api-key": xKey,
    },
  };
  try {
    const res = await axios.request(config);
    if (res.data.success === true) {
      data = {
        success: true,
        type: "TRANSACTIONS",
        details: res.data.result,
      };
      pushDatatoCache(network, res.data.result, address);
    }
  } catch (error) {
    console.warn(error);
  }
  // }
  return data;
}

export async function getWalletPortfolio(network: string, address: string) {
  let data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };

  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${endpoint}/wallet/get_portfolio?network=${network}&wallet=${address}`,
      headers: {
        "x-api-key": xKey,
      },
    };
    const res = await axios.request(config);

    if (res.data.success === true) {
      data = {
        success: true,
        type: "TOKENS",
        details: res.data.result,
      };
      pushDatatoCache(network, res.data.result, address);
    }
  } catch (error) {
    console.warn(error);
  }

  return data;
}

export async function getTokenData(network: string, address: string) {
  let data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  const ifCached = await getCacheData(network, address);
  if (ifCached.success === true) {
    data = {
      success: true,
      type: "TOKEN",
      details: ifCached.details,
    };
  } else {
    await axios({
      url: `${endpoint} token/get_info`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: {
        network: network,
        token_address: address,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          let detailsToReturn = null;
          if (
            res.data.image?.includes("ray-initiative.gift") ||
            res.data.image?.includes("dex-ray.gift")
          ) {
            detailsToReturn = { ...res.data.result, image: "" };
          } else {
            detailsToReturn = res.data.result;
          }
          data = {
            success: true,
            type: "TOKEN",
            details: detailsToReturn,
          };
          pushDatatoCache(network, detailsToReturn, res.data.result.address);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return data;
}
export async function getAllTokens(network: string, address: string) {
  let data = {
    success: false,
    type: "UNKNOWN",
    details: null,
  };
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${endpoint}/wallet/all_tokens?network=${network}&wallet=${address}`,
    headers: {
      "x-api-key": xKey,
    },
  };
  await axios
    .request(config)
    .then((res) => {
      if (res.data.success === true) {
        data = {
          success: true,
          type: "TOKENS",
          details: res.data.result,
        };
        console.log("address", address);

        pushDatatoCache(network, res.data.result, address);
      }
    })
    .catch((err) => {
      console.warn(err);
    });

  return data;
}

export async function pushDatatoCache(
  network: string,
  data: unknown,
  key: string
) {
  try {
    if (cachingEnabled === "true") {
      let cachedData;
      if (network === "mainnet-beta") {
        cachedData = localStorage.getItem("mainData");
      } else if (network === "devnet") {
        cachedData = localStorage.getItem("devData");
      } else {
        cachedData = localStorage.getItem("testData");
      }

      if (cachedData) {
        const dataSet = new Map(JSON.parse(cachedData));
        dataSet.set(key, JSON.stringify(data));

        const valueToStore = JSON.stringify(Array.from(dataSet.entries()));

        if (network === "mainnet-beta") {
          localStorage.setItem("mainData", valueToStore);
        } else if (network === "devnet") {
          localStorage.setItem("devData", valueToStore);
        } else {
          localStorage.setItem("testData", valueToStore);
        }

        return true;
      } else {
        const dataSet = new Map();
        dataSet.set(key, JSON.stringify(data));

        const valueToStore = JSON.stringify(Array.from(dataSet.entries()));
        if (network === "mainnet-beta") {
          localStorage.setItem("mainData", valueToStore);
        } else if (network === "devnet") {
          localStorage.setItem("devData", valueToStore);
        } else {
          localStorage.setItem("testData", valueToStore);
        }

        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("Could not save NFT data");
    return false;
  }
}

export async function getCacheData(network: string, address: string) {
  let data = {
    success: false,
    details: null,
  };
  try {
    if (cachingEnabled === "true") {
      let dataFromMem;
      if (network === "mainnet-beta") {
        dataFromMem = localStorage.getItem("mainData");
      } else if (network === "devnet") {
        dataFromMem = localStorage.getItem("devData");
      } else {
        dataFromMem = localStorage.getItem("testData");
      }

      if (dataFromMem) {
        const cachedData = new Map(JSON.parse(dataFromMem));
        const token: unknown = cachedData.get(address);
        if (token) {
          data = {
            success: true,
            details: JSON.parse(token as string),
          };
        }
      } else {
        data = {
          success: false,
          details: null,
        };
      }
    }

    return data;
  } catch (error) {
    return data;
  }
}

export async function clearIfOutdated() {
  try {
    if (cachingEnabled === "true" && cacheRefreshAfterMins > 0) {
      const lastCachedTime = localStorage.getItem("lastcatime");
      const timeNow = new Date().toISOString();
      if (lastCachedTime) {
        const timeDiff = moment(timeNow).diff(
          moment(lastCachedTime),
          "minutes",
          true
        );
        if (timeDiff > cacheRefreshAfterMins) {
          localStorage.setItem("mainData", "");
          localStorage.setItem("devData", "");
          localStorage.setItem("testData", "");
          localStorage.setItem("cNdata", "");
          localStorage.setItem("lastcatime", timeNow);
          console.log("All cached data cleared");
          return true;
        } else return false;
      } else {
        localStorage.setItem("lastcatime", timeNow);
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
