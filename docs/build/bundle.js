
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\profile\Highlighter.svelte generated by Svelte v3.47.0 */

    const file$6 = "src\\components\\profile\\Highlighter.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty('highlighter__' + /*type*/ ctx[0]) + " svelte-1evu84x"));
    			add_location(div, file$6, 3, 0, 49);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*type*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty('highlighter__' + /*type*/ ctx[0]) + " svelte-1evu84x"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Highlighter', slots, ['default']);
    	let { type } = $$props;
    	const writable_props = ['type'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Highlighter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ type });

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [type, $$scope, slots];
    }

    class Highlighter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { type: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Highlighter",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*type*/ ctx[0] === undefined && !('type' in props)) {
    			console.warn("<Highlighter> was created without expected prop 'type'");
    		}
    	}

    	get type() {
    		throw new Error("<Highlighter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Highlighter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\commons\DDay.svelte generated by Svelte v3.47.0 */

    function getDDay(target) {
    	const now = new Date();
    	const delta = new Date(target.getTime() - now.getTime());
    	return delta;
    }

    function getEnterMil() {
    	return getDDay(new Date('2022-07-12T12:00:00.000+09:00'));
    }

    function getExitMil() {
    	return getDDay(new Date('2024-01-08T12:00:00.000+09:00'));
    }

    /* src\includes\profile\Header.svelte generated by Svelte v3.47.0 */
    const file$5 = "src\\includes\\profile\\Header.svelte";

    // (17:8) <Highlighter type="inline">
    function create_default_slot_4$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Park, \"ShapeLayer\" Jonghyeon");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(17:8) <Highlighter type=\\\"inline\\\">",
    		ctx
    	});

    	return block;
    }

    // (20:11) <Highlighter type="title">
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("layering");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(20:11) <Highlighter type=\\\"title\\\">",
    		ctx
    	});

    	return block;
    }

    // (20:68) <Highlighter type="title">
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("shapes.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(20:68) <Highlighter type=\\\"title\\\">",
    		ctx
    	});

    	return block;
    }

    // (23:11) <Highlighter type="title">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("shaping");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(23:11) <Highlighter type=\\\"title\\\">",
    		ctx
    	});

    	return block;
    }

    // (23:67) <Highlighter type="title">
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("layers.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(23:67) <Highlighter type=\\\"title\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let headerRoot;
    	let div1;
    	let h1;
    	let highlighter0;
    	let t0;
    	let div0;
    	let h20;
    	let t1;
    	let br0;
    	let t2;
    	let highlighter1;
    	let t3;
    	let highlighter2;
    	let t4;
    	let h21;
    	let t5;
    	let br1;
    	let t6;
    	let highlighter3;
    	let t7;
    	let highlighter4;
    	let t8;
    	let p0;
    	let t9;
    	let br2;
    	let t10;
    	let t11;
    	let p1;
    	let t12;
    	let t13;
    	let t14;
    	let t15;
    	let br3;
    	let t16;
    	let current;

    	highlighter0 = new Highlighter({
    			props: {
    				type: "inline",
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	highlighter1 = new Highlighter({
    			props: {
    				type: "title",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	highlighter2 = new Highlighter({
    			props: {
    				type: "title",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	highlighter3 = new Highlighter({
    			props: {
    				type: "title",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	highlighter4 = new Highlighter({
    			props: {
    				type: "title",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			headerRoot = element("headerRoot");
    			div1 = element("div");
    			h1 = element("h1");
    			create_component(highlighter0.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			h20 = element("h2");
    			t1 = text("Creates a world");
    			br0 = element("br");
    			t2 = text("\r\n        by ");
    			create_component(highlighter1.$$.fragment);
    			t3 = text(" various ");
    			create_component(highlighter2.$$.fragment);
    			t4 = space();
    			h21 = element("h2");
    			t5 = text("Creates a world");
    			br1 = element("br");
    			t6 = text("\r\n        by ");
    			create_component(highlighter3.$$.fragment);
    			t7 = text(" various ");
    			create_component(highlighter4.$$.fragment);
    			t8 = space();
    			p0 = element("p");
    			t9 = text("전남대학교 컴퓨터정보통신공학과");
    			br2 = element("br");
    			t10 = text("\r\n    @ 지능영상미디어인터페이스연구실");
    			t11 = space();
    			p1 = element("p");
    			t12 = text("군 복무 D-");
    			t13 = text(/*milEnterDDay*/ ctx[0]);
    			t14 = text(", 제대까지 D-");
    			t15 = text(/*milExitDDay*/ ctx[1]);
    			br3 = element("br");
    			t16 = text("as 네트워크운용정비 병과");
    			attr_dev(h1, "class", "svelte-1wer314");
    			add_location(h1, file$5, 16, 4, 770);
    			add_location(br0, file$5, 18, 54, 946);
    			attr_dev(h20, "id", "headerRoot__layer-shape");
    			attr_dev(h20, "class", "svelte-1wer314");
    			add_location(h20, file$5, 18, 6, 898);
    			add_location(br1, file$5, 21, 87, 1169);
    			attr_dev(h21, "id", "headerRoot__shape-layer");
    			attr_dev(h21, "class", "headerRoot__h2-variation svelte-1wer314");
    			add_location(h21, file$5, 21, 6, 1088);
    			attr_dev(div0, "class", "headerRoot__h2-wrapper svelte-1wer314");
    			add_location(div0, file$5, 17, 4, 854);
    			add_location(br2, file$5, 25, 22, 1338);
    			attr_dev(p0, "class", "svelte-1wer314");
    			add_location(p0, file$5, 25, 3, 1319);
    			add_location(br3, file$5, 27, 50, 1421);
    			attr_dev(p1, "class", "svelte-1wer314");
    			add_location(p1, file$5, 27, 4, 1375);
    			attr_dev(div1, "class", "headerRoot__wrapper svelte-1wer314");
    			add_location(div1, file$5, 15, 2, 731);
    			attr_dev(headerRoot, "class", "svelte-1wer314");
    			add_location(headerRoot, file$5, 14, 0, 715);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, headerRoot, anchor);
    			append_dev(headerRoot, div1);
    			append_dev(div1, h1);
    			mount_component(highlighter0, h1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h20);
    			append_dev(h20, t1);
    			append_dev(h20, br0);
    			append_dev(h20, t2);
    			mount_component(highlighter1, h20, null);
    			append_dev(h20, t3);
    			mount_component(highlighter2, h20, null);
    			append_dev(div0, t4);
    			append_dev(div0, h21);
    			append_dev(h21, t5);
    			append_dev(h21, br1);
    			append_dev(h21, t6);
    			mount_component(highlighter3, h21, null);
    			append_dev(h21, t7);
    			mount_component(highlighter4, h21, null);
    			append_dev(div1, t8);
    			append_dev(div1, p0);
    			append_dev(p0, t9);
    			append_dev(p0, br2);
    			append_dev(p0, t10);
    			append_dev(div1, t11);
    			append_dev(div1, p1);
    			append_dev(p1, t12);
    			append_dev(p1, t13);
    			append_dev(p1, t14);
    			append_dev(p1, t15);
    			append_dev(p1, br3);
    			append_dev(p1, t16);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const highlighter0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				highlighter0_changes.$$scope = { dirty, ctx };
    			}

    			highlighter0.$set(highlighter0_changes);
    			const highlighter1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				highlighter1_changes.$$scope = { dirty, ctx };
    			}

    			highlighter1.$set(highlighter1_changes);
    			const highlighter2_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				highlighter2_changes.$$scope = { dirty, ctx };
    			}

    			highlighter2.$set(highlighter2_changes);
    			const highlighter3_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				highlighter3_changes.$$scope = { dirty, ctx };
    			}

    			highlighter3.$set(highlighter3_changes);
    			const highlighter4_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				highlighter4_changes.$$scope = { dirty, ctx };
    			}

    			highlighter4.$set(highlighter4_changes);
    			if (!current || dirty & /*milEnterDDay*/ 1) set_data_dev(t13, /*milEnterDDay*/ ctx[0]);
    			if (!current || dirty & /*milExitDDay*/ 2) set_data_dev(t15, /*milExitDDay*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(highlighter0.$$.fragment, local);
    			transition_in(highlighter1.$$.fragment, local);
    			transition_in(highlighter2.$$.fragment, local);
    			transition_in(highlighter3.$$.fragment, local);
    			transition_in(highlighter4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(highlighter0.$$.fragment, local);
    			transition_out(highlighter1.$$.fragment, local);
    			transition_out(highlighter2.$$.fragment, local);
    			transition_out(highlighter3.$$.fragment, local);
    			transition_out(highlighter4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(headerRoot);
    			destroy_component(highlighter0);
    			destroy_component(highlighter1);
    			destroy_component(highlighter2);
    			destroy_component(highlighter3);
    			destroy_component(highlighter4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let milEnterDDay, milExitDDay, number;
    	let headerMottoSwitch = 0;

    	setInterval(
    		() => {
    			headerMottoSwitch = (headerMottoSwitch + 1) % 2;
    			document.querySelector('#headerRoot__layer-shape').style.opacity = 1 - headerMottoSwitch;
    			document.querySelector('#headerRoot__shape-layer').style.opacity = headerMottoSwitch;
    		},
    		15000
    	);

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Highlighter,
    		getEnterMil,
    		getExitMil,
    		milEnterDDay,
    		milExitDDay,
    		number,
    		headerMottoSwitch
    	});

    	$$self.$inject_state = $$props => {
    		if ('milEnterDDay' in $$props) $$invalidate(0, milEnterDDay = $$props.milEnterDDay);
    		if ('milExitDDay' in $$props) $$invalidate(1, milExitDDay = $$props.milExitDDay);
    		if ('number' in $$props) number = $$props.number;
    		if ('headerMottoSwitch' in $$props) headerMottoSwitch = $$props.headerMottoSwitch;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(0, milEnterDDay = Math.floor(getEnterMil().getTime() / (1000 * 60 * 60 * 24)));
    	$$invalidate(1, milExitDDay = Math.floor(getExitMil().getTime() / (1000 * 60 * 60 * 24)));
    	return [milEnterDDay, milExitDDay];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\profile\SectionHeader.svelte generated by Svelte v3.47.0 */

    const file$4 = "src\\components\\profile\\SectionHeader.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let span;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "svelte-1u9c8hg");
    			add_location(span, file$4, 1, 0, 7);
    			attr_dev(div, "class", "svelte-1u9c8hg");
    			add_location(div, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionHeader', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class SectionHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionHeader",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\profile\SectionBody.svelte generated by Svelte v3.47.0 */

    const file$3 = "src\\components\\profile\\SectionBody.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-e9ovlj");
    			add_location(div, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionBody', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionBody> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class SectionBody extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionBody",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\includes\profile\Descriptions.svelte generated by Svelte v3.47.0 */
    const file$2 = "src\\includes\\profile\\Descriptions.svelte";

    // (6:2) <SectionHeader>
    function create_default_slot_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Hi there");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(6:2) <SectionHeader>",
    		ctx
    	});

    	return block;
    }

    // (7:2) <SectionBody>
    function create_default_slot_6(ctx) {
    	let div0;
    	let t0;
    	let br;
    	let t1;
    	let t2;
    	let div1;
    	let a0;
    	let t4;
    	let a1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text("안녕하세요. 박종현입니다.");
    			br = element("br");
    			t1 = text("\r\n      누구에게나 자랑스럽게 내세울 수 있는 멋진 프로젝트를 만들기 위해 부단히 노력하고 있습니다.");
    			t2 = space();
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "Github";
    			t4 = text(" | ");
    			a1 = element("a");
    			a1.textContent = "Instagram";
    			add_location(br, file$2, 8, 20, 295);
    			add_location(div0, file$2, 7, 4, 268);
    			attr_dev(a0, "href", "https://github.com/ShapeLayer");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$2, 12, 6, 389);
    			attr_dev(a1, "href", "https://instagram.com/__jong.hyeon__");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$2, 12, 75, 458);
    			add_location(div1, file$2, 11, 4, 376);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, br);
    			append_dev(div0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, a0);
    			append_dev(div1, t4);
    			append_dev(div1, a1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(7:2) <SectionBody>",
    		ctx
    	});

    	return block;
    }

    // (16:2) <SectionHeader>
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Overview");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(16:2) <SectionHeader>",
    		ctx
    	});

    	return block;
    }

    // (17:2) <SectionBody>
    function create_default_slot_4(ctx) {
    	let ul;
    	let li0;
    	let t0;
    	let i0;
    	let t2;
    	let li1;
    	let t3;
    	let i1;
    	let t5;
    	let li2;
    	let t6;
    	let i2;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li0 = element("li");
    			t0 = text("숭덕고등학교 졸업 ");
    			i0 = element("i");
    			i0.textContent = "18.03 - 21.02";
    			t2 = space();
    			li1 = element("li");
    			t3 = text("전남대학교 컴퓨터정보통신공학과 재학 ");
    			i1 = element("i");
    			i1.textContent = "21.03 -";
    			t5 = space();
    			li2 = element("li");
    			t6 = text("전남대학교 지능영상미디어인터페이스연구실 ");
    			i2 = element("i");
    			i2.textContent = "21.06 -";
    			attr_dev(i0, "class", "svelte-3okb6e");
    			add_location(i0, file$2, 18, 20, 656);
    			add_location(li0, file$2, 18, 6, 642);
    			attr_dev(i1, "class", "svelte-3okb6e");
    			add_location(i1, file$2, 19, 30, 713);
    			add_location(li1, file$2, 19, 6, 689);
    			attr_dev(i2, "class", "svelte-3okb6e");
    			add_location(i2, file$2, 20, 32, 766);
    			add_location(li2, file$2, 20, 6, 740);
    			attr_dev(ul, "class", "svelte-3okb6e");
    			add_location(ul, file$2, 17, 4, 630);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, t0);
    			append_dev(li0, i0);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			append_dev(li1, t3);
    			append_dev(li1, i1);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(li2, t6);
    			append_dev(li2, i2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(17:2) <SectionBody>",
    		ctx
    	});

    	return block;
    }

    // (24:2) <SectionHeader>
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Projects & Contributions");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(24:2) <SectionHeader>",
    		ctx
    	});

    	return block;
    }

    // (25:2) <SectionBody>
    function create_default_slot_2(ctx) {
    	let ul;
    	let li0;
    	let b0;
    	let t1;
    	let i0;
    	let t3;
    	let li1;
    	let b1;
    	let t5;
    	let i1;
    	let t7;
    	let li2;
    	let b2;
    	let t9;
    	let i2;
    	let t11;
    	let li3;
    	let b3;
    	let t13;
    	let i3;
    	let t15;
    	let li4;
    	let b4;
    	let t17;
    	let i4;
    	let t19;
    	let div;
    	let t20;
    	let li5;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li0 = element("li");
    			b0 = element("b");
    			b0.textContent = "openNAMU";
    			t1 = space();
    			i0 = element("i");
    			i0.textContent = "18.xx";
    			t3 = space();
    			li1 = element("li");
    			b1 = element("b");
    			b1.textContent = "숭덕고 갤러리";
    			t5 = space();
    			i1 = element("i");
    			i1.textContent = "18.08 - 19.02";
    			t7 = space();
    			li2 = element("li");
    			b2 = element("b");
    			b2.textContent = "hangulcord";
    			t9 = text(" 광주SW체험축전 체험부스 운영 ");
    			i2 = element("i");
    			i2.textContent = "19.04 - 19.05";
    			t11 = space();
    			li3 = element("li");
    			b3 = element("b");
    			b3.textContent = "악질 이름 생성기";
    			t13 = space();
    			i3 = element("i");
    			i3.textContent = "20.05 - 21.05";
    			t15 = space();
    			li4 = element("li");
    			b4 = element("b");
    			b4.textContent = "Advanced Sticky Note";
    			t17 = space();
    			i4 = element("i");
    			i4.textContent = "21.03 - 21.06";
    			t19 = space();
    			div = element("div");
    			t20 = space();
    			li5 = element("li");
    			li5.textContent = "이것들 외에 크고 작은 토이 프로젝트를 일구어나가고 있습니다. 제 깃허브에서 한번 확인해보세요.";
    			add_location(b0, file$2, 26, 10, 912);
    			attr_dev(i0, "class", "svelte-3okb6e");
    			add_location(i0, file$2, 26, 26, 928);
    			add_location(li0, file$2, 26, 6, 908);
    			add_location(b1, file$2, 27, 10, 957);
    			attr_dev(i1, "class", "svelte-3okb6e");
    			add_location(i1, file$2, 27, 25, 972);
    			add_location(li1, file$2, 27, 6, 953);
    			add_location(b2, file$2, 28, 10, 1009);
    			attr_dev(i2, "class", "svelte-3okb6e");
    			add_location(i2, file$2, 28, 45, 1044);
    			add_location(li2, file$2, 28, 6, 1005);
    			add_location(b3, file$2, 29, 10, 1081);
    			attr_dev(i3, "class", "svelte-3okb6e");
    			add_location(i3, file$2, 29, 27, 1098);
    			add_location(li3, file$2, 29, 6, 1077);
    			add_location(b4, file$2, 30, 10, 1135);
    			attr_dev(i4, "class", "svelte-3okb6e");
    			add_location(i4, file$2, 30, 38, 1163);
    			add_location(li4, file$2, 30, 6, 1131);
    			attr_dev(div, "class", "li-lineheight-divs svelte-3okb6e");
    			add_location(div, file$2, 31, 6, 1196);
    			add_location(li5, file$2, 32, 6, 1238);
    			attr_dev(ul, "class", "svelte-3okb6e");
    			add_location(ul, file$2, 25, 4, 896);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, b0);
    			append_dev(li0, t1);
    			append_dev(li0, i0);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(li1, b1);
    			append_dev(li1, t5);
    			append_dev(li1, i1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, b2);
    			append_dev(li2, t9);
    			append_dev(li2, i2);
    			append_dev(ul, t11);
    			append_dev(ul, li3);
    			append_dev(li3, b3);
    			append_dev(li3, t13);
    			append_dev(li3, i3);
    			append_dev(ul, t15);
    			append_dev(ul, li4);
    			append_dev(li4, b4);
    			append_dev(li4, t17);
    			append_dev(li4, i4);
    			append_dev(ul, t19);
    			append_dev(ul, div);
    			append_dev(ul, t20);
    			append_dev(ul, li5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(25:2) <SectionBody>",
    		ctx
    	});

    	return block;
    }

    // (36:2) <SectionHeader>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Footprints");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(36:2) <SectionHeader>",
    		ctx
    	});

    	return block;
    }

    // (37:2) <SectionBody>
    function create_default_slot(ctx) {
    	let ul0;
    	let li0;
    	let i0;
    	let t1;
    	let i1;
    	let t3;
    	let li1;
    	let t4;
    	let i2;
    	let t6;
    	let li2;
    	let t7;
    	let i3;
    	let t9;
    	let li3;
    	let t10;
    	let i4;
    	let t12;
    	let li4;
    	let t13;
    	let i5;
    	let t15;
    	let li5;
    	let t16;
    	let i6;
    	let t18;
    	let ul1;
    	let li6;
    	let t19;
    	let i7;
    	let t21;
    	let li7;
    	let t22;
    	let i8;
    	let t24;
    	let li8;
    	let t25;
    	let i9;
    	let t27;
    	let li9;
    	let t28;
    	let i10;
    	let t30;
    	let li10;
    	let t31;
    	let i11;
    	let t33;
    	let li11;
    	let t34;
    	let i12;
    	let t36;
    	let ul3;
    	let li12;
    	let t37;
    	let i13;
    	let t39;
    	let li13;
    	let t40;
    	let i14;
    	let t42;
    	let li14;
    	let t43;
    	let i15;
    	let t45;
    	let li15;
    	let t46;
    	let i16;
    	let t48;
    	let ul2;

    	const block = {
    		c: function create() {
    			ul0 = element("ul");
    			li0 = element("li");
    			i0 = element("i");
    			i0.textContent = "박종현";
    			t1 = space();
    			i1 = element("i");
    			i1.textContent = "02.01 -";
    			t3 = space();
    			li1 = element("li");
    			t4 = text("숭덕고등학교 ");
    			i2 = element("i");
    			i2.textContent = "18.03 - 21.02";
    			t6 = space();
    			li2 = element("li");
    			t7 = text("전남대학교 컴퓨터정보통신공학과 학부과정 ");
    			i3 = element("i");
    			i3.textContent = "21.03 -";
    			t9 = space();
    			li3 = element("li");
    			t10 = text("전남대학교 게임 개발 동아리 PIMM ");
    			i4 = element("i");
    			i4.textContent = "21.03 -";
    			t12 = space();
    			li4 = element("li");
    			t13 = text("전남대학교 지능영상미디어/인터페이스연구실 연구생 ");
    			i5 = element("i");
    			i5.textContent = "21.07 -";
    			t15 = space();
    			li5 = element("li");
    			t16 = text("전남대학교 AI융합대학 소프트웨어 개발 동아리 Stolio");
    			i6 = element("i");
    			i6.textContent = "22.03 -";
    			t18 = text("\r\n    : Activities & Trainings\r\n    ");
    			ul1 = element("ul");
    			li6 = element("li");
    			t19 = text("2019 광주SW체험축전 \"한글코드로 만드는 디스코드 챗봇\" 체험 부스 운영 ");
    			i7 = element("i");
    			i7.textContent = "19.05";
    			t21 = space();
    			li7 = element("li");
    			t22 = text("고등학교 학교간협력교육과정 게임 프로그래밍 과정 수료 ");
    			i8 = element("i");
    			i8.textContent = "20.04 - 20.07";
    			t24 = space();
    			li8 = element("li");
    			t25 = text("콘텐츠아카데미 정규과정(게임제작) 수료 ");
    			i9 = element("i");
    			i9.textContent = "21.07 - 21.08";
    			t27 = space();
    			li9 = element("li");
    			t28 = text("ACM ICPC Korea Regional Ranked ");
    			i10 = element("i");
    			i10.textContent = "21.10 - 21.11";
    			t30 = space();
    			li10 = element("li");
    			t31 = text("전남대학교 창업아이템경진대회 입선 ");
    			i11 = element("i");
    			i11.textContent = "21.11 - 21.12";
    			t33 = space();
    			li11 = element("li");
    			t34 = text("\"청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술개발\" 연구과제 참여 ");
    			i12 = element("i");
    			i12.textContent = "21.10 -";
    			t36 = text("\r\n    : Certificates & Language Tests\r\n    ");
    			ul3 = element("ul");
    			li12 = element("li");
    			t37 = text("TOEIC 815 ");
    			i13 = element("i");
    			i13.textContent = "21.08.08";
    			t39 = space();
    			li13 = element("li");
    			t40 = text("AWS Certified Cloud Practitioner ");
    			i14 = element("i");
    			i14.textContent = "22.01.25";
    			t42 = space();
    			li14 = element("li");
    			t43 = text("SQL 개발자 ");
    			i15 = element("i");
    			i15.textContent = "21.10.01";
    			t45 = space();
    			li15 = element("li");
    			t46 = text("Coding Specialist Professional I(1급) ");
    			i16 = element("i");
    			i16.textContent = "21.07.18";
    			t48 = space();
    			ul2 = element("ul");
    			attr_dev(i0, "class", "svelte-3okb6e");
    			add_location(i0, file$2, 38, 10, 1413);
    			attr_dev(i1, "class", "svelte-3okb6e");
    			add_location(i1, file$2, 38, 21, 1424);
    			add_location(li0, file$2, 38, 6, 1409);
    			attr_dev(i2, "class", "svelte-3okb6e");
    			add_location(i2, file$2, 39, 17, 1462);
    			add_location(li1, file$2, 39, 6, 1451);
    			attr_dev(i3, "class", "svelte-3okb6e");
    			add_location(i3, file$2, 40, 32, 1521);
    			add_location(li2, file$2, 40, 6, 1495);
    			attr_dev(i4, "class", "svelte-3okb6e");
    			add_location(i4, file$2, 41, 31, 1574);
    			add_location(li3, file$2, 41, 6, 1549);
    			attr_dev(i5, "class", "svelte-3okb6e");
    			add_location(i5, file$2, 42, 37, 1632);
    			add_location(li4, file$2, 42, 6, 1601);
    			attr_dev(i6, "class", "svelte-3okb6e");
    			add_location(i6, file$2, 43, 42, 1695);
    			add_location(li5, file$2, 43, 6, 1659);
    			attr_dev(ul0, "class", "svelte-3okb6e");
    			add_location(ul0, file$2, 37, 4, 1397);
    			attr_dev(i7, "class", "svelte-3okb6e");
    			add_location(i7, file$2, 47, 53, 1821);
    			add_location(li6, file$2, 47, 6, 1774);
    			attr_dev(i8, "class", "svelte-3okb6e");
    			add_location(i8, file$2, 48, 40, 1880);
    			add_location(li7, file$2, 48, 6, 1846);
    			attr_dev(i9, "class", "svelte-3okb6e");
    			add_location(i9, file$2, 49, 32, 1939);
    			add_location(li8, file$2, 49, 6, 1913);
    			attr_dev(i10, "class", "svelte-3okb6e");
    			add_location(i10, file$2, 50, 41, 2007);
    			add_location(li9, file$2, 50, 6, 1972);
    			attr_dev(i11, "class", "svelte-3okb6e");
    			add_location(i11, file$2, 51, 29, 2063);
    			add_location(li10, file$2, 51, 6, 2040);
    			attr_dev(i12, "class", "svelte-3okb6e");
    			add_location(i12, file$2, 52, 55, 2145);
    			add_location(li11, file$2, 52, 6, 2096);
    			attr_dev(ul1, "class", "svelte-3okb6e");
    			add_location(ul1, file$2, 46, 4, 1762);
    			attr_dev(i13, "class", "svelte-3okb6e");
    			add_location(i13, file$2, 56, 20, 2245);
    			add_location(li12, file$2, 56, 6, 2231);
    			attr_dev(i14, "class", "svelte-3okb6e");
    			add_location(i14, file$2, 57, 43, 2310);
    			add_location(li13, file$2, 57, 6, 2273);
    			attr_dev(i15, "class", "svelte-3okb6e");
    			add_location(i15, file$2, 58, 18, 2350);
    			add_location(li14, file$2, 58, 6, 2338);
    			attr_dev(i16, "class", "svelte-3okb6e");
    			add_location(i16, file$2, 59, 47, 2419);
    			add_location(li15, file$2, 59, 6, 2378);
    			attr_dev(ul2, "class", "svelte-3okb6e");
    			add_location(ul2, file$2, 60, 4, 2445);
    			attr_dev(ul3, "class", "svelte-3okb6e");
    			add_location(ul3, file$2, 55, 4, 2219);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul0, anchor);
    			append_dev(ul0, li0);
    			append_dev(li0, i0);
    			append_dev(li0, t1);
    			append_dev(li0, i1);
    			append_dev(ul0, t3);
    			append_dev(ul0, li1);
    			append_dev(li1, t4);
    			append_dev(li1, i2);
    			append_dev(ul0, t6);
    			append_dev(ul0, li2);
    			append_dev(li2, t7);
    			append_dev(li2, i3);
    			append_dev(ul0, t9);
    			append_dev(ul0, li3);
    			append_dev(li3, t10);
    			append_dev(li3, i4);
    			append_dev(ul0, t12);
    			append_dev(ul0, li4);
    			append_dev(li4, t13);
    			append_dev(li4, i5);
    			append_dev(ul0, t15);
    			append_dev(ul0, li5);
    			append_dev(li5, t16);
    			append_dev(li5, i6);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, ul1, anchor);
    			append_dev(ul1, li6);
    			append_dev(li6, t19);
    			append_dev(li6, i7);
    			append_dev(ul1, t21);
    			append_dev(ul1, li7);
    			append_dev(li7, t22);
    			append_dev(li7, i8);
    			append_dev(ul1, t24);
    			append_dev(ul1, li8);
    			append_dev(li8, t25);
    			append_dev(li8, i9);
    			append_dev(ul1, t27);
    			append_dev(ul1, li9);
    			append_dev(li9, t28);
    			append_dev(li9, i10);
    			append_dev(ul1, t30);
    			append_dev(ul1, li10);
    			append_dev(li10, t31);
    			append_dev(li10, i11);
    			append_dev(ul1, t33);
    			append_dev(ul1, li11);
    			append_dev(li11, t34);
    			append_dev(li11, i12);
    			insert_dev(target, t36, anchor);
    			insert_dev(target, ul3, anchor);
    			append_dev(ul3, li12);
    			append_dev(li12, t37);
    			append_dev(li12, i13);
    			append_dev(ul3, t39);
    			append_dev(ul3, li13);
    			append_dev(li13, t40);
    			append_dev(li13, i14);
    			append_dev(ul3, t42);
    			append_dev(ul3, li14);
    			append_dev(li14, t43);
    			append_dev(li14, i15);
    			append_dev(ul3, t45);
    			append_dev(ul3, li15);
    			append_dev(li15, t46);
    			append_dev(li15, i16);
    			append_dev(ul3, t48);
    			append_dev(ul3, ul2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul0);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(ul1);
    			if (detaching) detach_dev(t36);
    			if (detaching) detach_dev(ul3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(37:2) <SectionBody>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let sectionheader0;
    	let t0;
    	let sectionbody0;
    	let t1;
    	let sectionheader1;
    	let t2;
    	let sectionbody1;
    	let t3;
    	let sectionheader2;
    	let t4;
    	let sectionbody2;
    	let t5;
    	let sectionheader3;
    	let t6;
    	let sectionbody3;
    	let current;

    	sectionheader0 = new SectionHeader({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbody0 = new SectionBody({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionheader1 = new SectionHeader({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbody1 = new SectionBody({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionheader2 = new SectionHeader({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbody2 = new SectionBody({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionheader3 = new SectionHeader({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbody3 = new SectionBody({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(sectionheader0.$$.fragment);
    			t0 = space();
    			create_component(sectionbody0.$$.fragment);
    			t1 = space();
    			create_component(sectionheader1.$$.fragment);
    			t2 = space();
    			create_component(sectionbody1.$$.fragment);
    			t3 = space();
    			create_component(sectionheader2.$$.fragment);
    			t4 = space();
    			create_component(sectionbody2.$$.fragment);
    			t5 = space();
    			create_component(sectionheader3.$$.fragment);
    			t6 = space();
    			create_component(sectionbody3.$$.fragment);
    			attr_dev(div, "class", "desc-root svelte-3okb6e");
    			add_location(div, file$2, 4, 0, 179);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(sectionheader0, div, null);
    			append_dev(div, t0);
    			mount_component(sectionbody0, div, null);
    			append_dev(div, t1);
    			mount_component(sectionheader1, div, null);
    			append_dev(div, t2);
    			mount_component(sectionbody1, div, null);
    			append_dev(div, t3);
    			mount_component(sectionheader2, div, null);
    			append_dev(div, t4);
    			mount_component(sectionbody2, div, null);
    			append_dev(div, t5);
    			mount_component(sectionheader3, div, null);
    			append_dev(div, t6);
    			mount_component(sectionbody3, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sectionheader0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionheader0_changes.$$scope = { dirty, ctx };
    			}

    			sectionheader0.$set(sectionheader0_changes);
    			const sectionbody0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionbody0_changes.$$scope = { dirty, ctx };
    			}

    			sectionbody0.$set(sectionbody0_changes);
    			const sectionheader1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionheader1_changes.$$scope = { dirty, ctx };
    			}

    			sectionheader1.$set(sectionheader1_changes);
    			const sectionbody1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionbody1_changes.$$scope = { dirty, ctx };
    			}

    			sectionbody1.$set(sectionbody1_changes);
    			const sectionheader2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionheader2_changes.$$scope = { dirty, ctx };
    			}

    			sectionheader2.$set(sectionheader2_changes);
    			const sectionbody2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionbody2_changes.$$scope = { dirty, ctx };
    			}

    			sectionbody2.$set(sectionbody2_changes);
    			const sectionheader3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionheader3_changes.$$scope = { dirty, ctx };
    			}

    			sectionheader3.$set(sectionheader3_changes);
    			const sectionbody3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				sectionbody3_changes.$$scope = { dirty, ctx };
    			}

    			sectionbody3.$set(sectionbody3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sectionheader0.$$.fragment, local);
    			transition_in(sectionbody0.$$.fragment, local);
    			transition_in(sectionheader1.$$.fragment, local);
    			transition_in(sectionbody1.$$.fragment, local);
    			transition_in(sectionheader2.$$.fragment, local);
    			transition_in(sectionbody2.$$.fragment, local);
    			transition_in(sectionheader3.$$.fragment, local);
    			transition_in(sectionbody3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sectionheader0.$$.fragment, local);
    			transition_out(sectionbody0.$$.fragment, local);
    			transition_out(sectionheader1.$$.fragment, local);
    			transition_out(sectionbody1.$$.fragment, local);
    			transition_out(sectionheader2.$$.fragment, local);
    			transition_out(sectionbody2.$$.fragment, local);
    			transition_out(sectionheader3.$$.fragment, local);
    			transition_out(sectionbody3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(sectionheader0);
    			destroy_component(sectionbody0);
    			destroy_component(sectionheader1);
    			destroy_component(sectionbody1);
    			destroy_component(sectionheader2);
    			destroy_component(sectionbody2);
    			destroy_component(sectionheader3);
    			destroy_component(sectionbody3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Descriptions', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Descriptions> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ SectionHeader, SectionBody });
    	return [];
    }

    class Descriptions extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Descriptions",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\includes\profile\Footer.svelte generated by Svelte v3.47.0 */

    const file$1 = "src\\includes\\profile\\Footer.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let a;
    	let img;
    	let img_src_value;
    	let br0;
    	let t0;
    	let br1;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			img = element("img");
    			br0 = element("br");
    			t0 = text("\r\n  © Powered with ❤️ ");
    			br1 = element("br");
    			t1 = text("\r\n  by Park, Jonghyeon / ShapeLayer.");
    			attr_dev(img, "alt", "Unicode Consortium Bronze Sponser");
    			if (!src_url_equal(img.src, img_src_value = "https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-q7c1qr");
    			add_location(img, file$1, 1, 105, 112);
    			attr_dev(a, "class", "no-deco svelte-q7c1qr");
    			attr_dev(a, "href", "http://unicode.org/consortium/adopted-characters.html#b1F30C");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$1, 1, 2, 9);
    			add_location(br0, file$1, 1, 226, 233);
    			add_location(br1, file$1, 2, 25, 264);
    			attr_dev(div, "class", "svelte-q7c1qr");
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			append_dev(a, img);
    			append_dev(div, br0);
    			append_dev(div, t0);
    			append_dev(div, br1);
    			append_dev(div, t1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.47.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let t0;
    	let descriptions;
    	let t1;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	descriptions = new Descriptions({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(descriptions.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(main, "class", "svelte-1ukyoh0");
    			add_location(main, file, 5, 0, 209);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			mount_component(descriptions, main, null);
    			append_dev(main, t1);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(descriptions.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(descriptions.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(descriptions);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Descriptions, Footer });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
