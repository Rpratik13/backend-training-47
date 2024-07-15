import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "User Seed",
          email: "user@user.com",
          password: "test1234",
        },
      ]);
    });
}
