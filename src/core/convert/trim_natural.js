import { _trim_positive } from './_trim_positive' ;
import { _alloc , _copy } from '../array' ;

export function trim_natural ( a , ai , aj ) {

	const x = _trim_positive( a , ai , aj ) ;

	if ( x >= aj ) return [ 0 ] ;

	const b = _alloc( aj - x ) ;

	_copy( a , x , aj , b , 0 ) ;

	return b ;

}
