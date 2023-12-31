/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { DecompressibleState } from '../types/DecompressibleState';
export type TreeConfigArgs = {
    treeCreator: web3.PublicKey;
    treeDelegate: web3.PublicKey;
    totalMintCapacity: beet.bignum;
    numMinted: beet.bignum;
    isPublic: boolean;
    isDecompressible: DecompressibleState;
};
export declare const treeConfigDiscriminator: number[];
export declare class TreeConfig implements TreeConfigArgs {
    readonly treeCreator: web3.PublicKey;
    readonly treeDelegate: web3.PublicKey;
    readonly totalMintCapacity: beet.bignum;
    readonly numMinted: beet.bignum;
    readonly isPublic: boolean;
    readonly isDecompressible: DecompressibleState;
    private constructor();
    static fromArgs(args: TreeConfigArgs): TreeConfig;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [TreeConfig, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<TreeConfig>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        treeCreator: any;
        treeDelegate: any;
        totalMintCapacity: any;
        numMinted: any;
        isPublic: any;
        isDecompressible: any;
        accountDiscriminator: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [TreeConfig, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        treeCreator: string;
        treeDelegate: string;
        totalMintCapacity: number | {
            toNumber: () => number;
        };
        numMinted: number | {
            toNumber: () => number;
        };
        isPublic: boolean;
        isDecompressible: string;
    };
}
export declare const treeConfigBeet: beet.BeetStruct<TreeConfig, TreeConfigArgs & {
    accountDiscriminator: number[];
}>;
