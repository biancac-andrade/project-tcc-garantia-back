const Request = require("../models/request");

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate({
        path: "product",
        populate: {
          path: "type",
        },
      })
      .populate("status", "status_type");
    res.json(requests);
  } catch (error) {
    console.error("Erro ao obter todas as solicitações:", error);
    res.status(500).json({ error: "Erro ao obter todas as solicitações" });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Request.findById(requestId)
      .populate({
        path: "product",
        populate: {
          path: "type",
        },
      })
      .populate("status", "status_type");
    if (!request) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }
    res.json(request);
  } catch (error) {
    console.error("Erro ao obter a solicitação por ID:", error);
    res.status(500).json({ error: "Erro ao obter a solicitação por ID" });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { request_date, quantity, product, status } = req.body;

    const newRequest = new Request({
      request_date,
      quantity,
      product,
      status: status,
    });

    const createdRequest = await newRequest.save();

    res
      .status(201)
      .json({
        message: "Solicitação criada com sucesso",
        request: createdRequest,
      });
  } catch (error) {
    console.error("Erro ao criar a solicitação:", error);
    res.status(500).json({ error: "Erro ao criar a solicitação" });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { request_date, quantity, product, status } = req.body;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    request.request_date = request_date || request.request_date;
    request.quantity = quantity || request.quantity;
    request.product = product || request.product;
    request.status = status || request.status;

    await request.save();

    res.json({ message: "Solicitação atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar a solicitação:", error);
    res.status(500).json({ error: "Erro ao atualizar a solicitação" });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    await Request.findByIdAndDelete(requestId);

    res.json({ message: "Solicitação excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir a solicitação:", error);
    res.status(500).json({ error: "Erro ao excluir a solicitação" });
  }
};

exports.deleteProductFromRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const productId = req.params.productId;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    request.product = request.product.filter(
      (product) => product.toString() !== productId
    );
    await request.save();

    res.json({ message: "Produto removido da solicitação com sucesso" });
  } catch (error) {
    console.error("Erro ao remover o produto da solicitação:", error);
    res.status(500).json({ error: "Erro ao remover o produto da solicitação" });
  }
};

exports.deleteAllRequests = async (req, res) => {
  try {
    await Request.deleteMany({});

    res.json({ message: "Todas as solicitações foram excluídas com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir todas as solicitações:", error);
    res.status(500).json({ error: "Erro ao excluir todas as solicitações" });
  }
};
