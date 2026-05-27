# Contributing

## Como contribuir

1. Faça um clone do repositório
2. Crie uma branch para sua mudança: `git checkout -b nome-da-branch`
3. Faça suas alterações seguindo os padrões do projeto
4. Realize commits semânticos: `git commit -m "feat: descrição da alteração"`
5. Envie sua branch: `git push origin nome-da-branch`
6. Abra um Pull Request

## Padrões do projeto

- Seguir os princípios SOLID
- Utilizar ESLint para padronização de código
- Manter consistência com a arquitetura existente
- Evitar mudanças fora do escopo da proposta

Antes de abrir um PR, garanta que:

- O código não possui erros de lint
- A aplicação está funcionando corretamente

## Commits

Utilize commits semânticos:
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas gerais

Exemplo: `feat: adiciona endpoint de criação de questões`

## Branches

Utilize nomes de branches semânticos:
[Conventional Branch](https://conventional-branch.github.io/)

- `feat/nome-da-feature`
- `bugfix/descricao`
- `hotfix/descricao`
- `release/versao`
- `chore/descricao`

## Pull Requests

- Descreva claramente o que foi feito
- Relacione com issues, se houver
- Mantenha o PR pequeno e focado
- Certifique-se de que o código está funcionando corretamente

Checklist recomendado:

- Código segue os padrões do projeto
- Sem erros de lint
- Mudanças testadas manualmente
