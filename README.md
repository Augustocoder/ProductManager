<h1 align="center"> 👮🔧  ProductManager  1.0 🔧👮 </h1>
<div align="center">
    <img align="center" src="https://prosperaerp.com/blog/wp-content/uploads/2022/05/organiza-estoque.treinamento.gif" style="border-radius: 10px" height="300">
</div>

## Sobre o ProductManager
Integre o ProductManager para simplificar a gestão de estoque. Ele monitora a quantidade de produtos, alertando sobre reposições necessárias e garantindo eficiência no estoque. Fácil de implementar, oferece controle prático, sem necessidade inicial de banco de dados. Além disso, ao tentar uma venda, ele informa instantaneamente sobre a disponibilidade do produto no estoque.

## Requisitos

<div style="display:flex; flex-direction:column; font-weight:bold">
<a href="https://nodejs.org/en" style="font-size:16px; font-style:italic">Node.JS</a>
</div>

## Instalação Linux

```bash
    git clone https://github.com/Augustocoder/ProductManager.git
```

```bash
    npm i --save-dev
```

<h4>Caso ainda não esteja funcionando</h4>

```bash
    npm i --save-dev @types/express #Instala o Express para que o código possa rodar o servidor e realizar as nossas rotas.
```

```bash
    npm i --save-dev  fs #Instala o fs para o código poder ler e sobrescrever os processos no arquivo JSON.
```

```bash
    npm i --save-dev zod #Instala a dependência ZOD para validação de entrada.
```

```bash
    npm run build # Compila para .JS
```

```bash
    npm run start # Roda o server
```

## Instalação / Inicialização Windows
Na instalação do Windows realizei um breve código em C, que enconomiza tempo na hora de instalar e rodar o servidor.
```bash
install.exe #Faz os mesmos comandos de instalação de dependências, mas em um único clique.
``` 
Para inicializar o servidor, basta executar o arquivo "iniciarServe.exe".
```bash
iniciarServer.exe #Faz a mesma coisa do que os penúltimos comandos de cima.
```
## Documentação da API
#### Antes de utilizar, por favor, apague os dados que vêm no arquivo "/databaseJSON/produtos.json" e apenas deixe "{}", pois para fins de teste já vêm como padrão alguns produtos!

### Consultar Estoque de um Produto:

```http
GET /estoque/${id} HTTP/1.1
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `id`  | `int` | **Obrigatório**. ID do produto. |

### Exemplo de saída:

```json
{
    "nome": "Notebook Dell Inspiron 15",
    "quantidade": 10
}
```

### Adicionar  um Produto:

```http
POST /produtos/add HTTP/1.1

{
    "nome": "Mochila Targus CitySmart EVA Pro",
    "descricao": "A mochila Targus CitySmart EVA Pro é resistente à água, possui compartimento acolchoado para laptop de até 15,6 polegadas, e diversos bolsos organizadores.",
    "quantidade": 10
}
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `nome`  | `string` | **Obrigatório**. Nome do produto. |
| `descricao`  | `string` | **Obrigatório**. Descrição do produto. |
| `quantidade`  | `int` | **Obrigatório**. Valor do produto. |

### Exemplo de saída:

```json
{
    "id": "1",
    "nome": "Mochila Targus CitySmart EVA Pro",
    "descricao": "A mochila Targus CitySmart EVA Pro é resistente à água, possui compartimento acolchoado para laptop de até 15,6 polegadas, e diversos bolsos organizadores.",
    "quantidade": 10
}
```

### Puxa todos os produtos:

```http
GET /produtos HTTP/1.1
```


### Exemplo de saída:

```json
// Retorno de todos os produtos cadastrados!
[
    {
        "id": 0,
        "nome": "Smartphone iPhone 13",
        "descricao": "O iPhone 13 traz uma tela Super Retina XDR de 6,1 polegadas, processador A15 Bionic, câmera dupla 12 MP, resistência à água e poeira.",
        "quantidade": 121
    },
    {
        "id": 1,
        "nome": "Notebook Dell Inspiron 15",
        "descricao": "O notebook Dell Inspiron 15 vem com processador Intel Core i5, 8GB de RAM, tela de 15,6 polegadas Full HD, e armazenamento SSD de 256GB.",
        "quantidade": 10
    },
    {
        "id": 2,
        "nome": "Smart TV Samsung QLED 55\"",
        "descricao": "A Smart TV Samsung QLED de 55 polegadas oferece qualidade de imagem 4K, tecnologia de pontos quânticos, sistema operacional Tizen, e controle remoto com comando de voz.",
        "quantidade": 14
    },
    {
        "id": 3,
        "nome": "Câmera Canon EOS Rebel T7i",
        "descricao": "A câmera Canon EOS Rebel T7i é uma DSLR com sensor CMOS de 24,2 MP, processador DIGIC 7, gravação de vídeo Full HD, e tela de toque articulada.",
        "quantidade": 35
    },
]
```

