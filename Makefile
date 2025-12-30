all: run

install: install-vite install-tailwind install-shadcn

install-bun:
	@echo "Installing Bun..."
	@curl -fsSL https://bun.sh/install | bash

install-vite:
	@echo "Installing Vite with React and TypeScript..."
	@bun add -D vit
	@install

install-tailwind:
	@echo "Installing Tailwind CSS..."
	# @bun add tailwindcss postcss autoprefixer
	# @bunx --bun tailwindcss init -p
	@bun install tailwindcss @tailwindcss/vite

install-shadcn:
	@echo "Installing Shadcn UI..."
	@bunx --bun shadcn@latest init
	@bunx --bun shadcn@latest add button

install-tanstack:
	@echo "Installing TanStack Query..."
	@bun add @tanstack/react-router @tanstack/react-router-devtools
	@bun add -D @tanstack/router-plugin

build:
	@echo "Building the project..."
	@bun run build

clean:
	@echo "Cleaning the project..."
	@rm -rf node_modules
	@rm -rf dist
	@rm -rf .cache

run:
	@echo "Running the project..."
	@bun run dev

deploy: 
	@echo "Deploying new version of page..."
	@bun run deploy