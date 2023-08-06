export class VertexBuffer {
  buffer: GPUBuffer;
  constructor(device: GPUDevice, vertices: Float32Array) {
    const usage: GPUBufferUsageFlags =
      GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
    //VERTEX: the buffer can be used as a vertex buffer
    //COPY_DST: data can be copied to the buffer

    const descriptor: GPUBufferDescriptor = {
      size: vertices.byteLength,
      usage: usage,
      mappedAtCreation: true, // similar to HOST_VISIBLE, allows buffer to be written by the CPU
    };

    this.buffer = device.createBuffer(descriptor);

    //Buffer has been created, now load in the vertices
    new Float32Array(this.buffer.getMappedRange()).set(vertices);
    this.buffer.unmap();
  }
}
