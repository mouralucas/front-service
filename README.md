# Frontend Service (React + Vite)

## Primeiros Passos

## Instalação das dependências

## Open source libs para gráficos

[Recharts](https://recharts.org/en-US/)

[Outros exemplos](https://www.reddit.com/r/reactjs/comments/1ddbqei/open_source_react_chart_libraries/)

## Configuração scss

Em caso de erros de compilação com o scss

```bash
npm add -D sass-embedded
```

## Paleta de cores pasteis para daltônicos =D
```
| Cor           | HEX       |
| ------------- | --------- |
| Pastel Red    | `#F28B82` |
| Pastel Orange | `#FBCB8B` |
| Pastel Yellow | `#FFF2A1` |
| Pastel Green  | `#B5EAD7` |
| Pastel Blue   | `#A7C7E7` |
| Pastel Purple | `#CBAACB` |
| Pastel Pink   | `#FFD1DC` |
| Pastel Brown  | `#E6CBA8` |
| Pastel Gray   | `#E0E0E0` |
| Pastel White  | `#FAFAFA` |

```

## Paleta com Variações (normal / hover / focus)
```
| Cor           | Normal    | Hover     | Focus     |
| ------------- | --------- | --------- | --------- |
| Pastel Red    | `#F28B82` | `#E0746B` | `#F5A29A` |
| Pastel Orange | `#FBCB8B` | `#F0B873` | `#FCD7A1` |
| Pastel Yellow | `#FFF2A1` | `#E8D98D` | `#FFF6B8` |
| Pastel Green  | `#B5EAD7` | `#9FD1BE` | `#C9F0E1` |
| Pastel Blue   | `#A7C7E7` | `#8FAFD0` | `#BAD4ED` |
| Pastel Purple | `#CBAACB` | `#B092B0` | `#D8B9D8` |
| Pastel Pink   | `#FFD1DC` | `#E6B8C3` | `#FFDEE7` |
| Pastel Brown  | `#E6CBA8` | `#CCB08E` | `#ECD8BA` |
| Pastel Gray   | `#E0E0E0` | `#C7C7C7` | `#EBEBEB` |
| Pastel White  | `#FAFAFA` | `#E1E1E1` | `#FFFFFF` |
```

## Paleta gradiente
```
| Cor           | Gradiente HEX         |
| ------------- | --------------------- |
| Pastel Red    | `#FFEAEA` → `#F28B82` |
| Pastel Orange | `#FFF4E6` → `#FBCB8B` |
| Pastel Yellow | `#FFFDEA` → `#FFF2A1` |
| Pastel Green  | `#EAFBF6` → `#B5EAD7` |
| Pastel Blue   | `#EAF1FA` → `#A7C7E7` |
| Pastel Purple | `#F5EAF5` → `#CBAACB` |
| Pastel Pink   | `#FFF0F4` → `#FFD1DC` |
| Pastel Brown  | `#FAF5EE` → `#E6CBA8` |
| Pastel Gray   | `#F8F8F8` → `#E0E0E0` |
| Pastel White  | `#FFFFFF` → `#FAFAFA` |

```

## Configuração básica launch VSCode
Para rodar o projeto diretamente pelo VSCode, crie uma pasta na raiz do projeto chamada .vscode, dentro um arquivo chamado launch.json e cole o json abaixo.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Vite React App",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run",
        "dev"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Material UI migração de componestes
DataGrid -> Grid        - Parcial (falta styling)
Toast -> Snackbar       - Pendente
Buttons                 - Pendente
Modal                   - Pendente
Drawer                  - Parcial (falta trocar elementos internos)
Bootstrap grid -> Grid  - Pendente
