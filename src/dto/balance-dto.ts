export interface Detail {
    availBal: string;
    availEq: string;
    cashBal: string;
    ccy: string;
    crossLiab: string;
    disEq: string;
    eq: string;
    eqUsd: string;
    frozenBal: string;
    interest: string;
    isoEq: string;
    isoLiab: string;
    isoUpl: string;
    liab: string;
    maxLoan: string;
    mgnRatio: string;
    notionalLever: string;
    ordFrozen: string;
    twap: string;
    uTime: string;
    upl: string;
    uplLiab: string;
    stgyEq: string;
    spotInUseAmt: string;
}

export interface BalanceDto {
    adjEq: string;
    details: Detail[];
    imr: string;
    isoEq: string;
    mgnRatio: string;
    mmr: string;
    notionalUsd: string;
    ordFroz: string;
    totalEq: string;
    uTime: string;
}