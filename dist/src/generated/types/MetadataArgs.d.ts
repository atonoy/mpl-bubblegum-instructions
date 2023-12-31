import * as beet from '@metaplex-foundation/beet';
import { TokenStandard } from './TokenStandard';
import { Collection } from './Collection';
import { Uses } from './Uses';
import { TokenProgramVersion } from './TokenProgramVersion';
import { Creator } from './Creator';
export type MetadataArgs = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    editionNonce: beet.COption<number>;
    tokenStandard: beet.COption<TokenStandard>;
    collection: beet.COption<Collection>;
    uses: beet.COption<Uses>;
    tokenProgramVersion: TokenProgramVersion;
    creators: Creator[];
};
export declare const metadataArgsBeet: beet.FixableBeetArgsStruct<MetadataArgs>;
