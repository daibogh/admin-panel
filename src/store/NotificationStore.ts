import { makeObservable, observable, action } from 'mobx';


export class NotificationStore {
    notification: { type: 'error' | 'info' | 'success', message: string } | null = null
    setNotification = (obj: this['notification']) => this.notification = obj
    constructor() {
        makeObservable(this, {
            notification: observable,
            setNotification: action
        })
    }
}