const Type = require('../models/type');

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.json(types);
  } catch (error) {
    console.error('Erro ao obter todos os tipos:', error);
    res.status(500).json({ error: 'Erro ao obter todos os tipos' });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const typeId = req.params.id;
    const type = await Type.findById(typeId);
    if (!type) {
      return res.status(404).json({ error: 'Tipo não encontrado' });
    }
    res.json(type);
  } catch (error) {
    console.error('Erro ao obter o tipo por ID:', error);
    res.status(500).json({ error: 'Erro ao obter o tipo por ID' });
  }
};

exports.createType = async (req, res) => {
  try {
    const { name_type } = req.body;

    const newType = new Type({
      name_type
    });

    await newType.save();

    res.status(201).json({ message: 'Tipo criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar o tipo:', error);
    res.status(500).json({ error: 'Erro ao criar o tipo' });
  }
};

exports.updateType = async (req, res) => {
  try {
    const typeId = req.params.id;
    const { name_type } = req.body;

    const type = await Type.findById(typeId);
    if (!type) {
      return res.status(404).json({ error: 'Tipo não encontrado' });
    }

    type.name_type = name_type || type.name_type;

    await type.save();

    res.json({ message: 'Tipo atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o tipo:', error);
    res.status(500).json({ error: 'Erro ao atualizar o tipo' });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const typeId = req.params.id;

    await Type.findByIdAndDelete(typeId);

    res.json({ message: 'Tipo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o tipo:', error);
    res.status(500).json({ error: 'Erro ao excluir o tipo' });
  }
};

exports.deleteAllTypes = async (req, res) => {
  try {
    // You can use the `deleteMany` function to delete all documents in the collection
    await Type.deleteMany({});

    res.json({ message: 'Todos os tipos foram excluídos com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir todos os tipos:', error);
    res.status(500).json({ error: 'Erro ao excluir todos os tipos' });
  }
};