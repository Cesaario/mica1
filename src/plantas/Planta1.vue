<template>
    <div id='planta1'>
        <div id='canvasPlanta1' style='border-style: solid; height: 80vh; overflow: hidden'>
        </div>
        <IOExterno></IOExterno>
    </div>
</template>

<script>
    import IOExterno from '@/components/IOExterno';
    export default{
        components:{
            IOExterno
        },
        mounted(){
            const script = function(p5){
                var img;
                p5.setup = function(){
                    var canvas = p5.createCanvas(500, 500);
                    canvas.parent('canvasPlanta1');
                    img = p5.loadImage('img/PainelTanques1.png')
                }
                p5.windowResized = function(){
                    p5.resizeCanvas(p5.windowWidth, p5.windowHeight * 0.8);
                }
                p5.draw = function(){
                    p5.image(img, 0, 0, p5.windowWidth, p5.windowHeight * 0.8);
                    p5.fill(255,0,0);
                }
            }
            const P5 = require('p5');
            new P5(script)
        }
    }
</script>