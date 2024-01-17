export const shelfs: number = 20 as const
export const racks_in_shelf: number = 5 as const
export const cells_in_rack = 5 as const

export const racks = shelfs * racks_in_shelf
export const cells = racks * cells_in_rack