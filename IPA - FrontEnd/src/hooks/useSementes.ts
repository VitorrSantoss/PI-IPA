import { useState, useEffect } from 'react';
import { sementeService, Semente } from '../services/SementeServices';

export function useSementes() {
  const [sementes, setSementes] = useState<Semente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarSementes = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await sementeService.listarTodas();
      setSementes(dados);
    } catch (err) {
      setError('Erro ao carregar sementes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSementes();
  }, []);

  const adicionarSemente = async (semente: Semente) => {
    try {
      const nova = await sementeService.criar(semente);
      setSementes([...sementes, nova]);
      return nova;
    } catch (err) {
      setError('Erro ao adicionar semente');
      throw err;
    }
  };

  const atualizarSemente = async (id: number, semente: Semente) => {
    try {
      const atualizada = await sementeService.atualizar(id, semente);
      setSementes(sementes.map(s => s.id === id ? atualizada : s));
      return atualizada;
    } catch (err) {
      setError('Erro ao atualizar semente');
      throw err;
    }
  };

  const deletarSemente = async (id: number) => {
    try {
      await sementeService.deletar(id);
      setSementes(sementes.filter(s => s.id !== id));
    } catch (err) {
      setError('Erro ao deletar semente');
      throw err;
    }
  };

  return {
    sementes,
    loading,
    error,
    carregarSementes,
    adicionarSemente,
    atualizarSemente,
    deletarSemente
  };
}