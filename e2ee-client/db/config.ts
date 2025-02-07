import { defineDb, defineTable, column } from "astro:db"

const customer_cart = defineTable({
  columns: {
    customerId: column.text({ primaryKey: true }),
    customerEmail: column.text(),
    cartItems: column.json(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { customer_cart }
});
