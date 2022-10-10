exports.up = async (sql) => {
  await sql`
		CREATE TABLE products(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(30) NOT NULL,
		price integer NOT NULL,
		info varchar(500) NOT NULL
		)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE products
	`;
};
