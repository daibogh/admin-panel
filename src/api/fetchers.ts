import axios from 'axios'
import { Buildingstore } from '../store/BuildingStore'

export const fetchBuildingConfig = (polygonName: string) => Promise.resolve({data: {"latLongs":{"b053":{"area":"b053","lat":1,"long":1},"b033":{"area":"b033","lat":3,"long":1},"b036":{"area":"b036","lat":3,"long":4}},"areas":[["a000","a001","a002","a003","a004","a005","a006","a007","a008","a009"],["a010","a011","a012","a013","a014","a015","a016","a017","a018","a019"],["a020","a021","a022","a023","a024","a025","a026","a027","a028","a029"],["a030","a031","a032","b033","b034","b035","b036","a037","a038","a039"],["a040","a041","a042","b043","b044","b045","b046","a047","a048","a049"],["a050","a051","a052","b053","b054","b055","b056","a057","a058","a059"],["a060","a061","a062","a063","a064","a065","a066","a067","a068","a069"],["a070","a071","a072","a073","a074","a075","a076","a077","a078","a079"],["a080","a081","a082","a083","a084","a085","a086","a087","a088","a089"],["a090","a091","a092","a093","a094","a095","a096","a097","a098","a099"]],"rooms":{"r":{"zones":["b033","b034","b035","b036","b046","b045","b044","b043","b053","b054","b055","b056"],"color":"#af2bca","name":"r","withDevices":false}},"areaEdges":{"top":"b033","bottom":"b053","left":"b033","right":"b036"},"layout":"h","polygonName":"polygon1","areasGridStyle":"'a000 a001 a002 a003 a004 a005 a006 a007 a008 a009' 'a010 a011 a012 a013 a014 a015 a016 a017 a018 a019' 'a020 a021 a022 a023 a024 a025 a026 a027 a028 a029' 'a030 a031 a032 b033 b034 b035 b036 a037 a038 a039' 'a040 a041 a042 b043 b044 b045 b046 a047 a048 a049' 'a050 a051 a052 b053 b054 b055 b056 a057 a058 a059' 'a060 a061 a062 a063 a064 a065 a066 a067 a068 a069' 'a070 a071 a072 a073 a074 a075 a076 a077 a078 a079' 'a080 a081 a082 a083 a084 a085 a086 a087 a088 a089' 'a090 a091 a092 a093 a094 a095 a096 a097 a098 a099'"}})

// axios
//     .get<Buildingstore['config']>(
//         `${process.env.REACT_APP_API_URL}/api/buildings`,
//         { data: {name: polygonName } }
//     )
export const fetchBuildingsList = () => 
Promise.resolve({data: [
    'polygon1',
    // 'polygon2',
    // 'polygon3',
    // 'polygon4',
    // 'polygon5',
    // 'polygon6'
]})
// axios.get<string[]>(`${process.env.REACT_APP_API_URL}/api/buildings`)