### Busca por nome semelhante/específico:

```http
GET /produtos/busca/?nome=${nome} HTTP/1.1
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `nome`  | `string` | **Obrigatório**. Nome do produto. |

### Exemplo de saída:

```json
// Aqui a palavra "Smart" é um exemplo de busca, então, o retorno será os produtos que contenham a palavra "Smart" no nome.
[
    {
        "id": 0,
        "nome": "Smartphone iPhone 13",
        "descricao": "O iPhone 13 traz uma tela Super Retina XDR de 6,1 polegadas, processador A15 Bionic, câmera dupla 12 MP, resistência à água e poeira.",
        "quantidade": 121
    },
    {
        "id": 2,
        "nome": "Smart TV Samsung QLED 55\"",
        "descricao": "A Smart TV Samsung QLED de 55 polegadas oferece qualidade de imagem 4K, tecnologia de pontos quânticos, sistema operacional Tizen, e controle remoto com comando de voz.",
        "quantidade": 14
    },
    {
        "id": 14,
        "nome": "Smartwatch Apple Watch Series 7",
        "descricao": "O smartwatch Apple Watch Series 7 possui tela sempre ligada, monitoramento avançado de saúde, resistência à água, e conexão 4G.",
        "quantidade": 6
    },
    {
        "id": 16,
        "nome": "Mochila Targus CitySmart EVA Pro",
        "descricao": "A mochila Targus CitySmart EVA Pro é resistente à água, possui compartimento acolchoado para laptop de até 15,6 polegadas, e diversos bolsos organizadores.",
        "quantidade": 10
    }
]
```

### Retorna um produto específico pelo ID:

```http
GET /produtos/${id} HTTP/1.1
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `id`  | `int` | **Obrigatório**. ID do produto. |

### Exemplo de saída:

```json
{
    "id": "1",
    "nome": "Mochila Targus CitySmart EVA Pro",
    "descricao": "A mochila Targus CitySmart EVA Pro é resistente à água, possui compartimento acolchoado para laptop de até 15,6 polegadas, e diversos bolsos organizadores.",
    "quantidade": 10
}
```

### Atualização cadastral de um produto específico pelo ID:

```http
PUT /produtos/${id} HTTP/1.1

{
    "nome": "Mochila Targus CitySmart EVA Pro",
    "descricao": "A mochila Targus CitySmart EVA Pro é resistente à água, possui compartimento acolchoado para laptop de até 15,6 polegadas, e diversos bolsos organizadores.",
    "quantidade": 20
}
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `id`  | `int` | **Obrigatório**. ID do produto. |
| `nome`  | `string` | **Obrigatório**. Nome do produto. |
| `Descrição do Produto`  | `string` | **Obrigatório**. Descrição do produto. |
| `Quantidade`  | `int` | **Obrigatório**. Descrição do produto. |


### Exemplo de saída:

```json
{
    "id": "1",
    "nome": "Mochila Targus CitySmart EVA Pro",
    "descricao": "A mochila Targus CitySmart EVA Pro é resistente à água, possui compartimento acolchoado para laptop de até 15,6 polegadas, e diversos bolsos organizadores.",
    "quantidade": 20
}
```
### Deletar um produto específico pelo ID:

```http
DELETE /produtos/${id} HTTP/1.1
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `id`  | `int` | **Obrigatório**. ID do produto. |

### Exemplo de saída:

```http
Response 204 (No Content) // Status Code do Response.
```

### Venda de um produto específico pelo ID:

```http
POST /vender/${id} HTTP/1.1

{
    "quantidade": 2
}

```
| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `id`  | `int` | **Obrigatório**. ID do produto. |
| `quantidade`  | `int` | **Obrigatório**. Quantidade do produto. |

### Exemplo de saída:

```JSON
    //Caso a quantidade de estoque for igual a 0, irá dar um erro de "Quantidade insuficiente em estoque"
    {
    "id": 2,
    "nome": "Smart TV Samsung QLED 55\"",
    "descricao": "A Smart TV Samsung QLED de 55 polegadas oferece qualidade de imagem 4K, tecnologia de pontos quânticos, sistema operacional Tizen, e controle remoto com comando de voz.",
    "quantidade": 12
}
```

## Suporte
Qualquer problemas ou algo do tipo, por favor, reportar que atualizo quanto antes!
