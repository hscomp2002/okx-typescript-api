import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { sign } from "./Siner";
import qs from "query-string";
import { InstTyp } from "./dto/InstTyp";
import { BalanceDto } from "./dto/balance.dto";
import { ConfigDto } from "./dto/config.dto";
import { OkxResponse } from "./dto/okx-response.dto";
import {
  ClosePositionsInputDto,
  ClosePositionsResponseDto,
  PositionDto,
} from "./dto/position.dto";
import { LeverageReponseDto, LeverageInputDto } from "./dto/leverage.dto";
import {
  OrderInpoutDto,
  OrderResponseDto,
  OrderDetails,
  OrderListInput,
  AlgoOrderInpoutDto,
  AlgoOrderResponseDto,
  AlgoStopTpInputDto,
  AlgoTrailStopInputDto,
  AlgoTrigetInputDto,
  AlgoIcebergInputDto,
  AlgoTWAPInputDto,
  CancelAlgoOrderInputDto,
  AlgoOrderListInput,
  AlgoOrderDetails,
  AlgoOrderHistoryInput,
  AlgoOrderHistoryResponse,
} from "./dto/order.dto";
import {
  CancelOrderInputDto,
  CancelOrderResponseDto,
} from "./dto/cancel-order.dto";
import { CurrencyDto } from "./dto/currency.dto";
import { InstrumentDto } from "./dto/instrument.dto";
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

  async placeMultipleOrders(
    input: OrderInpoutDto[]
  ): Promise<OrderResponseDto[]> {
    const res = await this.post<OkxResponse<OrderResponseDto[]>>(
      "/api/v5/trade/batch-orders",
      input
    );
    return res.data;
  }

  async cancelOrder(
    input: CancelOrderInputDto
  ): Promise<CancelOrderResponseDto> {
    const res = await this.post<OkxResponse<CancelOrderResponseDto[]>>(
      "/api/v5/trade/cancel-order",
      input
    );
    return res.data[0];
  }

  async cancelMultipleOrders(
    input: CancelOrderInputDto[]
  ): Promise<CancelOrderResponseDto[]> {
    const res = await this.post<OkxResponse<CancelOrderResponseDto[]>>(
      "/api/v5/trade/cancel-batch-orders",
      input
    );
    return res.data;
  }

  async getOrderDetails(
    instId: string,
    ordId: string = "",
    clOrdId: string = ""
  ): Promise<OrderDetails> {
    const res = await this.get<OkxResponse<OrderDetails[]>>(
      "/api/v5/trade/order",
      { instId, ordId, clOrdId }
    );
    return res.data[0];
  }

  async getOrderList(
    input: OrderListInput | undefined = undefined
  ): Promise<OrderDetails[]> {
    const res = await this.get<OkxResponse<OrderDetails[]>>(
      "/api/v5/trade/orders-pending",
      input
    );
    return res.data;
  }

  async getAlgoOrderList(
    input: AlgoOrderListInput | undefined = undefined
  ): Promise<AlgoOrderDetails[]> {
    const res = await this.get<OkxResponse<AlgoOrderDetails[]>>(
      "/api/v5/trade/orders-algo-pending",
      input
    );
    return res.data;
  }

  async getAlgoOrderHistory(
    input: AlgoOrderHistoryInput | undefined = undefined
  ): Promise<AlgoOrderHistoryResponse[]> {
    const res = await this.get<OkxResponse<AlgoOrderHistoryResponse[]>>(
      "/api/v5/trade/orders-algo-history",
      input
    );
    return res.data;
  }

  async closePositions(
    input: ClosePositionsInputDto
  ): Promise<ClosePositionsResponseDto[]> {
    const res = await this.post<OkxResponse<ClosePositionsResponseDto[]>>(
      "/api/v5/trade/close-position",
      input
    );
    return res.data;
  }

  async placeAlgoOrder(
    input: AlgoOrderInpoutDto,
    input2:
      | AlgoStopTpInputDto
      | AlgoTrailStopInputDto
      | AlgoTrigetInputDto
      | AlgoIcebergInputDto
      | AlgoTWAPInputDto
  ): Promise<AlgoOrderResponseDto> {
    const data = { ...input, ...input2 };
    const res = await this.post<OkxResponse<AlgoOrderResponseDto[]>>(
      "/api/v5/trade/order-algo",
      data
    );
    return res.data[0];
  }

  async cancelAlgoOrders(
    input: CancelAlgoOrderInputDto[]
  ): Promise<AlgoOrderResponseDto> {
    const res = await this.post<OkxResponse<AlgoOrderResponseDto[]>>(
      "/api/v5/trade/cancel-algos",
      input
    );
    return res.data[0];
  }

  async getCurrencies(ccy: string = ""): Promise<CurrencyDto[]> {
    const res = await this.get<OkxResponse<CurrencyDto[]>>(
      "/api/v5/asset/currencies",
      { ccy }
    );

    return res.data;
  }

  async getInstruments(
    instType: "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION",
    uly: string = "",
    instId: string = ""
  ): Promise<InstrumentDto[]> {
    const res = await this.get<OkxResponse<InstrumentDto[]>>(
      "/api/v5/public/instruments",
      {
        instType,
        uly,
        instId,
      }
    );

    return res.data;
  }
}

export default HttpApi;
