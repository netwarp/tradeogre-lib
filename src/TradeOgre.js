class TradeOgre {

    /**
     *
     * @param {string} key
     * @param {string} secret
     */
    constructor(key, secret) {
        this.baseUrl = 'https://tradeogre.com/api/v1';

        this.key = key;
        this.secret = secret;
    }

    /**
     *
     * @param {string} url
     * @param {boolean} auth
     * @returns {Promise<any>}
     */
    async get(url, auth) {
        let completeUrl = `${this.baseUrl}${url}`;

        const init = {
            method: 'get'
        };

        if (auth) {
            const credentials = btoa(`${this.key}:${this.secret}`);

            init.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            };
        }

        const response = await fetch(completeUrl, init);
        const data = await response.json();

        return data;
    }

    async post(url, options) {
        let completeUrl = `${this.baseUrl}${url}`;

        const formData = new FormData;

        for (const [key, value] of Object.entries(options)) {
            formData.append(key, value);
        }

        const credentials = btoa(`${this.key}:${this.secret}`);

        const response = await fetch(completeUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: formData
        });

        const data = await response.json();
        return data;
    }


    async markets() {
        return await this.get('/markets');
    }

    /**
     *
     * @param {string} market
     * @returns {Promise<*>}
     */
    async orders(market) {
        return await this.get(`/orders/${market}`);
    }

    /**
     *
     * @param {string} market
     * @returns {Promise<*>}
     */
    async ticker(market) {
        return await this.get(`/ticker/${market}`);
    }

    /**
     *
     * @param {string} market
     * @returns {Promise<*>}
     */
    async history(market) {
        return await this.get(`/history/${market}`);
    }

    /**
     *
     * @param {string} market
     * @param {number} quantity
     * @param {number} price
     * @returns {Promise<void>}
     */
    async buy(market, quantity, price) {
        return await this.post('/order/buy', {
            market,
            quantity,
            price
        });
    }

    /**
     *
     * @param {string} market
     * @param {number} quantity
     * @param {number} price
     * @returns {Promise<void>}
     */
    async sell(market, quantity, price) {
        return await this.post('/order/sell', {
            market,
            quantity,
            price
        });
    }

    /**
     *
     * @param {string} [uuid]
     * @returns {Promise<any>}
     */
    async cancel(uuid) {
        return await this.post('/order/cancel', {
            uuid: uuid ?? 'all'
        });
    }

    /**
     *
     * @param {string} [market]
     * @returns {Promise<void>}
     */
    async orders(market) {
        return await this.post('/account/orders', {
            market
        });
    }

    /**
     *
     * @param {string} uuid
     * @returns {Promise<void>}
     */
    async order(uuid) {
        return await this.get(`/account/order/${uuid}`, true)
    }

    /**
     *
     * @param {string} currency
     * @returns {Promise<any>}
     */
    async balance(currency) {
        return await this.post('/account/balance', {currency});
    }

    async balances() {
        return await this.get('/account/balances', true);
    }
}

export default TradeOgre