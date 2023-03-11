export class OrderInpoutDto {
  instId!: string;
  tdMode!: "cash" | "isolated" | "cross";
  ccy?: string;
  clOrdId?: string;
  tag?: string;
  side!: "buy" | "sell";
  posSide?: "long" | "short";
  ordType!:
    | "market"
    | "limit"
    | "post_only"
    | "fok"
    | "ioc"
    | "optimal_limit_ioc";
  px?: string; //Order price. Only applicable to limit,post_only,fok,ioc order.
  sz!: string;
  reduceOnly?: boolean;
  tgtCcy?: string;
  banAmend?: boolean;
}

export class OrderResponseDto {
  clOrdId!: string;
  ordId!: string;
  tag!: string;
  sCode!: string;
  sMsg!: string;
}

export class OrderDetails {
  instType!: "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION";
  instId!: string;
  ccy!: string;
  ordId!: string;
  clOrdId!: string;
  tag!: string;
  px!: string;
  sz!: string;
  pnl!: string;
  ordType!:
    | "market"
    | "limit"
    | "post_only"
    | "fok"
    | "ioc"
    | "optimal_limit_ioc";
  side!: string;
  posSide!: string;
  tdMode!: string;
  accFillSz!: string;
  fillPx!: string;
  tradeId!: string;
  fillSz!: string;
  fillTime!: string;
  state!: "canceled" | "live" | "partially_filled" | "filled";
  avgPx!: string;
  lever!: string;
  tpTriggerPx!: string;
  tpTriggerPxType!: string;
  tpOrdPx!: string;
  slTriggerPx!: string;
  slTriggerPxType!: string;
  slOrdPx!: string;
  feeCcy!: string;
  fee!: string;
  rebateCcy!: string;
  rebate!: string;
  tgtCcy!: string;
  category!:
    | "normal"
    | "twap"
    | "adl"
    | "full_liquidation"
    | "partial_liquidation"
    | "delivery"
    | "ddh";
  uTime!: string;
  cTime!: string;
}

export class OrderListInput {
  instType?: "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION";
  uly?: string;
  instId?: string;
  ordType?:
    | "market"
    | "limit"
    | "post_only"
    | "fok"
    | "ioc"
    | "optimal_limit_ioc";
  state?: "live" | "partially_filled";
  after?: string;
  before?: string;
  limit?: string = "100";
}

export class AlgoOrderListInput {
  ordType!:
    | "conditional"
    | "oco"
    | "trigger"
    | "move_order_stop"
    | "iceberg"
    | "twap";
  algoId?: string;
  clOrdId?: string;
  instType?: "SPOT" | "MARGIN" | "SWAP" | "FUTURES";
  instId?: string;
  after?: string;
  before?: string;
  limit?: string = "100";
}

export class AlgoOrderDetails {
  activePx!: string;
  actualPx!: string;
  actualSide!: string;
  actualSz!: string;
  algoId!: string;
  cTime!: string;
  callbackRatio!: string;
  callbackSpread!: string;
  ccy!: string;
  clOrdId!: string;
  instId!: string;
  instType!: string;
  lever!: string;
  moveTriggerPx!: string;
  ordId!: string;
  ordPx!: string;
  ordType!: string;
  posSide!: string;
  pxLimit!: string;
  pxSpread!: string;
  pxVar!: string;
  side!: string;
  slOrdPx!: string;
  slTriggerPx!: string;
  slTriggerPxType!: string;
  state!: string;
  sz!: string;
  szLimit!: string;
  tag!: string;
  tdMode!: string;
  tgtCcy!: string;
  timeInterval!: string;
  tpOrdPx!: string;
  tpTriggerPx!: string;
  tpTriggerPxType!: string;
  triggerPx!: string;
  triggerPxType!: string;
  triggerTime!: string;
}

export class AlgoOrderInpoutDto {
  instId!: string;
  tdMode!: "cash" | "isolated" | "cross";
  ccy?: string;
  side!: "buy" | "sell";
  posSide?: "long" | "short";
  ordType!:
    | "conditional"
    | "oco"
    | "trigger"
    | "move_order_stop"
    | "iceberg"
    | "twap";

  sz!: string;
  tag?: string;
  reduceOnly?: boolean;
  tgtCcy?: "quote_ccy" | "base_ccy";
  clOrdId?: string;
}

export class AlgoStopTpInputDto {
  tpOrdPx?: string;
  tpTriggerPxType?: string;
  tpTriggerPx?: string;
  slTriggerPx?: string;
  slTriggerPxType?: "last" | "mark" | "index";
  slOrdPx?: string;
}

