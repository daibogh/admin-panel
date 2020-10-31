import { action, computed, makeObservable, observable } from "mobx";
import _ from 'lodash'
import axios from 'axios'
import { toast } from 'react-toastify';
export class ConstructorStore {
    buildingType: 'road' | 'bridge' | 'house' = 'house'
    layout: string = 'h'
    rotation: number = 0

    constructor() {
        makeObservable(this, {
            buildingType: observable,
            layout: observable,
            rotation: observable,
            setRotation: action,
            setBuildingType: action,
            setLayout: action,
            layoutAreas: computed,
            areas: observable,
            setAreas: action,
            rooms: observable,
            saveRoom: action,
            latLongs: observable,
            saveLatLong: action,
            edgesSaved: computed,
            polygonName: observable,
            setPolygonName: action,
            isPolygonNameValid: computed,
            sendConfigToServer: action
        })
    }
    setRotation = (r: number) => this.rotation = r
    setBuildingType = (type: this['buildingType']) => this.buildingType = type
    setLayout = (layout: string) => this.layout = layout
    get layoutAreas() { 
        return _.uniq(
                this.layout.replace(/"/g,"")
                .replace(/\n/g," ")
                .split(' ')
                .filter(area => area !== '.' && area !== '')
                )
    }

    areas: string[][] = _.chunk([
        'a000',
        'a001',
        'a002',
        'a003',
        'a004',
        'a005',
        'a006',
        'a007',
        'a008',
        'a009',
        'a010',
        'a011',
        'a012',
        'a013',
        'a014',
        'a015',
        'a016',
        'a017',
        'a018',
        'a019',
        'a020',
        'a021',
        'a022',
        'a023',
        'a024',
        'a025',
        'a026',
        'a027',
        'a028',
        'a029',
        'a030',
        'a031',
        'a032',
        'a033',
        'a034',
        'a035',
        'a036',
        'a037',
        'a038',
        'a039',
        'a040',
        'a041',
        'a042',
        'a043',
        'a044',
        'a045',
        'a046',
        'a047',
        'a048',
        'a049',
        'a050',
        'a051',
        'a052',
        'a053',
        'a054',
        'a055',
        'a056',
        'a057',
        'a058',
        'a059',
        'a060',
        'a061',
        'a062',
        'a063',
        'a064',
        'a065',
        'a066',
        'a067',
        'a068',
        'a069',
        'a070',
        'a071',
        'a072',
        'a073',
        'a074',
        'a075',
        'a076',
        'a077',
        'a078',
        'a079',
        'a080',
        'a081',
        'a082',
        'a083',
        'a084',
        'a085',
        'a086',
        'a087',
        'a088',
        'a089',
        'a090',
        'a091',
        'a092',
        'a093',
        'a094',
        'a095',
        'a096',
        'a097',
        'a098',
        'a099',
    ], 10)

    setAreas = (areas: this['areas']) => this.areas = areas

    get areasGridStyle() {
        return this.areas.map(areaRow => `'${areaRow.join(' ')}'`).join(' ')
    }
    rooms: {[key: string]: {name: string; zones: string[]; color: string, withDevices: boolean}} = {}
    saveRoom = ({name, zones, color, withDevices}: {name: string; zones: string[]; color: string, withDevices: boolean}) => {
        this.rooms[name] = {zones, color, name, withDevices}
    }
    get areaEdges() {
        const zones = _.flatten(this.areas).filter(area => area.startsWith('b'))
        const zoneIndexes: number[][] = []
        const buf: {[key: string]: number[]} = {}
        zones.forEach(zone => this.areas.forEach(
            (row, rowIdx) => {
                const columnIdx = row.indexOf(zone)
                if (~columnIdx) {
                    zoneIndexes.push([rowIdx, columnIdx])
                    buf[zone] = [rowIdx, columnIdx]
                }
            }
        ))
        const bottomEdge = Math.max(...(zoneIndexes.map((p)=> p[0]) as number[]))
        const topEdge = Math.min(...(zoneIndexes.map((p)=> p[0]) as number[]))
        const leftEdge = Math.min(...(zoneIndexes.map((p)=> p[1]) as number[]))
        const rightEdge = Math.max(...(zoneIndexes.map((p)=> p[1]) as number[]))
        // console.log({ zones, zoneIndexes, bottomEdge, topEdge, leftEdge, rightEdge, buf})
        return { 
            top: Object.keys(buf).find(key => buf[key][0] === topEdge),
            bottom: Object.keys(buf).find(key => buf[key][0] === bottomEdge),
            left: Object.keys(buf).find(key => buf[key][1] === leftEdge),
            right: Object.keys(buf).find(key => buf[key][1] === rightEdge),
        }
    }
    latLongs: {[key: string]:{ area: string; lat: number; long: number }} = {}
    saveLatLong = ({ area, lat, long}: { area: string; lat: number; long: number}) => {
        this.latLongs[area] = {area, lat, long}
    }
    get edgesSaved() {

        return _.uniq(Object.values(this.areaEdges)).length === Object.keys(this.latLongs).length
    }
    polygonName: string = ''

    setPolygonName = (name: string) => {
        this.polygonName = name
    }
    get isPolygonNameValid() {
        return this.polygonName.length > 4
    }

    sendConfigToServer = () => {
        const { latLongs, areas, rooms, areaEdges, layout, polygonName, areasGridStyle } = this
        const config = {
            latLongs,
            areas,
            rooms,
            areaEdges,
            layout,
            polygonName,
            areasGridStyle
        }
        console.log(JSON.stringify(config))
        // axios.post(`${process.env.REACT_APP_API_URL}/api/layouts`, JSON.stringify(config))
        return Promise.resolve()
    }

}
export type LatLongs = ConstructorStore['latLongs']
export type Areas = ConstructorStore['areas']
export type Rooms = ConstructorStore['rooms']
export type AreaEdges = ConstructorStore['areaEdges']
export type Layout = ConstructorStore['layout']
export type PolygonName = ConstructorStore['polygonName']
export type AreasGridStyle = ConstructorStore['areasGridStyle']