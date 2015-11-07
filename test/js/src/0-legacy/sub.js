

var util = require('util');
var random = require('aureooms-js-random');
var integer = integerbigendian ;

var check = function(ctor, r, e){
	var name = util.format("integer.sub (%s, %d)", ctor.name, r);
	console.log(name);

	var todouble_t = function(r){
		return function(a, i0, i1){
			var x = 0, y = 1;
			while(--i1 >= i0){
				x += a[i1] * y;
				y *= r;
			}
			return x;
		};
	};

	var todouble = todouble_t(r);
	var sub = e(r);
	var randint = random.randint;
	var lsb = function(a){ return a.length - 1; };

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
				var sum = (r*r + a - b) % (r*r);
				RE[i][j] = new ctor(2);
				LO[i][j] = new ctor(1);
				sub(OP[i], 0, OP[i].length, OP[j], 0, OP[j].length, RE[i][j], 0, 2);
				sub(OP[i], lsb(OP[i]), lsb(OP[i])+1, OP[j], lsb(OP[j]), lsb(OP[j]) + 1, LO[i][j], 0, 1);
				deepEqual(todouble(RE[i][j], 0, 2), sum, a + ' - ' + b + ' ' + RE[i][j][0] + ' ' + RE[i][j][1]);
				deepEqual(LO[i][j][0], sum % r, a + ' - ' + b + ' % ' + r);
			}
		}

	});

};

var TRAITS = [
	[Uint8Array, Math.pow(2, 8)],
	[Uint16Array, Math.pow(2, 16)],
	// [Uint32Array, Math.pow(2, 32)] double precision not precise enough
];

var ENDIANESS = [integer.bsub_t];

for(var i = 0; i < TRAITS.length; ++i){
	for(var j = 0; j < ENDIANESS.length; ++j){
		check(TRAITS[i][0], TRAITS[i][1], ENDIANESS[j]);
	}
}