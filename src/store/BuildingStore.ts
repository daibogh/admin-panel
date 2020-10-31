import { makeObservable, observable } from 'mobx';
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
            config: observable
        })
    }
}