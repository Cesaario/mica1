<template>
    <div>
        <v-bottom-nav :value="true" color="grey" height='50px' fixed>
            <v-card v-for='obj in ioA' :key='obj.nome' :color='corEstado(obj.estado)'>
                <v-card-text class='ma-0 pa-0 text-xs-center'>{{obj.nome}}</v-card-text>
                <v-card-actions class='ma-0 pa-0' v-if='testMode'>
                    <v-switch class='ma-0 pa-0 justify-center' color='green darken-3' v-model='obj.estado'></v-switch>
                </v-card-actions>
            </v-card>
            <v-card v-for='obj in ioS' :key='obj.nome' :color='corEstado(obj.estado)'>
                <v-card-text class='ma-0 pa-0 text-xs-center'>{{obj.nome}}</v-card-text>
            </v-card>
        </v-bottom-nav>
    </div>
</template>

<script>
    import {store} from '../main'
    export default{
        name: 'IOExterno',
        data(){
            return{
                ioA: [
                    {nome:'A0', estado:false, tipo: "atuador"},
                    {nome:'A1', estado:false, tipo: "atuador"},
                    {nome:'A2', estado:false, tipo: "atuador"},
                    {nome:'A3', estado:false, tipo: "atuador"},
                    {nome:'A4', estado:false, tipo: "atuador"},
                    {nome:'A5', estado:false, tipo: "atuador"}
                ],
                ioS:[
                    {nome:'S6', estado:false, tipo: "sensor"},
                    {nome:'S7', estado:false, tipo: "sensor"},
                    {nome:'S8', estado:false, tipo: "sensor"},
                    {nome:'S9', estado:false, tipo: "sensor"},
                    {nome:'S10', estado:false, tipo: "sensor"},
                    {nome:'S11', estado:false, tipo: "sensor"},
                ],
                testMode: store.testMode,
            }
        },
        methods:{
            corEstado(i){
                return i ? 'green' : 'grey darken-1';
            },
            atualizarIO(i, valor){
                this.io[i].estado = valor;
            }
        }
    }
</script>