// SPDX-License-Identifier: MIT
pragma solidity >0.8.20;

import {ExampleContract} from "../ExampleContract.sol";

/// @notice Deployable wrapper around the example contract. The `.s.sol` suffix
/// tells the Tevm bundler to emit bytecode as well as the ABI, so the e2e test
/// can deploy `ExampleContract` unchanged into a memory EVM.
contract DeployableExampleContract is ExampleContract {}
