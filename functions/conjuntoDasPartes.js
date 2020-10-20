const montaSubConjunto = (elemento, elementos, percorreN) => {
  	return [elemento, elementos.slice(0, percorreN)].toString()
}
const percorreElementos = (elemento, elementos, percorreN) => {
  	const subconjunto = montaSubConjunto(elemento, elementos, percorreN-1) //`${elemento},${elementos[0]}`
	if (elementos.length == percorreN-1) {
    	return [subconjunto]
    }
  	return [subconjunto, ...percorreElementos(elemento, elementos.slice(1), percorreN)]
}
const percorre = (elementos, percorreN) => {
	if (elementos.length == percorreN) {
    	return [...percorreElementos(elementos[0], elementos.slice(1), percorreN)]
    }
  	return [...percorreElementos(elementos[0], elementos.slice(1), percorreN), ...percorre(elementos.slice(1), percorreN)]  
}

const geraSubConjuntosDeDoisOuMais = (elementos) => {
    if (elementos.length < 2) return [];
    return (function next(n){
        if (elementos.length == n) {
            return [...percorre(elementos, n)]
        }
        return [...percorre(elementos, n), ...next(n+1)]
    })(2);
}


const partes = (conjunto) => {
  const elementos = [...conjunto] 
  const conjuntoDasPartes = new Set();
  [' ', ...elementos, ...geraSubConjuntosDeDoisOuMais(elementos)].forEach((elemento) => {
  	conjuntoDasPartes.add(`{${elemento}}`);
  })
  return conjuntoDasPartes;
}


const conjunto1 = new Set(['x','y','z', 'k']);
const conjunto2 = new Set([1,2]);
const conjunto3 = new Set([1]);

console.log( 
  partes(conjunto1),
  partes(conjunto2),
  partes(conjunto3),
)
