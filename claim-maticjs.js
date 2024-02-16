import maticJs from '@maticnetwork/maticjs';
import maticJsEthers from "@maticnetwork/maticjs-ethers"
import { config } from "dotenv";
import { getDefaultProvider, Wallet } from "ethers";

const { ZkEvmClient, setProofApi, use } = maticJs;
const { Web3ClientPlugin } = maticJsEthers;

config();

async function claim() {
    console.log("--------------------- gm claim!");

    const l1Provider = getDefaultProvider(process.env.L1_RPC);
    const l2Provider = getDefaultProvider(process.env.L2_RPC);
    const l1Signer = new Wallet(process.env.PRIVATE_KEY, l1Provider);
    const l2Signer = new Wallet(process.env.PRIVATE_KEY, l2Provider);
    console.log("--------------------- hello", l1Signer.address, l2Signer.address);

    use(Web3ClientPlugin);
    setProofApi('https://proof-generator.polygon.technology/')

    console.log("--------------------- initializing zk client...");
    const zkevmClient = new ZkEvmClient();
    await zkevmClient.init({
        network: "testnet",
        version: "cardona",
        parent: {
            provider: l1Signer,
            defaultConfig: {
                from: l1Signer.address
            }
        },
        child: {
            provider: l2Signer,
            defaultConfig: {
                from: l2Signer.address
            }
        },
        log: true
    });

    console.log("--------------------- building payload for claim...");

    const claimPayload = await zkevmClient.bridgeUtil.buildPayloadForClaim(
        process.env.BRIDGE_ASSET_TX_HASH,
        process.env.BRIDGE_ASSET_TX_IS_PARENT,
        process.env.BRIDGE_ASSET_TX_NETWORK_ID
    );
    console.log(claimPayload);

    console.log("--------------------- claiming...");
    const claimTx = await zkevmClient.childChainBridge.claimAsset(
        claimPayload.smtProof,
        claimPayload.smtProofRollup,
        claimPayload.globalIndex,
        claimPayload.mainnetExitRoot,
        claimPayload.rollupExitRoot,
        claimPayload.originNetwork,
        claimPayload.originTokenAddress,
        claimPayload.destinationNetwork,
        claimPayload.destinationAddress,
        claimPayload.amount,
        claimPayload.metadata,
        { gasLimit: 1500000 }
    );

    const txHash = await claimTx.getTransactionHash();
    console.log("--------------------- tx hash...", txHash);

    // NOTE: this won't work on a fork
    const txReceipt = await claimTx.getReceipt();
    console.log("--------------------- tx receipt...", txReceipt);
}

await claim();
