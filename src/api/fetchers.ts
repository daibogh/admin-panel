import axios from 'axios'
import _ from 'lodash'

export const fetchBuildingConfig = (polygonId: number) =>
  axios.get(`${process.env.REACT_APP_API_URL}/api/site/${polygonId}`)
Promise.resolve({
  data: {
    latLongs: {
      b071: { area: 'b071', lat: 56.248656, long: 43.833024 },
      b028: { area: 'b028', lat: 56.248746, long: 43.834316 },
      b021: { area: 'b021', lat: 56.248852, long: 43.833092 }
    },
    areas: [
      ['a000', 'a001', 'a002', 'a003', 'a004', 'a005', 'a006', 'a007', 'a008', 'a009'],
      ['a010', 'a011', 'a012', 'a013', 'a014', 'a015', 'a016', 'a017', 'a018', 'a019'],
      ['a020', 'b021', 'b022', 'b023', 'b024', 'b025', 'b026', 'b027', 'b028', 'a029'],
      ['a030', 'b031', 'b032', 'b033', 'b034', 'b035', 'b036', 'b037', 'b038', 'a039'],
      ['a040', 'b041', 'b042', 'b043', 'b044', 'b045', 'b046', 'b047', 'b048', 'a049'],
      ['a050', 'b051', 'b052', 'b053', 'b054', 'b055', 'b056', 'b057', 'b058', 'a059'],
      ['a060', 'b061', 'b062', 'b063', 'b064', 'b065', 'b066', 'b067', 'b068', 'a069'],
      ['a070', 'b071', 'b072', 'b073', 'b074', 'b075', 'b076', 'b077', 'b078', 'a079'],
      ['a080', 'a081', 'a082', 'a083', 'a084', 'a085', 'a086', 'a087', 'a088', 'a089'],
      ['a090', 'a091', 'a092', 'a093', 'a094', 'a095', 'a096', 'a097', 'a098', 'a099']
    ],
    rooms: {
      room1: {
        zones: [
          'b021',
          'b022',
          'b023',
          'b024',
          'b025',
          'b026',
          'b027',
          'b028',
          'b038',
          'b037',
          'b036',
          'b046',
          'b047',
          'b048'
        ],
        color: '#7335c0',
        name: 'room1',
        withDevices: true
      },
      room2: {
        zones: ['b031', 'b032', 'b033', 'b034', 'b035', 'b045', 'b044', 'b043', 'b042', 'b041', 'b051', 'b061'],
        color: '#e22c2c',
        name: 'room2',
        withDevices: true
      },
      room3: {
        zones: ['b052', 'b053', 'b054', 'b055', 'b056', 'b057', 'b058', 'b068', 'b067', 'b066', 'b065', 'b064'],
        color: '#1cd70f',
        name: 'room3',
        withDevices: true
      },
      room4: {
        zones: ['b062', 'b063', 'b071', 'b072', 'b073', 'b074', 'b075', 'b076', 'b077', 'b078'],
        color: '#62c0ef',
        name: 'room4',
        withDevices: true
      }
    },
    areaEdges: { top: 'b021', bottom: 'b071', left: 'b021', right: 'b028' },
    layout: 'h',
    polygonName: 'polygon1',
    areasGridStyle:
      "'a000 a001 a002 a003 a004 a005 a006 a007 a008 a009' 'a010 a011 a012 a013 a014 a015 a016 a017 a018 a019' 'a020 b021 b022 b023 b024 b025 b026 b027 b028 a029' 'a030 b031 b032 b033 b034 b035 b036 b037 b038 a039' 'a040 b041 b042 b043 b044 b045 b046 b047 b048 a049' 'a050 b051 b052 b053 b054 b055 b056 b057 b058 a059' 'a060 b061 b062 b063 b064 b065 b066 b067 b068 a069' 'a070 b071 b072 b073 b074 b075 b076 b077 b078 a079' 'a080 a081 a082 a083 a084 a085 a086 a087 a088 a089' 'a090 a091 a092 a093 a094 a095 a096 a097 a098 a099'"
  }
})

// axios
//     .get<Buildingstore['config']>(
//         `${process.env.REACT_APP_API_URL}/api/buildings`,
//         { data: {name: polygonName } }
//     )
export const fetchBuildingsList = () =>
  // Promise.resolve({data: [
  //     'polygon1',
  //     // 'polygon2',
  //     // 'polygon3',
  //     // 'polygon4',
  //     // 'polygon5',
  //     // 'polygon6'
  // ]})
  axios.get<{ id: number; title: string }[]>(`${process.env.REACT_APP_API_URL}/api/site/short`)

export const fetchPeople = (polygonName: string) => {
  const lat1 = 56.248656,
    long1 = 43.833024,
    lat2 = 56.248746,
    long2 = 43.834316
  const people = [
    {
      lat: _.random(lat1, lat2),
      long: _.random(long1, long2),
      name: 'Баранов Петр'
    },
    {
      lat: _.random(lat1, lat2),
      long: _.random(long1, long2),
      name: 'Бесчастнов Игорь'
    },
    {
      lat: _.random(lat1, lat2),
      long: _.random(long1, long2),
      name: 'Когтева Анастасия'
    },
    {
      lat: _.random(lat1, lat2),
      long: _.random(long1, long2),
      name: 'Глебова Анна'
    },
    {
      lat: _.random(lat1, lat2),
      long: _.random(long1, long2),
      name: 'Ковалев Василий'
    }
  ]
  return Promise.resolve(people)
}
