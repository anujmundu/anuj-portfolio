"use client";

import React, { useEffect, useRef } from "react";

interface ShaderCanvasProps {
  className?: string;
  opacity?: number;
}

export function ShaderCanvas({ className = "", opacity = 0.35 }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };

    window.addEventListener("resize", resize);

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Cyberpunk plasma WebGL fragment shader with rich chromatic harmonics
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Fractional Brownian Motion for fluid smoke
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = u_mouse / u_resolution.xy;
        mouse.x *= u_resolution.x / u_resolution.y;
        float dist = length(st - mouse);

        // Fluid cybernetic noise harmonics with mouse repulsion warp
        vec2 warp = st + vec2(sin(u_time * 0.2 + st.y * 2.0), cos(u_time * 0.2 + st.x * 2.0)) * 0.2;
        if (dist < 0.4) {
          warp += normalize(st - mouse) * (0.4 - dist) * 0.3;
        }

        float f = fbm(warp * 2.5 + u_time * 0.08);

        // Color palette: deep cyber dark -> neon cyan -> electric violet -> emerald
        vec3 dark = vec3(0.01, 0.02, 0.04);
        vec3 cyan = vec3(0.0, 0.9, 1.0);
        vec3 purple = vec3(0.58, 0.15, 0.95);
        vec3 emerald = vec3(0.06, 0.72, 0.5);

        vec3 color = mix(dark, purple, smoothstep(0.1, 0.6, f));
        color = mix(color, cyan, smoothstep(0.4, 0.85, f));
        color = mix(color, emerald, smoothstep(0.75, 1.0, f));

        // Interactive mouse spotlight aura
        float mouseGlow = clamp(1.0 - dist * 2.2, 0.0, 1.0);
        color += cyan * mouseGlow * 0.35;

        gl_FragColor = vec4(color, 0.7);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry covering whole viewport
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = height - e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    let startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) * 0.001;
      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(mouseLocation, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={`pointer-events-none fixed inset-0 w-full h-full z-[0] transition-opacity duration-1000 ${className}`}
    />
  );
}
