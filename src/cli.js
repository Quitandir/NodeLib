import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from 'chalk';
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

//process.argv é um método do node para retornar arquivos acessados ao entrar uma linha de comando no terminal
//caminho[0] vai ser exec do node, [1] o .js executado pelo node e [2] o path escrito após node ***.js

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida'; //const valida recebe 'true' se argumentos[3] for igual a '--valida'

    try {
        fs.lstat(caminho)
    }

    catch (erro) {
        if (erro.code === 'ENOENT') { //ENOENT stands for NO ENTITY
            console.log('O arquivo ou diretório não existe.');
            return //Return para report do erro parar no console.log, sem exibir a stack.
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2])
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            console.log(`${caminho}/${nomeDoArquivo}`);
            imprimeLista(valida, lista)
        })

    }

}

async function imprimeLista(valida, resultado) {

    if (valida) {
        console.log(
            chalk.yellow('Lista validada:'),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('Lista de links:'),
            resultado)
    }
}

processaTexto(caminho)



