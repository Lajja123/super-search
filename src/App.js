import React, { useEffect } from "react";
import Home from "../src/pages/Content/pages/Home";
import { useMemo } from "react";
import Transaction from "../src/pages/Content/pages/Transaction";
import {
  GlobalContext,
  useGlobalReducer,
} from "../src/pages/Content/context/globalContext";
import Wallet from "../src/pages/Content/pages/Wallet";
import Block from "../src/pages/Content/pages/Block";
import Layout from "../src/pages/Content/pages/components/Layout";

import Title from "../src/pages/Content/ui_components/Title";
import Header from "../src/pages/Content/pages/components/Header";
import { chainServices } from "../src/pages/Content/utils";

export const allPages = {
  home: "home",
  transaction: "transaction",
  wallet: "wallet",
  block: "block",
};

function App() {
  const globalState = useGlobalReducer();
  const steps = useMemo(() => {
    switch (globalState.state.steps) {
      case allPages.home:
        return <Home />;
      case allPages.transaction:
        return <Transaction />;
      case allPages.wallet:
        return <Wallet />;
      case allPages.block:
        return <Block />;
      default:
        return <Home />;
    }
  }, [globalState.state.steps]);

  useEffect(() => {
    window.addEventListener(
      "super-search-tx",
      function (event) {
        const { detail } = event;
        globalState.updatePageDetail(
          detail.hash,
          chainServices.getChainById(detail.chainId)
        );
      },
      false
    );
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      <div className="homePage">
        <Layout>
          <div className={globalState.state.accordion ? "ss-pb-4" : ""}>
            <div
              className="d-flex cursorPointer ss-pb-2"
              onClick={() =>
                globalState.updateAccordion(!globalState.state.accordion)
              }
            >
              <div className="flex-grow-1">
                <Title />
              </div>
              <div className="flex-grow-2">
                <div
                  className={` ${
                    globalState.state.accordion ? "rotateImage" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5.25 8.625L12 15.375L18.75 8.625"
                      stroke="white"
                      stroke-width="2.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              {globalState.state.accordion && (
                <>
                  <div className="ss-pb-2">
                    <Header type="wallet" />
                  </div>
                  {steps}
                </>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
