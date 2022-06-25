
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
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
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
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

    /* src\includes\Header.svelte generated by Svelte v3.47.0 */
    const file$5 = "src\\includes\\Header.svelte";

    function create_fragment$5(ctx) {
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
    			t1 = text("\r\n        BY ");
    			span0 = element("span");
    			span0.textContent = "LAYERING";
    			br1 = element("br");
    			t3 = text("\r\n        VARIOUS ");
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
    			add_location(br0, file$5, 4, 23, 129);
    			attr_dev(span0, "id", "hero__trans-target-1");
    			attr_dev(span0, "class", "highlight svelte-7fp1qj");
    			add_location(span0, file$5, 5, 11, 146);
    			add_location(br1, file$5, 5, 76, 211);
    			attr_dev(span1, "id", "hero__trans-target-2");
    			attr_dev(span1, "class", "highlight svelte-7fp1qj");
    			add_location(span1, file$5, 6, 16, 233);
    			attr_dev(h10, "class", "hero__content pseudo svelte-7fp1qj");
    			add_location(h10, file$5, 3, 6, 71);
    			add_location(br2, file$5, 8, 106, 418);
    			attr_dev(span2, "id", "hero__trans-target-1");
    			attr_dev(span2, "class", "highlight svelte-7fp1qj");
    			add_location(span2, file$5, 8, 113, 425);
    			add_location(br3, file$5, 8, 178, 490);
    			attr_dev(span3, "id", "hero__trans-target-2");
    			attr_dev(span3, "class", "highlight svelte-7fp1qj");
    			add_location(span3, file$5, 8, 190, 502);
    			attr_dev(a0, "class", "no-hover svelte-7fp1qj");
    			attr_dev(a0, "href", "#profile");
    			add_location(a0, file$5, 8, 55, 367);
    			attr_dev(h11, "id", "hero__layer-shape");
    			attr_dev(h11, "class", "hero__content svelte-7fp1qj");
    			add_location(h11, file$5, 8, 6, 318);
    			add_location(br4, file$5, 9, 107, 684);
    			attr_dev(span4, "id", "hero__trans-target-1");
    			attr_dev(span4, "class", "highlight svelte-7fp1qj");
    			add_location(span4, file$5, 9, 114, 691);
    			add_location(br5, file$5, 9, 178, 755);
    			attr_dev(span5, "id", "hero__trans-target-2");
    			attr_dev(span5, "class", "highlight svelte-7fp1qj");
    			add_location(span5, file$5, 9, 190, 767);
    			attr_dev(a1, "class", "no-hover svelte-7fp1qj");
    			attr_dev(a1, "href", "#profile");
    			add_location(a1, file$5, 9, 55, 632);
    			attr_dev(h12, "id", "hero__shape-layer");
    			attr_dev(h12, "class", "hero__content svelte-7fp1qj");
    			add_location(h12, file$5, 9, 6, 583);
    			attr_dev(div0, "class", "hero__wrapper svelte-7fp1qj");
    			add_location(div0, file$5, 2, 4, 36);
    			attr_dev(div1, "class", "hero svelte-7fp1qj");
    			add_location(div1, file$5, 1, 2, 12);
    			attr_dev(header, "class", "svelte-7fp1qj");
    			add_location(header, file$5, 0, 0, 0);
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
    		id: create_fragment$5.name,
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

    function instance$5($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\includes\Profile.svelte generated by Svelte v3.47.0 */

    const file$4 = "src\\includes\\Profile.svelte";

    function create_fragment$4(ctx) {
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
    			t5 = text("입원 생활로 하루를 보내던 09년 여름,");
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
    			a0.textContent = "belline0124@gmail.com";
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
    			a3.textContent = "velog";
    			t26 = space();
    			li4 = element("li");
    			a4 = element("a");
    			a4.textContent = "credly";
    			t28 = space();
    			li5 = element("li");
    			a5 = element("a");
    			a5.textContent = "solved.ac";
    			attr_dev(h3, "class", "profile__name subsubtitle");
    			add_location(h3, file$4, 3, 6, 114);
    			attr_dev(h2, "class", "profile__overview subtitle");
    			add_location(h2, file$4, 4, 6, 192);
    			add_location(br0, file$4, 5, 9, 261);
    			attr_dev(p0, "class", "svelte-19h2xjl");
    			add_location(p0, file$4, 5, 6, 258);
    			add_location(br1, file$4, 6, 31, 302);
    			attr_dev(p1, "class", "svelte-19h2xjl");
    			add_location(p1, file$4, 6, 6, 277);
    			add_location(br2, file$4, 7, 30, 374);
    			attr_dev(p2, "class", "svelte-19h2xjl");
    			add_location(p2, file$4, 7, 6, 350);
    			add_location(br3, file$4, 8, 34, 455);
    			attr_dev(p3, "class", "svelte-19h2xjl");
    			add_location(p3, file$4, 8, 6, 427);
    			attr_dev(p4, "class", "svelte-19h2xjl");
    			add_location(p4, file$4, 9, 6, 493);
    			add_location(br4, file$4, 10, 9, 523);
    			attr_dev(p5, "class", "svelte-19h2xjl");
    			add_location(p5, file$4, 10, 6, 520);
    			attr_dev(p6, "class", "svelte-19h2xjl");
    			add_location(p6, file$4, 11, 6, 539);
    			attr_dev(div0, "class", "profile__intro");
    			add_location(div0, file$4, 2, 4, 78);
    			attr_dev(a0, "href", "mailto:belline0124@gmail.com");
    			attr_dev(a0, "class", "svelte-19h2xjl");
    			add_location(a0, file$4, 15, 12, 658);
    			add_location(li0, file$4, 15, 8, 654);
    			attr_dev(a1, "href", "https://www.instagram.com/__jong.hyeon__/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-19h2xjl");
    			add_location(a1, file$4, 16, 12, 741);
    			add_location(li1, file$4, 16, 8, 737);
    			attr_dev(ul0, "class", "enums");
    			add_location(ul0, file$4, 14, 6, 626);
    			attr_dev(a2, "href", "https://github.com/ShapeLayer");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "class", "svelte-19h2xjl");
    			add_location(a2, file$4, 19, 12, 880);
    			add_location(li2, file$4, 19, 8, 876);
    			attr_dev(a3, "href", "https://velog.io/@shapelayer");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-19h2xjl");
    			add_location(a3, file$4, 20, 12, 965);
    			add_location(li3, file$4, 20, 8, 961);
    			attr_dev(a4, "href", "https://www.credly.com/users/jonghyeon");
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "class", "svelte-19h2xjl");
    			add_location(a4, file$4, 21, 12, 1048);
    			add_location(li4, file$4, 21, 8, 1044);
    			attr_dev(a5, "href", "https://solved.ac/profile/belline0124");
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "class", "svelte-19h2xjl");
    			add_location(a5, file$4, 22, 12, 1142);
    			add_location(li5, file$4, 22, 8, 1138);
    			attr_dev(ul1, "class", "enums");
    			add_location(ul1, file$4, 18, 6, 848);
    			attr_dev(div1, "class", "profile__links");
    			add_location(div1, file$4, 13, 4, 590);
    			attr_dev(div2, "class", "profile__content");
    			add_location(div2, file$4, 1, 2, 42);
    			attr_dev(section, "id", "profile");
    			attr_dev(section, "class", "profile svelte-19h2xjl");
    			add_location(section, file$4, 0, 0, 0);
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Profile",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\commons\MilDDay.svelte generated by Svelte v3.47.0 */
    const file$3 = "src\\components\\commons\\MilDDay.svelte";

    function create_fragment$3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "nn%, 전역까지 dd일";
    			attr_dev(span, "id", "military-dday");
    			add_location(span, file$3, 12, 0, 484);
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
    		id: create_fragment$3.name,
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

    function instance$3($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MilDDay",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\includes\Careers.svelte generated by Svelte v3.47.0 */
    const file$2 = "src\\includes\\Careers.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let div6;
    	let h30;
    	let t1;
    	let h2;
    	let t3;
    	let div0;
    	let ul0;
    	let li0;
    	let t4;
    	let span0;
    	let br0;
    	let t6;
    	let mildday;
    	let t7;
    	let div1;
    	let h31;
    	let t9;
    	let ul1;
    	let li1;
    	let t10;
    	let span1;
    	let t12;
    	let li2;
    	let t13;
    	let span2;
    	let t15;
    	let div2;
    	let h32;
    	let t17;
    	let ul2;
    	let li3;
    	let t18;
    	let span3;
    	let t20;
    	let div3;
    	let h33;
    	let t22;
    	let ul3;
    	let li4;
    	let a0;
    	let t24;
    	let span4;
    	let br1;
    	let t26;
    	let t27;
    	let li5;
    	let t28;
    	let span5;
    	let br2;
    	let t30;
    	let t31;
    	let li6;
    	let a1;
    	let t33;
    	let span6;
    	let br3;
    	let t35;
    	let t36;
    	let li7;
    	let a2;
    	let t38;
    	let span7;
    	let br4;
    	let t40;
    	let t41;
    	let li8;
    	let t42;
    	let a3;
    	let t44;
    	let t45;
    	let div4;
    	let h34;
    	let t47;
    	let ul4;
    	let li9;
    	let t48;
    	let sup;
    	let span8;
    	let t51;
    	let li10;
    	let t52;
    	let span9;
    	let br5;
    	let t54;
    	let br6;
    	let t55;
    	let t56;
    	let li11;
    	let t57;
    	let span10;
    	let br7;
    	let t59;
    	let br8;
    	let t60;
    	let t61;
    	let div5;
    	let h35;
    	let t63;
    	let ul5;
    	let li12;
    	let t64;
    	let span11;
    	let br9;
    	let t66;
    	let t67;
    	let li13;
    	let t68;
    	let span12;
    	let t70;
    	let li14;
    	let t71;
    	let span13;
    	let current;
    	mildday = new MilDDay({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			div6 = element("div");
    			h30 = element("h3");
    			h30.textContent = "CAREERS";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "그동안의 발자취_";
    			t3 = space();
    			div0 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			t4 = text("대한민국 육군 기술행정병 네트워크운용/정비 분과 ");
    			span0 = element("span");
    			span0.textContent = "2022.07-";
    			br0 = element("br");
    			t6 = text("\r\n          ⇒ 자대 배치 정보 없음. ");
    			create_component(mildday.$$.fragment);
    			t7 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = "EDUCATION";
    			t9 = space();
    			ul1 = element("ul");
    			li1 = element("li");
    			t10 = text("숭덕고등학교 ");
    			span1 = element("span");
    			span1.textContent = "2018.03-2021.02";
    			t12 = space();
    			li2 = element("li");
    			t13 = text("전남대학교 컴퓨터정보통신공학과 학부과정 21학번 ");
    			span2 = element("span");
    			span2.textContent = "2021.03-";
    			t15 = space();
    			div2 = element("div");
    			h32 = element("h3");
    			h32.textContent = "WORK";
    			t17 = space();
    			ul2 = element("ul");
    			li3 = element("li");
    			t18 = text("전남대학교 지능영상미디어인터페이스 연구실 ");
    			span3 = element("span");
    			span3.textContent = "2021.06-2022.07";
    			t20 = space();
    			div3 = element("div");
    			h33 = element("h3");
    			h33.textContent = "PROJECTS";
    			t22 = space();
    			ul3 = element("ul");
    			li4 = element("li");
    			a0 = element("a");
    			a0.textContent = "악질 이름 생성기";
    			t24 = space();
    			span4 = element("span");
    			span4.textContent = "2020.05";
    			br1 = element("br");
    			t26 = text("\r\n          ⇒ 개인 프로젝트");
    			t27 = space();
    			li5 = element("li");
    			t28 = text("청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발 ");
    			span5 = element("span");
    			span5.textContent = "2021.06-2022-07";
    			br2 = element("br");
    			t30 = text("\r\n          ⇒ 연구실 연구과제 // 클라이언트 개발");
    			t31 = space();
    			li6 = element("li");
    			a1 = element("a");
    			a1.textContent = "2022 호남 대학간 침해 대응 대회 2022 대회 사이트";
    			t33 = space();
    			span6 = element("span");
    			span6.textContent = "2022.06";
    			br3 = element("br");
    			t35 = text("\r\n          ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발");
    			t36 = space();
    			li7 = element("li");
    			a2 = element("a");
    			a2.textContent = "IW-FCV 2023 학회 정보 사이트";
    			t38 = space();
    			span7 = element("span");
    			span7.textContent = "2022.05-2022.07";
    			br4 = element("br");
    			t40 = text("\r\n          ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발");
    			t41 = space();
    			li8 = element("li");
    			t42 = text("그 외 프로젝트들은 ");
    			a3 = element("a");
    			a3.textContent = "Github";
    			t44 = text("를 참조하세요.");
    			t45 = space();
    			div4 = element("div");
    			h34 = element("h3");
    			h34.textContent = "ACHIEVEMENTS";
    			t47 = space();
    			ul4 = element("ul");
    			li9 = element("li");
    			t48 = text("The 2021 ICPC Asia Seoul Regional Contest 53");
    			sup = element("sup");
    			sup.textContent = "th";
    			span8 = element("span");
    			span8.textContent = "2021.11.13";
    			t51 = space();
    			li10 = element("li");
    			t52 = text("자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘 ");
    			span9 = element("span");
    			span9.textContent = "2021.11";
    			br5 = element("br");
    			t54 = text("\r\n          ⇒ 연구과제 논문 // 공동저자");
    			br6 = element("br");
    			t55 = text("\r\n          ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.");
    			t56 = space();
    			li11 = element("li");
    			t57 = text("자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화 ");
    			span10 = element("span");
    			span10.textContent = "2022.06";
    			br7 = element("br");
    			t59 = text("\r\n          ⇒ 연구과제 논문 // 공동저자");
    			br8 = element("br");
    			t60 = text("\r\n          ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우");
    			t61 = space();
    			div5 = element("div");
    			h35 = element("h3");
    			h35.textContent = "ACTIVITIES";
    			t63 = space();
    			ul5 = element("ul");
    			li12 = element("li");
    			t64 = text("2019 광주SW체험축전 \"한글코드로 만드는 디스코드 챗봇\" 체험 부스 운영 ");
    			span11 = element("span");
    			span11.textContent = "2019.05";
    			br9 = element("br");
    			t66 = text("\r\n          ⇒ 체험 축전 // 기획, 운영 및 개발");
    			t67 = space();
    			li13 = element("li");
    			t68 = text("전남대학교 게임개발동아리 PIMM ");
    			span12 = element("span");
    			span12.textContent = "2021.03-";
    			t70 = space();
    			li14 = element("li");
    			t71 = text("전남대학교 소프트웨어 개발동아리 Stolio ");
    			span13 = element("span");
    			span13.textContent = "2022.03-";
    			attr_dev(h30, "class", "subsubtitle");
    			add_location(h30, file$2, 5, 4, 157);
    			attr_dev(h2, "class", "subtitle");
    			add_location(h2, file$2, 6, 4, 199);
    			attr_dev(span0, "class", "datetime svelte-13zdxo0");
    			add_location(span0, file$2, 10, 37, 359);
    			add_location(br0, file$2, 10, 75, 397);
    			attr_dev(li0, "class", "svelte-13zdxo0");
    			add_location(li0, file$2, 9, 8, 316);
    			add_location(ul0, file$2, 8, 6, 302);
    			attr_dev(div0, "id", "careers__military");
    			attr_dev(div0, "class", "careers__sections svelte-13zdxo0");
    			add_location(div0, file$2, 7, 4, 240);
    			attr_dev(h31, "class", "subtitle svelte-13zdxo0");
    			add_location(h31, file$2, 16, 6, 548);
    			attr_dev(span1, "class", "datetime svelte-13zdxo0");
    			add_location(span1, file$2, 18, 19, 616);
    			attr_dev(li1, "class", "svelte-13zdxo0");
    			add_location(li1, file$2, 18, 8, 605);
    			attr_dev(span2, "class", "datetime svelte-13zdxo0");
    			add_location(span2, file$2, 19, 39, 707);
    			attr_dev(li2, "class", "svelte-13zdxo0");
    			add_location(li2, file$2, 19, 8, 676);
    			add_location(ul1, file$2, 17, 6, 591);
    			attr_dev(div1, "id", "careers__education");
    			attr_dev(div1, "class", "careers__sections svelte-13zdxo0");
    			add_location(div1, file$2, 15, 4, 485);
    			attr_dev(h32, "class", "subtitle svelte-13zdxo0");
    			add_location(h32, file$2, 23, 6, 844);
    			attr_dev(span3, "class", "datetime svelte-13zdxo0");
    			add_location(span3, file$2, 25, 35, 923);
    			attr_dev(li3, "class", "svelte-13zdxo0");
    			add_location(li3, file$2, 25, 8, 896);
    			add_location(ul2, file$2, 24, 6, 882);
    			attr_dev(div2, "id", "careers__education");
    			attr_dev(div2, "class", "careers__sections svelte-13zdxo0");
    			add_location(div2, file$2, 22, 4, 781);
    			attr_dev(h33, "class", "subtitle svelte-13zdxo0");
    			add_location(h33, file$2, 29, 6, 1066);
    			attr_dev(a0, "href", "https://name.ho9.me");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$2, 32, 10, 1138);
    			attr_dev(span4, "class", "datetime svelte-13zdxo0");
    			add_location(span4, file$2, 32, 70, 1198);
    			add_location(br1, file$2, 32, 107, 1235);
    			attr_dev(li4, "class", "svelte-13zdxo0");
    			add_location(li4, file$2, 31, 8, 1122);
    			attr_dev(span5, "class", "datetime svelte-13zdxo0");
    			add_location(span5, file$2, 36, 46, 1337);
    			add_location(br2, file$2, 36, 91, 1382);
    			attr_dev(li5, "class", "svelte-13zdxo0");
    			add_location(li5, file$2, 35, 8, 1285);
    			attr_dev(a1, "href", "https://hccc2022.github.io");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$2, 40, 10, 1461);
    			attr_dev(span6, "class", "datetime svelte-13zdxo0");
    			add_location(span6, file$2, 40, 100, 1551);
    			add_location(br3, file$2, 40, 137, 1588);
    			attr_dev(li6, "class", "svelte-13zdxo0");
    			add_location(li6, file$2, 39, 8, 1445);
    			attr_dev(a2, "href", "https://iwfcv2023.github.io");
    			add_location(a2, file$2, 44, 10, 1669);
    			attr_dev(span7, "class", "datetime svelte-13zdxo0");
    			add_location(span7, file$2, 44, 74, 1733);
    			add_location(br4, file$2, 44, 119, 1778);
    			attr_dev(li7, "class", "svelte-13zdxo0");
    			add_location(li7, file$2, 43, 8, 1653);
    			attr_dev(a3, "href", "https://github.com/ShapeLayer");
    			attr_dev(a3, "target", "_blank");
    			add_location(a3, file$2, 47, 23, 1858);
    			attr_dev(li8, "class", "svelte-13zdxo0");
    			add_location(li8, file$2, 47, 8, 1843);
    			add_location(ul3, file$2, 30, 6, 1108);
    			attr_dev(div3, "id", "careers__procects");
    			attr_dev(div3, "class", "careers__sections svelte-13zdxo0");
    			add_location(div3, file$2, 28, 4, 1004);
    			attr_dev(h34, "class", "subtitle svelte-13zdxo0");
    			add_location(h34, file$2, 51, 6, 2034);
    			add_location(sup, file$2, 53, 56, 2142);
    			attr_dev(span8, "class", "datetime svelte-13zdxo0");
    			add_location(span8, file$2, 53, 69, 2155);
    			attr_dev(li9, "class", "svelte-13zdxo0");
    			add_location(li9, file$2, 53, 8, 2094);
    			attr_dev(span9, "class", "datetime svelte-13zdxo0");
    			add_location(span9, file$2, 55, 44, 2260);
    			add_location(br5, file$2, 55, 81, 2297);
    			add_location(br6, file$2, 56, 27, 2330);
    			attr_dev(li10, "class", "svelte-13zdxo0");
    			add_location(li10, file$2, 54, 8, 2210);
    			attr_dev(span10, "class", "datetime svelte-13zdxo0");
    			add_location(span10, file$2, 60, 47, 2475);
    			add_location(br7, file$2, 60, 84, 2512);
    			add_location(br8, file$2, 61, 27, 2545);
    			attr_dev(li11, "class", "svelte-13zdxo0");
    			add_location(li11, file$2, 59, 8, 2422);
    			add_location(ul4, file$2, 52, 6, 2080);
    			attr_dev(div4, "id", "careers__achievements");
    			attr_dev(div4, "class", "careers__sections svelte-13zdxo0");
    			add_location(div4, file$2, 50, 4, 1968);
    			attr_dev(h35, "class", "subtitle svelte-13zdxo0");
    			add_location(h35, file$2, 67, 6, 2725);
    			attr_dev(span11, "class", "datetime svelte-13zdxo0");
    			add_location(span11, file$2, 70, 53, 2842);
    			add_location(br9, file$2, 70, 90, 2879);
    			attr_dev(li12, "class", "svelte-13zdxo0");
    			add_location(li12, file$2, 69, 8, 2783);
    			attr_dev(span12, "class", "datetime svelte-13zdxo0");
    			add_location(span12, file$2, 73, 31, 2965);
    			attr_dev(li13, "class", "svelte-13zdxo0");
    			add_location(li13, file$2, 73, 8, 2942);
    			attr_dev(span13, "class", "datetime svelte-13zdxo0");
    			add_location(span13, file$2, 74, 37, 3047);
    			attr_dev(li14, "class", "svelte-13zdxo0");
    			add_location(li14, file$2, 74, 8, 3018);
    			add_location(ul5, file$2, 68, 6, 2769);
    			attr_dev(div5, "id", "careers__activities");
    			attr_dev(div5, "class", "careers__sections svelte-13zdxo0");
    			add_location(div5, file$2, 66, 4, 2661);
    			attr_dev(div6, "class", "careers__content svelte-13zdxo0");
    			add_location(div6, file$2, 4, 2, 121);
    			attr_dev(section, "class", "careers svelte-13zdxo0");
    			add_location(section, file$2, 3, 0, 92);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div6);
    			append_dev(div6, h30);
    			append_dev(div6, t1);
    			append_dev(div6, h2);
    			append_dev(div6, t3);
    			append_dev(div6, div0);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, t4);
    			append_dev(li0, span0);
    			append_dev(li0, br0);
    			append_dev(li0, t6);
    			mount_component(mildday, li0, null);
    			append_dev(div6, t7);
    			append_dev(div6, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t9);
    			append_dev(div1, ul1);
    			append_dev(ul1, li1);
    			append_dev(li1, t10);
    			append_dev(li1, span1);
    			append_dev(ul1, t12);
    			append_dev(ul1, li2);
    			append_dev(li2, t13);
    			append_dev(li2, span2);
    			append_dev(div6, t15);
    			append_dev(div6, div2);
    			append_dev(div2, h32);
    			append_dev(div2, t17);
    			append_dev(div2, ul2);
    			append_dev(ul2, li3);
    			append_dev(li3, t18);
    			append_dev(li3, span3);
    			append_dev(div6, t20);
    			append_dev(div6, div3);
    			append_dev(div3, h33);
    			append_dev(div3, t22);
    			append_dev(div3, ul3);
    			append_dev(ul3, li4);
    			append_dev(li4, a0);
    			append_dev(li4, t24);
    			append_dev(li4, span4);
    			append_dev(li4, br1);
    			append_dev(li4, t26);
    			append_dev(ul3, t27);
    			append_dev(ul3, li5);
    			append_dev(li5, t28);
    			append_dev(li5, span5);
    			append_dev(li5, br2);
    			append_dev(li5, t30);
    			append_dev(ul3, t31);
    			append_dev(ul3, li6);
    			append_dev(li6, a1);
    			append_dev(li6, t33);
    			append_dev(li6, span6);
    			append_dev(li6, br3);
    			append_dev(li6, t35);
    			append_dev(ul3, t36);
    			append_dev(ul3, li7);
    			append_dev(li7, a2);
    			append_dev(li7, t38);
    			append_dev(li7, span7);
    			append_dev(li7, br4);
    			append_dev(li7, t40);
    			append_dev(ul3, t41);
    			append_dev(ul3, li8);
    			append_dev(li8, t42);
    			append_dev(li8, a3);
    			append_dev(li8, t44);
    			append_dev(div6, t45);
    			append_dev(div6, div4);
    			append_dev(div4, h34);
    			append_dev(div4, t47);
    			append_dev(div4, ul4);
    			append_dev(ul4, li9);
    			append_dev(li9, t48);
    			append_dev(li9, sup);
    			append_dev(li9, span8);
    			append_dev(ul4, t51);
    			append_dev(ul4, li10);
    			append_dev(li10, t52);
    			append_dev(li10, span9);
    			append_dev(li10, br5);
    			append_dev(li10, t54);
    			append_dev(li10, br6);
    			append_dev(li10, t55);
    			append_dev(ul4, t56);
    			append_dev(ul4, li11);
    			append_dev(li11, t57);
    			append_dev(li11, span10);
    			append_dev(li11, br7);
    			append_dev(li11, t59);
    			append_dev(li11, br8);
    			append_dev(li11, t60);
    			append_dev(div6, t61);
    			append_dev(div6, div5);
    			append_dev(div5, h35);
    			append_dev(div5, t63);
    			append_dev(div5, ul5);
    			append_dev(ul5, li12);
    			append_dev(li12, t64);
    			append_dev(li12, span11);
    			append_dev(li12, br9);
    			append_dev(li12, t66);
    			append_dev(ul5, t67);
    			append_dev(ul5, li13);
    			append_dev(li13, t68);
    			append_dev(li13, span12);
    			append_dev(ul5, t70);
    			append_dev(ul5, li14);
    			append_dev(li14, t71);
    			append_dev(li14, span13);
    			current = true;
    		},
    		p: noop,
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
    			if (detaching) detach_dev(section);
    			destroy_component(mildday);
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

    	$$self.$capture_state = () => ({ MilDDay });
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

    /* src\includes\Footer.svelte generated by Svelte v3.47.0 */

    const file$1 = "src\\includes\\Footer.svelte";

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
    			add_location(img, file$1, 4, 8, 187);
    			attr_dev(a0, "class", "no-hover");
    			attr_dev(a0, "href", "http://unicode.org/consortium/adopted-characters.html#b1F30C");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$1, 3, 6, 73);
    			attr_dev(p0, "class", "badges");
    			add_location(p0, file$1, 2, 4, 47);
    			attr_dev(p1, "class", "copy");
    			add_location(p1, file$1, 7, 4, 362);
    			attr_dev(a1, "href", "https://github.com/jonghyeon.me");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$1, 8, 7, 426);
    			add_location(p2, file$1, 8, 4, 423);
    			attr_dev(div, "class", "footer__content");
    			add_location(div, file$1, 1, 2, 12);
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

    /* src\App.svelte generated by Svelte v3.47.0 */
    const file = "src\\App.svelte";

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
    			add_location(hr0, file, 9, 1, 258);
    			attr_dev(hr1, "class", "section-divider");
    			add_location(hr1, file, 11, 1, 301);
    			add_location(main, file, 6, 0, 225);
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
