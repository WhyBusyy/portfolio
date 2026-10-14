/**
 * 머리카락 레이어를 촘촘한 격자에 올려 WebGL 로 그린다.
 * 커서가 지나가면 근처 격자점이 커서 속도만큼 밀리고, 스프링처럼 천천히 제자리로 돌아온다.
 * 좌표는 그림 기준(720×720)이다.
 */
const SIZE = 720;
/** 한 변의 격자 칸 수 */
const N = 36;
/** 커서가 미는 반경과 세기 */
const RADIUS = 90;
const PUSH = 0.45;
/** 스프링: 되돌아오는 힘, 감쇠, 최대 밀림 */
const SPRING = 0.07;
const DAMP = 0.85;
const MAX_OFF = 26;

const VERT = `
attribute vec2 a_pos;
attribute vec2 a_uv;
uniform vec2 u_shift;
varying vec2 v_uv;
void main() {
  vec2 p = (a_pos + u_shift) / ${SIZE}.0 * 2.0 - 1.0;
  gl_Position = vec4(p.x, -p.y, 0.0, 1.0);
  v_uv = a_uv;
}`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
void main() { gl_FragColor = texture2D(u_tex, v_uv); }`;

export interface HairMesh {
  /** 얼굴과 다른 거리만큼 움직여 깊이감을 만든다. 움직인 만큼 머리끝이 살짝 늦게 따라온다 */
  setShift(x: number, y: number): void;
  /** 그림 좌표 (x, y) 에서 (vx, vy) 속도로 커서가 지나갔다 */
  poke(x: number, y: number, vx: number, vy: number): void;
  /** 한 프레임 진행하고 그린다. 아직 움직이는 중이면 true */
  step(): boolean;
  destroy(): void;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function createHairMesh(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
): HairMesh | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
  });
  if (!gl) return null;

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  // 격자점: 기준 위치, 밀린 양, 속도, 머리끝일수록 커지는 가중치
  const count = (N + 1) * (N + 1);
  const base = new Float32Array(count * 2);
  const off = new Float32Array(count * 2);
  const vel = new Float32Array(count * 2);
  const tip = new Float32Array(count);
  const pos = new Float32Array(count * 2);
  for (let j = 0; j <= N; j++)
    for (let i = 0; i <= N; i++) {
      const k = j * (N + 1) + i;
      base[k * 2] = (i / N) * SIZE;
      base[k * 2 + 1] = (j / N) * SIZE;
      // 정수리(위쪽)는 거의 고정, 앞머리 끝으로 갈수록 잘 움직인다
      tip[k] = Math.min(1, Math.max(0.15, (j / N - 0.1) / 0.55));
    }
  const idx = new Uint16Array(N * N * 6);
  let t = 0;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const a = j * (N + 1) + i;
      const b = a + 1;
      const c = a + N + 1;
      const d = c + 1;
      idx.set([a, b, c, b, d, c], t);
      t += 6;
    }

  const uvBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    base.map((v) => v / SIZE),
    gl.STATIC_DRAW,
  );
  const aUv = gl.getAttribLocation(prog, "a_uv");
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);

  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, base, gl.DYNAMIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const ib = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const uShift = gl.getUniformLocation(prog, "u_shift");

  const shift = { x: 0, y: 0 };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const ro = new ResizeObserver(() => {
    resize();
    draw();
  });
  ro.observe(canvas);

  function draw() {
    for (let k = 0; k < count * 2; k++) pos[k] = base[k] + off[k];
    gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
    gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, pos);
    gl!.uniform2f(uShift, shift.x, shift.y);
    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.drawElements(gl!.TRIANGLES, idx.length, gl!.UNSIGNED_SHORT, 0);
  }

  resize();
  draw();

  return {
    setShift(x, y) {
      const dx = x - shift.x;
      const dy = y - shift.y;
      shift.x = x;
      shift.y = y;
      // 관성: 머리 전체가 움직인 반대쪽으로 머리끝이 잠깐 남는다
      for (let k = 0; k < count; k++) {
        vel[k * 2] -= dx * tip[k] * 0.5;
        vel[k * 2 + 1] -= dy * tip[k] * 0.5;
      }
    },
    poke(x, y, vx, vy) {
      const r2 = RADIUS * RADIUS;
      for (let k = 0; k < count; k++) {
        const ddx = base[k * 2] + off[k * 2] + shift.x - x;
        const ddy = base[k * 2 + 1] + off[k * 2 + 1] + shift.y - y;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 > r2) continue;
        const w = (1 - Math.sqrt(d2) / RADIUS) ** 2 * (0.35 + 0.65 * tip[k]);
        vel[k * 2] += vx * w * PUSH;
        vel[k * 2 + 1] += vy * w * PUSH;
      }
    },
    step() {
      let energy = 0;
      for (let k = 0; k < count * 2; k++) {
        vel[k] = (vel[k] - off[k] * SPRING) * DAMP;
        off[k] = Math.max(-MAX_OFF, Math.min(MAX_OFF, off[k] + vel[k]));
        energy += Math.abs(vel[k]) + Math.abs(off[k]) * 0.1;
      }
      draw();
      return energy > count * 0.002;
    },
    destroy() {
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
