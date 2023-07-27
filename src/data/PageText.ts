export interface Content {
  title: string;
  main: string;
  prevs: string[];
}

export interface PageTextContent {
  items: Array<Content>;
  contentTitle: string;
}

interface ConverterPageText {
  warning: string;
  title: string;
  textContent: PageTextContent;
  alphaText: string;
}

interface AddTabText {
  title: string;
  name: string;
  namePlaceholder: string;
  submit: string;
}

interface HomeBanner {
  title: string;
  txt1: string;
  txt2: string;
}

interface Home {
  links: [string, string, string];
  bannerDefault: HomeBanner;
  banner1: HomeBanner;
  banner2: HomeBanner;
  banner3: HomeBanner;
}

interface GradientPageText {
  canvasButtonsText: string[];
  colorListTitle: string;
  colorListAddText: string;
  gradientTypes: string[];
  stopsText: string;
  centerText: string;
  directionText: [string, string];
  transparentText: string;
  copyToClipboardText: string;
  optionTitle: string;
  gradientTypeTitle: string;
  addTabText: AddTabText;
  textContent: PageTextContent;
  canvasCallToAction: string;
}

interface PalletePageText {
  title: string;
  textContent: PageTextContent;
  colorListTitle: string;
  cssCopyTitle: string;
}

export interface Data {
  home: Home;
  converterPage: ConverterPageText;
  gradientPage: GradientPageText;
  palletePage: PalletePageText;
  canvasNotSupported: string;
  routes: string[];
  loading: string;
}

