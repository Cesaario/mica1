<template>
    <div>
        <v-navigation-drawer class='grey' permanent width='50'>
            <v-list>
                <template v-for='(entrada,index) in io'>
                    <v-list-tile :key='entrada.nome' @click.stop='dialogo[index]=true'>
                        <v-list-tile-title>{{entrada.nome}}</v-list-tile-title>
                    </v-list-tile>
                    <v-dialog :key='`${entrada.nome}dialogo`' v-model='dialogo[index]'>
                        <v-card>
                            <v-card-title class="headline">Use Google's location service?</v-card-title>

                            <v-card-text>
                            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="dialog = false"
                            >
                                Disagree
                            </v-btn>

                            <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="dialog = false"
                            >
                                Agree
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-divider dark :key='`entrada.nome${index}`'></v-divider>
                </template>
            </v-list>
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