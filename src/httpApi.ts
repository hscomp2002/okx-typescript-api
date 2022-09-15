import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { sign } from "./Siner";
import qs from "query-string";
import { InstTyp } from "./dto/InstTyp";
import { BalanceDto } from "./dto/balance.dto";
import { ConfigDto } from "./dto/config.dto";
import { OkxResponse } from "./dto/okx-response.dto";
import { PositionDto } from "./dto/position.dto";
import { LeverageReponseDto, LeverageInputDto } from "./dto/leverage.dto";
import { OrderInpoutDto, OrderResponseDto } from "./dto/order.dto";
import { CancelOrderInputDto, CancelOrderResponseDto } from "./dto/cancel-order.dto";
class HttpApi {
    apiClient: AxiosInstance;
    signer: any;
    apiKey: string;
    passphrase: string;
    apiSecret: string;
    constructor(
        apiKey: string,
        apiSecret: string,
        passphrase: string,
        baseURL = ""
    ) {
        baseURL = baseURL || "https://www.okx.com/";
        this.apiSecret = apiSecret;
        this.apiKey = apiKey;
        this.passphrase = passphrase;
        const config: AxiosRequestConfig = {
            baseURL,
        };
        this.apiClient = axios.create(config);
    }

    getSignedHeader(method: string, path: string, params: any = "") {
        const signData = sign(this.apiSecret, path, params, method);
        return {
            "OK-ACCESS-KEY": this.apiKey,
            "OK-ACCESS-TIMESTAMP": signData[0],
            "OK-ACCESS-SIGN": signData[1],
            "OK-ACCESS-PASSPHRASE": this.passphrase,
        };
    }

    async get<T>(path: string, params: any = ""): Promise<T> {
        if (params) {
            for (const key of Object.keys(params || {})) {
                if (params[key] === null || params[key] === undefined)
                    delete params[key];
            }
            path += "?" + qs.stringify(params);
        }

        const res = await this.apiClient.get<any, AxiosResponse<T, any>, T>(path, {
            headers: this.getSignedHeader("GET", path),
        });
        return res.data;
    }

    async post<T>(path: string, body: any): Promise<T> {
        const headers = {
            ...this.getSignedHeader("POST", path, body),
            "Content-Type": "application/json",
        };

        const res = await this.apiClient.post<any, AxiosResponse<T, any>, T>(
            path,
            body,
            { headers }
        );
        return res.data;
    }

    async getTickers(instType: InstTyp) {
        const {
            data: { data },
        } = await this.apiClient.get("/api/v5/market/tickers", {
            params: { instType },
        });
        return data;
    }

    async getAccountConfig(): Promise<ConfigDto> {
        const res = await this.get<OkxResponse<ConfigDto[]>>(
            "/api/v5/account/config"
        );
        return res.data[0];
    }

    async getBalance(coins: string = ""): Promise<BalanceDto> {
        const res = await this.get<OkxResponse<BalanceDto[]>>(
            "/api/v5/account/balance",
            { ccy: coins }
        );
        return res.data[0];
    }

    async getPositions(
        instType: InstTyp | string = "",
        instId: string = "",
        posId: string = ""
    ): Promise<PositionDto[]> {
        const res = await this.get<OkxResponse<PositionDto[]>>(
            "/api/v5/account/positions",
            { instType, instId, posId }
        );
        return res.data;
    }

    async setLeverage(input: LeverageInputDto): Promise<LeverageReponseDto> {
        const res = await this.post<OkxResponse<LeverageReponseDto[]>>(
            "/api/v5/account/set-leverage",
            input
        );
        return res.data[0];
    }

    async placeOrder(input: OrderInpoutDto): Promise<OrderResponseDto> {
        const res = await this.post<OkxResponse<OrderResponseDto[]>>(
            "/api/v5/trade/order",
            input
        );
        return res.data[0];
    }

    async placeMultipleOrders(input: OrderInpoutDto[]): Promise<OrderResponseDto[]> {
        const res = await this.post<OkxResponse<OrderResponseDto[]>>(
            "/api/v5/trade/batch-orders",
            input
        );
        return res.data;
    }

    async cancelOrder(input: CancelOrderInputDto): Promise<CancelOrderResponseDto> {
        const res = await this.post<OkxResponse<CancelOrderResponseDto[]>>(
            "/api/v5/trade/cancel-order",
            input
        );
        return res.data[0];
    }

    async cancelMultipleOrders(input: CancelOrderInputDto[]): Promise<CancelOrderResponseDto[]> {
        const res = await this.post<OkxResponse<CancelOrderResponseDto[]>>(
            "/api/v5/trade/cancel-batch-orders",
            input
        );
        return res.data;
    }
}

export default HttpApi;
