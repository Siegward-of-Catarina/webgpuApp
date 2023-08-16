(()=>{"use strict";class t{constructor(t,e){const i=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST,r={size:e.byteLength,usage:i,mappedAtCreation:!0};this.buffer=t.createBuffer(r),new Uint32Array(this.buffer.getMappedRange()).set(e),this.buffer.unmap()}}class e{constructor(t,e){const i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,r={size:e.byteLength,usage:i,mappedAtCreation:!0};this.buffer=t.createBuffer(r),new Float32Array(this.buffer.getMappedRange()).set(e),this.buffer.unmap()}}const i=t=>{if(null===t)throw Error(t+"is null")};class r{constructor(){this._vertexBuffer=null,this._indexBuffer=null,this._indexCount=null,this._indexFormat="uint32"}get vertexBuffer(){return i(this._vertexBuffer),this._vertexBuffer.buffer}get indexBuffer(){return i(this._indexBuffer),this._indexBuffer.buffer}get indexCount(){return i(this._indexCount),this._indexCount}get indexFormat(){return this._indexFormat}}class n extends r{constructor(i){super();const r=new Float32Array([-.5,.5,0,0,0,-.5,-.5,0,0,1,.5,.5,0,1,0,.5,-.5,0,1,1]);this._vertexBuffer=new e(i,r);const n=new Uint32Array([0,1,2,2,1,3]);this._indexCount=n.length,this._indexBuffer=new t(i,n)}}class s{constructor(){this._module=null,this._bufferLayout=null,this._entryPoint={Vertex:"vs_main",Fragment:"fs_main"}}get module(){return i(this._module),this._module}get bufferLayout(){return i(this._bufferLayout),this._bufferLayout}get entryPoint(){return this._entryPoint}}class a extends s{constructor(t){super(),this._module=t.createShaderModule({code:"struct TransformData{\r\n  model: mat4x4<f32>,\r\n  view: mat4x4<f32>,\r\n  projection: mat4x4<f32>\r\n};\r\n\r\n@binding(0) @group(0) var <uniform> transformUBO : TransformData;\r\n@binding(1) @group(0) var myTextyre: texture_2d<f32>;\r\n@binding(2) @group(0) var mySampler: sampler;\r\n\r\nstruct Output {\r\n    @builtin(position) Position : vec4<f32>,\r\n    @location(0) TexCoord : vec2<f32>,\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(0) vertexPosition: vec3<f32>, @location(1) vertexTexCoord: vec2<f32> ) -> Output {\r\n\r\n\r\n\r\n    var output : Output;\r\n    var mvpMat = transformUBO.projection * transformUBO.view * transformUBO.model;\r\n    output.Position = mvpMat * vec4<f32>(vertexPosition, 1.0);\r\n    output.TexCoord = vertexTexCoord;\r\n\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn fs_main(@location(0) TexCoord: vec2<f32>) -> @location(0) vec4<f32> {\r\n    return textureSample(myTextyre, mySampler, TexCoord);\r\n}"}),this._bufferLayout={arrayStride:20,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x2",offset:12}]}}}var o=1e-6,u="undefined"!=typeof Float32Array?Float32Array:Array;function h(){var t=new u(16);return u!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var c=function(t,e,i,r){return new(i||(i=Promise))((function(n,s){function a(t){try{u(r.next(t))}catch(t){s(t)}}function o(t){try{u(r.throw(t))}catch(t){s(t)}}function u(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,o)}u((r=r.apply(t,e||[])).next())}))};class l{constructor(){this.initialize=(t,e)=>c(this,void 0,void 0,(function*(){const i=yield fetch(e),r=yield i.blob(),n=yield createImageBitmap(r);yield this.loadImageBitmap(t,n),this.view=this.texture.createView({format:"bgra8unorm",dimension:"2d",aspect:"all",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1}),this.sampler=t.createSampler({addressModeU:"repeat",addressModeW:"repeat",magFilter:"linear",minFilter:"nearest",mipmapFilter:"nearest",maxAnisotropy:1})})),this.loadImageBitmap=(t,e)=>c(this,void 0,void 0,(function*(){const r={size:{width:e.width,height:e.height},format:"bgra8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT};this.texture=t.createTexture(r),i(this.texture),t.queue.copyExternalImageToTexture({source:e},{texture:this.texture},r.size)})),this.texture=null,this.view=null,this.sampler=null}}var f=function(t,e,i,r){return new(i||(i=Promise))((function(n,s){function a(t){try{u(r.next(t))}catch(t){s(t)}}function o(t){try{u(r.throw(t))}catch(t){s(t)}}function u(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,o)}u((r=r.apply(t,e||[])).next())}))};class d{constructor(t){this.Initialize=()=>f(this,void 0,void 0,(function*(){yield this.setupDevice(),yield this.createAssets(),yield this.makePipeline()})),this.setupDevice=()=>f(this,void 0,void 0,(function*(){var t;this.adapter=yield null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter(),i(this.adapter),this.device=yield this.adapter.requestDevice(),i(this.device),this.context=this.canvas.getContext("webgpu"),i(this.context),this.format="bgra8unorm",this.context.configure({device:this.device,format:this.format,alphaMode:"opaque"})})),this.createAssets=()=>f(this,void 0,void 0,(function*(){this.mesh=new n(this.device),this.material=new l,yield this.material.initialize(this.device,"dist/img/sacabambaspis.png"),this.shader=new a(this.device)})),this.makePipeline=()=>f(this,void 0,void 0,(function*(){this.uniformBuffer=this.device.createBuffer({size:192,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const t=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.bindGroup=this.device.createBindGroup({layout:t,entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:this.material.view},{binding:2,resource:this.material.sampler}]}),i(this.bindGroup);const e=this.device.createPipelineLayout({bindGroupLayouts:[t]});this.pipeline=this.device.createRenderPipeline({vertex:{module:this.shader.module,entryPoint:this.shader.entryPoint.Vertex,buffers:[this.shader.bufferLayout]},fragment:{module:this.shader.module,entryPoint:this.shader.entryPoint.Fragment,targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"},layout:e}),i(this.pipeline)})),this.render=(t,e)=>f(this,void 0,void 0,(function*(){const i=h();var r,n,s,a,o,u,c;r=i,n=Math.PI/4,s=this.canvas.width/this.canvas.height,a=.1,o=10,c=1/Math.tan(n/2),r[0]=c/s,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=c,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=-1,r[12]=0,r[13]=0,r[15]=0,null!=o&&o!==1/0?(u=1/(a-o),r[10]=(o+a)*u,r[14]=2*o*a*u):(r[10]=-1,r[14]=-2*a);const l=t.view;this.device.queue.writeBuffer(this.uniformBuffer,64,l),this.device.queue.writeBuffer(this.uniformBuffer,128,i);const f=this.device.createCommandEncoder(),d={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:[.5,0,.25,1],loadOp:"clear",storeOp:"store"}]},p=f.beginRenderPass(d);p.setPipeline(this.pipeline),p.setVertexBuffer(0,this.mesh.vertexBuffer),p.setIndexBuffer(this.mesh.indexBuffer,this.mesh.indexFormat),e.forEach((t=>{}));const m=e[0].model;this.device.queue.writeBuffer(this.uniformBuffer,0,m),p.setBindGroup(0,this.bindGroup),p.drawIndexed(this.mesh.indexCount),p.end(),this.device.queue.submit([f.finish()])})),this.canvas=t,this.adapter=null,this.device=null,this.context=null,this.format=null,this.uniformBuffer=null,this.bindGroup=null,this.pipeline=null,this.mesh=null,this.material=null,this.shader=null}}function p(){var t=new u(3);return u!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function m(t,e,i){var r=e[0],n=e[1],s=e[2],a=i[0],o=i[1],u=i[2];return t[0]=n*u-s*o,t[1]=s*a-r*u,t[2]=r*o-n*a,t}p();const v=t=>t*Math.PI/180;class g{constructor(t,e,i){this.update=()=>{this._forwards=[Math.sin(v(this._eulers[2]))*Math.cos(v(this._eulers[1])),Math.sin(v(this._eulers[1])),Math.cos(v(this._eulers[2]))*Math.cos(v(this._eulers[1]))],m(this._right,[0,1,0],this._forwards),m(this._up,this._forwards,this._right),console.log(this._up);var t,e,i,r=p();t=r,e=this._forwards,i=this._position,t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],console.log("pos:"+this._position),console.log("forwards:"+this._forwards),console.log("target:"+r),this._view=h(),function(t,e,i,r){var n,s,a,u,h,c,l,f,d,p,m=e[0],v=e[1],g=e[2],y=r[0],x=r[1],_=r[2],w=i[0],b=i[1],B=i[2];Math.abs(m-w)<o&&Math.abs(v-b)<o&&Math.abs(g-B)<o?function(t){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(t):(l=m-w,f=v-b,d=g-B,n=x*(d*=p=1/Math.hypot(l,f,d))-_*(f*=p),s=_*(l*=p)-y*d,a=y*f-x*l,(p=Math.hypot(n,s,a))?(n*=p=1/p,s*=p,a*=p):(n=0,s=0,a=0),u=f*a-d*s,h=d*n-l*a,c=l*s-f*n,(p=Math.hypot(u,h,c))?(u*=p=1/p,h*=p,c*=p):(u=0,h=0,c=0),t[0]=n,t[1]=u,t[2]=l,t[3]=0,t[4]=s,t[5]=h,t[6]=f,t[7]=0,t[8]=a,t[9]=c,t[10]=d,t[11]=0,t[12]=-(n*m+s*v+a*g),t[13]=-(u*m+h*v+c*g),t[14]=-(l*m+f*v+d*g),t[15]=1)}(this._view,this._position,r,this._up),console.log("lookat:"+this._view)},this._position=t,this._eulers=p(),this._eulers=[0,i,e],this._view=null,this._forwards=p(),this._right=p(),this._up=p()}get view(){return this._view}}class y{constructor(t,e){this.update=()=>{var t,e,i,r,n,s,a,o,u,c,l,f,d,p,m,g,y,x;this.eulers[2]+=1,this.eulers[2]%=360,this._model=h(),t=this._model,e=this._model,g=(i=this.position)[0],y=i[1],x=i[2],e===t?(t[12]=e[0]*g+e[4]*y+e[8]*x+e[12],t[13]=e[1]*g+e[5]*y+e[9]*x+e[13],t[14]=e[2]*g+e[6]*y+e[10]*x+e[14],t[15]=e[3]*g+e[7]*y+e[11]*x+e[15]):(r=e[0],n=e[1],s=e[2],a=e[3],o=e[4],u=e[5],c=e[6],l=e[7],f=e[8],d=e[9],p=e[10],m=e[11],t[0]=r,t[1]=n,t[2]=s,t[3]=a,t[4]=o,t[5]=u,t[6]=c,t[7]=l,t[8]=f,t[9]=d,t[10]=p,t[11]=m,t[12]=r*g+o*y+f*x+e[12],t[13]=n*g+u*y+d*x+e[13],t[14]=s*g+c*y+p*x+e[14],t[15]=a*g+l*y+m*x+e[15]),function(t,e,i){var r=Math.sin(i),n=Math.cos(i),s=e[0],a=e[1],o=e[2],u=e[3],h=e[8],c=e[9],l=e[10],f=e[11];e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=s*n-h*r,t[1]=a*n-c*r,t[2]=o*n-l*r,t[3]=u*n-f*r,t[8]=s*r+h*n,t[9]=a*r+c*n,t[10]=o*r+l*n,t[11]=u*r+f*n}(this._model,this._model,v(this.eulers[2]))},this.position=t,this.eulers=p(),this.eulers[2]=e,this._model=null}get model(){return this._model}}class x{constructor(){this.update=()=>{this._triangles.forEach((t=>t.update())),this._player.update()},this._triangles=[],this._triangles.push(new y([0,0,2],0)),this._player=new g([0,.5,-2],0,0)}get triangles(){return this._triangles}get player(){return this._player}}var _,w;class b{constructor(t){this.initialize=()=>{return t=this,e=void 0,r=function*(){yield this.renderer.Initialize()},new((i=void 0)||(i=Promise))((function(n,s){function a(t){try{u(r.next(t))}catch(t){s(t)}}function o(t){try{u(r.throw(t))}catch(t){s(t)}}function u(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,o)}u((r=r.apply(t,e||[])).next())}));var t,e,i,r},this.run=()=>{this.scene.update(),this.renderer.render(this.scene.player,this.scene.triangles),requestAnimationFrame(this.run)},this.canvas=t,this.renderer=new d(this.canvas),this.scene=new x}}w=function*(){const t=document.getElementById("gfx-main"),e=new b(t);yield e.initialize(),e.run()},new((_=void 0)||(_=Promise))((function(t,e){function i(t){try{n(w.next(t))}catch(t){e(t)}}function r(t){try{n(w.throw(t))}catch(t){e(t)}}function n(e){var n;e.done?t(e.value):(n=e.value,n instanceof _?n:new _((function(t){t(n)}))).then(i,r)}n((w=w.apply(void 0,[])).next())}))})();