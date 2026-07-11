import { Market } from '../types';

export const mockedMarkets: Market[] = [
  {
    id: 'market-01',
    name: 'Mercado Surquillo',
    address: 'Av. Paseo de la República 2568',
    distance: '2.1 km',
    coords: {
      latitude: -12.1114,
      longitude: -77.0191,
    },
  },
  {
    id: 'market-02',
    name: 'Mercado Miraflores',
    address: 'Av. José Larco 1234',
    distance: '4.0 km',
    coords: {
      latitude: -12.1216,
      longitude: -77.0282,
    },
  },
  {
    id: 'market-03',
    name: 'Mercado Callao',
    address: 'Jr. Castilla 700',
    distance: '5.8 km',
    coords: {
      latitude: -12.0566,
      longitude: -77.1276,
    },
  },
];
