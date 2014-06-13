

var util = require('util');
var algo = require('algo');


var check = function(ctor, r, e){
	var name = util.format("alu.add (%s, %d, %s)", ctor.name, r, e === alu.badd_t ? 'big endian' : 'little endian');
	console.log(name);

	var todouble_t = function(r, e){
		if(e === alu.badd_t){
			return function(a, i0, i1){
				var x = 0, y = 1;
				while(--i1 >= i0){
					x += a[i1] * y;
					y *= r;
				}
				return x;
			};
		}
		else{
			return function(a, i0, i1){
				var x = 0, y = 1;
				while(i0 < i1){
					x += a[i0] * y;
					y *= r;
					++i0;
				}
				return x;
			};
		}
	};

	var todouble = todouble_t(r, e);
	var add = e(r);
	var randint = algo.randint;
	var lsb = function(a){ return e === alu.badd_t ? a.length - 1 : 0; };

	test(name, function(assert){
		var n = 10, m = 10, i, j;
		var OP = [];
		var RE = [];
		var LO = [];

		for(i = 0; i < m; ++i){
			RE.push([]);
			LO.push([]);
			OP.push(new ctor(2));
			OP[i][lsb(OP[i])] = randint(0, r);
		}

		for(j = m; j < m + n; ++j){
			RE.push([]);
			LO.push([]);
			OP.push(new ctor(1));
			OP[j][0] = randint(0, r);
		}

		for(i = 0; i < m + n; ++i){
			for(j = i; j < m + n; ++j){
				var a = OP[i][lsb(OP[i])];
				var b = OP[j][lsb(OP[j])];
				var sum = a + b;
				RE[i][j] = new ctor(2);
				LO[i][j] = new ctor(1);
				add(OP[i], 0, OP[i].length, OP[j], 0, OP[j].length, RE[i][j], 0, 2);
				add(OP[i], lsb(OP[i]), lsb(OP[i])+1, OP[j], lsb(OP[j]), lsb(OP[j]) + 1, LO[i][j], 0, 1);
				deepEqual(todouble(RE[i][j], 0, 2), sum, a + ' + ' + b + ' ' + RE[i][j][0] + ' ' + RE[i][j][1]);
				deepEqual(LO[i][j][0], sum % r, a + ' + ' + b + ' % ' + r);
			}
		}

	});

};

var TRAITS = [
	[Uint8Array, Math.pow(2, 8)],
	[Uint16Array, Math.pow(2, 16)],
	[Uint32Array, Math.pow(2, 32)]
];

var ENDIANESS = [alu.badd_t, alu.ladd_t];

for(var i = 0; i < TRAITS.length; ++i){
	for(var j = 0; j < ENDIANESS.length; ++j){
		check(TRAITS[i][0], TRAITS[i][1], ENDIANESS[j]);
	}
}