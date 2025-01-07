const EARTH_RADIUS = 6371008.8

const EARTH_CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS

const TILE_SIZE = 512

const WORLD_SIZE = TILE_SIZE * 2000

export { EARTH_RADIUS, EARTH_CIRCUMFERENCE, TILE_SIZE, WORLD_SIZE }
export * as SceneMode from './SceneMode'
export * as VectorType from './VectorType'
