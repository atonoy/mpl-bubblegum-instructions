"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeConfigBeet = exports.TreeConfig = exports.treeConfigDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const DecompressibleState_1 = require("../types/DecompressibleState");
exports.treeConfigDiscriminator = [122, 245, 175, 248, 171, 34, 0, 207];
class TreeConfig {
    constructor(treeCreator, treeDelegate, totalMintCapacity, numMinted, isPublic, isDecompressible) {
        this.treeCreator = treeCreator;
        this.treeDelegate = treeDelegate;
        this.totalMintCapacity = totalMintCapacity;
        this.numMinted = numMinted;
        this.isPublic = isPublic;
        this.isDecompressible = isDecompressible;
    }
    static fromArgs(args) {
        return new TreeConfig(args.treeCreator, args.treeDelegate, args.totalMintCapacity, args.numMinted, args.isPublic, args.isDecompressible);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return TreeConfig.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find TreeConfig account at ${address}`);
        }
        return TreeConfig.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.treeConfigBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.treeConfigBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.treeConfigBeet.serialize({
            accountDiscriminator: exports.treeConfigDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.treeConfigBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(TreeConfig.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === TreeConfig.byteSize;
    }
    pretty() {
        return {
            treeCreator: this.treeCreator.toBase58(),
            treeDelegate: this.treeDelegate.toBase58(),
            totalMintCapacity: (() => {
                const x = this.totalMintCapacity;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            numMinted: (() => {
                const x = this.numMinted;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            isPublic: this.isPublic,
            isDecompressible: 'DecompressibleState.' + DecompressibleState_1.DecompressibleState[this.isDecompressible],
        };
    }
}
exports.TreeConfig = TreeConfig;
exports.treeConfigBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['treeCreator', beetSolana.publicKey],
    ['treeDelegate', beetSolana.publicKey],
    ['totalMintCapacity', beet.u64],
    ['numMinted', beet.u64],
    ['isPublic', beet.bool],
    ['isDecompressible', DecompressibleState_1.decompressibleStateBeet],
], TreeConfig.fromArgs, 'TreeConfig');
//# sourceMappingURL=TreeConfig.js.map