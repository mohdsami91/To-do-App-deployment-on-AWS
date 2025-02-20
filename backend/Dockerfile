# Development stage
FROM node:18-alpine AS development

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run db:generate
#RUN npm run db:migrate

EXPOSE 3000
CMD ["sh", "-c", "npm run db:migrate && npm run dev"]

# Production stage
FROM node:18-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run db:migrate && npm start"]