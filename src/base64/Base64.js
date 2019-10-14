import {Buffer} from 'buffer';

export default class Base64 {
    codificarBase64(textoNormal){
        return new Buffer(textoNormal).toString('base64');
    }

    decodificarBase64(textoCodificado){
        return new Buffer(textoCodificado, 'base64').toString('ascii');
    }
}