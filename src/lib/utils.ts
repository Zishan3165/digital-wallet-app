import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This value represents the number of wei in one Ether. Ethereum uses 18 decimal places, so there are 10^18 wei in one Ether
const ONE_ETHER = 1000000000000000000;

export const formatBalance = (rawBalance: string) => {
  //
  const balance = (parseInt(rawBalance) / ONE_ETHER).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...`;
};

export function removeTimeFromDate(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based
  const day = date.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
}

export const apiKey = process.env.API_KEY;
