const Replacement = require('../models/replacement');

exports.getAllReplacements = async (req, res) => {
  try {
    const replacements = await Replacement.find().populate({
      path: 'request',
      populate: {
        path: 'product',
        select: 'product_name description image quantity type'
      }
    });
    res.json(replacements);
  } catch (error) {
    console.error('Erro ao obter todas as substituições:', error);
    res.status(500).json({ error: 'Erro ao obter todas as substituições' });
  }
};

exports.getReplacementById = async (req, res) => {
  try {
    const replacementId = req.params.id;
    const replacement = await Replacement.findById(replacementId).populate({
      path: 'request',
      populate: {
        path: 'product',
        select: 'product_name description image quantity type'
      }
    });
    if (!replacement) {
      return res.status(404).json({ error: 'Substituição não encontrada' });
    }
    res.json(replacement);
  } catch (error) {
    console.error('Erro ao obter a substituição por ID:', error);
    res.status(500).json({ error: 'Erro ao obter a substituição por ID' });
  }
};

exports.createReplacement = async (req, res) => {
  try {
    const { replace_date, status, request } = req.body;

    const newReplacement = new Replacement({
      replace_date,
      status,
      request
    });

    const createReplace = await newReplacement.save();

    res.status(201).json({ message: 'Reposicao criada com sucesso',  replacement: createReplace });
  } catch (error) {
    console.error('Erro ao criar a substituição:', error);
    res.status(500).json({ error: 'Erro ao criar a substituição' });
  }
};

exports.updateReplacement = async (req, res) => {
  try {
    const replacementId = req.params.id;
    const { replace_date, product_id, request_id, status } = req.body;

    const replacement = await Replacement.findById(replacementId);
    if (!replacement) {
      return res.status(404).json({ error: 'Substituição não encontrada' });
    }

    replacement.replace_date = replace_date || replacement.replace_date;
    replacement.product_id = product_id || replacement.product_id;
    replacement.request_id = request_id || replacement.request_id;
    replacement.status = status || replacement.status;

    await replacement.save();

    res.json({ message: 'Substituição atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a substituição:', error);
    res.status(500).json({ error: 'Erro ao atualizar a substituição' });
  }
};

exports.deleteReplacement = async (req, res) => {
  try {
    const replacementId = req.params.id;

    await Replacement.findByIdAndDelete(replacementId);

    res.json({ message: 'Substituição excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a substituição:', error);
    res.status(500).json({ error: 'Erro ao excluir a substituição' });
  }
};
