var array = require('aureooms-js-array');
var itertools = require( 'aureooms-js-itertools' ) ;
var integer = integerbigendian ;
var list = itertools.list ;


test('integer.bmul 16 big endian', function(assert){
	console.log('integer.bmul 16 big endian');

	var r = Math.pow(2, 16);
	var num = Uint16Array;
	var fill = array.fill;

	var mov = array.copy;
	var bmul = integer.bmul_t(r);

	var a = new num(4), b = new num(4), c = new num(8);

	a[3] = 4;
	b[3] = 4;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 16], '4 * 4');
	fill(c, 0, 8, 0);

	a[3] = 16;
	b[3] = 16;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 256], '16 * 16');
	fill(c, 0, 8, 0);

	a[3] = 32;
	b[3] = 16;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 512], '32 * 16');
	fill(c, 0, 8, 0);

	a[3] = 16;
	b[3] = 64;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 1024], '16 * 64');
	fill(c, 0, 8, 0);

});


test('integer.bmul 8 big endian', function(assert){
	console.log('integer.bmul 8 big endian');

	var r = Math.pow(2, 8);
	var num = Uint8Array;
	var fill = array.fill;


	var mov = array.copy;
	var bmul = integer.bmul_t(r);

	var a = new num(4), b = new num(4), c = new num(8);

	a[3] = 4;
	b[3] = 4;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 16], '4 * 4');
	fill(c, 0, 8, 0);

	a[3] = 16;
	b[3] = 16;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 1, 0], '16 * 16');
	fill(c, 0, 8, 0);

	a[3] = 32;
	b[3] = 16;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 2, 0], '32 * 16');
	fill(c, 0, 8, 0);

	a[3] = 16;
	b[3] = 64;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 4, 0], '16 * 64');
	fill(c, 0, 8, 0);

	a[3] = 255;
	b[3] = 255;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 254, 1], '255 * 255');

	mov(c, 4, 8, a, 0, 4);
	fill(c, 0, 8, 0);
	b[3] = 0;
	b[2] = 1;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 254, 1, 0], '255 * 255 * 256');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 39, 172, 220, 64], '25800 * 25800');
	fill(c, 0, 8, 0);


	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 2, 4, b, 2, 4, c, 0, 2);
	deepEqual(list(c), [220, 64, 0, 0, 0, 0, 0, 0], '25800 * 25800 c[0:2]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 2, 4, b, 2, 4, c, 0, 1);
	deepEqual(list(c), [64, 0, 0, 0, 0, 0, 0, 0], '25800 * 25800 c[0:1]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 3, 4, b, 3, 4, c, 0, 1);
	deepEqual(list(c), [64, 0, 0, 0, 0, 0, 0, 0], '200 * 200 c[0:1]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 0, 4, b, 0, 4, c, 0, 0);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 0], '200 * 200 c[0:0]');
	fill(c, 0, 8, 0);

});

test('integer.bmul 8 big endian bound checks', function(assert){
	console.log('integer.bmul 8 big endian bound checks');

	var sanebounds = function(a) {
		for(var i = -8; i < 0; ++i){
			if(a[i] !== undefined) return false;
		}
		return true;
	};

	var r = Math.pow(2, 8);
	var num = Uint8Array;
	var fill = array.fill;

	var mov = integer.wrapmov(array.copy);
	var bmul = integer.wrapbin(integer.bmul_t(r));

	var a = new num(4), b = new num(4), c = new num(8);

	a[3] = 4;
	b[3] = 4;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 16], '4 * 4');
	ok(sanebounds(c), 'sanebounds 4 * 4');
	fill(c, 0, 8, 0);

	a[3] = 16;
	b[3] = 16;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 1, 0], '16 * 16');
	ok(sanebounds(c), 'sanebounds 16 * 16');
	fill(c, 0, 8, 0);

	a[3] = 32;
	b[3] = 16;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 2, 0], '32 * 16');
	ok(sanebounds(c), 'sanebounds 32 * 16');
	fill(c, 0, 8, 0);

	a[3] = 16;
	b[3] = 64;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 4, 0], '16 * 64');
	ok(sanebounds(c), 'sanebounds 16 * 64');
	fill(c, 0, 8, 0);

	a[3] = 255;
	b[3] = 255;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 254, 1], '255 * 255');
	ok(sanebounds(c), 'sanebounds 255 * 255');

	mov(c, 4, 8, a, 0, 4);
	fill(c, 0, 8, 0);
	b[3] = 0;
	b[2] = 1;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 0, 254, 1, 0], '255 * 255 * 256');
	ok(sanebounds(c), 'sanebounds 255 * 255 * 256');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(list(c), [0, 0, 0, 0, 39, 172, 220, 64], '25800 * 25800');
	ok(sanebounds(c), 'sanebounds 25800 * 25800');
	fill(c, 0, 8, 0);


	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 2, 4, b, 2, 4, c, 0, 2);
	deepEqual(list(c), [220, 64, 0, 0, 0, 0, 0, 0], '25800 * 25800 c[0:2]');
	ok(sanebounds(c), 'sanebounds 25800 * 25800 c[0:2]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 2, 4, b, 2, 4, c, 0, 1);
	deepEqual(list(c), [64, 0, 0, 0, 0, 0, 0, 0], '25800 * 25800 c[0:1]');
	ok(sanebounds(c), 'sanebounds 25800 * 25800 c[0:1]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 3, 4, b, 3, 4, c, 0, 1);
	deepEqual(list(c), [64, 0, 0, 0, 0, 0, 0, 0], '200 * 200 c[0:1]');
	ok(sanebounds(c), 'sanebounds 200 * 200 c[0:1]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, 0, 4, b, 0, 4, c, 0, 0);
	deepEqual(list(c), [0, 0, 0, 0, 0, 0, 0, 0], '200 * 200 c[0:0]');
	ok(sanebounds(c), 'sanebounds 200 * 200 c[0:0]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bmul(a, -1, 4, b, 0, 4, c, 0, 3);
	deepEqual(list(c), [172, 220, 64, 0, 0, 0, 0, 0], '25800 * 25800 c[0:3]');
	ok(sanebounds(c), 'sanebounds 25800 * 25800 c[0:3]');
	fill(c, 0, 8, 0);

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	mov(a, -1, 4, c, 0);
	deepEqual(list(c), [0, 0, 0, 100, 200, 0, 0, 0], 'mov(a, -1, 4, c, 0);');
	ok(sanebounds(c), 'sanebounds mov(a, -1, 4, c, 0);');
	fill(c, 0, 8, 0);

});