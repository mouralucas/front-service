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
Azul Pastel: #ADD8E6 (Light blue)
Verde Pastel: #77DD77 (Light green)
Rosa Pastel: #FFB6C1 (Light pink)
Amarelo Pastel: #FFFACD (Lemon chiffon)
Lilás Pastel: #C8A2C8 (Lilac)
Pêssego Pastel: #FFDAB9 (Peach puff)
Menta Pastel: #98FF98 (Mint green)
Lavanda Pastel: #E6E6FA (Lavender)
Salmão Pastel: #FFA07A (Light salmon)
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