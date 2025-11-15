import React, { useState, useEffect } from 'react';
import usuarioService from '../services/usuarioService';
import './TesteUsuarios.css';

const TesteUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioForm, setUsuarioForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [buscaCpf, setBuscaCpf] = useState('');

  // ✅ Carregar usuários ao montar o componente
  useEffect(() => {
    carregarUsuarios();
  }, []);

  // ✅ Listar todos os usuários
  const carregarUsuarios = async () => {
    try {
      const data = await usuarioService.listarTodos();
      setUsuarios(data);
      mostrarMensagem('sucesso', 'Usuários carregados com sucesso!');
    } catch (error) {
      mostrarMensagem('erro', 'Erro ao carregar usuários');
    }
  };

  // ✅ Criar ou atualizar usuário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await usuarioService.atualizar(editandoId, usuarioForm);
        mostrarMensagem('sucesso', 'Usuário atualizado com sucesso!');
      } else {
        await usuarioService.criar(usuarioForm);
        mostrarMensagem('sucesso', 'Usuário criado com sucesso!');
      }
      limparForm();
      carregarUsuarios();
    } catch (error) {
      mostrarMensagem('erro', error.response?.data || 'Erro ao salvar usuário');
    }
  };

  // ✅ Editar usuário
  const handleEditar = (usuario) => {
    setUsuarioForm(usuario);
    setEditandoId(usuario.id);
  };

  // ✅ Deletar usuário
  const handleDeletar = async (id) => {
    if (window.confirm('Deseja realmente deletar este usuário?')) {
      try {
        await usuarioService.deletar(id);
        mostrarMensagem('sucesso', 'Usuário deletado com sucesso!');
        carregarUsuarios();
      } catch (error) {
        mostrarMensagem('erro', 'Erro ao deletar usuário');
      }
    }
  };

  // ✅ Buscar por CPF
  const handleBuscarCpf = async () => {
    try {
      const usuario = await usuarioService.buscarPorCpf(buscaCpf);
      setUsuarios([usuario]);
      mostrarMensagem('sucesso', 'Usuário encontrado!');
    } catch (error) {
      mostrarMensagem('erro', 'Usuário não encontrado');
    }
  };

  // ✅ Verificar se CPF existe
  const handleVerificarCpf = async () => {
    try {
      const existe = await usuarioService.verificarCpf(buscaCpf);
      mostrarMensagem('info', existe ? 'CPF já cadastrado' : 'CPF disponível');
    } catch (error) {
      mostrarMensagem('erro', 'Erro ao verificar CPF');
    }
  };

  const limparForm = () => {
    setUsuarioForm({
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
    setEditandoId(null);
  };

  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3000);
  };

  const handleChange = (e) => {
    setUsuarioForm({
      ...usuarioForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="teste-usuarios-container">
      <h1>🧪 Teste de Usuários - Backend Integration</h1>

      {/* Mensagem de Feedback */}
      {mensagem.texto && (
        <div className={`mensagem ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      {/* Busca por CPF */}
      <div className="busca-section">
        <h2>🔍 Buscar por CPF</h2>
        <div className="busca-form">
          <input
            type="text"
            placeholder="Digite o CPF"
            value={buscaCpf}
            onChange={(e) => setBuscaCpf(e.target.value)}
          />
          <button onClick={handleBuscarCpf} className="btn-buscar">
            Buscar
          </button>
          <button onClick={handleVerificarCpf} className="btn-verificar">
            Verificar Existência
          </button>
          <button onClick={carregarUsuarios} className="btn-listar">
            Listar Todos
          </button>
        </div>
      </div>

      {/* Formulário */}
      <div className="form-section">
        <h2>{editandoId ? '✏️ Editar Usuário' : '➕ Novo Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="nome"
              placeholder="Nome Completo"
              value={usuarioForm.nome}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={usuarioForm.cpf}
              onChange={handleChange}
              required
              disabled={editandoId !== null}
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={usuarioForm.telefone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={usuarioForm.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={usuarioForm.endereco}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={usuarioForm.cidade}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={usuarioForm.estado}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={usuarioForm.cep}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-salvar">
              {editandoId ? 'Atualizar' : 'Criar'}
            </button>
            {editandoId && (
              <button type="button" onClick={limparForm} className="btn-cancelar">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Usuários */}
      <div className="lista-section">
        <h2>📋 Usuários Cadastrados ({usuarios.length})</h2>
        <div className="usuarios-grid">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="usuario-card">
              <h3>{usuario.nome}</h3>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
              <p><strong>Telefone:</strong> {usuario.telefone}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Endereço:</strong> {usuario.endereco}</p>
              <p><strong>Cidade:</strong> {usuario.cidade} - {usuario.estado}</p>
              <p><strong>CEP:</strong> {usuario.cep}</p>
              <div className="card-actions">
                <button onClick={() => handleEditar(usuario)} className="btn-editar">
                  Editar
                </button>
                <button onClick={() => handleDeletar(usuario.id)} className="btn-deletar">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TesteUsuarios;