const dataPT: Data = {
  home: {
    links: ["Conversor de Cores", "Gerador de Degradê", "Gerador de Paletas"],
    bannerDefault: {
      title: "Selecione um APP",
      txt1: `Colour é o melhor gerenciador de cores da internet, com ele você pode
        criar paletas degradês e converter cores de forma simples, rápida e
        intuitiva.`,
      txt2: ` Oferecemos diversas opções de customização para cada ferramenta, bem
        como um texto auxiliar sobre os termos relacionados a elas.`,
    },
    banner1: {
      title: "Conversor de Cores",
      txt1: `Converta cores rapidamente entre quatro formatos diferentes utilizando o
        nosso conversor!`,
      txt2: `Aceitamos Conversões entre os formatos RGB(HEX),HSL e CMYK, incluindo
        transparência.`,
    },
    banner2: {
      title: "Gerador de Degradê",
      txt1: `Crie degradês de forma simples e intuitiva os desenhando como você os
        quer!`,
      txt2: `A nossa ferramenta permite a criação de diversos tipos de degradê, com
        diversas opções de customização.`,
    },
    banner3: {
      title: "Gerador de Paletas",
      txt1: `Crie Paletas de cores para o seu projeto facilmente com o nosso criador
        de paletas!`,
      txt2: ` Oferecemos possibilidades em muitos tipos de paletas, com grande
        variação entre elas.`,
    },
  },
  loading: "Carregando",
  palletePage: {
    title: "Gerador de Paletas",
    textContent: {
      contentTitle: "Principais Tipos de Paletas",
      items: [
        {
          title: "### Análogo",
          main: `O Tipo mais simples de paleta. Consiste em cores que são **próximas da cor principal na roda de cores**.`,
          prevs: ["#3c1de7", "#1c73e8", "#1c38e7", "#771be6", "#b11be7"],
        },
        {
          title: "### Monocromático",
          main: `Consiste em **vários tons da mesma cor**, uns mais escuros, outros mais claros`,
          prevs: ["#3c1de7", "#78729a", "#685cad", "#5947c1", "#4931d4"],
        },
        {
          title: "### Complementar",
          main: `Consiste na **cor oposta à cor principal**, em diferentes tons.`,
          prevs: ["#3c1de7", "#9b8e73", "#ae945d", "#c19947", "#d49d32"],
        },
        {
          title: "### Tríade",
          main: `Consiste em **duas cores, com a mesma distância entre si e da cor principal**, em diferentes tons`,
          prevs: ["#3c1de7", "#3fe71b", "#57c740", "#e71c1c", "#c74040"],
        },
        {
          title: "### Quadrado",
          main: `Consiste em **três cores, posicionadas de um jeito a formar uma cruz onde uma das pontas é a cor principal.**`,
          prevs: ["#3c1de7", "#e7a31c", "#1be76e", "#e61c2f", "#c79940"],
        },
        {
          title: "### Composto",
          main: `Consiste em **quatro cores, opostas pelo ângulo**, de um jeito a formar um K`,
          prevs: ["#3c1de7", "#e7dc1c", "#1c38e7", "#7ae71b", "#1baee7"],
        },
        {
          title: "### Dividir Complementar",
          main: `Consiste em **duas cores opostas a cor principal**, divididas a formar uma letra Y`,
          prevs: ["#3c1de7", "#b7e71b", "#e72a1b", "#a8c740", "#c84a40"],
        },
        {
          title: "### Dividr Complementar duas vezes",
          main: `Consiste em **duas cores opostas a cor principal, e das cores opostas à estas**, formando um X`,
          prevs: ["#3c1de7", "#1c73e8", "#e72a1b", "#b11be7", "#b7e71b"],
        },
      ],
    },
    cssCopyTitle: "Código CSS",
    colorListTitle: "Lista de Cores",
  },
  canvasNotSupported: "Canvas Não Suportado",
  gradientPage: {
    canvasCallToAction: "Desenhe Aqui!",
    transparentText: "Transparente",
    canvasButtonsText: ["Apagar Tudo", "Mostrar Resultado", "Apagar Canvas"],
    colorListAddText: "Adicione uma nova cor...",
    colorListTitle: "Cores: ",
    gradientTypeTitle: "Tipo do Degradê",
    gradientTypes: ["Linear", "Radial", "Cônico"],
    addTabText: {
      title: "Criar Nova Degradê:",
      name: "Nome",
      namePlaceholder: "Nome Do Degradê",
      submit: "Criar",
    },
    copyToClipboardText: "Copiar CSS",
    stopsText: "Transições de Cor:",
    centerText: "Centro",
    directionText: ["Direção", "Graus"],
    optionTitle: "Configurações do Degradê:",
    textContent: {
      contentTitle: "Principais tipos de degradê",

      items: [
        {
          title: "### Linear Gradient(Degradê linear)",
          main: `
O tipo mais simples de degradê, consiste simplesmente em **múltiplos retângulos de diferentes tamanhos e cores seguidos uns dos outros** e as transições entre eles.\n

Esses degradês, apesar de parecerem simples à primeira vista, podem ser bem difíceis de se masterizar e fazer bom uso deles, por exemplo, eles podem ser rotacionados ou sobrepostos por outro degradê para permitir a criação de desenhos e artes mais complexas.\n

Para mais informações, acesse: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient).\n
        `,
          prevs: [
            "linear-gradient(to right, #f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)",
          ],
        },
        {
          title: "### Radial Gradient(Degradê radial)",
          main: `
Outro tipo de degradê, **ele consiste em círculos concêntricos, de diferentes tamanhos e cores, sobrepostos um pelo outro, e a transição de cores entre eles**.\n

Esses são mais difíceis de se usar e aprender, mas se bem usados, te permitem por exemplo reproduzir a incidência de luz sobre um objeto, onde a luz fica mais fraca conforme se afasta do centro do degradê.\n

Para mais informações acesse: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient).\n
          
`,
          prevs: [
            "radial-gradient(circle at center, rgba(255,255,255,1),rgba(255,255,255,0)\n",
          ],
        },
        {
          title: "### Conic Gradient(degradê cônico)",
          main: `
Esses degradês são de longe os mais úteis!, **eles consistem em um círculo dividido em setores circulares de diferentes cores e tamanhos e a transição entre eles**.Para fazer bom uso deles, ainda assim, um bom conhecimento sobre **ciclos trigonômétricos** se faz necessário para alcançar o seu verdadeiro potencial.\n
  
Você os pode usar para criar gráficos de pizza, paletas de cores, animações, barras de progresso, etc.\n

Para mais informações, acesse: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient).\n
        
        `,
          prevs: ["conic-gradient(#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)"],
        },
      ],
    },
  },
  converterPage: {
    alphaText: "Consegue Me ver?",
    title: "Conversor de Cores",
    warning: "Pode haver uma pequena imprecisão entre as conversões",
    textContent: {
      items: [
        {
          title: "### RGB(Vermelho, Verde, Azul)",
          main: `
O Modelo de cores RGB é **uma das formas mais comuns** de se representar cores numericamente.\n
          
Ele se Baseia em **3 números que variam entre 0 e 255**(1 byte para cada número), cada número representando respectivamente as cores vermelho, verde e azul(red, green,blue).\n
          
Opcionalmente, temos o RGBA, que adiciona um quarto valor ao grupo, responsável pela **transparência daquela cor**, este valor varia entre 0 e 1 no caso do RGB.\n
`,
          prevs: ["rgb(34,152,23)", "rgb(34,152,23,0.5)"],
        },
        {
          title: "### Hexadecimal",
          main: `
O Hexadecimal **não fora criado exclusivamente para representação de cores**, apesar de poder ser usado como tal e uma das formas mais comuns de se fazê-lo, é possível encontrá-lo por exemplo em hashes geradas pelo GIT.\n
         
No caso da representação de cores, é **simplesmente uma forma diferente de se escrever um RGB**. Ele é caracterizado por ** uma hashtag seguida de 3,4,6 ou 8 caracteres hexadecimais(0-9 e a-f)**.\n
         
Apesar de ser comumente escrito com 6 caracteres(2 para cada cor), temos a forma resumida, com 3 caracteres(1 para cada cor), e se quisermos adicionar transparência, podemos usar dois(um na forma resumida, ficando com 4) caracteres adicionais para indicar sua intensidade.\n `,
          prevs: ["#ff9900", "#c09576"],
        },
        {
          title: "### HSL",
          main: `
O HSL(Hue, Saturation, Lightness) é um modelo de cores que fora criado principalmente devido a **dificuldade de leitura do RGB**.\n

Ele se baseia numa **roda de cores primárias e secundárias**, onde Hue(matiz) é comumente um número de 0 a 360 graus representando um ponto nessa roda, Saturation e Lightness por sua vez são percentuais.\n

No caso da saturação quanto mais próxima de 100, mais viva é a cor resultante, e no caso da luminosidade, quanto mais próxima de 0, mais escura é a cor resultante.\n

Opcionalmente, podemos **adicionar transparência com HSLA**, no caso deste modelo de cor, a ** transparência é representada por um percentual**, a fim de combinar com os demais valores.\n`,
          prevs: ["hsl(30deg, 40%, 50%)", "hsla(180deg,50%,30%,80%)"],
        },
        {
          title: "### CMYK",
          main: `
O CMYK(Cyan, Magenta, Yellow e Black) é um modelo de cores geralmente usado em **impressoras**, e o único **não aceito nativamente pelo CSS** entre os 4 suportados pelo nosso conversor.\n

Entretanto, é possível alcançar isso com o uso dos **data-attributes providos pela W3**, uma vez incluído o script W3Color no seu projeto, Veja mais informações sobre em [Colors CMYK](https://www.w3schools.com/colors/colors_cmyk.asp).\n

Ele consiste em 4 percentuais de, respectivamente, **ciano, magenta, amarelo e preto**, que juntos são usados para formar a cor.\n

Ele tende a ser mais limitado que o RGB em questão de possibilidades, Justamente devido a seu uso mais restritivo a impressoras.\n
          `,
          prevs: ["cmyk(0%,14%,28%,47%)"],
        },
      ],

      contentTitle: "Principais Modelos de Cores",
    },
  },

  routes: ["Conversor de Cores", "Gerador de Degradê", "Gerador de Paletas"],
};

