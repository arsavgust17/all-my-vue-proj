interface iNotification {
    messageTitle: string,
    messageText: string,
    messageType: string,
    display: boolean,
    buttons: [iNotificationButton]
}

interface iNotificationButton {
    title: string,
    click: Function,
    type?: "link" | "button"
}


declare module "vue/types/vue" {
    interface Store {
        commit(type: 'NOTIFICATION_MESSAGE_TITLE', payload: string): void;
        commit(type: 'NOTIFICATION_MESSAGE_TEXT', payload: string): void;
        commit(type: 'NOTIFICATION_MESSAGE_TYPE', payload: string): void;
        commit(type: 'NOTIFICATION_CLOSE') :void;
        commit(type: 'NOTIFICATION_SHOW') :void;
        commit(type: 'NOTIFICATIONS_BUTTONS', payload: [iNotificationButton]): void,

        getters: {
            $notifications: iNotification
        }
    }
}
