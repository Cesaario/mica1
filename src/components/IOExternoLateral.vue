<template>
    <div>
        <v-navigation-drawer class='grey' permanent width='50'>
            <v-list>
                <template v-for='(entrada,index) in entradasAnalogicas'>
                    <v-list-tile :key='entrada.nome' @click.stop='input = true'>
                        <v-list-tile-title>{{entrada.nome}}</v-list-tile-title>
                    </v-list-tile>
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
            }
        },
        methods:{
            corEstado(i){
                return i ? 'green' : 'grey';
            },
            atualizarIO(i, valor){
                this.io[i].estado = valor;
            }
        }
    }
</script>