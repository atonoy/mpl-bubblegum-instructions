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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeCompressedNFTHash = exports.computeCreatorHash = exports.computeDataHash = exports.getLeafAssetId = void 0;
const generated_1 = require("./generated");
const js_sha3_1 = require("js-sha3");
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
__exportStar(require("./generated"), exports);
async function getLeafAssetId(tree, leafIndex) {
    const [assetId] = await web3_js_1.PublicKey.findProgramAddress([Buffer.from('asset', 'utf8'), tree.toBuffer(), Uint8Array.from(leafIndex.toArray('le', 8))], generated_1.PROGRAM_ID);
    return assetId;
}
exports.getLeafAssetId = getLeafAssetId;
function computeDataHash(metadata) {
    const [serializedMetadata] = generated_1.metadataArgsBeet.serialize(metadata);
    const metadataHash = Buffer.from(js_sha3_1.keccak_256.digest(serializedMetadata));
    const sellerFeeBasisPointsBuffer = new bn_js_1.default(metadata.sellerFeeBasisPoints).toBuffer('le', 2);
    return Buffer.from(js_sha3_1.keccak_256.digest(Buffer.concat([metadataHash, sellerFeeBasisPointsBuffer])));
}
exports.computeDataHash = computeDataHash;
function computeCreatorHash(creators) {
    const bufferOfCreatorData = Buffer.concat(creators.map((creator) => {
        return Buffer.concat([
            creator.address.toBuffer(),
            Buffer.from([creator.verified ? 1 : 0]),
            Buffer.from([creator.share]),
        ]);
    }));
    return Buffer.from(js_sha3_1.keccak_256.digest(bufferOfCreatorData));
}
exports.computeCreatorHash = computeCreatorHash;
function computeCompressedNFTHash(assetId, owner, delegate, treeNonce, metadata) {
    const message = Buffer.concat([
        Buffer.from([0x1]),
        assetId.toBuffer(),
        owner.toBuffer(),
        delegate.toBuffer(),
        treeNonce.toBuffer('le', 8),
        computeDataHash(metadata),
        computeCreatorHash(metadata.creators),
    ]);
    return Buffer.from(js_sha3_1.keccak_256.digest(message));
}
exports.computeCompressedNFTHash = computeCompressedNFTHash;
//# sourceMappingURL=mpl-bubblegum.js.map