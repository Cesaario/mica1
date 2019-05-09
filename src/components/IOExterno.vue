<template>
    <v-bottom-nav :value="true" absolute color="grey" height='50px'>
        <v-card v-for='(obj,index) in io' :key='obj.nome' :color='corEstado(obj.estado)'>
            <v-card-text class='ma-0 pa-0 text-xs-center'>{{obj.nome}}</v-card-text>
            <v-card-actions class='ma-0 pa-0' v-if='testMode'>
                <v-switch class='ma-0 pa-0 justify-center' color='green darken-3' @change='alternar(index)' v-model='obj.estado'></v-switch>
            </v-card-actions>
        </v-card>
    </v-bottom-nav>
</template>

<script>
    import {store} from '../main'
    export default{
        data(){
            return{
                io: [
                    {nome:'A0', estado:false},
                    {nome:'A1', estado:false},
                    {nome:'A2', estado:false},
                    {nome:'A3', estado:false},
                    {nome:'A4', estado:true},
                    {nome:'A5', estado:false},
                    {nome:'S6', estado:false},
                    {nome:'S7', estado:true},
                    {nome:'S8', estado:false},
                    {nome:'S9', estado:false},
                    {nome:'S10', estado:false},
                    {nome:'S11', estado:false},
                ],
                testMode: store.testMode
            }
        },
        methods:{
            corEstado(i){
                return i ? 'green' : 'grey';
            },
            atualizarIO(i, valor){
                this.io[i].estado = valor;
            },
            alternar(i){
                return;
                console.log('alternando ', i);
                console.log('antigo valor: ', this.io[i].estado)
                if(this.io[i].estado) this.atualizarIO(i, false);
                else this.atualizarIO(i, true);
                console.log('novo valor: ', this.io[i].estado)
            }
        }
    }
</script>