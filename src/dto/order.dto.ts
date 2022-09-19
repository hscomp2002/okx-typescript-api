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
