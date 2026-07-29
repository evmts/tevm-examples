import { Chain, http, webSocket } from "viem";
import { anvil } from "viem/chains";
import {
  createWagmiConfig,
  getDefaultConnectors,
} from "@latticexyz/entrykit/internal";
import { garnet, pyrope, redstone } from "@latticexyz/common/chains";
import { chainId } from "./common";

export const chains = [
  redstone,
  garnet,
  pyrope,
  {
    ...anvil,
    contracts: {
      ...anvil.contracts,
      paymaster: {
        address: "0xf03E61E7421c43D9068Ca562882E98d1be0a6b6e",
      },
    },
    blockExplorers: {
      default: {} as never,
      worldsExplorer: {
        name: "MUD Worlds Explorer",
        url: "http://localhost:13690/anvil/worlds",
      },
    },
  },
] as const satisfies Chain[];

export const transports = {
  [anvil.id]: webSocket(),
  [garnet.id]: http(),
  [pyrope.id]: http(),
  [redstone.id]: http(),
} as const;

const walletConnectProjectId = "14ce88fdbc0f9c294e26ec9b4d848e44";

export const wagmiConfig = createWagmiConfig({
  chainId,
  // TODO: swap this with another default project ID or leave empty
  walletConnectProjectId,
  appName: document.title,
  chains,
  transports,
  connectors: getDefaultConnectors({
    walletConnectProjectId,
    appName: document.title,
  }),
  pollingInterval: {
    [anvil.id]: 2000,
    [garnet.id]: 2000,
    [pyrope.id]: 2000,
    [redstone.id]: 2000,
  },
});
