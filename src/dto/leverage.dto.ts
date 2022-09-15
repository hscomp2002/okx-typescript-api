export class LeverageInputDto {
    instId?: string;
    lever!: string;
    posSide?: "long" | "short";
    mgnMode!: "isolated" | "cross";
    ccy?: string;
}

export class LeverageReponseDto {
    lever!: string;
    mgnMode!: string;
    instId!: string;
    posSide!: string;
}