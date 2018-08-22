

let thisobj = null;

let setAttr = (k, v, tgt) => {
    try {
        if (0 === tgt) {
            thisobj.documentElement.attr[k] = v;
        } else if (1 === tgt) {
            thisobj.body.attr[k] = v;
        }
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}

try {
    if (null !== thisobj) {
        module.exports = thisobj;
    }

    thisobj = {
        documentElement : {
            attr : {},
            setAttribute : (k, v) => {
                setAttr(k, v, 0);
            }
        },
        body : {
            attr : {},
            setAttribute : (k, v) => {
                setAttr(k, v, 1);
            }
        }
    }
    module.exports = thisobj;
} catch (e) {
    console.error(e.stack);
    throw e;
}
/* end of file */
