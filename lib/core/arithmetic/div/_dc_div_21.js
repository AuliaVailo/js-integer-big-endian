'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._dc_div_21 = _dc_div_21;

var _thresholds = require('../../thresholds');

var _array = require('../../array');

var _sub = require('../sub');

var _compare = require('../../compare');

var _add = require('../add');

var _mul2 = require('../mul');

var _ = require('.');

/**
 * Algorithm 3.3 Divide-and-conquer division (2 by 1)
 * ==================================================
 *
 * Input
 * -----
 *  Two nonnegative integers A and B,
 *  such that A < β^n B and β^n / 2 ≤ B < β^n.
 *  n must be even.
 *
 *                    -----------                 -----
 *                   |  :  |  :  |               |  :  |
 *                    -----------                 -----
 *
 * Output
 * ------
 *  The quotient floor( A/B ) and the remainder A mod B.
 *
 * Complexity
 * ----------
 *  T(n) = 2T'(n/2) + K
 *
 */
function _dc_div_21(r, a, ai, aj, b, bi, bj, c, ci, cj) {

  if (bj - bi < _thresholds.THRESHOLD_DIV_DC) {
    return (0, _._schoolbook_div)(r, a, ai, aj, b, bi, bj, c, ci);
  }

  // 1. Let A = A_3 β^{3n/2} + A_2 β^n + A_1 β^{n/2} + A_0 and
  //    B = B_1 β^{n/2} + B_0,
  //    with 0 ≤ A_i < β^{n/2} and 0 ≤ B_i < β^{n/2}.

  var m = aj - ai;
  var k = m >>> 2;

  // 2. Compute the high half Q_1 of the quotient as
  //    Q_1 = ( A_3 β^n + A_2 β^{n/2} + A_1 ) / B
  //    with remainder R_1 using algorithm 3.4.

  (0, _._dc_div_32)(r, a, ai, aj - k, b, bi, bj, c, ci, cj - k);

  // 3. Compute the low half Q_0 of the quotient as
  //    Q_0 = ( R_1 β^{n/2} + A_0 ) / B
  //    with remainder R_0 using algorithm 3.4.

  (0, _._dc_div_32)(r, a, ai + k, aj, b, bi, bj, c, ci + k, cj);

  // 4. Return the quotient Q = Q_1 β^{n/2} + Q_0 and the remainder R = R_0 .
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2FyaXRobWV0aWMvZGl2L19kY19kaXZfMjEuanMiXSwibmFtZXMiOlsiX2RjX2Rpdl8yMSIsInIiLCJhIiwiYWkiLCJhaiIsImIiLCJiaSIsImJqIiwiYyIsImNpIiwiY2oiLCJtIiwiayJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFnQ2dCQSxVLEdBQUFBLFU7O0FBaENoQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Qk8sU0FBU0EsVUFBVCxDQUFzQkMsQ0FBdEIsRUFBMEJDLENBQTFCLEVBQThCQyxFQUE5QixFQUFtQ0MsRUFBbkMsRUFBd0NDLENBQXhDLEVBQTRDQyxFQUE1QyxFQUFpREMsRUFBakQsRUFBc0RDLENBQXRELEVBQTBEQyxFQUExRCxFQUErREMsRUFBL0QsRUFBb0U7O0FBRTFFLE1BQUtILEtBQUtELEVBQUwsK0JBQUwsRUFBa0M7QUFDakMsV0FBTyx1QkFBaUJMLENBQWpCLEVBQXFCQyxDQUFyQixFQUF5QkMsRUFBekIsRUFBOEJDLEVBQTlCLEVBQW1DQyxDQUFuQyxFQUF1Q0MsRUFBdkMsRUFBNENDLEVBQTVDLEVBQWlEQyxDQUFqRCxFQUFxREMsRUFBckQsQ0FBUDtBQUNBOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxNQUFNRSxJQUFJUCxLQUFLRCxFQUFmO0FBQ0EsTUFBTVMsSUFBSUQsTUFBTSxDQUFoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQVlWLENBQVosRUFBZ0JDLENBQWhCLEVBQW9CQyxFQUFwQixFQUF5QkMsS0FBS1EsQ0FBOUIsRUFBa0NQLENBQWxDLEVBQXNDQyxFQUF0QyxFQUEyQ0MsRUFBM0MsRUFBZ0RDLENBQWhELEVBQW9EQyxFQUFwRCxFQUF5REMsS0FBS0UsQ0FBOUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFZWCxDQUFaLEVBQWdCQyxDQUFoQixFQUFvQkMsS0FBS1MsQ0FBekIsRUFBNkJSLEVBQTdCLEVBQWtDQyxDQUFsQyxFQUFzQ0MsRUFBdEMsRUFBMkNDLEVBQTNDLEVBQWdEQyxDQUFoRCxFQUFvREMsS0FBS0csQ0FBekQsRUFBNkRGLEVBQTdEOztBQUVBO0FBRUEiLCJmaWxlIjoiX2RjX2Rpdl8yMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRIUkVTSE9MRF9ESVZfREMgfSBmcm9tICcuLi8uLi90aHJlc2hvbGRzJyA7XG5pbXBvcnQgeyBfemVyb3MgLCBfZmlsbCB9IGZyb20gJy4uLy4uL2FycmF5JyA7XG5pbXBvcnQgeyBfZGVjcmVtZW50ICwgX2lzdWIgfSBmcm9tICcuLi9zdWInIDtcbmltcG9ydCB7IF9sdCB9IGZyb20gJy4uLy4uL2NvbXBhcmUnIDtcbmltcG9ydCB7IF9pYWRkIH0gZnJvbSAnLi4vYWRkJyA7XG5pbXBvcnQgeyBfbXVsIH0gZnJvbSAnLi4vbXVsJyA7XG5pbXBvcnQgeyBfZGNfZGl2XzMyICwgX3NjaG9vbGJvb2tfZGl2IH0gZnJvbSAnLicgO1xuXG5cbi8qKlxuICogQWxnb3JpdGhtIDMuMyBEaXZpZGUtYW5kLWNvbnF1ZXIgZGl2aXNpb24gKDIgYnkgMSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogSW5wdXRcbiAqIC0tLS0tXG4gKiAgVHdvIG5vbm5lZ2F0aXZlIGludGVnZXJzIEEgYW5kIEIsXG4gKiAgc3VjaCB0aGF0IEEgPCDOsl5uIEIgYW5kIM6yXm4gLyAyIOKJpCBCIDwgzrJebi5cbiAqICBuIG11c3QgYmUgZXZlbi5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgLS0tLS0tLS0tLS0gICAgICAgICAgICAgICAgIC0tLS0tXG4gKiAgICAgICAgICAgICAgICAgICB8ICA6ICB8ICA6ICB8ICAgICAgICAgICAgICAgfCAgOiAgfFxuICogICAgICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tICAgICAgICAgICAgICAgICAtLS0tLVxuICpcbiAqIE91dHB1dFxuICogLS0tLS0tXG4gKiAgVGhlIHF1b3RpZW50IGZsb29yKCBBL0IgKSBhbmQgdGhlIHJlbWFpbmRlciBBIG1vZCBCLlxuICpcbiAqIENvbXBsZXhpdHlcbiAqIC0tLS0tLS0tLS1cbiAqICBUKG4pID0gMlQnKG4vMikgKyBLXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gX2RjX2Rpdl8yMSAoIHIgLCBhICwgYWkgLCBhaiAsIGIgLCBiaSAsIGJqICwgYyAsIGNpICwgY2ogKSB7XG5cblx0aWYgKCBiaiAtIGJpIDwgVEhSRVNIT0xEX0RJVl9EQyApIHtcblx0XHRyZXR1cm4gX3NjaG9vbGJvb2tfZGl2KCByICwgYSAsIGFpICwgYWogLCBiICwgYmkgLCBiaiAsIGMgLCBjaSApIDtcblx0fVxuXG5cdC8vIDEuIExldCBBID0gQV8zIM6yXnszbi8yfSArIEFfMiDOsl5uICsgQV8xIM6yXntuLzJ9ICsgQV8wIGFuZFxuXHQvLyAgICBCID0gQl8xIM6yXntuLzJ9ICsgQl8wLFxuXHQvLyAgICB3aXRoIDAg4omkIEFfaSA8IM6yXntuLzJ9IGFuZCAwIOKJpCBCX2kgPCDOsl57bi8yfS5cblxuXHRjb25zdCBtID0gYWogLSBhaSA7XG5cdGNvbnN0IGsgPSBtID4+PiAyIDtcblxuXHQvLyAyLiBDb21wdXRlIHRoZSBoaWdoIGhhbGYgUV8xIG9mIHRoZSBxdW90aWVudCBhc1xuXHQvLyAgICBRXzEgPSAoIEFfMyDOsl5uICsgQV8yIM6yXntuLzJ9ICsgQV8xICkgLyBCXG5cdC8vICAgIHdpdGggcmVtYWluZGVyIFJfMSB1c2luZyBhbGdvcml0aG0gMy40LlxuXG5cdF9kY19kaXZfMzIoIHIgLCBhICwgYWkgLCBhaiAtIGsgLCBiICwgYmkgLCBiaiAsIGMgLCBjaSAsIGNqIC0gayApIDtcblxuXHQvLyAzLiBDb21wdXRlIHRoZSBsb3cgaGFsZiBRXzAgb2YgdGhlIHF1b3RpZW50IGFzXG5cdC8vICAgIFFfMCA9ICggUl8xIM6yXntuLzJ9ICsgQV8wICkgLyBCXG5cdC8vICAgIHdpdGggcmVtYWluZGVyIFJfMCB1c2luZyBhbGdvcml0aG0gMy40LlxuXG5cdF9kY19kaXZfMzIoIHIgLCBhICwgYWkgKyBrICwgYWogLCBiICwgYmkgLCBiaiAsIGMgLCBjaSArIGsgLCBjaiApIDtcblxuXHQvLyA0LiBSZXR1cm4gdGhlIHF1b3RpZW50IFEgPSBRXzEgzrJee24vMn0gKyBRXzAgYW5kIHRoZSByZW1haW5kZXIgUiA9IFJfMCAuXG5cbn1cbiJdfQ==