const dataEN: Data = {
  home: {
    links: ["Color Converter", "Gradient Generator", "Pallete Creator"],
    bannerDefault: {
      title: "Choose an app",
      txt1: `Colour is the best colour manager on the internet, with it, you can create color palletes, gradients and convert colors in a fast, simple, intuitive way.`,
      txt2: `We offer different types of customization for each tool, as well as an brief text explaining the concepts involved on that specific subject.`,
    },
    banner1: {
      title: "Color Converter",
      txt1: `Fastly convert colors between four different color models using our color converter`,
      txt2: `We accept conversions between RGB(HEX),HSL and CMYK with alpha(transparency) support.`,
    },
    banner2: {
      title: "Gradient Generator",
      txt1: `Easily create beautiful gradients using our gradient tool based on your canvas drawings`,
      txt2: `Our tool allows the building of many types of gradient with many types of customization for each one`,
    },
    banner3: {
      title: "Color Pallete Generator",
      txt1: `Choose color palletes for your design easily with our Pallete Creator`,
      txt2: `We offer options to build many types of palletes around the color wheel, from Analog to Divide Complementar`,
    },
  },
  loading: "Loading",
  palletePage: {
    title: "Pallete Creator",
    textContent: {
      contentTitle: "Main Pallete Types",
      items: [
        {
          title: "### Analog",
          main: `The most common type of pallete. Consists in colors **that are right next to the main color** in the color wheel.`,
          prevs: ["#3c1de7", "#1c73e8", "#1c38e7", "#771be6", "#b11be7"],
        },
        {
          title: "### Monocromatic",
          main: `Consists in **many tunes of the same color**, ones are darker, others are lighter`,
          prevs: ["#3c1de7", "#78729a", "#685cad", "#5947c1", "#4931d4"],
        },
        {
          title: "### Complementar",
          main: `Consists in the **opposite of the main color**, in different tunes.`,
          prevs: ["#3c1de7", "#9b8e73", "#ae945d", "#c19947", "#d49d32"],
        },
        {
          title: "### Triple",
          main: `Consists in **two colors, with the same distance between them and the main color**.`,
          prevs: ["#3c1de7", "#3fe71b", "#57c740", "#e71c1c", "#c74040"],
        },
        {
          title: "### Square",
          main: `Consists in **three colors, forming a cross where one end is the main color**.`,
          prevs: ["#3c1de7", "#e7a31c", "#1be76e", "#e61c2f", "#c79940"],
        },
        {
          title: "### Composite",
          main: `Consists in **four colors, two outer and two inner, opposites between them**, forming a K`,
          prevs: ["#3c1de7", "#e7dc1c", "#1c38e7", "#7ae71b", "#1baee7"],
        },
        {
          title: "### Divide Complementar",
          main: `Consists in **two colors opposites of the main color**, forming an Y`,
          prevs: ["#3c1de7", "#b7e71b", "#e72a1b", "#a8c740", "#c84a40"],
        },
        {
          title: "### Divide Complementar Twice",
          main: `Consists in **two colors opposites of the main color, and two other colors opposite to these two**, forming an X`,
          prevs: ["#3c1de7", "#1c73e8", "#e72a1b", "#b11be7", "#b7e71b"],
        },
      ],
    },
    cssCopyTitle: "Copy CSS",
    colorListTitle: "Color List",
  },

  canvasNotSupported: "Canvas Not Supported",
  gradientPage: {
    canvasCallToAction: "Draw Here!",
    transparentText: "Transparent",
    canvasButtonsText: ["Clear All", "Show Result", "Clear Canvas"],
    colorListAddText: "Add a new color...",
    colorListTitle: "Colors: ",
    gradientTypeTitle: "Gradient Type:",
    gradientTypes: ["Linear", "Radial", "Conic"],
    addTabText: {
      title: "Create New Gradient:",
      name: "Name",
      namePlaceholder: "Gradient Name",
      submit: "Create",
    },
    copyToClipboardText: "Copy CSS",
    stopsText: "Color Transitions:",
    centerText: "Center",
    directionText: ["Direction", "deg"],
    optionTitle: "Gradient Config: ",
    textContent: {
      contentTitle: "Main Gradient Types",
      items: [
        {
          title: "### Linear Gradient",
          main: `
The most simplier type of gradient, it consists simply in **multiple rectangles of different colors and sizes followed one by each other and the transitions between them**.\n
        
These gradients, although very simple to understand at first, can be very hard to mastery and make a good use of them, for example, they can be overlapped and rotated by another gradient to make more complex drawings and artworks.\n
        
For more information, access [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient).\n
        `,
          prevs: [
            "linear-gradient(to right, #f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)",
          ],
        },
        {
          title: "### Radial Gradient",
          main: `
Another Type of gradient, **it consists on concentric circles, with different sizes and colors, overlapping each other, and the color transition between them**.\n
  
These are a bit harder to use, but when used well, allow you to make for example **the light incidence over an object**, where the light gets weaker the far it gets from the center.\n

For more information, access [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient).\n
          `,
          prevs: [
            "radial-gradient(circle at center, rgba(255,255,255,1),rgba(255,255,255,0)",
          ],
        },
        {
          title: "### Conic Gradient",
          main: `
These Gradients are by far one of the most useful ones, and maybe the hardest to learn too, **they consist in circle sectors of different sizes and colors and the transition between them**. to make the best use of them, though, a good knowledge about **trigonometric cycles** is required to reach its full potential.\n

You can use them for pie charts, color wheels, animations, progress bars, etc.\n

For more information, access [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient).\n
        
        `,
          prevs: ["conic-gradient(#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)"],
        },
      ],
    },
  },
  converterPage: {
    alphaText: "Can you see me?",
    title: "Color Converter",
    warning: "There may have a little imprecision between conversions",
    textContent: {
      items: [
        {
          title: "RGB(Red, Green, Blue)",
          main: `
The RGB color model is **one of the most common ways** to represent colors numerically.\n

It is based on **three numbers ranging from zero to 255(one byte per number 2**8=256)**, each number represents respectively red, green and blue.\n

Opcionally, we Have the RGBA color model, which adds a fourth value called alpha(the transparency of the color), this value ranges between 0 and 1 in case of RGB.\n
          `,
          prevs: ["rgb(34,152,23)", "rgba(34,152,23,0.5)"],
        },
        {
          title: "Hexadecimal(HEX)",
          main: `
The Hexadecimal was not mainly created for representing colors, despite being one of the most common ways to do so.\n

It is based on a hashtag, followed by 3 or 6 characters ranging from 0-9 and a-f, it's just another way to write a RGB color code.\n

Despite being commonly wrote with six char length(two for each color), we can write it with just 3 characters(one for each color), with quite a loss of precision.\n

If we want to insert an alpha value, we can write our hex code with 4 or 8 characters length, where the additional characters are an hex value representing the alpha value.\n`,
          prevs: ["#f90", "#f908", "#ff9900", "#c09576", "#ff990099"],
        },
        {
          title: "HSL(Hue, Saturation, Lightness)",
          main: `
          
The HSL(Hue Saturation Lightness) is an color model that was originally created because of the lack of readability on the RGB color model.\n
          
It is based on a color wheel including all primary and secondary colors, where Hue is a number between 0 and 360 degrees representing a point in this wheel. Saturation and Lightness, by the way, are percentages.\n
    
When increasing the saturation, the more vibrant the result will be, otherwise, it shall looks more dead and weak.\n
    
When Increasing the luminosity, the brighter the result will be, otherwise, it shall looks darker.\n
    
Optionally we have HSLA, which adds a fourth value for the alpha(the transparency of the color), here, its a percentage for matching the other values.\n
          `,
          prevs: ["hsl(30deg, 40%, 50%)", "hsla(180deg,50%,30%,80%)"],
        },
        {
          title: "CMYK(Cyan, Magenta, Yellow and Black)",
          main: `
CMYK(Cyan Magenta, Yellow and Black) its a color model often used for printing, and the unique not accepted natively in CSS among the four color models accepted by our converter.\n

However, you can achieve this by using the data-attributes provided by the W3Color script, read more about this in [Colors CMYK](https://www.w3schools.com/colors/colors_cmyk.asp).\n

Anyway, it consists on four percentage values of respectively cyan, magenta, yellow and black which are mixed together to form the color.\n
    
It Tends to have a smaller color range than RGB or even HSL, precisely due to being mainly used for printing.\n
          
Another problem about it's that usually there's no direct conversion between CMYK and HSL,then, to achieve this, we must use RGB as an intermediary(CMYK > RGB > HSL) or (HSL > RGB > CMYK).\n
          
          `,
          prevs: [
            "cmyk(0%,14%,28%,47%)",
            "cmyk(28%,0%,37%,22%)",
            "cmyk(42%,55%%,0%,22%)",
          ],
        },
      ],
      contentTitle: "Main Color Models",
    },
  },
  routes: ["Color Converter", "Gradient Generator", "Pallete Creator"],
};

export { dataPT, dataEN };
