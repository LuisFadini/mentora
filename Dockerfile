
FROM node:24-bookworm-slim

WORKDIR /app

# Use the pnpm version declared in package.json
RUN corepack enable

ENV HUSKY=0

# Copy the entire workspace before installing:
# the root postinstall builds workspace packages.
COPY . .

RUN pnpm install --frozen-lockfile

# Build API, frontend and workspace packages
RUN pnpm build

COPY docker/entrypoint.sh /usr/local/bin/mentora-entrypoint

RUN chmod +x /usr/local/bin/mentora-entrypoint

EXPOSE 3000 3001 5173

ENTRYPOINT ["/usr/local/bin/mentora-entrypoint"]

CMD ["dev"]
