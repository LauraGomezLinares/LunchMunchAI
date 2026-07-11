import { Market } from '../types';
import { mockedMarkets } from '../mocks/markets';

const WAIT_TIME = 700;

export async function getNearbyMarkets(): Promise<Market[]> {
  // TODO: conectar a FastAPI endpoint /markets/nearby
  return new Promise((resolve) => setTimeout(() => resolve(mockedMarkets), WAIT_TIME));
}
