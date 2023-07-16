const Status = require('../models/status');

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    console.error('Erro ao obter todos os status:', error);
    res.status(500).json({ error: 'Erro ao obter todos os status' });
  }
};

exports.getStatusById = async (req, res) => {
  try {
    const statusId = req.params.id;
    const status = await Status.findById(statusId).populate('replace_id');
    if (!status) {
      return res.status(404).json({ error: 'Status não encontrado' });
    }
    res.json(status);
  } catch (error) {
    console.error('Erro ao obter o status por ID:', error);
    res.status(500).json({ error: 'Erro ao obter o status por ID' });
  }
};

exports.createStatus = async (req, res) => {
  try {
    const { status_type } = req.body;

    const newStatus = new Status({
      status_type,
    });

    await newStatus.save();

    res.status(201).json({ message: 'Status criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar o status:', error);
    res.status(500).json({ error: 'Erro ao criar o status' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const statusId = req.params.id;
    const { status_type, replace_id } = req.body;

    const status = await Status.findById(statusId);
    if (!status) {
      return res.status(404).json({ error: 'Status não encontrado' });
    }

    status.status_type = status_type || status.status_type;

    await status.save();

    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o status:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status' });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const statusId = req.params.id;

    await Status.findByIdAndDelete(statusId);

    res.json({ message: 'Status excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o status:', error);
    res.status(500).json({ error: 'Erro ao excluir o status' });
  }
};
