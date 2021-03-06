/**
 * @file mofron-ssrender/index.js
 */
require('expose-loader?window!./src/window.js');
require('expose-loader?navigator!./src/navigator.js');
require('expose-loader?document!./src/document.js');
const mf = require('mofron');

module.exports = class extends mf.Base {
    constructor (po) {
        try {
            super();
            this.name('SsRender');
            this.prmOpt(po);
            
            mf.ssr = this;
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
            
            let html = '<html';
            if (0 !== document.documentElement.attr.length) {
                for (let didx in document.documentElement.attr) {
                    html += ' ' + didx + '=';
                    if ('string' === typeof document.documentElement.attr[didx]) {
                        html += document.documentElement.attr[didx];
                    } else {
                        throw new Error('not supported type:' + typeof document.documentElement.attr[didx]);
                    }
                }
            }
            html += '>';
            console.log(html);
            
            console.log(this.head());
            
            let body = '<body';
            if (0 !== document.body.attr.length) {
                for (let didx in document.body.attr) {
                    body += ' ' + didx + '=';
                    if ('string' === typeof document.body.attr[didx]) {
                        body += document.body.attr[didx];
                    } else {
                        throw new Error('not supported type:' + typeof document.body.attr[didx]);
                    }
                }
            }
            body += '>';
            console.log(body);
            
            console.log(this.component().target().value());
            
            console.log('</body>');
            console.log('</html>');
            

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    head (cnt) {
        try {
            if (undefined === cnt) {
                /* getter */
                let ret = '';
                ret += '<head>\n';
                ret += '    ' + this.title();
                ret += '    ' + this.meta();
                
                let hd = (undefined === this.m_ssr_head)? [] : this.m_ssr_head;
                for (let idx in hd) {
                    ret += '    ' + hd[idx] + '\n';
                }
                
                ret += '</head>';
                return ret;
            }
            /* setter */
            if ('string' !== typeof cnt) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_ssr_head) {
                this.m_ssr_head = new Array();
            }
            this.m_ssr_head.push(cnt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (val) {
        try {
            if (undefined === val) {
                /* getter */
                if (undefined === this.m_ssr_title) {
                    return '<title></title>\n';
                }
                this.m_ssr_title;
            }
            /* setter */
            if ('string' !== typeof val) {
                throw new Error('invalid parameter');
            }
            this.m_ssr_title = '<title>' + val + '</title>\n';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    meta (val) {
        try {
            if (undefined === val) {
                /* getter */
                if (undefined === this.m_ssr_meta) {
                    this.m_ssr_meta = new Array();
                    this.m_ssr_meta.push('<meta charset="utf-8">\n');
                }
                let meta_lst = this.m_ssr_meta;
                let ret = '';
                for (let idx in meta_lst) {
                    ret += meta_lst[idx];
                }
                return ret;
            }
            /* setter */
            if ('string' !== typeof val) {
                throw new Error('invalid parameter');
            }
            this.meta();
            this.m_ssr_meta.push('<meta ' + val +  '>\n');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
