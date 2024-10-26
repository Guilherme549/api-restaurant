import Knex from "knex"

import config from "../../knexfile"

const knexInstance = Knex(config);

export { knexInstance as knex };
