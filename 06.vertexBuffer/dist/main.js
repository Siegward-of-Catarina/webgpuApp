(()=>{"use strict";class e{constructor(e){const t=new Float32Array([0,.5,1,0,0,-.5,-.5,0,1,0,.5,-.5,0,0,1]),r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,n={size:t.byteLength,usage:r,mappedAtCreation:!0};this.buffer=e.createBuffer(n),new Float32Array(this.buffer.getMappedRange()).set(t),this.buffer.unmap(),this.bufferLayout={arrayStride:20,attributes:[{shaderLocation:0,format:"float32x2",offset:0},{shaderLocation:1,format:"float32x3",offset:8}]}}}var t,r;r=function*(){var t;const r=document.getElementById("gfx-main"),n=yield null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter(),o=yield null==n?void 0:n.requestDevice(),a=r.getContext("webgpu"),i="bgra8unorm";a.configure({device:o,format:i,alphaMode:"opaque"});const u=new e(o),f=o.createBindGroupLayout({entries:[]}),c=o.createBindGroup({layout:f,entries:[]}),s=o.createPipelineLayout({bindGroupLayouts:[f]}),l=o.createShaderModule({code:"struct Output {\r\n    @builtin(position) Position : vec4<f32>,\r\n    @location(0) Color : vec4<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(0) vertexPosition: vec2<f32>, @location(1) vertexColor: vec3<f32> ) -> Output {\r\n\r\n\r\n\r\n    var output : Output;\r\n    output.Position = vec4<f32>(vertexPosition, 0.0, 1.0);\r\n    output.Color = vec4<f32>(vertexColor, 1.0);\r\n\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn fs_main(@location(0) Color: vec4<f32>) -> @location(0) vec4<f32> {\r\n    return Color;\r\n}"}),d=o.createRenderPipeline({vertex:{module:l,entryPoint:"vs_main",buffers:[u.bufferLayout]},fragment:{module:l,entryPoint:"fs_main",targets:[{format:i}]},primitive:{topology:"triangle-list"},layout:s}),v=o.createCommandEncoder(),p=a.getCurrentTexture().createView(),m=v.beginRenderPass({colorAttachments:[{view:p,clearValue:[.5,0,.25,1],loadOp:"clear",storeOp:"store"}]});m.setPipeline(d),m.setBindGroup(0,c),m.setVertexBuffer(0,u.buffer),m.draw(3,1,0,0),m.end(),o.queue.submit([v.finish()])},new((t=void 0)||(t=Promise))((function(e,n){function o(e){try{i(r.next(e))}catch(e){n(e)}}function a(e){try{i(r.throw(e))}catch(e){n(e)}}function i(r){var n;r.done?e(r.value):(n=r.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,a)}i((r=r.apply(void 0,[])).next())}))})();