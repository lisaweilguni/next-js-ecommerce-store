const products = [
  { name: 'Mercier', price: 2499 },
  { name: 'Colnago', price: 2499 },
  { name: 'Chesini', price: 2299 },
  { name: 'Rosa', price: 2999 },
  { name: 'Bianchi', price: 2399 },
  { name: 'Olympia', price: 1999 },
];

exports.up = async (sql) => {
  await sql`
		INSERT INTO products ${sql(products, 'name', 'price')}
	`;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
			DELETE FROM
				products
			WHERE
				name = ${product.name} AND
				price = ${product.price}
	`;
  }
};
