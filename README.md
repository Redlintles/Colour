# Colour
Projeto de gerenciador de cores utilizando React

Para rodar este projeto localmente, simplesmente clone o repositório e rode nessa sequência os comandos:
```bash
npm install
npm run start
```

As principais Libs e tecnologias usadas neste projeto foram:

`react` `react-syntax-highlighter` `react-markdown` `react-icons` `react-router` `sass` `typescript`

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







