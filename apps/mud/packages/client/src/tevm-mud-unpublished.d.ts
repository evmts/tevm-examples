// Temporary declarations for the unpublished @tevm/mud dependency.
// Delete this file once @tevm/mud@^1.0.0 is available from npm.
declare module "@tevm/mud" {
  export type SessionClient = unknown;

  export type TxStatus =
    | { id: string; status: "simulating" }
    | { id: string; status: "optimistic"; hash?: string }
    | { id: string; status: "confirmed"; hash: string }
    | { id: string; status: "reverted"; hash: string };
}

declare module "@tevm/mud/react" {
  import type { ComponentType, ReactNode } from "react";
  import type { TxStatus } from "@tevm/mud";

  export const OptimisticWrapperProvider: ComponentType<{
    children: ReactNode;
    client: unknown;
    loggingLevel?: string;
    stash: unknown;
    storeAddress: `0x${string}`;
    sync?: { startBlock: bigint };
  }>;

  export function useOptimisticWrapper(): {
    subscribeTx?: (options: { subscriber: (progress: TxStatus) => void }) => () => void;
  } | undefined;
}
