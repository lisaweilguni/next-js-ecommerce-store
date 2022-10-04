import { sql } from './connect';

// Now we are getting this data from the database
// export const productsDatabase = [
//   { id: 1, name: 'Mercier', price: 2499 },
//   { id: 2, name: 'Colnago', price: 2499 },
//   { id: 3, name: 'Chesini', price: 2299 },
//   { id: 4, name: 'Rosa', price: 2999 },
//   { id: 5, name: 'Bianchi', price: 2399 },
//   { id: 6, name: 'Olympia', price: 1999 },
// ];

export type Product = {
  id: number;
  name: string;
  price: number;
};

// Get all products
export async function getProducts() {
  const products = await sql<Product[]>`
    SELECT * FROM products;
`;
  return products;
}

// Get a single product by id
export async function getProductById(id: number) {
  const [product] = await sql<Product[]>`
    SELECT * FROM products WHERE id = ${id}
  `;

  return product;
}

export async function deleteProductById(id: number) {
  const [product] = await sql<Product[]>`
    DELETE FROM
      products
    WHERE
      id = ${id}
    RETURNING *
  `;
  return product;
}

export async function updateProductById(id: number) {
  const [product] = await sql<Product[]>`
    DELETE FROM
      products
    WHERE
      id = ${id}
    RETURNING *
  `;
  return product;
}