export class AlgoTrigetInputDto {
  triggerPx!: string;
  orderPx!: string;
  triggerPxType?: "last" | "mark" | "index";
}

export class AlgoTrailStopInputDto {
  callbackRatio?: string;
  callbackSpread?: string;
  activePx?: string;
}

export class AlgoIcebergInputDto {
  pxVar?: string;
  pxSpread?: string;
  szLimit!: string;
  pxLimit!: string;
}

export class AlgoTWAPInputDto {
  pxVar?: string;
  pxSpread?: string;
  szLimit!: string;
  pxLimit!: string;
  timeInterval!: string;
}

export class AlgoOrderResponseDto {
  algoId!: string;
  clOrdId!: string;
  sCode!: string;
  sMsg!: string;
}

export class CancelAlgoOrderInputDto {
  algoId!: string;
  instId!: string;
}
export class CancelAlgoOrderResponseDto {
  algoId!: string;
  sCode!: string;
  sMsg!: string;
}

export class AlgoOrderHistoryInput {
  ordType!:
    | "conditional"
    | "oco"
    | "trigger"
    | "move_order_stop"
    | "iceberg"
    | "twap";
  state?: "effective" | "canceled" | "order_failed";
  algoId?: string;
  instType?: "MARGIN" | "FUTURES" | "SWAP" | "SPOT";
  instId?: string;
  after?: string;
  before?: string;
  limit?: string;
}

export class AlgoOrderHistoryResponse {
  instType!: string;
  instId!: string;
  ordId!: string;
  ccy!: string;
  clOrdId!: string;
  algoId!: string;
  sz!: string;
  closeFraction!: string;
  ordType!: string;
  side!: string;
  posSide!: string;
  tdMode!: string;
  tgtCcy!: string;
  state!: "effective" | "canceled" | "order_failed";
  lever!: string;
  tpTriggerPx!: string;
  tpTriggerPxType!: "mark" | "index" | "last";
  tpOrdPx!: string;
  slTriggerPx!: string;
  slTriggerPxType!: "mark" | "index" | "last";
  triggerPx!: string;
  triggerPxType!: "mark" | "index" | "last";
  ordPx!: string;
  actualSz!: string;
  actualPx!: string;
  actualSide!: "sl" | "tp";
  pxVar!: string;
  pxSpread!: string;
  pxLimit!: string;
  szLimit!: string;
  timeInterval!: string;
  callbackRatio!: string;
  callbackSpread!: string;
  activePx!: string;
  moveTriggerPx!: string;
  reduceOnly!: string;
  triggerTime!: string;
  last!: string;
  cTime!: string;
}

export class OrderHistoryInput {
  instType?: "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION";
  uly?: "FUTURES" | "SWAP" | "OPTION";
  instFamily?: "FUTURES" | "SWAP" | "OPTION";
  instId?: string;
  ordType?:
    | "market"
    | "limit"
    | "post_only"
    | "fok"
    | "ioc"
    | "optimal_limit_ioc";
  state?: "canceled" | "filled";
  category?:
    | "twap"
    | "adl"
    | "full_liquidation"
    | "partial_liquidation"
    | "delivery"
    | "ddh";
  after?: string;
  before?: string;
  begin?: string;
  end?: string;
  limit?: string = "100";
}

export class OrderHistoryResponse {
  instType!: string;
  instId!: string;
  ccy!: string;
  ordId!: string;
  clOrdId!: string;
  tag!: string;
  px!: string;
  sz!: string;
  ordType!:
    | "market"
    | "limit"
    | "post_only"
    | "fok"
    | "ioc"
    | "optimal_limit_ioc";
  side!: string;
  posSide!: string;
  tdMode!: string;
  accFillSz!: string;
  fillPx!: string;
  tradeId!: string;
  fillSz!: string;
  fillTime!: string;
  state!: "canceled" | "filled";
  avgPx!: string;
  lever!: string;
  tpTriggerPx!: string;
  tpTriggerPxType!: "mark" | "index" | "last";
  tpOrdPx!: string;
  slTriggerPx!: string;
  slTriggerPxType!: "mark" | "index" | "last";
  slOrdPx!: string;
  feeCcy!: string;
  fee!: string;
  rebateCcy!: string;
  source!: string;
  rebate!: string;
  tgtCcy!: string;
  pnl!: string;
  category!:
    | "normal"
    | "twap"
    | "adl"
    | "full_liquidation"
    | "partial_liquidation"
    | "delivery"
    | "ddh";
  reduceOnly!: string;
  cancelSource!: string;
  cancelSourceReason!: string;
  algoClOrdId!: string;
  algoId!: string;
  uTime!: string;
  cTime!: string;
}
