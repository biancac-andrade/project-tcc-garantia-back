const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  
  try {
  //   const products = await Product.find().populate('type');
  //  res.json(products);
    
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    populate: 'type', // Popula o campo 'type' com os dados do tipo de produto
  };

  // const products = await Product.paginate({}, options);

  // res.json(products);
    
  const result = await Product.paginate({}, options);

  res.json({
    products: result.docs,
    totalItems: result.totalDocs,
    totalPages: result.totalPages,
    currentPage: result.page,
  });
  } catch (error) {
    console.error('Erro ao obter todos os produtos:', error);
    res.status(500).json({ error: 'Erro ao obter todos os produtos' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Erro ao obter o produto por ID:', error);
    res.status(500).json({ error: 'Erro ao obter o produto por ID' });
  }
};

exports.createProduct = async (req, res) => {
  try {
  /*  const { product_name, description, image, quantity, type } = req.body;

    const newProduct = new Product({
      product_name,
      description,
      image,
      quantity,
      type
    });

    await newProduct.save(); */
    // logica para aceitar varios objetos, porém dá erro para formulário enviar nesse formato,
    // então voltar modo antigo para que isso consiga

   /*  const products = req.body; // Obter a matriz de produtos do corpo da requisição

    // Iterar sobre cada produto e salvar no banco de dados
    for (const productData of products) {
      const { product_name, description, image, quantity, type } = productData;

      const newProduct = new Product({
        product_name,
        description,
        image,
        quantity,
        type
      });

      await newProduct.save();
    }
 */
    
 const productData = req.body; // Obter o objeto de produto do corpo da requisição

    const newProduct = new Product(productData);

    await newProduct.save();

    res.status(201).json({ message: 'Produto criado com sucesso' }); 
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { product_name, description, image, quantity, type } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    product.product_name = product_name || product.product_name;
    product.description = description || product.description;
    product.image = image || product.image;
    product.quantity = quantity || product.quantity;
    product.type = type || product.type;

    await product.save();

    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    res.status(500).json({ error: 'Erro ao excluir o produto' });
  }
};
