-- Active: 1757339712537@@127.0.0.1@3306@ipa_db
-- ============================================================
-- S.A.F.R.A. - Script SQL Completo (MySQL)
-- Database: ipa_db
-- ============================================================

-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS ipa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ipa_db;

-- ============================================================
-- TABELAS
-- ============================================================

-- Tabela de Usuários
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    INDEX idx_cpf (cpf),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Produtos
CREATE TABLE produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    unidade_medida VARCHAR(50),
    INDEX idx_categoria (categoria),
    INDEX idx_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_rastreio VARCHAR(255) NOT NULL UNIQUE,
    usuario_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INT,
    valor_total DECIMAL(10,2),
    status VARCHAR(50) NOT NULL,
    data_pedido DATETIME NOT NULL,
    data_entrega DATETIME,
    observacoes TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    INDEX idx_numero_rastreio (numero_rastreio),
    INDEX idx_status (status),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DADOS INICIAIS - USUÁRIOS
-- ============================================================

INSERT INTO usuarios (nome, cpf, telefone, email, endereco, cidade, estado, cep) VALUES
('João Silva', '123.456.789-00', '(71) 98765-4321', 'joao.silva@email.com', 'Rua das Flores, 100', 'Salvador', 'BA', '40000-000'),
('Maria Santos', '987.654.321-00', '(71) 98765-4322', 'maria.santos@email.com', 'Av. Principal, 200', 'Salvador', 'BA', '40100-000'),
('José Oliveira', '111.222.333-44', '(75) 99999-0001', 'jose.oliveira@email.com', 'Fazenda Boa Vista', 'Feira de Santana', 'BA', '44000-000'),
('Ana Costa', '555.666.777-88', '(75) 99999-0002', 'ana.costa@email.com', 'Sítio Verde', 'Feira de Santana', 'BA', '44100-000'),
('Carlos Almeida', '999.888.777-66', '(71) 3333-0001', 'carlos.almeida@email.com', 'Rua Comercial, 50', 'Salvador', 'BA', '40200-000'),
('Fernanda Lima', '444.555.666-77', '(71) 98888-1111', 'fernanda.lima@email.com', 'Travessa do Sol, 30', 'Lauro de Freitas', 'BA', '42700-000'),
('Roberto Mendes', '222.333.444-55', '(71) 98888-2222', 'roberto.mendes@email.com', 'Rua da Praia, 80', 'Camaçari', 'BA', '42800-000'),
('Patricia Souza', '666.777.888-99', '(73) 99999-3333', 'patricia.souza@email.com', 'Av. Central, 150', 'Ilhéus', 'BA', '45650-000');

-- ============================================================
-- DADOS INICIAIS - PRODUTOS
-- ============================================================

INSERT INTO produtos (nome, descricao, categoria, preco, estoque, unidade_medida) VALUES
-- Grãos
('Feijão Preto', 'Feijão preto tipo 1, qualidade premium', 'GRAOS', 8.50, 1000, 'KG'),
('Feijão Carioca', 'Feijão carioca tipo 1', 'GRAOS', 7.80, 1500, 'KG'),
('Arroz Branco', 'Arroz branco tipo 1, grão longo', 'GRAOS', 6.00, 2000, 'KG'),
('Arroz Integral', 'Arroz integral orgânico', 'GRAOS', 9.50, 800, 'KG'),
('Milho em Grão', 'Milho amarelo para consumo', 'GRAOS', 4.50, 1200, 'KG'),

-- Hortaliças
('Tomate', 'Tomate longa vida de primeira qualidade', 'HORTALICAS', 5.00, 500, 'KG'),
('Alface', 'Alface crespa fresca', 'HORTALICAS', 2.50, 300, 'UNIDADE'),
('Cenoura', 'Cenoura in natura', 'HORTALICAS', 3.80, 600, 'KG'),
('Batata', 'Batata inglesa', 'HORTALICAS', 4.20, 800, 'KG'),
('Cebola', 'Cebola roxa', 'HORTALICAS', 3.50, 700, 'KG'),

-- Frutas
('Banana Prata', 'Banana prata madura, ponto ideal', 'FRUTAS', 4.00, 1000, 'KG'),
('Laranja', 'Laranja pera, tamanho médio', 'FRUTAS', 3.50, 900, 'KG'),
('Mamão', 'Mamão papaia', 'FRUTAS', 5.50, 400, 'KG'),
('Melancia', 'Melancia redonda', 'FRUTAS', 2.80, 300, 'KG'),
('Abacaxi', 'Abacaxi pérola', 'FRUTAS', 6.00, 250, 'UNIDADE'),

-- Laticínios
('Leite Integral', 'Leite integral pasteurizado', 'LATICINIOS', 4.50, 2000, 'LITRO'),
('Queijo Minas', 'Queijo minas frescal', 'LATICINIOS', 28.00, 150, 'KG'),
('Iogurte Natural', 'Iogurte natural integral', 'LATICINIOS', 5.80, 500, 'LITRO'),

-- Proteínas
('Frango Inteiro', 'Frango inteiro congelado', 'PROTEINAS', 12.90, 400, 'KG'),
('Ovos', 'Ovos brancos tipo grande', 'PROTEINAS', 18.00, 600, 'DUZIA');

-- ============================================================
-- DADOS INICIAIS - PEDIDOS (Exemplos)
-- ============================================================

