/***************************************************************** 
 * PROGRAMA COM HUMOR E TESTE DE RECURSÃO 
 *
 * Programa que cria a cadeia alimentar onde 
 * Alface(🥬) come Idoso(👴), Idoso(👴) come Alface(🥬), 
 * Alface(🥬) come Idoso(👴), Idoso(👴) come Nada(🏊)
 *****************************************************************
*/

class Universo {
  constructor(name){
  	this.name = name
  }
  come(Tipo) {
    return this.name + ' come ' + Tipo
  }
  toString() {
    return '🏊';
  }
}

const Idoso = new Universo('👴')
const Alface = new Universo('🥬')

// Dado um limite de gerações 
// Retorne o processo da cadeia alimentar, onde 👴 come 🥬 e 🥬 come 👴
function passarGeração(Geraçoes) {
  const atualGeraçao = (Geraçoes % 2) ? Idoso : Alface
  if (Geraçoes == 0) {
    return atualGeraçao
  }
  return atualGeraçao.come(passarGeração(Geraçoes-1)) 
}


// testes
console.log(passarGeração(1))
console.log(passarGeração(2))
console.log(passarGeração(5))
