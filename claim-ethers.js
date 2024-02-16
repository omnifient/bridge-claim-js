import axios from "axios";
import { config } from "dotenv";
import { getDefaultProvider, Contract, Wallet } from "ethers";
import { POLYGON_ZKEVM_BRIDGE_ABI } from "./PolygonZkEVMBridge.abi.js";

config();

async function claim() {
    // TODO: not working
    // const provider = getDefaultProvider(process.env.L2_RPC);
    // const deployer = new Wallet(process.env.PRIVATE_KEY, provider);
    // console.log("hello", deployer.address);

    // const bridge = new Contract(
    //     "0x528e26b25a34a4A5d0dbDa1d57D318153d2ED582",
    //     POLYGON_ZKEVM_BRIDGE_ABI,
    //     deployer
    // );

    // const axiosInstance = axios.create({ baseURL: "https://proof-generator.polygon.technology/api/zkevm/cardona" });
    // const depositAxions = await axiosInstance.get('/bridge', { params: { net_id: 0, deposit_cnt: 5806 } });
    // const depositData = depositAxions.data.deposit;
    // console.log(depositData)

    // if (!depositData.ready_for_claim) {
    //     console.log('Not deposits yet!');
    //     return;
    // }
    // else {
    //     if (depositData.claim_tx_hash != '') {
    //         console.log('already claimed: ', depositData.claim_tx_hash);
    //         return;
    //     }

    //     const proofAxios = await axiosInstance.get("/merkle-proof", {
    //         params: { deposit_cnt: depositData.deposit_cnt, net_id: depositData.orig_net },
    //     });

    //     const { proof } = proofAxios.data;
    //     const claimTx = await bridge.claimAsset(
    //         proof.merkle_proof,
    //         proof.rollup_merkle_proof,
    //         depositData.deposit_cnt,
    //         proof.main_exit_root,
    //         proof.rollup_exit_root,
    //         depositData.orig_net,
    //         depositData.orig_addr,
    //         depositData.dest_net,
    //         depositData.dest_addr,
    //         depositData.amount,
    //         depositData.metadata,
    //     );
    //     console.log('claim message succesfully send: ', claimTx.hash);
    //     await claimTx.wait();
    //     console.log('claim message succesfully mined');
    // }
}

await claim();
