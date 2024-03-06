import express, { Request, Response } from "express";
import zod from "zod";
const fs = require("fs");

const App = express();
interface Produto {
  id: string;
  nome: string;
  descricao: string;
  quantidade: number;
}

const produtos: { [key: string]: Produto } = JSON.parse(
  fs.readFileSync("databaseJSON/produtos.json", "utf-8")
);

const salvaInfoToJson = () => {
  try {
    const produtosJson = JSON.stringify(produtos);
    fs.writeFileSync("databaseJSON/produtos.json", produtosJson, "utf-8");
  } catch (error) {
    console.error("Erro ao salvar produtos no arquivo JSON:", error);
  }
};
App.use(express.json(), (req, res, next) => {
  produtos;
  res.on("finish", () => {
    salvaInfoToJson();
  });
  next();
});

const produtoSchema = zod.object({
  nome: zod.string().min(1),
  descricao: zod.string().min(1),
  quantidade: zod.number().min(0),
});

const gerarProductID = (): string => {
  const ultimaChave = Object.keys(produtos).reduce(
    (chaveAnterior, chaveAtual) => {
      const id = parseInt(chaveAtual);
      return id > chaveAnterior ? id : chaveAnterior;
    },
    0
  );
  return (ultimaChave + 1).toString();
};

App.get("/estoque/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const produto = produtos[id];
  if (!produto) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }
  res.status(200).json({
    nome: produto.nome,
    quantidade: produto.quantidade,
  });
});

App.post("/produtos/add", async (req: Request, res: Response) => {
  try {
    const dados = produtoSchema.parse(req.body);
    const id = gerarProductID();
    const produto: Produto = { id, ...dados };
    produtos[id] = produto;
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ "error": "Ocorreu um erro ao adicionar o seu produto, verifique os parâmetros." });
  }
});

App.get("/produtos", (req: Request, res: Response) => {
  res.status(200).json(Object.values(produtos));
});

App.get("/produtos/busca", (req: Request, res: Response) => {
  const nome = req.query.nome?.toString();
  if (!nome) {
    res.status(400).json({ error: "Nome do produto não informado" });
    return;
  }
  const resultados = Object.values(produtos).filter((produto) =>
    produto.nome.toLowerCase().includes(nome.toLowerCase())
  );
  if (resultados.length === 0) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }
  else{
  res.status(200).json(resultados);
}
});

App.get("/produtos/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const produto = produtos[id];
  if (!produto) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }
  res.status(200).json(produto);
});

App.put("/produtos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const produto = produtos[id];
  if (!produto) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Corpo da requisição vazio");
    }
    const dados = produtoSchema.parse(req.body);
    produtos[id] = { ...produto, ...dados };
    res.status(200).json(produtos[id]);
  } catch (error) {
    res.status(400).json({ "error": "Ocorreu um erro ao atualizar o seu produto, verifique os parâmetros." });
  }
});
App.delete("/produtos/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (!produtos[id]) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }
  delete produtos[id]
  res.status(204).send();
});
App.post("/vender/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const quantidadeVendida = req.body.quantidade;
  const produto = produtos[id];

  if (!produto) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }

  if (quantidadeVendida > produto.quantidade) {
    res.status(400).json({ error: "Quantidade insuficiente em estoque" });
    return;
  }

  produto.quantidade -= quantidadeVendida;
  res.status(200).json(produto);
});
App.listen(3000, () => {
  console.log("ProductManager inicializando...");
  setTimeout(() => {
    console.log("ProductManager pronto!");
    console.log("Servidor escutando na porta 3000");
  }, 2000);
});
