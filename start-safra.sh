#!/bin/bash

echo "🌾 Iniciando S.A.F.R.A..."
echo ""

# Verificações básicas
if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado!"
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não encontrado!"
    exit 1
fi

echo "✅ Java e Maven encontrados"
echo ""

# Iniciar Backend
echo "📦 Compilando backend..."
cd "IPA - Back" || exit

mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Compilação concluída!"
    echo "🚀 Iniciando backend na porta 8080..."
    echo ""
    
    mvn spring-boot:run &
    BACKEND_PID=$!
    
    echo "Backend PID: $BACKEND_PID"
    echo ""
    
    # Aguardar 10 segundos
    echo "⏳ Aguardando backend inicializar..."
    sleep 10
    
    # Voltar para raiz
    cd ..
    
    # Iniciar Frontend se existir
    if [ -d "IPA - FrontEnd" ]; then
        echo ""
        echo "🎨 Iniciando frontend..."
        cd "IPA - FrontEnd" || exit
        
        # Instalar dependências se necessário
        if [ ! -d "node_modules" ]; then
            echo "📦 Instalando dependências..."
            npm install
        fi
        
        npm run dev &
        FRONTEND_PID=$!
        
        echo "Frontend PID: $FRONTEND_PID"
        echo ""
    fi
    
    echo "=========================================="
    echo "✅ S.A.F.R.A. está rodando!"
    echo "=========================================="
    echo ""
    echo "Backend:  http://localhost:8080"
    echo "Frontend: http://localhost:5173"
    echo ""
    echo "Pressione Ctrl+C para parar"
    
    # Limpar ao sair
    trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '👋 Serviços parados'; exit" INT TERM
    
    wait
    
else
    echo "❌ Erro na compilação!"
    exit 1
fi