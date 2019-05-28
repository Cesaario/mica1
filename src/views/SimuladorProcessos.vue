<template>
        <v-container fluid fill-height px-0 pt-0 pb-4>
        <IOExternoLateral tipo='entrada'></IOExternoLateral>
        <IOExterno></IOExterno>
            <v-layout column>
                <v-flex xs1>
                    <v-layout row  fill-height>
                        <v-flex xs8>
                            <v-card class='ma-2' tile height='90%' @click.stop.prevent='mostrarInputFuncao()'>
                                <v-card-actions class='justify-center' fill-height>
                                    <katex-element style='overflow: hidden; font-size: 22px' display-mode :expression="tf"/>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex xs4>
                            <v-card class='ma-2' tile height='90%'>
                                <v-card-actions max-height>
                                    <v-btn class='ml-4 my-4' large color='success' @click.stop.prevent='iniciar()'>INICIAR</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn class='mr-4 my-4' large color='error'>PARAR</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs11>
                    <v-layout row fill-height>
                        <v-flex xs2>
                            <v-card class='ma-2' tile height='90%'>
                                <v-card-title class='py-2'>
                                    <h5 class='headline'>Configuração</h5>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class='pb-1 pt-3'>
                                    <h6 class='title'>Entrada</h6>
                                </v-card-text>
                                <v-card-actions>
                                    <v-select box :items='entradas' label='Selecione' hide-details v-model='entradaSelecionada'></v-select>
                                </v-card-actions>
                                <v-card-text class='pt-2 pb-1'>
                                    <h6 class='title'>Saida</h6>
                                </v-card-text>
                                <v-card-actions>
                                    <v-select box :items='saidas' label='Selecione' hide-details v-model='saidaSelecionada'></v-select>
                                </v-card-actions>
                                <v-divider></v-divider>
                                <v-card-text class='pt-2 pb-1'>
                                    <h6 class='title' @click.stop.prevent='clkRose()'>Escala de Tempo</h6>
                                </v-card-text>
                                <v-card-actions>
                                    <v-text-field box label="Multiplicador" hide-details v-model='dtSelecionado' @click='show'></v-text-field>
                                </v-card-actions>
                                <v-card-text class='pt-2 pb-1'>
                                    <h6 class='title'>Passo de Tempo</h6>
                                </v-card-text>
                                <v-card-actions>
                                    <v-text-field box label="Segundos" hide-details v-model='escalaSelecionada' @click='show'></v-text-field>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex xs10>
                            <v-card class='ma-2' tile height='90%'>
                                <v-card-actions style='height: 100%'>
                                    <GraficoLinha style='width: 100%; height: 100%' :chart-data='dadosGrafico' :options='{maintainAspectRatio: false}'></GraficoLinha>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        <IOExternoLateral tipo='saida'></IOExternoLateral>
        <v-dialog v-model='tecladoVisivel' width='400'>
            <vue-touch-keyboard v-if="true" layout="numeric" :cancel="esconderTeclado" :input='inputTeclado'/> 
        </v-dialog>
        <v-dialog v-model='showRose' width='500'>
            <v-layout justify-center>
            <v-card width='500' class='text-xs-center'>
                <h3 class='display-2 text-xs-center'>Rose</h3>
                <v-img :src='require("@/assets/rose.jpg")' max-width='500' max height='300' position='center'></v-img>
            </v-card>
            </v-layout>
        </v-dialog>
        <v-dialog v-model='inputFuncao' width='500'>
            <v-card width='500'>
                <v-card-title>
                    <h5 class='headline'>Digite os valores da função de transferência</h5>
                </v-card-title>
                <v-card-text>
                    <h6 class='title'>Numerador</h6>
                </v-card-text>
                <v-card-actions>
                    <v-text-field box label="Coeficientes" hide-details v-model='tfNum' @click='show'></v-text-field>
                </v-card-actions>
                <v-card-text>
                    <h6 class='title'>Denominador</h6>
                </v-card-text>
                <v-card-actions>
                    <v-text-field box label="Coeficientes" hide-details v-model='tfDen' @click='show'></v-text-field>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-container>
</template>

<script>
    import GraficoLinha from '@/components/GraficoLinha'
    import IOExterno from '@/components/IOExterno'
    import IOExternoLateral from '@/components/IOExternoLateral'
    import {store} from '@/main'
    import {bus} from '@/main'
    import {definirBus} from '@/util/rungekutta'
    export default{
        components:{
            GraficoLinha,
            IOExterno,
            IOExternoLateral,
        },
        mounted(){
            definirBus();
        },
        data(){
            return{
                dadosGrafico: {labels: ['1'], datasets: [{data: [1]}]},
                entradas: ['E0', 'E1', 'E2', 'E3'],
                saidas: ['S0', 'S1'],
                entradaSelecionada: '',
                saidaSelecionada: '',
                dtSelecionado: '',
                escalaSelecionada: '',
                tecladoVisivel: false,
                inputTeclado: null,
                cntRose: 0,
                showRose: false,
                testMode: store.testMode,
                tfNum: '1',
                tfDen: '1 10',
                inputFuncao: false
            }
        },
        methods:{
            getData(){
                this.dadosGrafico = {
                    labels: ['1', '2', '3', '4', '5'],
                    datasets: [
                        {label: 'teste',
                        backgroundColor: '#4A148C',
                        data: [1,6,3,4,1]}
                    ]
                }
            },
            esconderTeclado(){
                this.tecladoVisivel = false;
            },
            mostrarTeclado(chamou){
                this.tecladoVisivel = true;
                this.chamouTeclado = chamou;
            },
            show(e){
                this.tecladoVisivel = true;
                this.inputTeclado = e.target;
            },
            clkRose(){
                if(this.testMode){
                    if(this.cntRose < 2){
                        this.cntRose++;
                    }else{
                        this.showRose = true;
                    }
                }
            },
            getTermo(vet){
                var termo = '';
                for(var i = 0; i < vet.length; i++){
                    if(vet[i] == 0) continue;
                    if(vet[i] > 0 && i != 0) termo += '+';
                    if(i == vet.length-1){
                        termo += vet[i]
                    }else if(i == vet.length-2){
                        if(vet[i] != 1) termo += vet[i]
                        termo += 's'
                    }else{
                        if(vet[i] != 1) termo += vet[i]
                        termo += 's^' + (vet.length-1-i)
                    }
                }
                return termo;
            },
            mostrarInputFuncao(){
                this.inputFuncao = !this.inputFuncao;
            },
            iniciar(){
                bus.$emit('iniciar', 'a');
            }
        },
        mounted(){
            this.getData();
        },
        computed: {
            tf: function(){
                return "G(s)=\\frac{"+this.getTermo(this.tfNum.split(' '))+"}{"+this.getTermo(this.tfDen.split(' '))+"}"
            }
        }
    }
</script>