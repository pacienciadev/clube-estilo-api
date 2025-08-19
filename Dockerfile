# Estágio de Build
# -----------------------------------------------------------------------------
# Usa uma imagem Node.js completa para construir a aplicação.
FROM node:20-alpine AS builder

# Define o diretório de trabalho.
WORKDIR /usr/src/app

# Copia os arquivos de dependência.
COPY package*.json ./

# Instala as dependências de desenvolvimento e produção.
RUN npm install

# Copia todo o código-fonte da sua aplicação.
COPY . .

# Constrói o projeto NestJS para produção.
# Isso irá gerar o código JavaScript na pasta `dist`.
RUN npm run build

# Estágio de Produção
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production

# Define o diretório de trabalho.
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependência do estágio de build.
COPY --from=builder /usr/src/app/package*.json ./

# Instala SOMENTE as dependências de produção.
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/src ./src

# Copia a pasta de build (`dist`) inteira do estágio de build.
# O arquivo 'main.js' já estará dentro desta pasta.
COPY --from=builder /usr/src/app/dist ./dist

# Exponha a porta que a sua aplicação NestJS usa.
EXPOSE 3000

# Define o comando para iniciar a aplicação em produção a partir da pasta 'dist'.
CMD ["node", "dist/main.js"]