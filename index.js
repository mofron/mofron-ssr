/**
 * @file mofron-ssrender/index.js
 */
require('expose-loader?window!./src/window.js');
let mf = require('mofron');
mf.ssr = true;

module.exports = class extends mf.Base {
    constructor (po) {
        try {
            super();
            this.name('SsRender');
            
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (cmp) {
        try {
            if (undefined === cmp) {
                /* getter */
                return (undefined === this.m_ssr_comp) ? null : this.m_ssr_comp;
            }
            /* setter */
            if (true !== mf.func.isInclude(cmp, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_ssr_comp = cmp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    render (cmp) {
        try {
            if (undefined !== cmp) {
                this.component(cmp);
            }
            
            if (null === this.component()) {
                throw new Error('could not find component.');
            }
            
            this.component().initConfig(0); // layout
            this.component().initConfig(1);
            
            console.log('<!DOCTYPE html>');
            console.log('<html>');
            console.log('<head>');
            console.log('<title></title>');
            console.log('<meta charset="utf-8">');
            console.log('</head>');
            console.log('<body style="margin:0px;padding:0px;">');
            
            console.log(this.component().target().value());
            
            console.log('</body>');
            console.log('</html>');
            

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
