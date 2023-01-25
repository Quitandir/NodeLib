import chalk from "chalk";

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);    
    return listaDeLinks.map( (objeto, indice) => ({ //como o retorno do .map é um novo objeto, somando o status do http as chaves ficam entre ()
        ...objeto, 
        status: status[indice]
    }))
}

function extraiLinks(arrayLinks) {
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join());

}

//extraiLinks recebe um array com objetos (nome do link: link) e com o método .map retorna um array só com os valores da chaves,
//através do uso de Object.values(objeto). Por causa do .map, cada link encotrado será um array. Para isso, .join() transforma o array
//que tem apenas um elemento em uma string.

async function checaStatus(listaURLs) {
    const arrStatus = await Promise
        .all(
            listaURLs.map(async (url) => {
                try{
                    const response = await fetch(url)
                    return `${response.status} - ${response.statusText}`
                }
                catch (erro) {
                    return manejaErros(erro)
                }
            })
        )
    return arrStatus;
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado.'
    } else {
        return 'Ocorreu um erro.'
    }
}


