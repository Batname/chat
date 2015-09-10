const CLS = require('continuation-local-storage');
const ns = CLS.createNamespace('app');

module.exports = () => {
	return (req, res, next) => {
		let context = ns.createContext();
	  ns.enter(context);
	  ns.bindEmitter(req);
	  ns.bindEmitter(res);
	  try {
	    ns.set('context', {req: req, res: res});
	  	next();
	  } finally {
	    ns.exit(context);
	  }
	};
};