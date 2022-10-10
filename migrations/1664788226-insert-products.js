const products = [
  {
    name: 'Mercier',
    price: 2499.0,
    info: 'Classic Road Bike 1980s. Super Vitus 980 tubing. Shimano 600 "Arabesque".',
  },
  {
    name: 'Colnago',
    price: 2499.0,
    info: 'Veneto Ladies Bicycle 1980s. Ladies anglais frame. Columbus tubes. Campagnolo parts.',
  },
  {
    name: 'Chesini',
    price: 2299.0,
    info: 'Precision Fine Road Bicycle 1980s. Refurbished. Beautiful pantographes. Campagnolo Nuovo Record.',
  },
  {
    name: 'Rosa',
    price: 2999.0,
    info: 'Professional SLX Classic Fine Road Bicycle 1980s. Campagnolo Super Record. Columbis SLX. XNice condition.',
  },
  {
    name: 'Bianchi',
    price: 2399.0,
    info: 'Fulmine Classic Road Bicycle 1954. Campagnolo Gran Sport shifting. Integrated headset. Clincher rims.',
  },
  {
    name: 'Olympia',
    price: 1999,
    info: 'Classy Road Bicycle 1975. Refined frame. Pantographes. Campagnolo Nuovo Record.',
  },
];

exports.up = async (sql) => {
  await sql`
		INSERT INTO products ${sql(products, 'name', 'price', 'info')}
	`;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
			DELETE FROM
				products
			WHERE
				name = ${product.name} AND
				price = ${product.price} AND
        info = ${product.info}
	`;
  }
};
