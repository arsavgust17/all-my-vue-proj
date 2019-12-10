import X2JS from 'x2js';

const x2js = new X2JS();

const DEFAULT_CACHE_LIFETIME = 1000 * 60 * 5;

export default {
    pageCache: {},
    get(cardId, options = {}) {
        const createParams = object => Object.entries(object).map(pair => {
            if (Array.isArray(pair[1]))
                pair[1] = pair[1].join('$');

            return `${pair[0]}=${pair[1]}`;
        }).join('&');

        const requestParams = {
            cardId,
            ...(options || {}).params,
        };

        const requestParamsAsString = createParams(requestParams);

        if (!options.noPageCache && this.pageCache[requestParamsAsString]) {
            console.log(`Using implicit PageCache (${requestParams.cardId})...`);
            return new Promise(resolve => resolve(this.pageCache[requestParamsAsString]));
        }

        return fetch(`/ugd/getCardHtml.action?${requestParamsAsString}`, { ...options })
            .then(response => response.text())
            .then(data => x2js.xml2js(data))
            .then(castedData => {
                if (castedData === null)
                    return Promise.reject(new Error('Can\'t parse'));

                this.pageCache[requestParamsAsString] = castedData;
                setTimeout(() => {
                    delete this.pageCache[requestParamsAsString];
                }, options.cacheLifetime || DEFAULT_CACHE_LIFETIME);

                return castedData;
            });
    },
};
