export const shorterAddress = (walletAddress: string) => {
  return `${walletAddress.slice(0, 5)}...${walletAddress.slice(
    walletAddress.length - 5,
    walletAddress.length - 1
  )}`;
};
