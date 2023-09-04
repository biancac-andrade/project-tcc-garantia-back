const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: "type", 
    };

    const result = await Product.paginate({}, options);

    res.json({
      products: result.docs,
      totalItems: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
    });
  } catch (error) {
    console.error("Erro ao obter todos os produtos:", error);
    res.status(500).json({ error: "Erro ao obter todos os produtos" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("type");
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Erro ao obter o produto por ID:", error);
    res.status(500).json({ error: "Erro ao obter o produto por ID" });
  }
};

exports.createProduct = async (req, res) => {
  try {

    const productData = req.body; 

    const newProduct = new Product(productData);

    await newProduct.save();

    res.status(201).json({ message: "Produto criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
};

exports.createSeveralProduct = async (req, res) => {
  try {
    const productDataArray = req.body; 

    const createdProducts = [];

    for (const productData of productDataArray) {
      const newProduct = new Product(productData);
      const createdProduct = await newProduct.save();
      createdProducts.push(createdProduct);
    }

    res
      .status(201)
      .json({
        message: "Produtos criados com sucesso",
        products: createdProducts,
      });
  } catch (error) {
    console.error("Erro ao criar os produtos:", error);
    res.status(500).json({ error: "Erro ao criar os produtos" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { product_name, description, image, quantity, type } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    product.product_name = product_name || product.product_name;
    product.description = description || product.description;
    product.image = image || product.image;
    product.quantity = quantity || product.quantity;
    product.type = type || product.type;

    await product.save();

    res.json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    res.status(500).json({ error: "Erro ao excluir o produto" });
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});

    res.json({ message: "Todos os produtos foram excluídos com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir todos os produtos:", error);
    res.status(500).json({ error: "Erro ao excluir todos os produtos" });
  }
};
