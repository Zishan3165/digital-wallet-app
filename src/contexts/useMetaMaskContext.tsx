"use client";
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "./../utils";

interface WalletState {
  accounts: string[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  disconnect: () => void;
}

const disconnectedState: WalletState = {
  accounts: [],
  balance: "",
  chainId: "",
};

const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const parseWalletFromLocalStorage = () => {
    if (typeof window === "undefined") return;
    try {
      const storedWallet = JSON.parse(
        window.localStorage.getItem("wallet") || ""
      );
      return storedWallet || disconnectedState;
    } catch (error) {
      console.error("Error parsing wallet from local storage:", error);
      return disconnectedState;
    }
  };
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const [isConnecting, setIsConnecting] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(parseWalletFromLocalStorage());

  // useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    setIsConnecting(true);
    if (!window.ethereum) return;
    const accounts =
      providedAccounts ||
      (await window.ethereum?.request({ method: "eth_accounts" }));
    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      localStorage?.setItem("wallet", JSON.stringify(wallet));
      setIsConnecting(false);
      return;
    }

    const balance = formatBalance(
      (await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })) as string
    );
    const chainId = await window.ethereum?.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, balance, chainId: chainId as string });
    setIsConnecting(false);

    localStorage?.setItem(
      "wallet",
      JSON.stringify({ accounts, balance, chainId: chainId as string })
    );
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );
  const updateWallet = useCallback(
    (accounts: any) => _updateWallet(accounts),
    [_updateWallet]
  );

  useEffect(() => {
    try {
      const storedWalletString = localStorage.getItem("wallet");
      if (storedWalletString != null) {
        setWallet(JSON.parse(storedWalletString));
      }
    } catch (e) {
      console.debug(e);
    }
  }, []);

  /**
   * This logic checks if MetaMask is installed. If it is, then we setup some
   * event handlers to update the wallet state when MetaMask changes. The function
   * returned from useEffect is used as a "clean-up": in there, we remove the event
   * handlers whenever the MetaMaskProvider is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum?.on("accountsChanged", updateWallet);
        window.ethereum?.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const disconnect = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_revokePermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      clearError();
    } catch (e) {
      console.debug(e);
    }
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
        disconnect,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"'
    );
  }
  return context;
};
