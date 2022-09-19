export class PositionDto {
    adl!: string;
    availPos!: string;
    avgPx!: string;
    cTime!: string;
    ccy!: string;
    deltaBS!: string;
    deltaPA!: string;
    gammaBS!: string;
    gammaPA!: string;
    imr!: string;
    instId!: string;
    instType!: string;
    interest!: string;
    usdPx!: string;
    last!: string;
    lever!: string;
    liab!: string;
    liabCcy!: string;
    liqPx!: string;
    markPx!: string;
    margin!: string;
    mgnMode!: string;
    mgnRatio!: string;
    mmr!: string;
    notionalUsd!: string;
    optVal!: string;
    pTime!: string;
    pos!: string;
    posCcy!: string;
    posId!: string;
    posSide!: string;
    spotInUseAmt!: string;
    spotInUseCcy!: string;
    thetaBS!: string;
    thetaPA!: string;
    tradeId!: string;
    uTime!: string;
    upl!: string;
    uplRatio!: string;
    vegaBS!: string;
    vegaPA!: string;
}

export class ClosePositionsInputDto {
    instId!: string;
    posSide?: string;
    mgnMode!: "cross" | "isolated";
    ccy?: string;
    tag?: string;
    autoCxl?: string;
    clOrdId?: string;
}

export class ClosePositionsResponseDto {
    instId!: string;
    posSide!: string;
    clOrdId!: string;
    tag!: string;
}