INSERT INTO pedidos (numero_rastreio, usuario_id, produto_id, quantidade, valor_total, status, data_pedido, data_entrega, observacoes) VALUES
-- Pedidos entregues
('SAFRA-2025-A1B2C3D4', 1, 1, 50, 425.00, 'ENTREGUE', '2025-11-01 10:30:00', '2025-11-05 14:20:00', 'Entrega realizada com sucesso'),
('SAFRA-2025-E5F6G7H8', 2, 3, 100, 600.00, 'ENTREGUE', '2025-11-02 11:15:00', '2025-11-06 09:30:00', 'Cliente satisfeito'),
('SAFRA-2025-I9J0K1L2', 3, 11, 30, 120.00, 'ENTREGUE', '2025-11-03 14:45:00', '2025-11-07 16:00:00', NULL),

-- Pedidos em rota
('SAFRA-2025-M3N4O5P6', 1, 6, 20, 100.00, 'EM_ROTA', '2025-11-12 09:00:00', NULL, 'Saiu para entrega'),
('SAFRA-2025-Q7R8S9T0', 4, 16, 50, 225.00, 'EM_ROTA', '2025-11-13 10:30:00', NULL, 'Previsão de entrega: hoje'),

-- Pedidos aprovados
('SAFRA-2025-U1V2W3X4', 2, 12, 40, 140.00, 'APROVADO', '2025-11-14 08:00:00', NULL, 'Aguardando separação'),
('SAFRA-2025-Y5Z6A7B8', 5, 19, 10, 129.00, 'APROVADO', '2025-11-14 13:20:00', NULL, NULL),

-- Pedidos pendentes
('SAFRA-2025-C9D0E1F2', 3, 5, 100, 450.00, 'PENDENTE', '2025-11-15 07:30:00', NULL, 'Aguardando aprovação'),
('SAFRA-2025-G3H4I5J6', 6, 7, 15, 37.50, 'PENDENTE', '2025-11-15 09:15:00', NULL, 'Primeira compra do cliente'),
('SAFRA-2025-K7L8M9N0', 7, 20, 5, 90.00, 'PENDENTE', '2025-11-15 10:45:00', NULL, NULL);

-- ============================================================
-- VIEWS E CONSULTAS ÚTEIS
-- ============================================================

-- View: Resumo de Pedidos
CREATE OR REPLACE VIEW v_resumo_pedidos AS
SELECT 
    p.id,
    p.numero_rastreio,
    u.nome AS cliente,
    u.cpf,
    u.cidade,
    prod.nome AS produto,
    p.quantidade,
    p.valor_total,
    p.status,
    DATE_FORMAT(p.data_pedido, '%d/%m/%Y %H:%i') AS data_pedido_formatada,
    DATE_FORMAT(p.data_entrega, '%d/%m/%Y %H:%i') AS data_entrega_formatada
FROM pedidos p
INNER JOIN usuarios u ON p.usuario_id = u.id
INNER JOIN produtos prod ON p.produto_id = prod.id;

-- View: Estoque Baixo
CREATE OR REPLACE VIEW v_estoque_baixo AS
SELECT 
    id,
    nome,
    categoria,
    estoque,
    preco,
    (estoque * preco) AS valor_estoque
FROM produtos
WHERE estoque < 100
ORDER BY estoque ASC;

-- ============================================================
-- ESTATÍSTICAS
-- ============================================================

SELECT '========================================' AS '';
SELECT '✅ BANCO DE DADOS CRIADO COM SUCESSO!' AS '';
SELECT '========================================' AS '';
SELECT '' AS '';

SELECT 'ESTATÍSTICAS:' AS '';
SELECT CONCAT('👥 Usuários cadastrados: ', COUNT(*)) AS '' FROM usuarios;
SELECT CONCAT('📦 Produtos disponíveis: ', COUNT(*)) AS '' FROM produtos;
SELECT CONCAT('🛒 Pedidos registrados: ', COUNT(*)) AS '' FROM pedidos;

SELECT '' AS '';
SELECT 'PEDIDOS POR STATUS:' AS '';
SELECT status, COUNT(*) AS quantidade 
FROM pedidos 
GROUP BY status;

SELECT '' AS '';
SELECT '========================================' AS '';
SELECT 'USUÁRIOS DE TESTE:' AS '';
SELECT '========================================' AS '';
SELECT id, nome, cpf, email, cidade FROM usuarios ORDER BY id;

SELECT '' AS '';
SELECT '========================================' AS '';
SELECT 'TOP 5 PRODUTOS EM ESTOQUE:' AS '';
SELECT '========================================' AS '';
SELECT nome, categoria, estoque, CONCAT('R$ ', FORMAT(preco, 2)) AS preco
FROM produtos 
ORDER BY estoque DESC 
LIMIT 5;

SELECT '' AS '';
SELECT '========================================' AS '';
SELECT 'CONFIGURAÇÃO DO BACKEND:' AS '';
SELECT '========================================' AS '';
SELECT 'spring.datasource.url=jdbc:mysql://localhost:3306/ipa_db' AS '';
SELECT 'spring.datasource.username=root' AS '';
SELECT 'spring.datasource.password=root' AS '';
SELECT '' AS '';
SELECT '🚀 Execute o backend com: ./start-safra.sh' AS '';
SELECT '========================================' AS '';