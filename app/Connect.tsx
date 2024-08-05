"use client";

import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

export const Connect = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      // const accounts = await sdk?.connect();
      // setAccount(accounts?.[0]);
      if (!window.ethereum) {
        throw new Error("no window.ethereum");
      }
      const accs = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });
      if (!accs) {
        throw new Error("no accounts");
      }
      setAccount((accs as string[])[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <div className="App">
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && "Connected chain: ${chainId}"}
            <p></p>
            {account && "Connected account: ${account}"}
          </>
        </div>
      )}
      <div>chainId: {chainId}</div>
      <div>connected: {connected}</div>
    </div>
  );
};
