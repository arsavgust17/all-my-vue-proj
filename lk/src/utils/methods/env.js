const dev =  {
    env: 'dev',
    base: 'https://dev-api.webbankir.com'
};

const prod =  {
    env: 'prod',
    base: 'https://ng-api.webbankir.com'
};

const test = {
    env: 'test',
    base: 'https://test-api.webbankir.com'
};

// const new_prod = {
//     env: 'new_prod',
//     base: 'https://ng-api.webbankir.com'
// };

export default function () {

    if(localStorage.getItem('useProdApi')) {
        return prod;
    }
    
    const test_host = [
        /\.test\.wb$/,
        /test\.webbankir\.com/,
    ];
    const isTest = test_host.find(host => {
        return host.test(document.location.hostname);
    });
    if(isTest) {
        return test;
    }
    
    const dev_host = [
        /^dev\-/,
        /^172\.16\./,
        /^127\.0\.0\.1/,
       /^localhost$/,
        /^dev\./,
    ];

    return dev_host.find((host) => {
        return host.test(document.location.hostname);
    }) ? dev : prod;
};
