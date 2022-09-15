export class OrderInpoutDto {
    instId!: string;
    tdMode!: "cash" | "isolated" | "cross";
    ccy?: string;
    clOrdId?: string;
    tag?: string;
    side!: "buy" | "sell";
    posSide?: "long" | "short";
    ordType!: "market" | "limit" | "post_only" | "fok" | "ioc" | "optimal_limit_ioc";
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