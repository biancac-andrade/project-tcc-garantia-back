const User = require('../models/user');

// Obter perfil do usuário
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

     res.json(user.toObject()); // Retorna todos os dados do usuário
  } catch (error) {
    console.error('Erro ao obter o perfil do usuário:', error);
    res.status(500).json({ error: 'Erro ao obter o perfil do usuário' });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    await User.findByIdAndDelete(userId);

    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
};

// Atualizar dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Dados do usuário atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
   
    // Obter a lista de todos os usuários
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error('Erro ao obter a lista de usuários:', error);
    res.status(500).json({ error: 'Erro ao obter a lista de usuários' });
  }
};


exports.deleteOtherUser = async (req, res) => {
  try {
    console.log('Requesting user:', req.user);

    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
};

