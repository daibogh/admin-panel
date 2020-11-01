import React from 'react'
import { makeObservable, observable } from 'mobx'
import { useLocalStore } from 'mobx-react'
import { ConstructorStore } from './ConstructorStore'
import { NotificationStore } from './NotificationStore'
import { Buildingstore } from './BuildingStore'

export default class RootStore {
  constructorStore: ConstructorStore
  notifications: NotificationStore
  building: Buildingstore
  constructor() {
    makeObservable(this, { constructorStore: observable, notifications: observable, building: observable })
    this.constructorStore = new ConstructorStore()
    this.notifications = new NotificationStore()
    this.building = new Buildingstore()
  }
}

const storeContext = React.createContext<RootStore | null>(null)
export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => new RootStore())
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
