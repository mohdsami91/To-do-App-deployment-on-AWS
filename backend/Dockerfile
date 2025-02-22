# Development stage
FROM node:18-alpine AS development

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run db:generate

EXPOSE 3000
CMD ["sh", "-c", "npm run db:migrate && npm run dev"]