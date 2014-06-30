

var util = require('util');
var fmt = util.format;

var check = function(Ctor, cmp, biter, div, sub, fiter){
	var name = fmt("alu.div<%s, %s, %s, %s, %s, %s>", Ctor.name, div[0], sub[0], cmp[0], biter[0], fiter[0]);
	console.log(name);

	cmp = cmp[1];
	biter = biter[1];
	div = div[1];
	sub = sub[1];
	fiter = fiter[1];

	var f = 16;
	var r = Math.pow(2, Ctor.BYTES_PER_ELEMENT * 8);

	var zfill_t = function(n){
		return algo.zfill_t(n, function(c, n){
			return algo.lfill_t(c, n, algo.strmul);
		});
	};

	var parse = alu.parse_t(r, f, biter);
	var stringify = alu.stringify_t(r, f, fiter, zfill_t);
	var mov = algo.copy;
	var fill = algo.fill;

	var lt = alu.lt_t(cmp);
	sub = sub(r);
	div = div(mov, lt, sub);


	test(name, function(assert){


		for (var k = 0; k < TEST.length; ++k) {
			var test = TEST[k];

			var as = test[0];
			var ai = 0;
			var aj = Math.ceil(as.length * Math.log(f) / Math.log(r));
			var a = new Ctor(aj);
			var _r = new Ctor(aj);
			var q = new Ctor(aj);
			parse(as, 0, as.length, a, ai, aj);


			var bs = test[1];
			var bi = 0;
			var bj = Math.ceil(bs.length * Math.log(f) / Math.log(r));
			var b = new Ctor(bj);
			parse(bs, 0, bs.length, b, bi, bj);

			div(a, ai, aj, b, bi, bj, q, ai, aj, _r, ai, aj);
			var qactual = parseInt(stringify(q, ai, aj), f);
			var qexpected = parseInt(test[2], f);
			var ractual = parseInt(stringify(_r, ai, aj), f);
			var rexpected = parseInt(test[3], f);

			var a10 = parseInt(as, 16);
			var b10 = parseInt(bs, 16);

			deepEqual(qactual, qexpected, fmt("%d / %d === %d", a10, b10, qexpected));
			deepEqual(ractual, rexpected, fmt("%d % %d === %d", a10, b10, rexpected));
		}



	});

};

var TEST = [
	['0010', '4', '0004', '0000'],
	['0100', '10', '0010', '0000'],
	['0200', '20', '0010', '0000'],
	['0400', '10', '0040', '0000'],
	['fe01', 'ff', '00ff', '0000'],
	['fe0100', 'ff', '00ff00', '000000'],
	['27acdc40', '64c8', '000064c8', '00000000'],

];

var algo = require('algo');

var TRAITS = [
	Uint8Array,
	Uint16Array,
	Uint32Array,
];

var ENDIANESS = [
	[
		['alu.bcmp_t', alu.bcmp_t()],
		['algo.biter', algo.biter],
		['algo.bdiv_t', alu.bdiv_t],
		['alu.bsub_t', alu.bsub_t],
		['algo.fiter', algo.fiter],
	],
	// [
	// 	['alu.lcmp_t', alu.lcmp_t()],
	// 	['algo.fiter', algo.fiter],
	// 	['algo.ldiv_t', algo.ldiv_t],
	// 	['alu.lsub_t', alu.lsub_t],
	// 	['algo.biter', algo.biter],
	// ],
];

for (var j = 0; j < ENDIANESS.length; ++j)
for (var i = 0; i < TRAITS.length; ++i)
	check.apply(null, [TRAITS[i]].concat(ENDIANESS[j]));