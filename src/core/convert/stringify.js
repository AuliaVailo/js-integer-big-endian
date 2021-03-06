import { convert } from './convert' ;
import { _to_string } from '../../core/convert/_to_string' ;

export function stringify ( f , t , a , ai , aj ) {

	if ( t > 36 ) throw new Error('t > 36 not implemented') ;

	const b = convert( f , t , a , ai , aj ) ;

	return _to_string( b ) ;

}
