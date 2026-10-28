# Planejamento: aba Séries com dois modos

## 1. Visão geral

A aba **Séries** passa a ter dois modos, escolhidos pelo usuário no topo da tela:

| Modo | Para quê | Exemplo |
|---|---|---|
| **Dia a Dia** | Situações reais e cotidianas, para praticar o inglês que aparece na vida | Restaurante, aeroporto, consulta médica |
| **Universos** | Histórias fictícias e fora do comum, para se divertir enquanto pratica | Uma nave cargueira com problema, um trem noturno com mistério |

Os dois modos usam o mesmo motor de conversa, o mesmo sistema de XP e as mesmas legendas de correção. Só mudam o cenário, o tom e a fala da IA.

## 2. Regra importante: universos originais

Os universos do modo Universos são **criados do zero**, com personagens, lugares e nomes próprios. Eles podem seguir gêneros populares (ficção científica, espionagem, fantasia, mistério), mas **não usam personagens, nomes, frases ou cenas de obras existentes**. Isso evita problemas de direitos autorais e de marca, e também deixa o produto próprio.

## 3. Nomes e temas — Dia a Dia (realista)

Os 10 cenários atuais continuam, com pequenos ajustes de título:

1. 🍽️ Jantar em Nova York
2. ✈️ Controle de Imigração em Londres
3. 🗺️ Perdido no Centro de Nova York
4. 🏨 Check-in em Miami
5. 🚕 Corrida de Táxi em Chicago
6. 🛍️ Compras em Los Angeles
7. ☕ Pedido na Cafeteria de Boston
8. 💊 Farmácia em Dublin
9. 🩺 Consulta em Toronto
10. 🚨 Boletim de Ocorrência em Sydney
11. 🗣️ Papo na Festa em Austin
12. 💼 Entrevista em São Francisco
13. 🛒 Caixa do Supermercado em Londres

## 4. Nomes e temas — Universos (fictício)

Cada universo tem uma **temporada** com 3 episódios. Os nomes abaixo são originais.

| Universo | Gênero | Premissa resumida | Personagem da IA |
|---|---|---|---|
| **Cargueiro Nimbus** | Ficção científica | Uma nave de carga perdeu energia no meio de um cinturão de asteroides. Você precisa convencer a tripulação a seguir o seu plano. | Capitã Ilse Varo, cansada e desconfiada |
| **O Último Trem de Veridia** | Mistério noir | Um trem noturno, uma passageira desaparecida e três suspeitos. Você é o novo fiscal de bordo. | Inspetor Owen Crane, calmo e observador |
| **Operação Gelo Azul** | Assalto | Uma equipe vai abrir um cofre num porto gelado. Você é o especialista em alarmes e precisa coordenar o plano. | Mara Quill, líder da equipe, muito direta |
| **Reino das Cinzas** | Fantasia | Você é a embaixadora de uma cidade flutuante e precisa negociar um tratado com o conselho de magos. | Conselheiro Teodrin, formal e cheio de condições |
| **Pulso Zero** | Cyberpunk | Um apagão tomou a cidade. Você é uma hacker novata e precisa dar acesso ao sistema de energia a um cliente misterioso. | Vex, um contato anônimo que só fala por mensagens |
| **Pousada das Três Luas** | Fantasia leve | Uma pousada num planeta com três luas. O hóspede chegou fora de hora e a recepcionista precisa resolver o problema. | Olu, recepcionista bem-humorada de outro planeta |

Os temas gerais de cada universo estão nos nomes acima. Se você quiser temas mais específicos (espionagem, terror leve, aventura de exploração), posso criar mais universos.

## 5. Como a conversa funciona

### 5.1 Objetivo por episódio

Cada episódio tem **uma missão clara**, mostrada no topo. Exemplo:

> *Missão: convença a capitã a deixar você verificar o reator.*

O usuário vê a missão desde o início. A IA avalia, em cada resposta, se a missão avançou. Quando chega ao fim, o episódio é concluído.

### 5.2 Formato da resposta da IA

A IA responde sempre em formato estruturado, para que o app consiga mostrar a fala, a dica e o progresso sem depender de texto solto:

```json
{
  "fala": "Reactor's offline. Why should I trust you with it?",
  "dica": "Para pedir permissão, use 'Can I...?' ou 'Would it be possible to...?'",
  "missaoProgresso": 1,
  "missaoConcluida": false,
  "opcoes": ["I'm a certified engineer.", "Let me show you my plan."]
}
```

- **fala:** o que o personagem diz (em inglês).
- **dica:** a correção ou sugestão, em português, exibida nas Legendas.
- **missaoProgresso:** de 0 a 3, mostrado como barra.
- **opcoes:** respostas rápidas opcionais, para iniciantes. Podem ser desligadas.

### 5.3 Níveis de dificuldade

- **Iniciante (A2):** a IA fala devagar, usa frases curtas, e as opções rápidas ficam sempre visíveis.
- **Intermediário (B1):** frases normais, opções rápidas só quando o usuário pede ajuda.
- **Avançado (B2+):** sem opções rápidas, mais gírias e expressões.

### 5.4 Aprendizado depois do episódio

Ao final de cada episódio, o app mostra um **resumo**:
- Vocabulário usado na cena, com tradução.
- Erros mais frequentes, com a forma correta.
- Cartas novas que entram na aba Cartas (flashcards).

## 6. Sistema de progresso

- **XP** por mensagem e bônus por missão concluída.
- **Estrelas** por episódio: 1 a 3, conforme quantas dicas o usuário precisou.
- **Temporadas:** cada universo libera o próximo episódio ao concluir o anterior.
- **Sequência de dias** continua igual à versão atual.

## 7. Itens a definir antes de implementar

1. **Número de episódios por temporada:** sugiro 3 para começar.
2. **Opções rápidas:** ligadas por padrão para iniciantes, ou só quando o usuário ativar?
3. **Idioma das dicas:** português, como hoje?
4. **Quantos universos na primeira versão:** sugiro os 6 listados acima.
5. **Persistência:** o progresso continua no navegador, como na versão atual.

## 8. Ordem de implementação (depois de aprovado)

1. Trocar o seletor de modo (Dia a Dia / Universos) e a grade de cada modo.
2. Adaptar o motor de conversa para o formato estruturado (fala, dica, missão, opções).
3. Criar os primeiros 2 universos com 3 episódios cada, para testar.
4. Adicionar as estrelas, o resumo do episódio e a liberação de temporadas.
5. Criar os demais universos.
