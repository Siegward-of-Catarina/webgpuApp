export class IndexBuffer {
  buffer: GPUBuffer;
  constructor(device: GPUDevice, indices: Uint32Array) {
    const usage: GPUBufferUsageFlags =
      GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST;
    //VERTEX: the buffer can be used as a vertex buffer
    //COPY_DST: data can be copied to the buffer

    const descriptor: GPUBufferDescriptor = {
      size: indices.byteLength,
      usage: usage,
      mappedAtCreation: true, // similar to HOST_VISIBLE, allows buffer to be written by the CPU
    };

    this.buffer = device.createBuffer(descriptor);

    //Buffer has been created, now load in the indices
    new Uint32Array(this.buffer.getMappedRange()).set(indices);
    this.buffer.unmap();
  }
}
