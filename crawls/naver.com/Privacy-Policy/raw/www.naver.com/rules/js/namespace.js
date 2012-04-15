/**
 * namespace
 *
 * @compatibility with IE5, IE55, IE6, IE7, FF2, Opera9, Safari3
 */

function namespace(sKeys, pCode) {

	var aKeys = sKeys.split('.'), obj = window;

	for (var i = 0, sKey; sKey = aKeys[i]; i++) {
		if (typeof obj[sKey] == "undefined") obj[sKey] = {};
		obj = obj[sKey];
	}

	// 하위호환성 유지를 위한 $Namespace 함수의 기능 구현 (deprecated)
	if (typeof pCode == 'object') {
		for (var k in pCode)
			obj[k] = pCode[k];
		return;
	}

	pCode._object = obj;
	pCode();

}

namespace.errorMessage = 'namespace: Only constant values can be exported';

namespace.imports = function() {

	var sCode = '';

	for (var i = 0, s; s = arguments[i]; i++) {

		try {

			for (var k in eval(s))
				sCode += 'var ' + k + ' = ' + s + '.' + k + ';';

		} catch(e) { }
	}

	return sCode;
};

namespace.exports = function() {

	var sCode = '';

	for (var i = 0, s; s = arguments[i]; i++) {
		
		var bConstStyle = /^[A-Z_]+$/.test(s);

		sCode +=
			'if (typeof ' + s + ' != "function" && !' + bConstStyle + ') throw new Error(namespace.errorMessage);\n' +
			'arguments.callee._object.' + s + ' = ' + s + ';\n\n';
	}

	return sCode;
};
