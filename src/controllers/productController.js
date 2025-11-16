// simple in-memory store
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'Water Bottle', price: 300 }
];

const getProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (product) return res.json(product);
  res.status(404).json({ message: 'Product not found' });
};

const createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ message: 'Name and price required' });

  const newId = products.length ? products[products.length - 1].id + 1 : 1;
  const newProduct = { id: newId, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  products[index] = { id, ...req.body };
  res.json(products[index]);
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  products = products.filter(p => p.id !== id);
  res.json({ message: 'Deleted successfully' });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };