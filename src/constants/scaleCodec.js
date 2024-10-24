import * as $ from "scale-codec";
import {u8aToHex, hexToU8a, numberToU8a} from '@polkadot/util';

const $Symbol = $.object(
  $.field('base', $.u32),
  $.field('quote', $.u32),
)

export const $TradingPair = $.tuple($.u32, $.u32)


export const tradingPair = (params) => {
  return $TradingPair.encode((params));
} 

export const codecNonce = (sendNonce) => {
  return $.u32.encode(sendNonce);
}

export const $OrderResponse = $.object(
  $.field('order_id', $.u64),
  $.field('symbol', $Symbol),
  $.field('direction', $.u8),
  $.field('create_timestamp', $.u64),
  $.field('amount', $.str),
  $.field('price', $.str),
  $.field('status', $.u16),
  $.field('matched_quote_amount', $.str),
  $.field('matched_base_amount', $.str),
  $.field('base_fee', $.str),
  $.field('quote_fee', $.str),
)

export const $Token = $.tuple($.uint8Array, $.uint8Array, $.u128, $.bool, $.u8)
export const $MarketKey = $.tuple($.sizedUint8Array(32), $TradingPair)

export const $Market = $.object(
  $.field('minBase', $.u128),
  $.field('baseScale', $.u8),
  $.field('quoteScale', $.u8),
  $.field('status', $.u8),
  $.field('tradingRewards', $.bool),
  $.field('lpRewards', $.bool),
  $.optionalField('unzavailableAfter', $.u32),
)

export const $OrdersArray = $.array($.str)

export const scaleCodecArray = (params) => {
  return $.uint8Array.encode(params)
}

export const decodeU32 = (params) => {
  if(typeof params === 'string'){
    return $.u32.decode(hexToU8a(params))
  }
  return $.u32.decode(params)
}

export const encodeU32 = (param) => {
  return u8aToHex($.u8.encode(numberToU8a(param)))
}

export const $BalanceResponse = $.object(
  $.field('currency', $.u32),
  $.field('available', $.str),
  $.field('freezed', $.str),
)

const $MakeOrderCodec = $.object(
  $.field('base', $.u32),
  $.field('quote', $.u32),
  $.field('amount', $.str),
  $.field('price', $.str),
)

const $CancelOrderCodec = $.object(
  $.field('base', $.u32),
  $.field('quote', $.u32),
  $.field('order_id', $.u64),
)

export const $Brokers = $.object(
  $.field('beneficiary', $.sizedUint8Array(32)),
  $.field('staked', $.u128),
  $.field('registerAt', $.u32),
  $.field('rpcEndpoint', $.uint8Array),
  $.field('name', $.uint8Array),
)


export const ArticleSechma = $.object(
  $.field('id', $.u64),
  $.field('title', $.str),
  $.field('content', $.str),
  $.field('author_id', $.u64),
  $.field('author_nickname', $.str),
  $.field('subspace_id', $.u64),
  $.field('ext_link', $.str),
  $.field('status', $.i16),
  $.field('weight', $.i16),
  $.field('created_time', $.u64),
  $.field('updated_time', $.u64),
)


export const SubspaceSechma = $.object(
  $.field('id', $.u64),
  $.field('title', $.str),
  $.field('slug', $.str),
  $.field('description', $.str),
  $.field('banner', $.str),
  $.field('status', $.i16),
  $.field('weight', $.i16),
  $.field('created_time', $.u64),
)

export const CommentSechma = $.object(
  $.field('id', $.u64),
  $.field('content', $.str),
  $.field('author_id', $.u64),
  $.field('author_nickname', $.str),
  $.field('article_id', $.u64),
  $.field('status', $.i16),
  $.field('weight', $.i16),
  $.field('created_time', $.u64),
)

export const $Prover = $.object(
  $.optionalField('address', $.sizedUint8Array(32)),
  $.field('proverPubKey', $.uint8Array),
  $.field('rpcEndpoint', $.uint8Array),
)

export function makerOrderCommand(params){
  const {type,  ...restProps} = params;
  if(type === 'bid'){
    return `0x01${u8aToHex($MakeOrderCodec.encode(restProps)).slice(2)}`
  }else if(type === 'ask'){
    return `0x00${u8aToHex($MakeOrderCodec.encode(restProps)).slice(2)}`
  }else if(type === 'cancel'){
    return `0x02${u8aToHex($CancelOrderCodec.encode(restProps)).slice(2)}`
  }
}

export class NonceAtomics {
  static int = new Uint32Array(new ArrayBuffer(32));
  static init(value){
    Atomics.store(this.int, 0, value)
  }
  static increase = () => {
    Atomics.add(this.int, 0, 1);
    return Atomics.load(this.int, 0)
  };
}
