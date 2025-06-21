all: run

install: install-vite install-tailwind install-shadcn

install-vite:
	@echo "Installing Vite with React and TypeScript..."
	@bun create vite . --template react-ts
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