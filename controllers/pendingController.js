const Pending = require('../models/pending');

exports.getAllPendings = async (req, res) => {
  try {
    const pendings = await Pending.find().populate({
      path: 'request',
      populate: {
        path: 'product',
        select: 'product_name description image quantity type'
      }
    }).populate('status', 'status_type');
    
    res.json(pendings);
  } catch (error) {
    console.error('Erro ao obter todos os pendentes:', error);
    res.status(500).json({ error: 'Erro ao obter todos os pendentes' });
  }
};

exports.getPendingById = async (req, res) => {
  try {
    const pendingId = req.params.id;
    const pending = await Pending.findById(pendingId).populate({
      path: 'request',
      populate: {
        path: 'product',
        select: 'product_name description image quantity type'
      }
    }).populate('status', 'status_type');

    if (!pending) {
      return res.status(404).json({ error: 'Pendente não encontrado' });
    }
    res.json(pending);
  } catch (error) {
    console.error('Erro ao obter o pendente por ID:', error);
    res.status(500).json({ error: 'Erro ao obter o pendente por ID' });
  }
};

exports.createPending = async (req, res) => {
  try {
    const { pending_date, status, request } = req.body;

    const newPending = new Pending({
      pending_date,
      status: status,
      request
    });

    const createdPending = await newPending.save();

    res.status(201).json({ message: 'Pendente criado com sucesso',  pending: createdPending });
  } catch (error) {
    console.error('Erro ao criar o pendente:', error);
    res.status(500).json({ error: 'Erro ao criar o pendente' });
  }
};

exports.updatePending = async (req, res) => {
  try {
    const pendingId = req.params.id;
    const { pending_date, product_id, request_id, status } = req.body;

    const pending = await Pending.findById(pendingId);
    if (!pending) {
      return res.status(404).json({ error: 'Pendente não encontrado' });
    }

    pending.pending_date = pending_date || pending.pending_date;
    pending.product_id = product_id || pending.product_id;
    pending.request_id = request_id || pending.request_id;
    pending.status = status || pending.status;

    await pending.save();

    res.json({ message: 'Pendente atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o pendente:', error);
    res.status(500).json({ error: 'Erro ao atualizar o pendente' });
  }
};

exports.updatePendingStatus = async (req, res) => {
  try {
    const pendingId = req.params.id;
    const { status } = req.body;

    const pending = await Pending.findById(pendingId);
    if (!pending) {
      return res.status(404).json({ error: 'Pendente não encontrado' });
    }

    pending.status = status || pending.status;

    await pending.save();

    res.json({ message: 'Status do pendente atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o status do pendente:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status do pendente' });
  }
};


exports.deletePending = async (req, res) => {
  try {
    const pendingId = req.params.id;

    await Pending.findByIdAndDelete(pendingId);

    res.json({ message: 'Pendente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o pendente:', error);
    res.status(500).json({ error: 'Erro ao excluir o pendente' });
  }
};
