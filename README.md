# Colour
Projeto de gerenciador de cores utilizando React


## História do projeto

Este projeto foi o meu primeiro projeto utilizando React logo após terminar um curso sobre a tecnologia,
eu não tinha nenhuma noção de Web Design na época. porém, eu já tinha demonstrado algum interesse na Canvas API do HTML.

Assim, resolvi unir o útil ao agradável, o desafio era criar um projeto de um gerenciador de cores inspirado no Color.adobe.com

## O que eu Aprendi

- Aprimorei o meu conhecimento básico sobre o React(Hooks, Componentes,JSX, etc)
- Desenhar no HTML Canvas usando Javascript via Canvas API
- Integrar o uso do Canvas com o React através do uso de Refs
- Ciclos trigonométricos para conseguir desenhar círculos e setores circulares no Canvas
- Utilizar a Clipboard API do Javascript para implementar uma funcionalidade de Copiar e Colar
- Implementar um sistema de guias similar ao navegador para permitir vários degradês ao mesmo tempo
- Princípios básicos de teoria das cores e criação de paletas
- Algorítimos de conversão entre diferentes formatos de representação de cores(HEX,RGB,CMYK,HSL)
- Aprendi a implementar suporte a vários idiomas diferentes na mesma página.
- Desenvolver uma breve explicação sobre cada formato de cor, tipo diferente de degradê e tipo diferente de paleta
- Desenvolvimento de páginas responsivas utilizando React
- Hospedar projetos feitos com React utilizando Github Pages

###As principais Libs e tecnologias usadas neste projeto foram:

`react` `react-syntax-highlighter` `react-markdown` `react-icons` `react-router` `sass` `typescript`

___
## Falhas do projeto

- Web design terrível, Muitas bordas arredondadas, escolha de fonte, espaçamentos e tamanho dos elementos inconsistentes
- Design de interface pouco intuitivo e confuso, novos usuários podem ter dificuldade ao utilizar a plataforma

___

## Como executar o projeto

Para rodar este projeto localmente, simplesmente clone o repositório e rode nessa sequência os comandos:
```bash
npm install
npm run start
```

Ele também está disponível neste [Link](https://redlintles.github.io/Colour/).
___

## Descrição do projeto

**Este Projeto Não rodará apropriadamente se o navegador não possuir suporte a HTML Canvas.**

## Este Projeto Consiste num gerenciador de cores com **três ferramentas**.
Todos elas possuem textos auxliares abaixo que explicam alguns termos usados no contexo da ferramenta.
___

### Conversor de Cores

Um Conversor de Cores simples utilizando canvas, com ele se torna possível converter cores entre RGB(HEX) HSL e CMYK.

Além disso, também é possível fazer a conversão considerando a transparência das cores a partir do campo à direita.

___

### Gerador de degradê

Uma ferramenta para criação de degradês simples a partir de desenhos no canvas do lado direito, **nos formatos linear, radial e cônico.**

Além disso, é possível copiar o CSS criado pelo gerador, responsável por representar aquele degradê em código CSS.

Finalmente, o usuário também pode optar por um degradê reto(sem transições de cor), ou um degradê padrão, com as devidas transições entre as cores.


___

### Gerador de Paleta de cores

Esta ferramenta permite a criação de paletas de até 5 cores, a partir de um ponto escolhido na roda de cores na esquerda.

Oito formatos de paletas são suportados pela ferramenta.

1. Análogo
2. Monocromático
3. Complementar
4. Tríade
5. Quadrado
6. Composto
7. Dividir Complementar
8. Dividir Complementar duas vezes

Além disso, também é possível alterar a roda de cores para trabalhar com a saturação ou a luminosidade facilmente.







