FROM ghcr.io/puppeteer/puppeteer:20.9.0

#===== Variables d'execution [temporaires :disponible uniquement durant la construction (le build)]===
ARG BUILD_VERSION=1.0.0

ARG ADMIN=root

ARG PPTR_USER=pptruser

ARG PORT_BUILD=3000
# ====================================================================================================

# ==== Métadonnées textuelles pour documenter l'image ================================================
LABEL maintainer="Mamadou Ndour <ndourm9@gmail.com>"

LABEL version=${BUILD_VERSION}

LABEL description="API Express HDLab avec intégration Puppeteer et Sequelize"
# ====================================================================================================

# ==== Variables d'environnement [persistantes: Transformer l'ARG du port en ENV pour qu'elle soit disponible à l'exécution]
ENV PORT=${PORT_BUILD}
# ====================================================================================================

# Passer en utilisateur root pour créer le dossier de l'application
USER ${ADMIN}

WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances en mode production/clean
#RUN npm ci --only=production
# Installation complète pour le mode de développement
RUN npm install

# Copie du reste du code source
COPY . .

# Donner les accès au dossier à l'utilisateur de puppeteer
RUN chown -R ${PPTR_USER}:${PPTR_USER} /usr/src/app

# Repasser sur l'utilisateur sécurisé non-root de l'image
USER ${PPTR_USER}

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

