-- Active: 1757339712537@@127.0.0.1@3306@ipa_db
-- Inserir usuários de teste (se não existirem)
INSERT IGNORE INTO usuarios (id, nome, cpf, telefone, email, endereco, cidade, estado, cep) VALUES
(1, 'João Silva', '123.456.789-00', '(81) 98765-4321', 'joao.silva@email.com', 'Rua das Flores, 123', 'Recife', 'PE', '50000-000'),
(2, 'Maria Santos', '987.654.321-00', '(81) 91234-5678', 'maria.santos@email.com', 'Av. Principal, 456', 'Olinda', 'PE', '53000-000'),
(3, 'José Oliveira', '456.789.123-00', '(81) 99876-5432', 'jose.oliveira@email.com', 'Travessa do Campo, 789', 'Arcoverde', 'PE', '56500-000'),
(4, 'Ana Paula', '321.654.987-00', '(81) 97654-3210', 'ana.paula@email.com', 'Sítio Palmeiras, SN', 'Caruaru', 'PE', '55000-000'),
(5, 'Pedro Almeida', '789.123.456-00', '(81) 96543-2109', 'pedro.almeida@email.com', 'Fazenda Boa Vista', 'Garanhuns', 'PE', '55290-000');

-- Inserir produtos de teste
INSERT IGNORE INTO produtos (id, nome, descricao, categoria, preco, estoque, unidade_medida) VALUES
(1, 'Semente de Milho IPA-100', 'Semente híbrida de milho, alta produtividade', 'Sementes', 150.00, 5000, 'KG'),
(2, 'Semente de Feijão Carioca', 'Semente certificada de feijão carioca', 'Sementes', 80.00, 3000, 'KG'),
(3, 'Mudas de Tomate', 'Mudas certificadas de tomate cereja', 'Mudas', 25.00, 1000, 'UNIDADE'),
(4, 'Semente de Mandioca', 'Manivas para plantio', 'Sementes', 45.00, 2000, 'KG'),
(5, 'Mudas de Pimenta', 'Mudas de pimenta malagueta', 'Mudas', 30.00, 800, 'UNIDADE');

-- Inserir pedidos de teste
INSERT IGNORE INTO pedidos (id, numero_rastreio, usuario_id, produto_id, quantidade, valor_total, status, data_pedido, observacoes) VALUES
(1, 'SAFRA-2025-ABC12345', 1, 1, 200, 30000.00, 'PENDENTE', NOW(), 'Entrega urgente'),
(2, 'SAFRA-2025-DEF67890', 2, 2, 150, 12000.00, 'APROVADO', DATE_SUB(NOW(), INTERVAL 2 DAY), NULL),
(3, 'SAFRA-2025-GHI24680', 3, 3, 50, 1250.00, 'EM_ROTA', DATE_SUB(NOW(), INTERVAL 5 DAY), 'Cuidado no transporte'),
(4, 'SAFRA-2025-JKL13579', 4, 4, 100, 4500.00, 'ENTREGUE', DATE_SUB(NOW(), INTERVAL 10 DAY), NULL),
(5, 'SAFRA-2025-MNO97531', 5, 5, 75, 2250.00, 'CANCELADO', DATE_SUB(NOW(), INTERVAL 3 DAY), 'Cancelado a pedido do cliente');

