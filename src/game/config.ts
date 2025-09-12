export const GAME_WIDTH = window.innerWidth
export const GAME_HEIGHT = window.innerHeight

export const PADDING = 1

export const ACTIVE_COLOR = 0x000000
export const INACTIVE_COLOR = 0xffffff

export const PIXEL_SIZE = 10
export const EXPLOSION_RADIUS = 5

export const MATRIX_WIDTH = ~~(GAME_WIDTH / (PIXEL_SIZE + PADDING / 2))
export const MATRIX_HEIGHT = ~~(GAME_HEIGHT / (PIXEL_SIZE + PADDING / 2))