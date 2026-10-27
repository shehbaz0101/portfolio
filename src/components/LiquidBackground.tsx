'use client';
import { useEffect, useRef } from 'react';

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;uniform float uUnit;uniform float uTime;uniform vec2 uMouse;uniform float uScroll;uniform float uStrength;uniform float uTop;
uniform vec3 uBg;uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
float fbm(vec2 p){float s=0.;float a=.5;for(int i=0;i<3;i++){s+=a*snoise(p);p=p*1.9+vec2(3.7,1.9);a*=.42;}return s;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 p=(gl_FragCoord.xy-.5*uRes)/uUnit;
  p.y-=uScroll*.45;
  vec2 m=(uMouse-.5)*uRes/uUnit;
  vec2 d=p-m;float md=dot(d,d);
  p-=d*exp(-md*5.)*.14;
  float t=uTime*.03;
  vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,1.3)-t*.8));
  vec2 r=vec2(fbm(p+1.2*q+vec2(1.7,9.2)+t*.6),fbm(p+1.2*q+vec2(8.3,2.8)-t*.5));
  float f=fbm(p+1.2*r);
  vec3 col=mix(c0,c1,clamp(q.x*1.1+.5,0.,1.));
  col=mix(col,c2,clamp(r.y*1.2+.45,0.,1.)*.85);
  col=mix(col,c3,smoothstep(.15,.75,r.x*1.1+.35)*smoothstep(.2,.9,uv.x)*.9);
  float k=smoothstep(-.55,.65,f);
  float side=mix(.5,1.,smoothstep(.05,.85,uv.x));
  float fade=smoothstep(0.,.42,uv.y)*mix(.7,1.,smoothstep(.55,1.,uv.y));
  fade*=mix(1.,smoothstep(1.,.62,uv.y),uTop);
  float a=clamp(k*uStrength*side*fade+ .06*uStrength*fade,0.,1.);
  vec3 o=mix(uBg,col,a);
  o+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;
  gl_FragColor=vec4(o,1.);
}`;

type RGB = [number, number, number];
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
const PAL = {
  light: { c0: hex('#9aa0d2'), c1: hex('#a9b8d4'), c2: hex('#bdb3dc'), c3: hex('#cfd2e6'), strength: 0.46, bg: { canvas: hex('#ffffff'), surface: hex('#f6f8fb') } },
  dark: { c0: hex('#2b3066'), c1: hex('#25364f'), c2: hex('#392f60'), c3: hex('#2d3450'), strength: 0.58, bg: { canvas: hex('#0a1020'), surface: hex('#111a30') } },
};
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export function LiquidBackground({ bg = 'canvas', className = '', parallax = '0.12', topFade = false }: { bg?: 'canvas' | 'surface'; className?: string; parallax?: string; topFade?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const host = wrap.current, cv = canvas.current;
    if (!host || !cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let teardown = () => {};
    let cancelled = false;
    // Start after the page has loaded and the browser is idle so shader compile never competes with first paint or input.
    const start = () => { if (!cancelled) teardown = init(host, cv); };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const arm = () => { if (ric) ric(start, { timeout: 2500 }); else window.setTimeout(start, 1200); };
    let timer = 0;
    const onLoad = () => { timer = window.setTimeout(arm, 600); };
    if (document.readyState === 'complete') onLoad(); else window.addEventListener('load', onLoad, { once: true });
    return () => { cancelled = true; clearTimeout(timer); window.removeEventListener('load', onLoad); teardown(); };
  }, [bg, topFade]);
  function init(host: HTMLDivElement, cv: HTMLCanvasElement): () => void {
    const noop = () => {};
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power', preserveDrawingBuffer: false }) as WebGLRenderingContext | null;
    if (!gl) return noop;
    const compile = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return noop;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return noop;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes'), uUnit = U('uUnit'), uTime = U('uTime'), uMouse = U('uMouse'), uScroll = U('uScroll'), uStrength = U('uStrength'), uTop = U('uTop'), uBg = U('uBg'), u0 = U('c0'), u1 = U('c1'), u2 = U('c2'), u3 = U('c3');

    const root = document.documentElement;
    let dark = root.classList.contains('dark') ? 1 : 0, darkTarget = dark;
    const mo = new MutationObserver(() => { darkTarget = root.classList.contains('dark') ? 1 : 0; kick(); });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });

    let w = 0, h = 0, unit = 1000;
    const resize = () => {
      const r = host.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      w = Math.max(2, Math.round(r.width * scale)); h = Math.max(2, Math.round(r.height * scale));
      unit = 1290 * scale; cv.width = w; cv.height = h; gl.viewport(0, 0, w, h);
    };
    const ro = new ResizeObserver(() => { resize(); kick(); });
    ro.observe(host); resize();

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const target = { x: 0.7, y: 0.6 }, cur = { x: 0.7, y: 0.6 };
    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width; target.y = 1 - (e.clientY - r.top) / r.height; lastMove = performance.now();
    };
    if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0, inView = false, shown = document.visibilityState === 'visible', last = 0, t0 = performance.now(), ready = false, lost = false;
    const frame = (now: number) => {
      raf = 0;
      if (!inView || !shown || lost) return;
      raf = requestAnimationFrame(frame);
      if (now - last < 32) return;
      last = now;
      const time = (now - t0) / 1000;
      if (coarse || now - lastMove > 4000) { target.x = 0.62 + Math.sin(time * 0.09) * 0.22; target.y = 0.55 + Math.cos(time * 0.07) * 0.2; }
      cur.x += (target.x - cur.x) * 0.03; cur.y += (target.y - cur.y) * 0.03;
      dark += (darkTarget - dark) * 0.12; if (Math.abs(darkTarget - dark) < 0.002) dark = darkTarget;
      const L = PAL.light, D = PAL.dark;
      gl.uniform2f(uRes, w, h); gl.uniform1f(uUnit, unit); gl.uniform1f(uTop, topFade ? 1 : 0); gl.uniform1f(uTime, time); gl.uniform2f(uMouse, cur.x, cur.y);
      const rect = host.getBoundingClientRect();
      gl.uniform1f(uScroll, Math.max(0, -rect.top) / Math.max(1, rect.height));
      gl.uniform1f(uStrength, L.strength + (D.strength - L.strength) * dark);
      gl.uniform3fv(uBg, mix(L.bg[bg], D.bg[bg], dark)); gl.uniform3fv(u0, mix(L.c0, D.c0, dark)); gl.uniform3fv(u1, mix(L.c1, D.c1, dark));
      gl.uniform3fv(u2, mix(L.c2, D.c2, dark)); gl.uniform3fv(u3, mix(L.c3, D.c3, dark));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!ready) { ready = true; host.dataset.ready = 'true'; }
    };
    function kick() { if (!raf && inView && shown && !lost) raf = requestAnimationFrame(frame); }
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) kick(); }, { rootMargin: '80px' });
    io.observe(host);
    const vis = () => { shown = document.visibilityState === 'visible'; if (shown) { t0 += 0; kick(); } };
    document.addEventListener('visibilitychange', vis);
    const onLost = (e: Event) => { e.preventDefault(); lost = true; delete host.dataset.ready; };
    cv.addEventListener('webglcontextlost', onLost);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect();
      window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', vis); cv.removeEventListener('webglcontextlost', onLost);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }
  return <div ref={wrap} className={`liquid liquid-${bg} ${topFade ? 'liquid-top-fade' : ''} ${className}`} data-parallax={parallax} aria-hidden="true"><canvas ref={canvas}/></div>;
}
