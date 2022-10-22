
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
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
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
            ctx: [],
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
            if (!is_function(callback)) {
                return noop;
            }
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.52.0' }, detail), { bubbles: true }));
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

    /* src/includes/Header.svelte generated by Svelte v3.52.0 */
    const file$7 = "src/includes/Header.svelte";

    function create_fragment$7(ctx) {
    	let header;
    	let div1;
    	let div0;
    	let h10;
    	let t0;
    	let br0;
    	let t1;
    	let span0;
    	let br1;
    	let t3;
    	let span1;
    	let t5;
    	let h11;
    	let a0;
    	let t6;
    	let br2;
    	let t7;
    	let span2;
    	let br3;
    	let t9;
    	let span3;
    	let t11;
    	let h12;
    	let a1;
    	let t12;
    	let br4;
    	let t13;
    	let span4;
    	let br5;
    	let t15;
    	let span5;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div1 = element("div");
    			div0 = element("div");
    			h10 = element("h1");
    			t0 = text("CREATES A WORLD");
    			br0 = element("br");
    			t1 = text("\n        BY ");
    			span0 = element("span");
    			span0.textContent = "LAYERING";
    			br1 = element("br");
    			t3 = text("\n        VARIOUS ");
    			span1 = element("span");
    			span1.textContent = "SHAPES.";
    			t5 = space();
    			h11 = element("h1");
    			a0 = element("a");
    			t6 = text("CREATES A WORLD");
    			br2 = element("br");
    			t7 = text("BY ");
    			span2 = element("span");
    			span2.textContent = "LAYERING";
    			br3 = element("br");
    			t9 = text("VARIOUS ");
    			span3 = element("span");
    			span3.textContent = "SHAPES.";
    			t11 = space();
    			h12 = element("h1");
    			a1 = element("a");
    			t12 = text("CREATES A WORLD");
    			br4 = element("br");
    			t13 = text("BY ");
    			span4 = element("span");
    			span4.textContent = "SHAPING";
    			br5 = element("br");
    			t15 = text("VARIOUS ");
    			span5 = element("span");
    			span5.textContent = "LAYERS.";
    			add_location(br0, file$7, 4, 23, 125);
    			attr_dev(span0, "id", "hero__trans-target-1");
    			attr_dev(span0, "class", "highlight svelte-7fp1qj");
    			add_location(span0, file$7, 5, 11, 141);
    			add_location(br1, file$7, 5, 76, 206);
    			attr_dev(span1, "id", "hero__trans-target-2");
    			attr_dev(span1, "class", "highlight svelte-7fp1qj");
    			add_location(span1, file$7, 6, 16, 227);
    			attr_dev(h10, "class", "hero__content pseudo svelte-7fp1qj");
    			add_location(h10, file$7, 3, 6, 68);
    			add_location(br2, file$7, 8, 106, 410);
    			attr_dev(span2, "id", "hero__trans-target-1");
    			attr_dev(span2, "class", "highlight svelte-7fp1qj");
    			add_location(span2, file$7, 8, 113, 417);
    			add_location(br3, file$7, 8, 178, 482);
    			attr_dev(span3, "id", "hero__trans-target-2");
    			attr_dev(span3, "class", "highlight svelte-7fp1qj");
    			add_location(span3, file$7, 8, 190, 494);
    			attr_dev(a0, "class", "no-hover svelte-7fp1qj");
    			attr_dev(a0, "href", "#profile");
    			add_location(a0, file$7, 8, 55, 359);
    			attr_dev(h11, "id", "hero__layer-shape");
    			attr_dev(h11, "class", "hero__content svelte-7fp1qj");
    			add_location(h11, file$7, 8, 6, 310);
    			add_location(br4, file$7, 9, 107, 675);
    			attr_dev(span4, "id", "hero__trans-target-1");
    			attr_dev(span4, "class", "highlight svelte-7fp1qj");
    			add_location(span4, file$7, 9, 114, 682);
    			add_location(br5, file$7, 9, 178, 746);
    			attr_dev(span5, "id", "hero__trans-target-2");
    			attr_dev(span5, "class", "highlight svelte-7fp1qj");
    			add_location(span5, file$7, 9, 190, 758);
    			attr_dev(a1, "class", "no-hover svelte-7fp1qj");
    			attr_dev(a1, "href", "#profile");
    			add_location(a1, file$7, 9, 55, 623);
    			attr_dev(h12, "id", "hero__shape-layer");
    			attr_dev(h12, "class", "hero__content svelte-7fp1qj");
    			add_location(h12, file$7, 9, 6, 574);
    			attr_dev(div0, "class", "hero__wrapper svelte-7fp1qj");
    			add_location(div0, file$7, 2, 4, 34);
    			attr_dev(div1, "class", "hero svelte-7fp1qj");
    			add_location(div1, file$7, 1, 2, 11);
    			attr_dev(header, "class", "svelte-7fp1qj");
    			add_location(header, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h10);
    			append_dev(h10, t0);
    			append_dev(h10, br0);
    			append_dev(h10, t1);
    			append_dev(h10, span0);
    			append_dev(h10, br1);
    			append_dev(h10, t3);
    			append_dev(h10, span1);
    			append_dev(div0, t5);
    			append_dev(div0, h11);
    			append_dev(h11, a0);
    			append_dev(a0, t6);
    			append_dev(a0, br2);
    			append_dev(a0, t7);
    			append_dev(a0, span2);
    			append_dev(a0, br3);
    			append_dev(a0, t9);
    			append_dev(a0, span3);
    			append_dev(div0, t11);
    			append_dev(div0, h12);
    			append_dev(h12, a1);
    			append_dev(a1, t12);
    			append_dev(a1, br4);
    			append_dev(a1, t13);
    			append_dev(a1, span4);
    			append_dev(a1, br5);
    			append_dev(a1, t15);
    			append_dev(a1, span5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function startHeaderTransition() {
    	let headerMottoSwitch = 0;

    	setInterval(
    		() => {
    			headerMottoSwitch = (headerMottoSwitch + 1) % 2;
    			document.querySelector('#hero__layer-shape').style.opacity = 1 - headerMottoSwitch;
    			document.querySelector('#hero__shape-layer').style.opacity = headerMottoSwitch;
    		},
    		2500
    	);
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	onMount(() => startHeaderTransition());
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount, startHeaderTransition });
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/includes/Profile.svelte generated by Svelte v3.52.0 */

    const file$6 = "src/includes/Profile.svelte";

    function create_fragment$6(ctx) {
    	let section;
    	let div2;
    	let div0;
    	let h3;
    	let t1;
    	let h2;
    	let t3;
    	let p0;
    	let br0;
    	let t4;
    	let p1;
    	let t5;
    	let br1;
    	let t6;
    	let t7;
    	let p2;
    	let t8;
    	let br2;
    	let t9;
    	let t10;
    	let p3;
    	let t11;
    	let br3;
    	let t12;
    	let t13;
    	let p4;
    	let t15;
    	let p5;
    	let br4;
    	let t16;
    	let p6;
    	let t18;
    	let div1;
    	let ul0;
    	let li0;
    	let a0;
    	let t20;
    	let li1;
    	let a1;
    	let t22;
    	let ul1;
    	let li2;
    	let a2;
    	let t24;
    	let li3;
    	let a3;
    	let t26;
    	let li4;
    	let a4;
    	let t28;
    	let li5;
    	let a5;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "PARK \"SHAPELAYER\" JONGHYEON";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "개발자가 멋있었던 아이_";
    			t3 = space();
    			p0 = element("p");
    			br0 = element("br");
    			t4 = space();
    			p1 = element("p");
    			t5 = text("입원 생활로 하루 하루를 보내던 09년 여름,");
    			br1 = element("br");
    			t6 = text("옆 침대 대학생 형을 따라다니며 프로그래밍을 구경하던 아이");
    			t7 = space();
    			p2 = element("p");
    			t8 = text("마인크래프트가 인생의 낙이었던 14년,");
    			br2 = element("br");
    			t9 = text("마인크래프트 플러그인 개발자들을 따라하며 \"멋진 사람\"을 꿈꾼 소년");
    			t10 = space();
    			p3 = element("p");
    			t11 = text("웹 프로그래밍이 고된 수험의 쉼표였던 20년,");
    			br3 = element("br");
    			t12 = text("친구들에 둘러싸여 무언가를 만들었던 학생");
    			t13 = space();
    			p4 = element("p");
    			p4.textContent = "그리고 오늘에 이르른.";
    			t15 = space();
    			p5 = element("p");
    			br4 = element("br");
    			t16 = space();
    			p6 = element("p");
    			p6.textContent = "안녕하세요. 학생과 개발자 사이, 박종현입니다.";
    			t18 = space();
    			div1 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "me@jonghyeon.me";
    			t20 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "instagram";
    			t22 = space();
    			ul1 = element("ul");
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "github";
    			t24 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "blog";
    			t26 = space();
    			li4 = element("li");
    			a4 = element("a");
    			a4.textContent = "credly";
    			t28 = space();
    			li5 = element("li");
    			a5 = element("a");
    			a5.textContent = "solved.ac";
    			attr_dev(h3, "class", "profile__name subsubtitle");
    			add_location(h3, file$6, 3, 6, 111);
    			attr_dev(h2, "class", "profile__overview subtitle");
    			add_location(h2, file$6, 4, 6, 188);
    			add_location(br0, file$6, 5, 9, 256);
    			attr_dev(p0, "class", "svelte-19h2xjl");
    			add_location(p0, file$6, 5, 6, 253);
    			add_location(br1, file$6, 6, 34, 299);
    			attr_dev(p1, "class", "svelte-19h2xjl");
    			add_location(p1, file$6, 6, 6, 271);
    			add_location(br2, file$6, 7, 30, 370);
    			attr_dev(p2, "class", "svelte-19h2xjl");
    			add_location(p2, file$6, 7, 6, 346);
    			add_location(br3, file$6, 8, 34, 450);
    			attr_dev(p3, "class", "svelte-19h2xjl");
    			add_location(p3, file$6, 8, 6, 422);
    			attr_dev(p4, "class", "svelte-19h2xjl");
    			add_location(p4, file$6, 9, 6, 487);
    			add_location(br4, file$6, 10, 9, 516);
    			attr_dev(p5, "class", "svelte-19h2xjl");
    			add_location(p5, file$6, 10, 6, 513);
    			attr_dev(p6, "class", "svelte-19h2xjl");
    			add_location(p6, file$6, 11, 6, 531);
    			attr_dev(div0, "class", "profile__intro");
    			add_location(div0, file$6, 2, 4, 76);
    			attr_dev(a0, "href", "mailto:me@jonghyeon.me");
    			attr_dev(a0, "class", "svelte-19h2xjl");
    			add_location(a0, file$6, 15, 12, 646);
    			add_location(li0, file$6, 15, 8, 642);
    			attr_dev(a1, "href", "https://www.instagram.com/__jong.hyeon__/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-19h2xjl");
    			add_location(a1, file$6, 16, 12, 716);
    			add_location(li1, file$6, 16, 8, 712);
    			attr_dev(ul0, "class", "enums");
    			add_location(ul0, file$6, 14, 6, 615);
    			attr_dev(a2, "href", "https://github.com/ShapeLayer");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "class", "svelte-19h2xjl");
    			add_location(a2, file$6, 19, 12, 852);
    			add_location(li2, file$6, 19, 8, 848);
    			attr_dev(a3, "href", "https://blog.jonghyeon.me");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-19h2xjl");
    			add_location(a3, file$6, 20, 12, 936);
    			add_location(li3, file$6, 20, 8, 932);
    			attr_dev(a4, "href", "https://www.credly.com/users/jonghyeon");
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "class", "svelte-19h2xjl");
    			add_location(a4, file$6, 21, 12, 1014);
    			add_location(li4, file$6, 21, 8, 1010);
    			attr_dev(a5, "href", "https://solved.ac/profile/belline0124");
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "class", "svelte-19h2xjl");
    			add_location(a5, file$6, 22, 12, 1107);
    			add_location(li5, file$6, 22, 8, 1103);
    			attr_dev(ul1, "class", "enums");
    			add_location(ul1, file$6, 18, 6, 821);
    			attr_dev(div1, "class", "profile__links");
    			add_location(div1, file$6, 13, 4, 580);
    			attr_dev(div2, "class", "profile__content");
    			add_location(div2, file$6, 1, 2, 41);
    			attr_dev(section, "id", "profile");
    			attr_dev(section, "class", "profile svelte-19h2xjl");
    			add_location(section, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(div0, t3);
    			append_dev(div0, p0);
    			append_dev(p0, br0);
    			append_dev(div0, t4);
    			append_dev(div0, p1);
    			append_dev(p1, t5);
    			append_dev(p1, br1);
    			append_dev(p1, t6);
    			append_dev(div0, t7);
    			append_dev(div0, p2);
    			append_dev(p2, t8);
    			append_dev(p2, br2);
    			append_dev(p2, t9);
    			append_dev(div0, t10);
    			append_dev(div0, p3);
    			append_dev(p3, t11);
    			append_dev(p3, br3);
    			append_dev(p3, t12);
    			append_dev(div0, t13);
    			append_dev(div0, p4);
    			append_dev(div0, t15);
    			append_dev(div0, p5);
    			append_dev(p5, br4);
    			append_dev(div0, t16);
    			append_dev(div0, p6);
    			append_dev(div2, t18);
    			append_dev(div2, div1);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(ul0, t20);
    			append_dev(ul0, li1);
    			append_dev(li1, a1);
    			append_dev(div1, t22);
    			append_dev(div1, ul1);
    			append_dev(ul1, li2);
    			append_dev(li2, a2);
    			append_dev(ul1, t24);
    			append_dev(ul1, li3);
    			append_dev(li3, a3);
    			append_dev(ul1, t26);
    			append_dev(ul1, li4);
    			append_dev(li4, a4);
    			append_dev(ul1, t28);
    			append_dev(ul1, li5);
    			append_dev(li5, a5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
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

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Profile', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Profile> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Profile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Profile",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/commons/MilDDay.svelte generated by Svelte v3.52.0 */
    const file$5 = "src/components/commons/MilDDay.svelte";

    function create_fragment$5(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "nn%, 전역까지 dd일";
    			attr_dev(span, "id", "military-dday");
    			add_location(span, file$5, 12, 0, 472);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
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

    const enlist = new Date('2022-07-04');
    const discharge = new Date('2024-01-03');

    function getRemains(fn) {
    	let now = new Date();
    	let totalRemains = discharge - enlist;
    	let nowRemains = discharge - now;
    	let remainsDay = Math.floor(nowRemains / (1000 * 60 * 60 * 24));
    	let percentage = Math.max((1 - nowRemains / totalRemains) * 100, 0).toFixed(2);
    	return `${percentage}%, 전역까지 ${remainsDay}일`;
    }

    function updateInformation() {
    	const el = document.getElementById('military-dday');
    	el.innerText = getRemains();

    	setInterval(
    		() => {
    			el.innerText = getRemains();
    		},
    		10000
    	);
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MilDDay', slots, []);
    	onMount(() => updateInformation());
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MilDDay> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		enlist,
    		discharge,
    		getRemains,
    		onMount,
    		updateInformation
    	});

    	return [];
    }

    class MilDDay extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MilDDay",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/Careers/CareersSectionContent.svelte generated by Svelte v3.52.0 */

    const file$4 = "src/components/Careers/CareersSectionContent.svelte";

    // (9:2) {:else}
    function create_else_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*name*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1) set_data_dev(t, /*name*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(9:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (7:2) {#if url !== ''}
    function create_if_block_1(ctx) {
    	let a;
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(/*name*/ ctx[0]);
    			attr_dev(a, "href", /*url*/ ctx[2]);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$4, 7, 4, 122);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1) set_data_dev(t, /*name*/ ctx[0]);

    			if (dirty & /*url*/ 4) {
    				attr_dev(a, "href", /*url*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(7:2) {#if url !== ''}",
    		ctx
    	});

    	return block;
    }

    // (13:2) {#if name !== ''}
    function create_if_block$1(ctx) {
    	let br;

    	const block = {
    		c: function create() {
    			br = element("br");
    			add_location(br, file$4, 13, 4, 261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(13:2) {#if name !== ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let li;
    	let t0;
    	let span;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*url*/ ctx[2] !== '') return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*name*/ ctx[0] !== '' && create_if_block$1(ctx);
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if_block0.c();
    			t0 = space();
    			span = element("span");
    			t1 = text(/*date*/ ctx[1]);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "datetime svelte-hyrn7w");
    			add_location(span, file$4, 11, 2, 198);
    			attr_dev(li, "class", "svelte-hyrn7w");
    			add_location(li, file$4, 5, 0, 94);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if_block0.m(li, null);
    			append_dev(li, t0);
    			append_dev(li, span);
    			append_dev(span, t1);
    			append_dev(li, t2);
    			if (if_block1) if_block1.m(li, null);
    			append_dev(li, t3);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(li, t0);
    				}
    			}

    			if (!current || dirty & /*date*/ 2) set_data_dev(t1, /*date*/ ctx[1]);

    			if (/*name*/ ctx[0] !== '') {
    				if (if_block1) ; else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(li, t3);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
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
    			if (detaching) detach_dev(li);
    			if_block0.d();
    			if (if_block1) if_block1.d();
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
    	validate_slots('CareersSectionContent', slots, ['default']);
    	let { name = '' } = $$props;
    	let { date = '' } = $$props;
    	let { url = '' } = $$props;
    	const writable_props = ['name', 'date', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CareersSectionContent> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('date' in $$props) $$invalidate(1, date = $$props.date);
    		if ('url' in $$props) $$invalidate(2, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ name, date, url });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('date' in $$props) $$invalidate(1, date = $$props.date);
    		if ('url' in $$props) $$invalidate(2, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, date, url, $$scope, slots];
    }

    class CareersSectionContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { name: 0, date: 1, url: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CareersSectionContent",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get name() {
    		throw new Error("<CareersSectionContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<CareersSectionContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<CareersSectionContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<CareersSectionContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<CareersSectionContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<CareersSectionContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Careers/CareersSection.svelte generated by Svelte v3.52.0 */
    const file$3 = "src/components/Careers/CareersSection.svelte";

    // (7:1) {#if title !== ''}
    function create_if_block(ctx) {
    	let h3;
    	let t;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t = text(/*title*/ ctx[1]);
    			attr_dev(h3, "class", "subtitle svelte-1u4nv5d");
    			add_location(h3, file$3, 7, 2, 182);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(7:1) {#if title !== ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let t;
    	let ul;
    	let div_id_value;
    	let current;
    	let if_block = /*title*/ ctx[1] !== '' && create_if_block(ctx);
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			add_location(ul, file$3, 9, 1, 227);
    			attr_dev(div, "id", div_id_value = /*id*/ ctx[0] ? /*id*/ ctx[0] : null);
    			attr_dev(div, "class", "careers__sections svelte-1u4nv5d");
    			add_location(div, file$3, 5, 0, 108);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t);
    			append_dev(div, ul);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1] !== '') {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 1 && div_id_value !== (div_id_value = /*id*/ ctx[0] ? /*id*/ ctx[0] : null)) {
    				attr_dev(div, "id", div_id_value);
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
    			if (if_block) if_block.d();
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
    	validate_slots('CareersSection', slots, ['default']);
    	let { id } = $$props;
    	let { title = '' } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console.warn("<CareersSection> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['id', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CareersSection> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ id, title });

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, title, $$scope, slots];
    }

    class CareersSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CareersSection",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get id() {
    		throw new Error("<CareersSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<CareersSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CareersSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CareersSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/includes/Careers.svelte generated by Svelte v3.52.0 */
    const file$2 = "src/includes/Careers.svelte";

    // (11:6) <CareersSectionContent          name='대한민국 육군 기술행정병 네트워크운용/정비 분과'         date='2022.07-2024.01'       >
    function create_default_slot_16(ctx) {
    	let t;
    	let mildday;
    	let current;
    	mildday = new MilDDay({ $$inline: true });

    	const block = {
    		c: function create() {
    			t = text("⇒ ");
    			create_component(mildday.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			mount_component(mildday, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mildday.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mildday.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			destroy_component(mildday, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(11:6) <CareersSectionContent          name='대한민국 육군 기술행정병 네트워크운용/정비 분과'         date='2022.07-2024.01'       >",
    		ctx
    	});

    	return block;
    }

    // (10:4) <CareersSection id='careers__military'>
    function create_default_slot_15(ctx) {
    	let careerssectioncontent;
    	let current;

    	careerssectioncontent = new CareersSectionContent({
    			props: {
    				name: "대한민국 육군 기술행정병 네트워크운용/정비 분과",
    				date: "2022.07-2024.01",
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const careerssectioncontent_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent.$set(careerssectioncontent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(10:4) <CareersSection id='careers__military'>",
    		ctx
    	});

    	return block;
    }

    // (18:4) <CareersSection id='careers__education' title='EDUCATION'>
    function create_default_slot_14(ctx) {
    	let careerssectioncontent0;
    	let t;
    	let careerssectioncontent1;
    	let current;

    	careerssectioncontent0 = new CareersSectionContent({
    			props: { name: "숭덕고등학교", date: "2018.03-2021.02" },
    			$$inline: true
    		});

    	careerssectioncontent1 = new CareersSectionContent({
    			props: {
    				name: "전남대학교 컴퓨터정보통신공학과 학부과정 21학번",
    				date: "2021.03-"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent0.$$.fragment);
    			t = space();
    			create_component(careerssectioncontent1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(careerssectioncontent1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent0.$$.fragment, local);
    			transition_in(careerssectioncontent1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent0.$$.fragment, local);
    			transition_out(careerssectioncontent1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(careerssectioncontent1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(18:4) <CareersSection id='careers__education' title='EDUCATION'>",
    		ctx
    	});

    	return block;
    }

    // (28:4) <CareersSection id='careers__education' title='WORK'>
    function create_default_slot_13(ctx) {
    	let careerssectioncontent;
    	let current;

    	careerssectioncontent = new CareersSectionContent({
    			props: {
    				name: "전남대학교 지능영상미디어인터페이스 연구실",
    				date: "2021.06-2022.07"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(28:4) <CareersSection id='careers__education' title='WORK'>",
    		ctx
    	});

    	return block;
    }

    // (35:6) <CareersSectionContent          name='악질 이름 생성기'         date='2020.05'         url='https://name.ho9.me'       >
    function create_default_slot_12(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⇒ 개인 프로젝트");
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
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(35:6) <CareersSectionContent          name='악질 이름 생성기'         date='2020.05'         url='https://name.ho9.me'       >",
    		ctx
    	});

    	return block;
    }

    // (42:6) <CareersSectionContent         name='청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발'         date='2021.06-2022.07'       >
    function create_default_slot_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⇒ 연구실 연구과제 // 클라이언트 개발");
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
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(42:6) <CareersSectionContent         name='청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발'         date='2021.06-2022.07'       >",
    		ctx
    	});

    	return block;
    }

    // (48:6) <CareersSectionContent         name='2022 호남 대학간 침해 대응 대회 2022 대회 사이트'         date='2022.06'         url='https://hccc2022.github.io'       >
    function create_default_slot_10(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⇒ 아웃소싱 // 프론트엔드 디자인 및 개발");
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
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(48:6) <CareersSectionContent         name='2022 호남 대학간 침해 대응 대회 2022 대회 사이트'         date='2022.06'         url='https://hccc2022.github.io'       >",
    		ctx
    	});

    	return block;
    }

    // (55:6) <CareersSectionContent         name='IW-FCV 2023 학회 정보 사이트'         date='2022.05-2022.07'         url='https://iwfcv2023.github.io'       >
    function create_default_slot_9(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⇒ 아웃소싱 // 초기 프론트엔드 디자인 및 개발");
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
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(55:6) <CareersSectionContent         name='IW-FCV 2023 학회 정보 사이트'         date='2022.05-2022.07'         url='https://iwfcv2023.github.io'       >",
    		ctx
    	});

    	return block;
    }

    // (62:6) <CareersSectionContent>
    function create_default_slot_8(ctx) {
    	let t0;
    	let a;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("그 외 프로젝트들은 ");
    			a = element("a");
    			a.textContent = "Github";
    			t2 = text("를 참조하세요.");
    			attr_dev(a, "href", "https://github.com/ShapeLayer");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$2, 62, 19, 1977);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, a, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(a);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(62:6) <CareersSectionContent>",
    		ctx
    	});

    	return block;
    }

    // (34:4) <CareersSection id='careers__projects' title='PROJECTS'>
    function create_default_slot_7(ctx) {
    	let careerssectioncontent0;
    	let t0;
    	let careerssectioncontent1;
    	let t1;
    	let careerssectioncontent2;
    	let t2;
    	let careerssectioncontent3;
    	let t3;
    	let careerssectioncontent4;
    	let current;

    	careerssectioncontent0 = new CareersSectionContent({
    			props: {
    				name: "악질 이름 생성기",
    				date: "2020.05",
    				url: "https://name.ho9.me",
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent1 = new CareersSectionContent({
    			props: {
    				name: "청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발",
    				date: "2021.06-2022.07",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent2 = new CareersSectionContent({
    			props: {
    				name: "2022 호남 대학간 침해 대응 대회 2022 대회 사이트",
    				date: "2022.06",
    				url: "https://hccc2022.github.io",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent3 = new CareersSectionContent({
    			props: {
    				name: "IW-FCV 2023 학회 정보 사이트",
    				date: "2022.05-2022.07",
    				url: "https://iwfcv2023.github.io",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent4 = new CareersSectionContent({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent0.$$.fragment);
    			t0 = space();
    			create_component(careerssectioncontent1.$$.fragment);
    			t1 = space();
    			create_component(careerssectioncontent2.$$.fragment);
    			t2 = space();
    			create_component(careerssectioncontent3.$$.fragment);
    			t3 = space();
    			create_component(careerssectioncontent4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(careerssectioncontent1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(careerssectioncontent2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(careerssectioncontent3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(careerssectioncontent4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const careerssectioncontent0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent0_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent0.$set(careerssectioncontent0_changes);
    			const careerssectioncontent1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent1_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent1.$set(careerssectioncontent1_changes);
    			const careerssectioncontent2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent2_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent2.$set(careerssectioncontent2_changes);
    			const careerssectioncontent3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent3_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent3.$set(careerssectioncontent3_changes);
    			const careerssectioncontent4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent4_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent4.$set(careerssectioncontent4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent0.$$.fragment, local);
    			transition_in(careerssectioncontent1.$$.fragment, local);
    			transition_in(careerssectioncontent2.$$.fragment, local);
    			transition_in(careerssectioncontent3.$$.fragment, local);
    			transition_in(careerssectioncontent4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent0.$$.fragment, local);
    			transition_out(careerssectioncontent1.$$.fragment, local);
    			transition_out(careerssectioncontent2.$$.fragment, local);
    			transition_out(careerssectioncontent3.$$.fragment, local);
    			transition_out(careerssectioncontent4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(careerssectioncontent1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(careerssectioncontent2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(careerssectioncontent3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(careerssectioncontent4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(34:4) <CareersSection id='careers__projects' title='PROJECTS'>",
    		ctx
    	});

    	return block;
    }

    // (75:6) <CareersSectionContent         name='자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘'         date='2021.11'       >
    function create_default_slot_6(ctx) {
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("⇒ 연구과제 논문 // 공동저자");
    			br = element("br");
    			t1 = text("\n        ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.");
    			add_location(br, file$2, 78, 25, 2529);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(75:6) <CareersSectionContent         name='자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘'         date='2021.11'       >",
    		ctx
    	});

    	return block;
    }

    // (82:6) <CareersSectionContent         name='자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화'         date='2022.06'       >
    function create_default_slot_5(ctx) {
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("⇒ 연구과제 논문 // 공동저자");
    			br = element("br");
    			t1 = text("\n        ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우");
    			add_location(br, file$2, 85, 25, 2762);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(82:6) <CareersSectionContent         name='자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화'         date='2022.06'       >",
    		ctx
    	});

    	return block;
    }

    // (66:4) <CareersSection id='careers__achievements' title='ACHIEVEMENTS'>
    function create_default_slot_4(ctx) {
    	let careerssectioncontent0;
    	let t0;
    	let careerssectioncontent1;
    	let t1;
    	let careerssectioncontent2;
    	let t2;
    	let careerssectioncontent3;
    	let current;

    	careerssectioncontent0 = new CareersSectionContent({
    			props: {
    				name: "전남대학교 창업아이템경진대회 입선",
    				date: "2021.12"
    			},
    			$$inline: true
    		});

    	careerssectioncontent1 = new CareersSectionContent({
    			props: {
    				name: "The 2021 ICPC Asia Seoul Regional Contest 53th",
    				date: "2021.11.13"
    			},
    			$$inline: true
    		});

    	careerssectioncontent2 = new CareersSectionContent({
    			props: {
    				name: "자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘",
    				date: "2021.11",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent3 = new CareersSectionContent({
    			props: {
    				name: "자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화",
    				date: "2022.06",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent0.$$.fragment);
    			t0 = space();
    			create_component(careerssectioncontent1.$$.fragment);
    			t1 = space();
    			create_component(careerssectioncontent2.$$.fragment);
    			t2 = space();
    			create_component(careerssectioncontent3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(careerssectioncontent1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(careerssectioncontent2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(careerssectioncontent3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const careerssectioncontent2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent2_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent2.$set(careerssectioncontent2_changes);
    			const careerssectioncontent3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent3_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent3.$set(careerssectioncontent3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent0.$$.fragment, local);
    			transition_in(careerssectioncontent1.$$.fragment, local);
    			transition_in(careerssectioncontent2.$$.fragment, local);
    			transition_in(careerssectioncontent3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent0.$$.fragment, local);
    			transition_out(careerssectioncontent1.$$.fragment, local);
    			transition_out(careerssectioncontent2.$$.fragment, local);
    			transition_out(careerssectioncontent3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(careerssectioncontent1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(careerssectioncontent2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(careerssectioncontent3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(66:4) <CareersSection id='careers__achievements' title='ACHIEVEMENTS'>",
    		ctx
    	});

    	return block;
    }

    // (91:6) <CareersSectionContent         name='2019 광주SW체험축전 "한글코드로 만드는 디스코드 챗봇" 체험 부스 운영'         date='2019.05'       >
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⇒ 체험 축전 // 기획, 운영 및 개발");
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
    		source: "(91:6) <CareersSectionContent         name='2019 광주SW체험축전 \\\"한글코드로 만드는 디스코드 챗봇\\\" 체험 부스 운영'         date='2019.05'       >",
    		ctx
    	});

    	return block;
    }

    // (90:4) <CareersSection id='careers__activities' title='ACTIVITIES'>
    function create_default_slot_2(ctx) {
    	let careerssectioncontent0;
    	let t0;
    	let careerssectioncontent1;
    	let t1;
    	let careerssectioncontent2;
    	let current;

    	careerssectioncontent0 = new CareersSectionContent({
    			props: {
    				name: "2019 광주SW체험축전 \"한글코드로 만드는 디스코드 챗봇\" 체험 부스 운영",
    				date: "2019.05",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent1 = new CareersSectionContent({
    			props: {
    				name: "전남대학교 게임개발동아리 PIMM",
    				date: "2021.03-"
    			},
    			$$inline: true
    		});

    	careerssectioncontent2 = new CareersSectionContent({
    			props: {
    				name: "전남대학교 소프트웨어 개발동아리 Stolio",
    				date: "2022.03-"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent0.$$.fragment);
    			t0 = space();
    			create_component(careerssectioncontent1.$$.fragment);
    			t1 = space();
    			create_component(careerssectioncontent2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(careerssectioncontent1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(careerssectioncontent2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const careerssectioncontent0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent0_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent0.$set(careerssectioncontent0_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent0.$$.fragment, local);
    			transition_in(careerssectioncontent1.$$.fragment, local);
    			transition_in(careerssectioncontent2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent0.$$.fragment, local);
    			transition_out(careerssectioncontent1.$$.fragment, local);
    			transition_out(careerssectioncontent2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(careerssectioncontent1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(careerssectioncontent2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(90:4) <CareersSection id='careers__activities' title='ACTIVITIES'>",
    		ctx
    	});

    	return block;
    }

    // (111:6) <CareersSectionContent         name='AWS Certified'         url='https://www.credly.com/users/jonghyeon/badges'       >
    function create_default_slot_1(ctx) {
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("⇒ Cloud Practitioner");
    			br = element("br");
    			t1 = text("\n        ⇒ Developer - Associate");
    			add_location(br, file$2, 114, 28, 3660);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(111:6) <CareersSectionContent         name='AWS Certified'         url='https://www.credly.com/users/jonghyeon/badges'       >",
    		ctx
    	});

    	return block;
    }

    // (106:4) <CareersSection id='careers__certificates' title='CERTIFICATES'>
    function create_default_slot(ctx) {
    	let careerssectioncontent0;
    	let t0;
    	let careerssectioncontent1;
    	let t1;
    	let careerssectioncontent2;
    	let t2;
    	let careerssectioncontent3;
    	let current;

    	careerssectioncontent0 = new CareersSectionContent({
    			props: { name: "TOEIC 805", date: "2021.08.08" },
    			$$inline: true
    		});

    	careerssectioncontent1 = new CareersSectionContent({
    			props: {
    				name: "AWS Certified",
    				url: "https://www.credly.com/users/jonghyeon/badges",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssectioncontent2 = new CareersSectionContent({
    			props: { name: "SQL 개발자" },
    			$$inline: true
    		});

    	careerssectioncontent3 = new CareersSectionContent({
    			props: {
    				name: "YBM Coding Specialist Professional I"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(careerssectioncontent0.$$.fragment);
    			t0 = space();
    			create_component(careerssectioncontent1.$$.fragment);
    			t1 = space();
    			create_component(careerssectioncontent2.$$.fragment);
    			t2 = space();
    			create_component(careerssectioncontent3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(careerssectioncontent0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(careerssectioncontent1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(careerssectioncontent2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(careerssectioncontent3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const careerssectioncontent1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssectioncontent1_changes.$$scope = { dirty, ctx };
    			}

    			careerssectioncontent1.$set(careerssectioncontent1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssectioncontent0.$$.fragment, local);
    			transition_in(careerssectioncontent1.$$.fragment, local);
    			transition_in(careerssectioncontent2.$$.fragment, local);
    			transition_in(careerssectioncontent3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssectioncontent0.$$.fragment, local);
    			transition_out(careerssectioncontent1.$$.fragment, local);
    			transition_out(careerssectioncontent2.$$.fragment, local);
    			transition_out(careerssectioncontent3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(careerssectioncontent0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(careerssectioncontent1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(careerssectioncontent2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(careerssectioncontent3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(106:4) <CareersSection id='careers__certificates' title='CERTIFICATES'>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let div;
    	let h3;
    	let t1;
    	let h2;
    	let t3;
    	let careerssection0;
    	let t4;
    	let careerssection1;
    	let t5;
    	let careerssection2;
    	let t6;
    	let careerssection3;
    	let t7;
    	let careerssection4;
    	let t8;
    	let careerssection5;
    	let t9;
    	let careerssection6;
    	let current;

    	careerssection0 = new CareersSection({
    			props: {
    				id: "careers__military",
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssection1 = new CareersSection({
    			props: {
    				id: "careers__education",
    				title: "EDUCATION",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssection2 = new CareersSection({
    			props: {
    				id: "careers__education",
    				title: "WORK",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssection3 = new CareersSection({
    			props: {
    				id: "careers__projects",
    				title: "PROJECTS",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssection4 = new CareersSection({
    			props: {
    				id: "careers__achievements",
    				title: "ACHIEVEMENTS",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssection5 = new CareersSection({
    			props: {
    				id: "careers__activities",
    				title: "ACTIVITIES",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	careerssection6 = new CareersSection({
    			props: {
    				id: "careers__certificates",
    				title: "CERTIFICATES",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			h3 = element("h3");
    			h3.textContent = "CAREERS";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "그동안의 발자취_";
    			t3 = space();
    			create_component(careerssection0.$$.fragment);
    			t4 = space();
    			create_component(careerssection1.$$.fragment);
    			t5 = space();
    			create_component(careerssection2.$$.fragment);
    			t6 = space();
    			create_component(careerssection3.$$.fragment);
    			t7 = space();
    			create_component(careerssection4.$$.fragment);
    			t8 = space();
    			create_component(careerssection5.$$.fragment);
    			t9 = space();
    			create_component(careerssection6.$$.fragment);
    			attr_dev(h3, "class", "subsubtitle");
    			add_location(h3, file$2, 7, 4, 314);
    			attr_dev(h2, "class", "subtitle");
    			add_location(h2, file$2, 8, 4, 355);
    			attr_dev(div, "class", "careers__content svelte-1hsl7ax");
    			add_location(div, file$2, 6, 2, 279);
    			attr_dev(section, "class", "careers svelte-1hsl7ax");
    			add_location(section, file$2, 5, 0, 251);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, h3);
    			append_dev(div, t1);
    			append_dev(div, h2);
    			append_dev(div, t3);
    			mount_component(careerssection0, div, null);
    			append_dev(div, t4);
    			mount_component(careerssection1, div, null);
    			append_dev(div, t5);
    			mount_component(careerssection2, div, null);
    			append_dev(div, t6);
    			mount_component(careerssection3, div, null);
    			append_dev(div, t7);
    			mount_component(careerssection4, div, null);
    			append_dev(div, t8);
    			mount_component(careerssection5, div, null);
    			append_dev(div, t9);
    			mount_component(careerssection6, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const careerssection0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection0_changes.$$scope = { dirty, ctx };
    			}

    			careerssection0.$set(careerssection0_changes);
    			const careerssection1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection1_changes.$$scope = { dirty, ctx };
    			}

    			careerssection1.$set(careerssection1_changes);
    			const careerssection2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection2_changes.$$scope = { dirty, ctx };
    			}

    			careerssection2.$set(careerssection2_changes);
    			const careerssection3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection3_changes.$$scope = { dirty, ctx };
    			}

    			careerssection3.$set(careerssection3_changes);
    			const careerssection4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection4_changes.$$scope = { dirty, ctx };
    			}

    			careerssection4.$set(careerssection4_changes);
    			const careerssection5_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection5_changes.$$scope = { dirty, ctx };
    			}

    			careerssection5.$set(careerssection5_changes);
    			const careerssection6_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				careerssection6_changes.$$scope = { dirty, ctx };
    			}

    			careerssection6.$set(careerssection6_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(careerssection0.$$.fragment, local);
    			transition_in(careerssection1.$$.fragment, local);
    			transition_in(careerssection2.$$.fragment, local);
    			transition_in(careerssection3.$$.fragment, local);
    			transition_in(careerssection4.$$.fragment, local);
    			transition_in(careerssection5.$$.fragment, local);
    			transition_in(careerssection6.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(careerssection0.$$.fragment, local);
    			transition_out(careerssection1.$$.fragment, local);
    			transition_out(careerssection2.$$.fragment, local);
    			transition_out(careerssection3.$$.fragment, local);
    			transition_out(careerssection4.$$.fragment, local);
    			transition_out(careerssection5.$$.fragment, local);
    			transition_out(careerssection6.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(careerssection0);
    			destroy_component(careerssection1);
    			destroy_component(careerssection2);
    			destroy_component(careerssection3);
    			destroy_component(careerssection4);
    			destroy_component(careerssection5);
    			destroy_component(careerssection6);
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
    	validate_slots('Careers', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Careers> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		MilDDay,
    		CareersSection,
    		CareersSectionContent
    	});

    	return [];
    }

    class Careers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Careers",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/includes/Footer.svelte generated by Svelte v3.52.0 */

    const file$1 = "src/includes/Footer.svelte";

    function create_fragment$1(ctx) {
    	let footer;
    	let div;
    	let p0;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let p1;
    	let t2;
    	let p2;
    	let a1;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div = element("div");
    			p0 = element("p");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			p1 = element("p");
    			p1.textContent = "© Park Jonghyeon / ShapeLayer.";
    			t2 = space();
    			p2 = element("p");
    			a1 = element("a");
    			a1.textContent = "ShapeLayer/jonghyeon.me";
    			attr_dev(img, "id", "unicode-sponser");
    			if (!src_url_equal(img.src, img_src_value = "https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Unicode Consortium Official Bronze Sponser");
    			attr_dev(img, "class", "svelte-1qhkztf");
    			add_location(img, file$1, 4, 8, 183);
    			attr_dev(a0, "class", "no-hover");
    			attr_dev(a0, "href", "http://unicode.org/consortium/adopted-characters.html#b1F30C");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$1, 3, 6, 70);
    			attr_dev(p0, "class", "badges");
    			add_location(p0, file$1, 2, 4, 45);
    			attr_dev(p1, "class", "copy");
    			add_location(p1, file$1, 7, 4, 355);
    			attr_dev(a1, "href", "https://github.com/ShapeLayer/jonghyeon.me");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$1, 8, 7, 418);
    			add_location(p2, file$1, 8, 4, 415);
    			attr_dev(div, "class", "footer__content");
    			add_location(div, file$1, 1, 2, 11);
    			attr_dev(footer, "class", "svelte-1qhkztf");
    			add_location(footer, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div);
    			append_dev(div, p0);
    			append_dev(p0, a0);
    			append_dev(a0, img);
    			append_dev(div, t0);
    			append_dev(div, p1);
    			append_dev(div, t2);
    			append_dev(div, p2);
    			append_dev(p2, a1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
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

    /* src/App.svelte generated by Svelte v3.52.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let t0;
    	let profile;
    	let t1;
    	let hr0;
    	let t2;
    	let careers;
    	let t3;
    	let hr1;
    	let t4;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	profile = new Profile({ $$inline: true });
    	careers = new Careers({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(profile.$$.fragment);
    			t1 = space();
    			hr0 = element("hr");
    			t2 = space();
    			create_component(careers.$$.fragment);
    			t3 = space();
    			hr1 = element("hr");
    			t4 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(hr0, "class", "section-divider");
    			add_location(hr0, file, 9, 1, 254);
    			attr_dev(hr1, "class", "section-divider");
    			add_location(hr1, file, 11, 1, 297);
    			add_location(main, file, 6, 0, 221);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			mount_component(profile, main, null);
    			append_dev(main, t1);
    			append_dev(main, hr0);
    			append_dev(main, t2);
    			mount_component(careers, main, null);
    			append_dev(main, t3);
    			append_dev(main, hr1);
    			append_dev(main, t4);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(profile.$$.fragment, local);
    			transition_in(careers.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(profile.$$.fragment, local);
    			transition_out(careers.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(profile);
    			destroy_component(careers);
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

    	$$self.$capture_state = () => ({ Header, Profile, Careers, Footer });
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
