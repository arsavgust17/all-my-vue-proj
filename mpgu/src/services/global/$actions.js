export default {
    openForm(link) {
        this.openWin(link, '', 900, 600);
    },

    openWin: (url, title, width, height) => {
        const left = ((window.screen.availWidth || window.screen.width) / 2) - (width / 2) + (window.screen.availLeft || 0);
        const top = ((window.screen.availHeight || window.screen.height) / 2) - (height / 2) + (window.screen.availTop || 0);

        const link = `width=${width},height=${height},left=${left},top=${top}`;

        window.open(url, title, link);
    },

    executeAction(action, props) {
        const type = action.type || action.TYPE;

        switch (type) {
            case 'openForm':
            case 'FORM':
                this.openForm(action.link || action.LINK);
                break;
            case 'CONFIRM':
                if (window.confirm(action.msg) && action.customAction) {
                    const urlEncoded = new URLSearchParams();
                    urlEncoded.append('TASK_ID', props.id);

                    fetch(`/ugd/submit/simpleSubmit.action?action=${action.customAction}`, {
                        body: urlEncoded,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(() => window.location.reload(true));
                }
                break;
            case 'href':
                window.open(action.link || action.LINK);
                break;
            case 'file':
                window.open(`/elib/getFile.action?cardId=${action.id}`);
                break;
            default:
                console.error(`Не найден экшн для ${JSON.stringify(action)}`);
        }
    },
};

export const HrefAction = (title, link, extraFields) => ({
    title,
    link,
    type: 'href',
    ...extraFields,
});
