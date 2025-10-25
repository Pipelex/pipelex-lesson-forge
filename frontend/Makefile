SHELL := /bin/bash

GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m

.PHONY: run
run: ## Start development server
	@echo -e "${YELLOW}Starting development server...${NC}"
	pnpm run dev

.PHONY: build
build: ## Build the application
	@echo -e "${YELLOW}Building application...${NC}"
	pnpm run build

.PHONY: merge-check
merge-check:
	@echo -e "${BLUE}Running merge checks...${NC}"
	@pnpm run lint:check
	@pnpm run typecheck
	@pnpm run format:check
	@echo -e "${GREEN}✅ All checks passed!${NC}"

.PHONY: cc
cc: ## Clean code - fix formatting and lint
	@echo -e "${BLUE}Cleaning code...${NC}"
	@echo -e "${YELLOW}1/2 - Running Prettier fix...${NC}"
	@pnpm run format:fix
	@echo -e "${GREEN}✓ Prettier formatting applied${NC}"
	@echo -e "${YELLOW}2/2 - Running ESLint fix...${NC}"
	@pnpm run lint:fix
	@echo -e "${GREEN}✓ ESLint fixes applied${NC}"
	@echo -e "${YELLOW}Running final checks...${NC}"
	@pnpm run typecheck || echo -e "${YELLOW}⚠️  TypeScript errors need manual fixing${NC}"
	@echo -e "${GREEN}✅ Code cleaning complete!${NC}"

.PHONY: install
install: ## Install dependencies
	@echo -e "${YELLOW}Installing dependencies...${NC}"
	@corepack enable 2>/dev/null || true
	@pnpm install
	@echo -e "${GREEN}✓ Dependencies installed${NC}"

.PHONY: setup
setup: ## First-time setup
	@echo -e "${BLUE}Running first-time setup...${NC}"
	@corepack enable
	@corepack prepare pnpm@latest --activate
	@pnpm install
	@echo -e "${GREEN}✓ Setup complete! Run 'make run' to start.${NC}"

.PHONY: clean-install
clean-install: ## Clean and reinstall dependencies
	@echo -e "${YELLOW}Removing node_modules and .next...${NC}"
	rm -rf node_modules .next
	@pnpm install
	@echo -e "${GREEN}✓ Clean install complete${NC}"
