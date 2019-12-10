export function Field(title, values) {
    return { title, values }
}

export function HtmlValue(html) {
    return {
        type: 'html',
        data: { html }
    }
}

export function IconValue(iconClasses) {
    return {
        type: 'icon',
        data: { iconClasses: Vue.$xml.asArray(iconClasses) },
    }
}

export function FileValue(fileHref, fileName, fileSize) {
    return {
        type: 'file',
        data: { fileHref, fileName, fileSize },
    }
}
