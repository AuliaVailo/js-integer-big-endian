
/**
 * Subtracts B from A, |A| >= |B|.
 * Wraps.
 *
 * @param {int} r base (radix)
 * @param {array} a first operand
 * @param {int} ai a left
 * @param {int} aj a right
 * @param {array} b second operand
 * @param {int} bi b left
 * @param {int} bj b right
 */

export function _isub ( r , a , ai , aj , b , bi , bj ) {

	let C = 0 ;

	while ( --bj >= bi ) {
		--aj ;
		const T = C ;
		C = (a[aj] < b[bj] + T) | 0 ;
		a[aj] = a[aj] - b[bj] + (C*r - T) ;
	}

	if (C !== 0) {
		while ( --aj >= ai && a[aj] === 0 ) a[aj] = r - 1 ;
		if ( aj >= ai ) --a[aj];
	}

}
