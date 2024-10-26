import { Knex as knexConfig } from "knex"

import config from "../../knexfile"

export const knex = knexConfig(config)