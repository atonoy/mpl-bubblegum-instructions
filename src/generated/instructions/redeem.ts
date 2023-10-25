/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

/**
 * @category Instructions
 * @category Redeem
 * @category generated
 */
export type RedeemInstructionArgs = {
  root: number[] /* size: 32 */;
  dataHash: number[] /* size: 32 */;
  creatorHash: number[] /* size: 32 */;
  nonce: beet.bignum;
  index: number;
};
/**
 * @category Instructions
 * @category Redeem
 * @category generated
 */
export const redeemStruct = new beet.BeetArgsStruct<
  RedeemInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['root', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['dataHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['creatorHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['nonce', beet.u64],
    ['index', beet.u32],
  ],
  'RedeemInstructionArgs',
);
/**
 * Accounts required by the _redeem_ instruction
 *
 * @property [] treeAuthority
 * @property [_writable_, **signer**] leafOwner
 * @property [] leafDelegate
 * @property [_writable_] merkleTree
 * @property [_writable_] voucher
 * @property [] logWrapper
 * @property [] compressionProgram
 * @category Instructions
 * @category Redeem
 * @category generated
 */
export type RedeemInstructionAccounts = {
  treeAuthority: web3.PublicKey;
  leafOwner: web3.PublicKey;
  leafDelegate: web3.PublicKey;
  merkleTree: web3.PublicKey;
  voucher: web3.PublicKey;
  logWrapper: web3.PublicKey;
  compressionProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const redeemInstructionDiscriminator = [184, 12, 86, 149, 70, 196, 97, 225];

/**
 * Creates a _Redeem_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Redeem
 * @category generated
 */
export function createRedeemInstruction(
  accounts: RedeemInstructionAccounts,
  args: RedeemInstructionArgs,
  programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'),
) {
  const [data] = redeemStruct.serialize({
    instructionDiscriminator: redeemInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.treeAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.leafOwner,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.leafDelegate,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.merkleTree,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.voucher,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.logWrapper,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.compressionProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
