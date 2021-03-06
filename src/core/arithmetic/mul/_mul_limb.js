/**
 * Compute x * b where x is a single limb.
 */

export function _mul_limb ( r , x , b , bi , bj , c , ci , cj ) {

	let C = 0 ;

	while ( true ) {

		--bj ;
		--cj ;

		if ( bj < bi ) {
			if ( cj >= ci ) c[cj] = C ;
			return ;
		}

		if ( cj < ci ) return ;

		const t = b[bj] * x + C ;

		c[cj] = t % r ;

		C = (t / r) | 0 ;

	}

}
