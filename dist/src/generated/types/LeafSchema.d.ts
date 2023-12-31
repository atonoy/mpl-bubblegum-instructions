import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export type LeafSchemaRecord = {
    V1: {
        id: web3.PublicKey;
        owner: web3.PublicKey;
        delegate: web3.PublicKey;
        nonce: beet.bignum;
        dataHash: number[];
        creatorHash: number[];
    };
};
export type LeafSchema = beet.DataEnumKeyAsKind<LeafSchemaRecord>;
export declare const isLeafSchemaV1: (x: LeafSchema) => x is {
    __kind: "V1";
} & Omit<{
    id: web3.PublicKey;
    owner: web3.PublicKey;
    delegate: web3.PublicKey;
    nonce: beet.bignum;
    dataHash: number[];
    creatorHash: number[];
}, "void"> & {
    __kind: 'V1';
};
export declare const leafSchemaBeet: beet.FixableBeet<{
    __kind: "V1";
} & Omit<{
    id: web3.PublicKey;
    owner: web3.PublicKey;
    delegate: web3.PublicKey;
    nonce: beet.bignum;
    dataHash: number[];
    creatorHash: number[];
}, "void">, {
    __kind: "V1";
} & Omit<{
    id: web3.PublicKey;
    owner: web3.PublicKey;
    delegate: web3.PublicKey;
    nonce: beet.bignum;
    dataHash: number[];
    creatorHash: number[];
}, "void">>;
