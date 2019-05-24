<template>
    <div>
        <v-navigation-drawer class='white' permanent width='50'>
            <!-- <v-list>
                <template v-for='(entrada,index) in io'>
                    <v-list-tile :key='entrada.nome' @click.stop.prevent='ativar(index)'>
                        <v-list-tile-title>{{entrada.nome}}</v-list-tile-title>
                    </v-list-tile>
                    <v-dialog :key='`${entrada.nome}dialogo`' v-model='dialogo[index]' max-width="550">
                        <v-card>
                            <v-card-title primary-title>
                                <h3 class="headline pb-4">Selecione o valor de entrada simulada de {{entrada.nome}}</h3>
                                <v-slider thumb-label v-model='entrada.valor' max='1' min='0' step='0.01'></v-slider>
                            </v-card-title>
                        </v-card>
                    </v-dialog>
                    <v-divider dark :key='`entrada.nome${index}`'></v-divider>
                </template>
            </v-list> -->
            <template v-for='(obj,index) in io' >
                <v-card :key='`${obj.nome}-card`' :color='corValor(obj.valor)' @click.stop.prevent='ativar(index)'>
                    <v-card-text>{{obj.nome}}</v-card-text>
                </v-card>
                <v-dialog :key='`${obj.nome}-dialogo`' v-model='dialogo[index]' max-width="550">
                    <v-card>
                        <v-card-title primary-title>
                            <h3 class="headline pb-4">Selecione o valor de entrada simulada de {{obj.nome}}</h3>
                            <v-slider class='px-2' thumb-label v-model='obj.valor' max='1' min='0' step='0.01'></v-slider>
                        </v-card-title>
                    </v-card>
                </v-dialog>
            </template>
            
        </v-navigation-drawer>
    </div>
</template>

<script>
    import {store} from '../main'
    export default{
        name: 'IOExterno',
        props:{
            tipo: String
        },
        data(){
            return{
                entradasAnalogicas:[
                    {nome: 'E0', valor: 0},
                    {nome: 'E1', valor: 0},
                    {nome: 'E2', valor: 0},
                    {nome: 'E3', valor: 0},
                ],
                saidasAnalogicas:[
                    {nome: 'S0', valor: 0},
                    {nome: 'S1', valor: 0}
                ],
                testMode: store.testMode,
                dialogo: []
            }
        },
        created(){
            if(this.tipo == 'entrada'){
                for(var i1 = 0; i1 < this.entradasAnalogicas.length; i1++){
                    this.dialogo.push(false);
                }
            }else{
                for(var i2 = 0; i2 < this.saidasAnalogicas.length; i2++){
                    this.dialogo.push(false);
                }
            }
        },
        methods:{
            ativar(index){
                //this.dialogo[index] = true; O vue não suporta isso
                if(this.testMode) this.dialogo.splice(index, 1, true)
            },
            corValor(valor){
                var s = Math.floor(37 * valor);
                return 'hsl(122,' + s + '%,49%)';
            }
        },
        computed:{
            io: function(){
                if(this.tipo == 'entrada'){
                    return this.entradasAnalogicas;
                }else return this.saidasAnalogicas;
            }
        }
    }
</script>