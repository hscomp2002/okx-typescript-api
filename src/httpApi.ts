import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { sign } from "./Siner";
import qs from "query-string";
import { InstTyp } from "./dto/InstTyp";
import { BalanceDto } from "./dto/balance-dto";
import { ConfigDto } from "./dto/config-dto";

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

    async get<Type>(path: string, params: any = ""): Promise<Type> {
        if (params) {
            for (const key of Object.keys(params || {})) {
                if (params[key] === null || params[key] === undefined)
                    delete params[key];
            }
            path += "?" + qs.stringify(params);
        }

        const {
            data: { data },
        } = await this.apiClient.get(path, {
            headers: this.getSignedHeader("GET", path),
        });
        return data as Type;
    }

    async post(path: string, body: any) {
        const headers = {
            ...this.getSignedHeader("POST", path, body),
            "Content-Type": "application/json",
        };

        const {
            data: { data },
        } = await this.apiClient.post(path, body, { headers });
        return data;
    }

    async fetchOne<Type>(input: any[]) {
        const [ret] = input;
        return ret as Type;
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
        const path = "/api/v5/account/config";
        const res = this.get<ConfigDto[]>(path);
        return this.fetchOne<ConfigDto>(res);
        // const {
        //     data: { data },
        // } = await this.apiClient.get(path, {
        //     headers: this.getSignedHeader("GET", path),
        // });
        // return this.fetchOne(data);
    }

    async getBalance(coins: string = ""): Promise<BalanceDto> {
        const path = "/api/v5/account/balance";
        const {
            data: { data },
        } = await this.apiClient.get(path, {
            headers: this.getSignedHeader("GET", path),
        });
        return this.fetchOne(data);
    }

    // getPositions(instType: InstTyp, instId) {
    //     return this.get('/api/v5/account/positions', { instType, instId });
    // }
}

export default HttpApi;
