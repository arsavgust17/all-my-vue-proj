import proxy from './proxy';
import api from '../backend';
import env from './env';
import store from '@/store';
const routers = {
    user: {
        login: function (creds) {
            return api.postData('/user/login', creds);
        },
        get:  function () {
            return api.getData('/user/get');
        },
        /*
        getLastAuth: function (userId) {
            return api.getData(`user/${userId}/v1/security/info/login_attempts/?limit=1&successful=1`)
        },
        */
        create: function (data) {
            return api.postData('/user/v2/create', data);
        },
        edit: function (data) {
            return api.patchData('/user/v2/edit', data);
        },
        validate: function () {
            return api.getData('/user/v2/validate');
        },
        social: function () {
            return api.getData('/social-network/user');
        },
        socialUnlink (data) {
            return api.postData('/social-network/user_unlink', data);
        },
        verify: function (data) {
            return api.postData('/user/verify', data)
        },
        passportIssuedBy: function (code) {
            return api.getData(`/passport-issuer/v2/check/${code}`)
        },
        password: {
            change (data) {
                return api.postData('/user/password/change/inside', data)
            },
            changeOutside(data) {
                return api.postData('/user/password/change/outside', data)
            },
            recovery (password, emailHash) {
                return api.postData('/user/password/change/outside', {
                    password, emailHash
                })
            },
            restore(data) {
                return api.postData('/user/password/restore', data);
            }
        },
        esia: {
            get(key) {
                return api.postData('/user/esia/get', { key });
            },
            authUrl: env().base + '/user/esia/auth'

        },
        email: {
            edit(email) {
                return api.patchData('/user/edit/email', {email})
            },
            confirm(emailHash) {
                return api.postData('/user/edit/email/confirm', {emailHash})
            },
            spam(emailHash) {
                return api.postData('/user/email/spam/', {emailHash});
            }
        },
        phone: {
            edit(data) {
                return api.patchData('/user/edit/phone', data);
            }
        },
        additional: {
            fill(data) {
                return api.patchData('/user/v2/create/fill_additional', data);
            }
        }
    },

    autologin: {
        get (hash) {
            return api.postData('/autologin/get', { hash });
        }
    },

    loan: {
        pdl () {
            return api.getData('/loan/get/current/pdl');
        },

        pos () {
            return api.getData('/loan/get/current/pos');
        },

        create (data) {
            return api.postData('/loan/v2/create', data);
        },

        all () {
            return api.getData('/loan/get');
        },
        sign: {
            resend () {
               return api.getData('/loan/sign/resend');
            },
            resendUrl: '/loan/sign/resend',
            sign (code) {
                return api.postData('/loan/sign', {code});
            }
        },
        disclaimLink () {
            return api.getData('/loan/disclaim_link')
        },
        upload: env().base + '/loan/requests/'
    },

    calc: {
        get () {
            return api.getData('/loan-calculator/v2');
        }
    },

    installment: {
        get () {
            return api.getData('/installment-loan/loan/get');
        },

        create (data) {
            return api.postData('/installment-loan/loan/create', data);
        },
        schedule (data) {
            return api.postData('/schedule-payments/getPaymentSchedule', data);
        },
        sign: {
            sign(code) {
                return api.postData('/installment-loan/loan/sign', {code});
            },
            
            resendUrl: '/installment-loan/loan/sign/resend'
        },
        prolongation: {
            create(Days) {
                return api.postData('/installment-loan/prolongation/create', {Days});
            },

            sign (Code) {
                return api.postData('/installment-loan/prolongation/sign', {Code})
            }
        }
    },
    
    accounts: {
        get () {
            return api.getData('/accounts');
        },
        delete (account) {
            return api.deleteData(`/accounts/${account}`)
        },
        update (account) {
            return api.patchData('/accounts', account);
        },
        create (account) {
            return api.putData('/accounts', account);
        },
        checkCard(card) {
            return api.postData('/accounts/checkCard', card);
        }
    },


    supplementary: {
        prolongation: {
            calc () {
                return api.getData('/supplementary/prolongation/calc');
            },
            create (data) {
                return api.putData('/supplementary/prolongation/create', data);
            },
            sign (data) {
                return api.postData('/supplementary/prolongation/sign', data);
            },
            resend () {
                return api.getData('/supplementary/prolongation/sign/resend');
            },
            resendUrl: '/supplementary/prolongation/sign/resend',
            waitingForPayment () {
                return api.getData('/supplementary/prolongation/get/waiting_for_payment');
            }
        },

        installment: {
            sign (smsCode) {
                return api.postData('/supplementary/installment/sign', {smsCode});
            },

            resend () {
                return api.getData('/supplementary/installment/sign/resend');
            },
            resendUrl: '/installment-loan/prolongation/sign/resend'
        },

        amnesty: {
            create() {
                return api.postData('/supplementary/amnesty/create', {});
            },
            sign (smsCode) {
                return api.postData('/supplementary/amnesty/sign', {smsCode})
            },
            resend () {
                return api.getData('/supplementary/amnesty/sign/resend')
            }
        }
    },

    services: {
        all () {
            return api.getData('/credit-rating/services');
        },

        cr: {
            create(data) {
                return api.postData('/credit-rating/creditrating/create', data);
            },
            
            guid(guid) {
                return api.getData('/credit-rating/creditrating/latest?guid=' + guid)
            },
            
            history () {
                return api.getData('/credit-rating/creditrating/history')
            },
            path: env().base + '/credit-rating/creditrating/'
        },
        
        history () {
            return api.getData('/credit-rating/history');
        },
    },

    cashback: {
        balance() {
            return api.getData('/payment/cashback/balance');
        },

        async postBonus (data) {
            await api.postData('/payment/cashback', data);
        }
    },

    payment: {
        getPaymentSystem (url, data) {
            return api.postData(url, data);
        },

        all () {
            return api.getData('/payment/get');
        },
        order () {
            return api.getData('/loan/get/payment_data');
        },

        pay: {
            card (data) {
                 return api.postData('/payment/card', data);
            },
            yandex(data) {
                return api.postData('/payment/v2/create/yandex', data);
            },
            sberbank(data) {
                return api.postData('/payment/v2/create/sberbank', data);
            },
            sms_invoice(data) {
                return api.postData('/payment/v2/payments', data);
            },
            token (data) {
                 return api.postData('/payment/token', data);
            },
            cashback (data) {
                 return api.postData('/payment/cashback', data);
            },
            sms (data) {
                return api.postData('/payment/v2/payments', data);
            }
        },

        create: {
            token(card) {
                return api.postData('/payment/create/token', card);
            },
            check(data) {
                return api.postData('/payment/check/token', data);
            }
        },
    },

    documents: {
        byLoan(id) {
            return api.getData(`/documents/list/${id}`)
        },
        byUrl(url) {
            return api.getData(`/documents/${url}`)
        },
        statement(id, type = null) {
            if(type) {
                return api.getData(`/documents/statement/${id}/${type}`);
            } else {
                return api.getData(`/documents/statement/${id}`);
            }
        },
        createStatement(id, type) {
            return api.putData(`/documents/statement/${id}/${type}`)
        },
        supplementary: {
            last(loanId) {
                return api.getData(`/documents/supplementary/html/${loanId}/last`);
            }
        },
        rupost () {
            return api.getData('/documents/ruspost', false, true);
        }
    },

    suggestions: {
        address (query) {
            return api.postData('/address', query, 'https://api.webbankir.com/v3/suggest/')
        }
    },

    complaints: {
        create(data) {
            return api.postData('/complaints/create', data);
        },
        
        get () {
            return api.getData('/complaints/get')
        }
    },
    
    transactions: {
        history: {
            pos() {
                return api.getData(`/transaction-history/get/pos`);
            }
        }
    },
    
    pos: {
        user: {
            get () {
                return api.getData(`/api/client/v2/user/${store.getters.$user.id}`, 'https://demo.webbankir.partners');
            }
        }
    },
    
    debug: {
        jslog(data) {
            return api.putData('/live-logging/lk', data, 'https://dev-api.webbankir.com');
        }
    }

}

export default new function () {
    return proxy(routers);
}
