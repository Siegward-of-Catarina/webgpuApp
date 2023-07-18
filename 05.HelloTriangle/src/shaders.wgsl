sturct Fragment{
    @builtin(position) Position :vec4<32f>,
    @location(0) Color : vec4<32f>
};

@stage(vertex)
fn vs_main(@builtin(vertex_index) v_id: u32) -> Fragment {
    var position = array<vec2<32f>, 3>(
        vec2<32f>(0.0,0.5),
        vec2<32f>(-0.5,-0.5),
        vec2<32f>(0.5,-0.5),
    );

    var colors = array<vec3<32f>, 3>(
        vec3<32f>(1.0,0.0, 0.0),
        vec3<32f>(0.0,1.0, 0.0),
        vec3<32f>(0.0,0.0, 1.0),
        
    );

    var output : Fragment;
    output.Position = vec4<32f>(position[v_id],0.0,1.0);
    output.Color = vec4<32f>(colors[v_id],1.0);

    return output;
}

@stage(fragment)
fn fs_main(@location(0) Color : vec4<f32>) -> @location(0) vec4<f32>{
    return Color;
}