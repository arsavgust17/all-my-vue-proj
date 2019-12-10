import Vue from 'vue'

declare module 'vue/types/vue' {
    interface VueConstructor {
        /**
         * @type iBackend
         */
        $backend
    }
}


interface iBackend {
    api: {
        user: {
            login(data: Object): Promise<any>,
            get(): Promise<any>,
            create(data: Object): Promise<any>,
            validate(): Promise<any>,
            social(): Promise<any>,
            socialUnlink(data: Object): Promise<any>,
            edit(data: Object): Promise<any>,
            passportIssuedBy(payload: string): Promise<any>,
            appealResponses(pageNumber: number, pageSize: number, isRead: number): Promise<any>,
            sendEmail(id: string): Promise<any>,
            downloadFile(id: string): Promise<any>,
            setAppealRead(id: string): Promise<any>,
            password: {
                change(payload: {password: string, oldPassword: string}): Promise<any>,
                recovery(payload: {password: string, emailHash: string}): Promise<any>,
                changeOutside(payload: {password: string, emailHash: string}): Promise<any>,
                restore(payload: object): Promise<any>,
            },
            esia: {
                get(key: string): Promise<any>,
                authUrl: string,
            },
            email: {
                edit(email: string): Promise<any>,
                confirm(emailHash: string): Promise<any>,
                spam(emailHash: string): Promise<any>,
            },
            phone: {
                edit(payload: object): Promise<any>,
            }
            additional: {
                fill(payload: object): Promise<any>,
            }
        },
        autologin: {
            get (hash: string): Promise<any>,
        },

        loan: {
            pdl(): Promise<any>,
            pos(): Promise<any>,
            create(loanObj: object): Promise<any>,
            all(): Promise<any>,
            sign: {
                resend(): Promise<any>,
                resendUrl: string,
                sign(code: string): Promise<any>,
            },
            disclaimLink(): Promise<any>
        },

        calc: {
            get(): Promise<any>,
        },

        installment: {
            get(): Promise<any>,
            create(data: Object): Promise<any>,
            schedule(payload: {amount: number, days: number, date: string}): Promise<any>,
            sign: {
                sign(code: string): Promise<any>,
                resendUrl: string,
            },
            prolongation: {
                create(Days: number): Promise<any>,
                sign(Code: string): Promise<any>,
            }
        },

        services: {
            all(): Promise<any>,
            cr: {
                create(payload: object): Promise<any>,
                guid(payload: string): Promise<any>,
                history(): Promise<any>,
                path: string,
            },
            history(): Promise<any>
        },

        supplementary: {
            prolongation: {
                calc(): Promise<any>,
                create(payload: {daysDuration: number}): Promise<any>,
                sign(payload: {smsCode: string}): Promise<any>,
                resendUrl: string
            },
            installment: {
                sign(smsCode: number): Promise<any>,
                resend(): Promise<any>,
                resendUrl: string,
            },
            amnesty: {
                create(): Promise<any>,
            }
        },

        cashback: {
            balance(): Promise<any>
        },

        payment: {
            getPaymentSystem(url: string, data: Object): Promise<any>,
            all(): Promise<any>,
            order(): Promise<any>,
            pay: {
                card(payload: object): Promise<any>,
                yandex(payload: object): Promise<any>,
                sberbank(payload: object): Promise<any>,
                sms_invoice(payload: object): Promise<any>,
                token(payload: object): Promise<any>,
                cashback(payload: object): Promise<any>,
                sms_invoice(payload: object): Promise<any>,
            },
            create: {
                token(payload: object): Promise<any>,
                check(payload: object): Promise<any>,
            },


        },

        accounts: {
            get(): Promise<any>,
            delete(id: number): Promise<any>,
            update(account: Object): Promise<any>,
            create(account: Object): Promise<any>,
        },

        documents: {
            byLoan(id: number): Promise<any>,
            byUrl(path: string): Promise<any>,
            statement(id: number, type?: number): Promise<any>,
            createStatement(id: number, type: number): Promise<any>,
            supplementary: {
                last(loanId: number): Promise<any>,
            }
        },

        suggestions: {
            address(query: string): Promise<any>,
        },

        complaints: {
            create(payload: object): Promise<any>,
        },

        transactions: {
            history: {
                pos():Promise<any>
            }
        },

        pos: {
            user: {
                get():Promise<any>
            }
        },

        debug: {
            jslog(payload: Object): Promise<any>,
        }
    }
}
