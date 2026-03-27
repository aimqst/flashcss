/**
 * FlashCSS v20.2 - The Bug-Fix Edition
 * Fixes: appendChild null, replace() of undefined, empty attributes
 */
const FlashCSS = (function() {
    // 1. حماية الـ Head والـ Body (FOUC Protection)
    const hideStyle = document.createElement('style');
    hideStyle.id = 'f-shield';
    hideStyle.innerHTML = 'html { opacity: 0; transition: opacity 0.4s ease; }';
    
    // التأكد من وجود head قبل الحقن
    const head = document.head || document.getElementsByTagName('head')[0];
    if (head) head.appendChild(hideStyle);

    const styleSheet = document.createElement('style');
    styleSheet.id = 'f-v20-engine';
    if (head) head.appendChild(styleSheet);
    const sheet = styleSheet.sheet;
    const processedRules = new Set();

    const themes = {
        dark: { 'bg': '#0f172a', 'text': '#f8fafc', 'primary': '#38bdf8' },
        light: { 'bg': '#ffffff', 'text': '#1e293b', 'primary': '#0284c7' }
    };

    const uiPresets = {
        'glass-card': 'f-glass="medium" f-radius="24px" f-p="20px" f-shadow="0 10px 30px rgba(0,0,0,0.1)"',
        'btn-neon': 'f-bg="var(--f-primary)" f-radius="50px" f-p="12px 24px" f-text="white" f-shadow="0 0 15px var(--f-primary)" f-cursor="pointer" f-hover-scale="1.1"'
    };

    const shapes = {
        'circle': 'circle(50% at 50% 50%)',
        'triangle': 'polygon(50% 0%, 0% 100%, 100% 100%)',
        'hexagon': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        'palestine': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 600 300\'%3E%3Cpath fill=\'%23000\' d=\'M0 0h600v100H0z\'/%3E%3Cpath fill=\'%23fff\' d=\'M0 100h600v100H0z\'/%3E%3Cpath fill=\'%23007a3d\' d=\'M0 200h600v100H0z\'/%3E%3Cpath fill=\'%23e4312b\' d=\'M0 0l200 150L0 300z\'/%3E%3C/svg%3E")'
    };

    const map = {
        'p': 'padding', 'm': 'margin', 'w': 'width', 'h': 'height', 'radius': 'border-radius',
        'bg': 'background-color', 'text': 'color', 'shadow': 'box-shadow', 'glass': 'backdrop-filter',
        'clip': 'clip-path', 'flag': 'background-image', 'cursor': 'cursor', 'transition': 'transition', 'trans': 'transition'
    };

    const breakpoints = { 'sm': '480px', 'md': '768px', 'lg': '1024px', 'xl': '1280px' };

    function parseNeuralValue(prop, rawVal) {
        if (!rawVal) return '';
        if (prop === 'clip' && shapes[rawVal]) return shapes[rawVal];
        if (prop === 'flag' && shapes[rawVal]) return shapes[rawVal];
        if ((prop === 'transition' || prop === 'trans')) {
            if (rawVal === 'fast') return '0.2s ease';
            if (rawVal === 'slow') return '0.6s ease';
        }
        if (!isNaN(rawVal) && ['p','m','w','h','gap'].includes(prop)) return (parseFloat(rawVal) * 0.25) + 'rem';
        
        const audioMatch = rawVal.match(/([a-z-]+)(?:\[(.*)\])?/);
        if (prop === 'audio-reactive' && audioMatch) {
            return { isAudio: true, target: map[audioMatch[1]] || audioMatch[1], max: audioMatch[2] || '100px' };
        }
        return rawVal;
    }

    function processElement(el) {
        if (!el || !el.attributes || !el.getAttribute) return;

        // 1. Morphing (f-ui)
        const uiName = el.getAttribute('f-ui');
        if (uiName && uiPresets[uiName]) {
            uiPresets[uiName].split(' ').forEach(attrStr => {
                const eqIdx = attrStr.indexOf('=');
                if (eqIdx === -1) return;
                const k = attrStr.substring(0, eqIdx);
                const v = attrStr.substring(eqIdx + 1).replace(/"/g, '');
                if (!el.hasAttribute(k)) el.setAttribute(k, v);
            });
        }

        Array.from(el.attributes).forEach(attr => {
            if (attr.name && attr.name.startsWith('f-')) {
                let attrName = attr.name.replace('f-', '');
                const rawVal = attr.value || ''; // حماية من الـ undefined

                if (attrName === 'glass') {
                    const blur = rawVal === 'heavy' ? '25px' : rawVal === 'light' ? '4px' : '10px';
                    el.style.backdropFilter = `blur(${blur})`;
                    el.style.webkitBackdropFilter = `blur(${blur})`;
                    el.style.background = 'rgba(255,255,255,0.05)';
                    el.style.border = '1px solid rgba(255,255,255,0.1)';
                    return;
                }

                if (!rawVal && attrName !== 'glass') return; // منع الـ replace لو القيمة فاضية

                let bpValue = '', statePrefix = '';
                for (let b in breakpoints) {
                    if (attrName.startsWith(`${b}-`)) { bpValue = breakpoints[b]; attrName = attrName.replace(`${b}-`, ''); break; }
                }
                if (attrName.startsWith('hover-')) { statePrefix = ':hover'; attrName = attrName.replace('hover-', ''); }
                if (attrName.startsWith('focus-')) { statePrefix = ':focus'; attrName = attrName.replace('focus-', ''); }

                if (attrName === 'scale' && statePrefix === ':hover') {
                    el.style.transition = el.style.transition || 'transform 0.3s ease';
                    const safeScale = rawVal.toString().replace(/[^0-9.]/g, '');
                    const className = `f-hover-scale-${safeScale.replace('.', '-')}`;
                    if (!processedRules.has(className)) {
                        try { sheet.insertRule(`.${className}:hover { transform: scale(${safeScale}) !important; }`, sheet.cssRules.length); processedRules.add(className); } catch(e){}
                    }
                    el.classList.add(className);
                    return;
                }

                const parsed = parseNeuralValue(attrName, rawVal);
                const propFull = map[attrName] || attrName;

                if (parsed && parsed.isAudio) {
                    el.style.setProperty(parsed.target, `calc(var(--f-audio-vol) * ${parsed.max})`, 'important');
                    return;
                }

                // تنظيف القيمة قبل استخدامها في الكلاس
                const safeClassNameVal = rawVal.toString().replace(/[^a-z0-9]/gi, '-');
                const className = `f-${bpValue ? 'bp-' : ''}${statePrefix ? 'st-' : ''}${attrName}-${safeClassNameVal}`;
                
                if (!processedRules.has(className)) {
                    let rule = `.${className}${statePrefix} { ${propFull}: ${parsed} !important; }`;
                    if (bpValue) rule = `@media (min-width: ${bpValue}) { ${rule} }`;
                    try { sheet.insertRule(rule, sheet.cssRules.length); processedRules.add(className); } catch(e){}
                }
                el.classList.add(className);
            }
        });
    }

    let analyser, dataArray;
    function pulse() {
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            document.documentElement.style.setProperty('--f-audio-vol', (avg / 255).toFixed(3));
        }
        requestAnimationFrame(pulse);
    }

    const observer = new MutationObserver(muts => muts.forEach(m => {
        if (m.type === 'childList') m.addedNodes.forEach(n => n.nodeType === 1 && processElement(n));
        else if (m.type === 'attributes' && m.attributeName && m.attributeName.startsWith('f-')) processElement(m.target);
    }));

    let isInitialized = false;
    const init = () => {
        if (isInitialized || !document.body) return;
        isInitialized = true;
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('f-theme') || (prefersDark ? 'dark' : 'light');
        
        Object.entries(themes[savedTheme]).forEach(([p, v]) => document.documentElement.style.setProperty(`--f-${p}`, v));
        
        document.querySelectorAll('*').forEach(processElement);
        document.documentElement.style.opacity = '1';
        requestAnimationFrame(pulse);
        observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }

    return { 
        setTheme: (n) => {
            if (!themes[n]) return;
            Object.entries(themes[n]).forEach(([p, v]) => document.documentElement.style.setProperty(`--f-${p}`, v));
            localStorage.setItem('f-theme', n);
        },
        connectAudio: (stream) => {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                analyser = ctx.createAnalyser();
                ctx.createMediaStreamSource(stream).connect(analyser);
                dataArray = new Uint8Array(analyser.frequencyBinCount);
            } catch(e) { console.error("FlashCSS: Audio context failed", e); }
        }
    };
})();
