# okx-typescript-api
This is created to hanlde [OKX](https://www.okx.com) **API**.
## Installation
depending on the package manager  
**NPM**
```bash
npm i --save okx-typescript-api
```
**YARN**
```bash
yarn add okx-typescript-api
```

## For Example 
```typescript

import { HttpApi } from "okx-typescript-api";
import { OrderInpoutDto } from "okx-typescript-api/dist/src/dto/order.dto";

const bootstrap = async () => {
    const okxHttp = new HttpApi(
        'okx-key',
        'okx-secret',
        'passphrase'
    );
    const orderInp :OrderInpoutDto  = {
        instId:"DOT-USDT",
        side:"buy",
        ccy:"USDT",
        sz:"5",
        tdMode:"cash",
        ordType:"limit",
        px:"0.67"
    }
    const tmp = await okxHttp.placeOrder(orderInp);
    console.log(tmp);
};

bootstrap();
```
