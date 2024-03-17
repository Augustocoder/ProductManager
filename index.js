"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const fs_1 = __importDefault(require("fs"));
const App = (0, express_1.default)();
const produtos = JSON.parse(fs_1.default.readFileSync("databaseJSON/produtos.json", "utf-8"));
const salvaInfoToJson = () => {
    try {
        const produtosJson = JSON.stringify(produtos);
        fs_1.default.writeFileSync("databaseJSON/produtos.json", produtosJson, "utf-8");
    }
    catch (error) {
        console.error("Erro ao salvar produtos no arquivo JSON:", error);
    }
};
App.use(express_1.default.json(), (req, res, next) => {
    produtos;
    res.on("finish", () => {
        salvaInfoToJson();
    });
    next();
});
const produtoSchema = zod_1.default.object({
    nome: zod_1.default.string().min(1),
    descricao: zod_1.default.string().min(1),
    quantidade: zod_1.default.number().min(0),
});
const gerarProductID = () => {
    const ultimaChave = Object.keys(produtos).reduce((chaveAnterior, chaveAtual) => {
        const id = parseInt(chaveAtual);
        return id > chaveAnterior ? id : chaveAnterior;
    }, 0);
    return (ultimaChave + 1).toString();
};
App.get("/estoque/:id", (req, res) => {
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
App.post("/produtos/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dados = produtoSchema.parse(req.body);
        const id = gerarProductID();
        const produto = Object.assign({ id }, dados);
        produtos[id] = produto;
        res.status(201).json(produto);
    }
    catch (error) {
        res.status(400).json({ "error": "Ocorreu um erro ao adicionar o seu produto, verifique os parâmetros." });
    }
}));
App.get("/produtos", (req, res) => {
    res.status(200).json(Object.values(produtos));
});
App.get("/produtos/busca", (req, res) => {
    var _a;
    const nome = (_a = req.query.nome) === null || _a === void 0 ? void 0 : _a.toString();
    if (!nome) {
        res.status(400).json({ error: "Nome do produto não informado" });
        return;
    }
    const resultados = Object.values(produtos).filter((produto) => produto.nome.toLowerCase().includes(nome.toLowerCase()));
    if (resultados.length === 0) {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
    }
    else {
        res.status(200).json(resultados);
    }
});
App.get("/produtos/:id", (req, res) => {
    const id = req.params.id;
    const produto = produtos[id];
    if (!produto) {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
    }
    res.status(200).json(produto);
});
App.put("/produtos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        produtos[id] = Object.assign(Object.assign({}, produto), dados);
        res.status(200).json(produtos[id]);
    }
    catch (error) {
        res.status(400).json({ "error": "Ocorreu um erro ao atualizar o seu produto, verifique os parâmetros." });
    }
}));
App.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    if (!produtos[id]) {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
    }
    delete produtos[id];
    res.status(204).send();
});
App.post("/vender/:id", (req, res) => {
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
//# sourceMappingURL=index.js.map