import fs from 'fs';
import chalk from 'chalk';

//fs é uma biblioteca nativa do Node usada para acessar arquivos externos. Nesse caso o 'texto.md'. 
//O método fs.readFile recebe 3 parâmetros: caminho do arquivo, encoding e uma função callback que recebe erro e retorno. 

function extraiLink (texto) {
    const regex = /\[([^[\]]*?)\]\(([^[\]]+?)\)/gm;
    const capturas = [...texto.matchAll(regex)]; //Usando o spread operator para espalhar todos ocorrências da regex em um array.

    const resultados = capturas.map(captura => ({[captura[1]] : captura[2]}))
    
    //const capturas = regex.exec(texto); regex.exec procura a primeira ocorrência da expressão, retornando um array com os grupos separados.
        
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo.';
}

//Promises com async/await

async function pegaArquivo(caminho) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminho, encoding) 
        return extraiLink(texto);
    } catch (erro) {
        trataErro(erro)
    }
}

function trataErro (erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

export default pegaArquivo; //Quando exportamos apenas um elemento, podemos usar o DEFAULT.


//    \[[^[\]]*?\]
//    \([^[\]]+?\)