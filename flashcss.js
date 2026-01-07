/**
 * FlashCSS Eternity v7.0
 * The Big Bang Expansion - 10,000x Power
 * The Final Word in Web Development
 */
const FlashCSS = (function() {
    const hideStyle = document.createElement('style');
    hideStyle.id = 'f-blocking-style';
    hideStyle.innerHTML = 'html { opacity: 0 !important; transition: opacity 0.4s ease-in; }';
    document.head.appendChild(hideStyle);

    // الأطلس اللانهائي (The Infinite Atlas) - توسع كوني
    const map = {
        // Layout & Core
        'p': 'padding', 'pt': 'padding-top', 'pb': 'padding-bottom', 'pl': 'padding-left', 'pr': 'padding-right',
        'm': 'margin', 'mt': 'margin-top', 'mb': 'margin-bottom', 'ml': 'margin-left', 'mr': 'margin-right',
        'w': 'width', 'h': 'height', 'min-w': 'min-width', 'max-w': 'max-width', 'min-h': 'min-height', 'max-h': 'max-height',
        'radius': 'border-radius', 'border': 'border', 'b-top': 'border-top', 'b-bottom': 'border-bottom',
        'b-left': 'border-left', 'b-right': 'border-right', 'b-color': 'border-color', 'b-style': 'border-style',
        'box-sizing': 'box-sizing', 'aspect': 'aspect-ratio', 'object-fit': 'object-fit', 'object-pos': 'object-position',
        'display': 'display', 'flex': 'display', 'grid': 'display', 'gap': 'gap', 'z': 'z-index',
        
        // Typography & Text
        'size': 'font-size', 'weight': 'font-weight', 'align': 'text-align', 'family': 'font-family',
        'lh': 'line-height', 'ls': 'letter-spacing', 'decoration': 'text-decoration', 'transform': 'text-transform',
        'style': 'font-style', 'white-space': 'white-space', 'word-break': 'word-break', 'v-align': 'vertical-align',
        'shadow-text': 'text-shadow', 'indent': 'text-indent', 'spacing': 'word-spacing', 'writing-mode': 'writing-mode',
        'font-variant': 'font-variant', 'font-kerning': 'font-kerning', 'text-overflow': 'text-overflow',
        'hyphens': 'hyphens', 'line-clamp': '-webkit-line-clamp', 'text-fill': '-webkit-text-fill-color',
        
        // Colors & Backgrounds
        'bg': 'background-color', 'text': 'color', 'opacity': 'opacity', 'shadow': 'box-shadow',
        'grad': 'background-image', 'clip': 'background-clip', 'blend': 'mix-blend-mode',
        'bg-size': 'background-size', 'bg-pos': 'background-position', 'bg-repeat': 'background-repeat',
        'bg-attach': 'background-attachment', 'bg-origin': 'background-origin', 'bg-clip': 'background-clip',
        'filter': 'filter', 'backdrop': 'backdrop-filter', 'blur': 'filter: blur',
        
        // Advanced Layout (Flex/Grid)
        'justify': 'justify-content', 'items': 'align-items', 'content': 'align-content', 'self': 'align-self',
        'wrap': 'flex-wrap', 'dir': 'flex-direction', 'grow': 'flex-grow', 'shrink': 'flex-shrink', 'basis': 'flex-basis',
        'order': 'order', 'cols': 'grid-template-columns', 'rows': 'grid-template-rows', 'area': 'grid-area',
        'template': 'grid-template-areas', 'auto-flow': 'grid-auto-flow', 'auto-cols': 'grid-auto-columns',
        'auto-rows': 'grid-auto-rows', 'place-items': 'place-items', 'place-content': 'place-content',
        
        // 3D & Transforms
        'pos': 'position', 'top': 'top', 'left': 'left', 'right': 'right', 'bottom': 'bottom',
        'rotate': 'transform: rotate', 'rotateX': 'transform: rotateX', 'rotateY': 'transform: rotateY', 'rotateZ': 'transform: rotateZ',
        'scale': 'transform: scale', 'skew': 'transform: skew', 'translate': 'transform: translate',
        'perspective': 'perspective', 'backface': 'backface-visibility', 'transform-style': 'transform-style',
        'origin': 'transform-origin', 'will-change': 'will-change',
        
        // Interaction & UI
        'cursor': 'cursor', 'pointer-events': 'pointer-events', 'user-select': 'user-select', 'outline': 'outline',
        'scroll-behavior': 'scroll-behavior', 'scroll-snap': 'scroll-snap-type', 'overflow': 'overflow',
        'resize': 'resize', 'accent': 'accent-color', 'caret': 'caret-color', 'overscroll': 'overscroll-behavior',
        
        // Pseudo-elements
        'before-content': '::before { content', 'after-content': '::after { content',
        'before-bg': '::before { background-color', 'after-bg': '::after { background-color',
        'selection-bg': '::selection { background-color', 'selection-text': '::selection { color'
    };

    // مصنع المكونات العالمي (UI Kit)
    const uiKit = {
        'navbar-glass': 'f-pos="fixed" f-top="0" f-w="100%" f-p="15px 50px" f-glass="true" f-z="1000" f-display="flex" f-justify="space-between" f-items="center"',
        'hero-3d': 'f-h="100vh" f-display="flex" f-items="center" f-justify="center" f-perspective="1000px"',
        'card-premium': 'f-bg="white" f-dark-bg="#1e293b" f-p="40px" f-radius="24px" f-shadow="0 20px 50px rgba(0,0,0,0.1)" f-hover-mt="-10px" f-transition="0.3s"',
        'btn-glow': 'f-p="15px 40px" f-radius="50px" f-border="none" f-bg="#3b82f6" f-text="white" f-weight="bold" f-cursor="pointer" f-shadow="0 0 20px rgba(59, 130, 246, 0.5)" f-hover-scale="1.05" f-transition="0.3s"'
    };

    const breakpoints = {
        'xs': '320px', 'sm': '480px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', '2xl': '1536px',
        '3xl': '1920px', '4xl': '2560px', 'watch': '200px', 'tv': '3840px'
    };

    const styleSheet = document.createElement('style');
    styleSheet.id = 'f-eternity-styles';
    document.head.appendChild(styleSheet);
    const sheet = styleSheet.sheet || (document.head.appendChild(styleSheet), styleSheet.sheet);

    const processedRules = new Set();
    let variables = {};
    let dataBindings = {};
    let updateQueue = new Map();
    let isProcessing = false;

    function queueUpdate(el) {
        updateQueue.set(el, true);
        if (!isProcessing) { isProcessing = true; requestAnimationFrame(processQueue); }
    }

    function processQueue() {
        updateQueue.forEach((_, el) => processElement(el));
        updateQueue.clear();
        isProcessing = false;
    }

    function sanitize(str) {
        return str.toString().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').toLowerCase();
    }

    function processElement(el) {
        if (!el || !el.attributes) return;

        // معالجة الـ UI Kit
        if (el.hasAttribute('f-ui')) {
            const uiNames = el.getAttribute('f-ui').split(' ');
            uiNames.forEach(name => {
                const uiAttrs = uiKit[name];
                if (uiAttrs) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = `<div ${uiAttrs}></div>`;
                    Array.from(tempDiv.firstChild.attributes).forEach(a => {
                        if (!el.hasAttribute(a.name)) el.setAttribute(a.name, a.value);
                    });
                }
            });
        }

        Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('f-')) {
                let attrName = attr.name.replace('f-', '');
                let value = attr.value;
                let state = '';
                let breakpoint = '';
                let themeName = '';
                let pseudo = '';

                // محرك العمليات الرياضية والمنطقية
                if (value.includes('calc(')) value = value.replace(/calc\(/g, 'calc(');
                if (value.startsWith('if(')) {
                    const match = value.match(/if\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
                    if (match) value = dataBindings[match[1].trim()] ? match[2].trim() : match[3].trim();
                }

                if (attrName.startsWith('theme-')) {
                    const parts = attrName.split('-');
                    themeName = parts[1];
                    attrName = parts.slice(2).join('-');
                }

                if (value.startsWith('$')) value = variables[value.substring(1)] || value;

                for (let b in breakpoints) {
                    if (attrName.startsWith(`${b}-`)) {
                        breakpoint = b;
                        attrName = attrName.replace(`${b}-`, '');
                        break;
                    }
                }

                const states = ['hover', 'focus', 'active', 'visited', 'disabled', 'checked'];
                for (let s of states) {
                    if (attrName.startsWith(`${s}-`)) {
                        state = s;
                        attrName = attrName.replace(`${s}-`, '');
                        break;
                    }
                }
                
                if (attrName.startsWith('before-')) { pseudo = '::before'; attrName = attrName.replace('before-', ''); }
                else if (attrName.startsWith('after-')) { pseudo = '::after'; attrName = attrName.replace('after-', ''); }

                if (attrName === 'glass' && value === 'true') {
                    value = 'rgba(255, 255, 255, 0.05)';
                    processElementAttr(el, 'backdrop', 'blur(15px)');
                    processElementAttr(el, 'border', '1px solid rgba(255, 255, 255, 0.1)');
                }

                let propFull = map[attrName] || attrName;
                const className = `f-${themeName ? themeName + '-' : ''}${breakpoint ? breakpoint + '-' : ''}${state ? state + '-' : ''}${pseudo ? sanitize(pseudo) + '-' : ''}${attrName}-${sanitize(value)}`;
                
                if (!el.classList.contains(className)) el.classList.add(className);

                if (!processedRules.has(className)) {
                    let selector = `.${className}${state ? ':' + state : ''}${pseudo}`;
                    if (themeName) {
                        selector = `html.f-theme-${themeName} .${className}${state ? ':' + state : ''}${pseudo}`;
                        if (themeName === 'dark') selector += `, @media (prefers-color-scheme: dark) { html:not(.f-theme-light) .${className}${state ? ':' + state : ''}${pseudo} }`;
                    }

                    let rule = `${selector} { ${propFull.includes('{') ? propFull + ': ' + value + ' }' : propFull + ': ' + value + ' !important;'} }`;
                    if (breakpoint) rule = `@media (min-width: ${breakpoints[breakpoint]}) { ${rule} }`;

                    try {
                        sheet.insertRule(rule, sheet.cssRules.length);
                        processedRules.add(className);
                    } catch (e) {}
                }
            }
        });
    }

    function processElementAttr(el, prop, val) {
        const attrName = `f-` + prop;
        if (!el.hasAttribute(attrName)) el.setAttribute(attrName, val);
    }

    function scan(root = document) {
        const elements = root === document ? document.querySelectorAll('*') : [root, ...root.querySelectorAll('*')];
        elements.forEach(processElement);
    }

    function reveal() {
        document.documentElement.style.opacity = '1';
        setTimeout(() => { if (hideStyle.parentNode) hideStyle.parentNode.removeChild(hideStyle); }, 500);
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => { scan(); reveal(); });
    } else {
        scan(); reveal();
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => { if (node.nodeType === 1) { queueUpdate(node); node.querySelectorAll('*').forEach(queueUpdate); } });
            } else if (mutation.type === 'attributes' && mutation.attributeName.startsWith('f-')) {
                queueUpdate(mutation.target);
            }
        });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

    return {
        rescan: (el) => scan(el),
        apply: (el, prop, val) => { if(el) el.setAttribute(prop.startsWith('f-') ? prop : `f-${prop}`, val); },
        setVars: (vars) => { variables = { ...variables, ...vars }; scan(); },
        setData: (key, val) => { dataBindings[key] = val; scan(); },
        setTheme: (name) => {
            const html = document.documentElement;
            Array.from(html.classList).forEach(c => { if(c.startsWith('f-theme-')) html.classList.remove(c); });
            html.classList.add(`f-theme-${name}`);
            localStorage.setItem('f-active-theme', name);
        },
        initTheme: () => {
            const saved = localStorage.getItem('f-active-theme') || 'light';
            document.documentElement.classList.add(`f-theme-${saved}`);
        },
        addShortcut: (s, f) => { map[s] = f; },
        addUI: (name, attrs) => { uiKit[name] = attrs; scan(); }
    };
})();

FlashCSS.initTheme();
window.FlashCSS = FlashCSS;
