export class CancelOrderInputDto {
    instId!: string;
    ordId?: string;
    clOrdId?: string;
}

export class CancelOrderResponseDto {
    clOrdId!: string;
    ordId!: string;
    sCode!: string;
    sMsg!: string;
}