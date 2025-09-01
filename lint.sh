#!/bin/bash
# lint.sh - Roda o ESLint no projeto React com Vite

# Habilita "exit on error"
set -e

echo "🔍 Rodando lint..."

# Se você usa npm
if [ -f "package-lock.json" ]; then
  npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0

# Se você usa yarn
elif [ -f "yarn.lock" ]; then
  yarn eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0

# Se você usa pnpm
elif [ -f "pnpm-lock.yaml" ]; then
  pnpm eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0

else
  echo "Nenhum gerenciador de pacotes detectado (npm, yarn ou pnpm)."
  exit 1
fi

echo "✅ Lint finalizado com sucesso!"
