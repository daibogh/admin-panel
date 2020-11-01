import { action } from 'mobx';
import { makeObservable, observable } from 'mobx';
import { fetchPeople } from '../api/fetchers';
import { LatLongs, Areas, Rooms, Layout, PolygonName, AreaEdges, AreasGridStyle } from './ConstructorStore';


export class Buildingstore {
    config: {
        latLongs : LatLongs
        areas : Areas
        rooms: Rooms
        areaEdges: AreaEdges
        layout: Layout
        polygonName: PolygonName
        areasGridStyle: AreasGridStyle
    } | null = null
    init = (config: this['config']) => this.config = config
    constructor() {
        makeObservable(this, {
            config: observable,
            people: observable,
            receivePeople: action,
            dispose: action,
            _interval: observable,
            person: observable,
            selectPerson: action
        })
    }

    people: {lat: number, long: number, name: string}[] = []

    setPeople = (people: this['people']) => {
        this.people = people
    }
    _interval: any = null 
    receivePeople = () => {
        if (!this._interval) {
            fetchPeople(this.config!.polygonName).then(this.setPeople)
            this._interval = setInterval(() => fetchPeople(this.config!.polygonName).then(this.setPeople), 5000)
        }
    }
    dispose() {
        clearInterval(this?._interval)
    }
    person: string | null = null
    selectPerson = (person: this['person']) => {
        this.person = person
    }
}