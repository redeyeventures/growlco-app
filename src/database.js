var extend = require('extend');

module.exports = (function () {

	'use strict';

	var data = {
		restaurants: {
			42: {
				name: 'Raising Cane\'s',
				picture_url: 'canes.png',
				description: 'Delicious chicken made with love.',
				menuitems: {
					1: {
						name: '3finger',
						picture_url: '3finger.png',
						description: 'The perfect 3 finger stuff'
					},
					32: {
						name: 'Caniac Combo',
						picture_url: 'caniaccombo.png',
						description: 'The Perfect Caniac Combo'
					},
					51: {
						name: 'Sandwich Box',
						picture_url: 'sandwichcombo.png',
						description: 'Sandwich Box shit'
					},
					54: {
						name: 'The Box',
						picture_url: 'thebox.png',
						description: 'The perfect box',
						options: {
							17: {
								name: 'Chicken Fingers',
								type: 'Integer',
								default: 4
							},
							93: {
								name: 'Fries',
								type: 'Integer'
							},
							128: {
								name: 'Coleslaw',
								type: 'Boolean'
							},
							136: {
								name: 'Cane\'s Sauce',
								type: 'Integer',
								default: 1
							},
							144: {
								name: 'Texas Toast',
								type: 'Integer',
								default: 1
							}
						}
					}
				}
			},
			69: {
				name: 'Piada Street Food',
				picture_url: 'piada.png',
				description: 'If you\'re Italian, you\'ll love this.'
			},
			144: {
				name: 'Chipotle Mexican Grill',
				picture_url: 'chipotle.png',
				description: 'It\'s not really Mexican food.'
			}
		}
	};

	function lookup(context, path) {
		if (path.length > 0) {
			if (context[path[0]]) {
				//console.log(context[path[0]]);
				//console.log('match', lookup(context[path[0]], path.slice(1)));
				var obj = lookup(context[path[0]], path.slice(1));
				return Object.keys(obj).map(function (key) {
					return extend({ id: key }, obj[key]);
				});
			} else if (context[path[0] + 's']) {
				//console.log(context[path[0] + 's']);
				//console.log('pluralized', lookup(context[path[0] + 's'], path.slice(1)));
				return lookup(context[path[0] + 's'], path.slice(1));
			} else {
				return {};
			}
		} else {
			return context;
		}
	}

	function get(path, cb) {
		var fragments = path.split('/').filter(function (x) { return x.length > 0 });
		var response = lookup(data, fragments);
		console.log(path, response);
		cb(null, response);
	}

	return {
		get: get
	};

}());