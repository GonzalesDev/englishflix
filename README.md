# EnglishFlix

Site para praticar inglês com quatro formas de estudo:

- **Chat Roleplay**: simulações de conversas (restaurante, aeroporto, entrevista etc.) com uma IA, que dá dicas de correção em português.
- **Flashcards**: baralhos temáticos com revisão. Cartões errados voltam para a fila.
- **Music Lab**: trechos de músicas com lacunas para preencher, junto com o vídeo.
- **Space Words**: jogo arcade em que você digita a tradução para destruir meteoros.

## Estrutura

```
index.html          Estrutura da página
css/styles.css      Estilos (tema escuro)
js/config.js        Configuração da API (chave e modelo)
js/utils.js         Funções auxiliares (escape de HTML, comparação de respostas)
js/navigation.js    Troca entre as abas
js/chat.js          Módulo Chat Roleplay
js/music.js         Módulo Music Lab
js/flashcards.js    Módulo Flashcards
js/space.js         Módulo Space Words
js/main.js          Inicialização
js/data/            Conteúdo: cenários, músicas e baralhos
```

Os scripts são carregados em ordem no `index.html`, sem build nem dependências.

## Rodando localmente

Abra o `index.html` no navegador, ou sirva a pasta com qualquer servidor estático.

Para o Chat Roleplay funcionar, preencha `API_KEY` em `js/config.js`.

> **Atenção:** a chave não deve ser publicada. Enquanto a chamada for feita direto do navegador, qualquer pessoa consegue ver a chave no código. Para publicar o site, mova a chamada à API para um backend (função serverless) que guarda a chave no servidor.

## Conteúdo a revisar

- As letras de músicas em `js/data/musicas.js` são de artistas protegidos por direitos autorais. Antes de publicar, substitua por trechos curtos, exercícios com licença livre ou conteúdo próprio.
- Algumas imagens (cenários, artistas) e o GIF de explosão são carregados de sites externos. Confira a licença antes de publicar.
