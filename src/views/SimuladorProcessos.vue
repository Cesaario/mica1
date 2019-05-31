<template>
        <v-container fluid fill-height px-0 pt-0 pb-4>
        <IOExternoLateral tipo='entrada' @atualizarEntradas='atualizarEntradas'></IOExternoLateral>
        <IOExterno></IOExterno>
            <v-layout column>
                <v-flex xs1>
                    <v-layout row fill-height>
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
                                    <v-btn class='mr-4 my-4' large color='error' @click.stop.prevent='parar()'>PARAR</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12>
                    <v-layout row fill-height>
                        <div>
                            <v-navigation-drawer class='grey lighten-4' v-model='drawerConfig' :mini-variant.sync="mostrarConfig" hide-overlay stateless>
                                <v-card class='my-2 ml-2' tile height='90%'>
                                    <v-list>
                                        <v-list-tile>
                                            <v-list-tile-action>
                                                <v-icon>settings</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>
                                                    <p class='title'>Configuração</p>
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-btn icon @click.stop='mostrarConfig = !mostrarConfig'>
                                                    <v-icon>chevron_left</v-icon>
                                                </v-btn>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-form ref='inputValido'>

                                            <v-list-tile>
                                                <v-list-tile-action>
                                                    <v-icon>call_received</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        <h6 class='title'>Entrada</h6>
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                    <v-list-tile-action>
                                                        <v-select v-if='!mostrarConfig' box :items='entradas' label='Selecione' hide-details v-model='entradaSelecionada' :rules="[v => !!v || 'Item necessário']"></v-select>
                                                    </v-list-tile-action>
                                                </v-list-tile-content>
                                            </v-list-tile>

                                            <v-list-tile>
                                                <v-list-tile-action>
                                                    <v-icon>call_made</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        <h6 class='title'>Saida</h6>
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                    <v-list-tile-action>
                                                        <v-select box :items='saidas' label='Selecione' hide-details v-model='saidaSelecionada' :rules="[v => !!v || 'Item necessário']"></v-select>
                                                    </v-list-tile-action>
                                                </v-list-tile-content>
                                            </v-list-tile>

                                            <v-list-tile>
                                                <v-list-tile-action>
                                                    <v-icon>clear</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        <h6 class='title'>Escala de tempo</h6>
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                    <v-list-tile-action>
                                                        <v-text-field box label="Multiplicador" @click='show' hide-details v-model='escalaSelecionada' :rules="[v => (!isNaN(v) && v != '') || 'Valor necessário']"></v-text-field>
                                                    </v-list-tile-action>
                                                </v-list-tile-content>
                                            </v-list-tile>

                                            <v-list-tile>
                                                <v-list-tile-action>
                                                    <v-icon>schedule</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        <h6 class='title'>Passo de tempo</h6>
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                    <v-list-tile-action>
                                                        <v-text-field box label="Segundos" hide-details @click='show' v-model='dtSelecionado' :rules="[v => (!isNaN(v) && v != '') || 'Valor necessário']"></v-text-field>                                                    </v-list-tile-action>
                                                    <!-- </v-list-tile-action> ????? -->
                                                </v-list-tile-content>
                                            </v-list-tile>

                                        </v-form>
                                    </v-list>
                                </v-card>
                            </v-navigation-drawer>
                        </div>
                        <div style='overflow-x: scroll; width: 100%'>
                            <v-card class='mx-2 mt-2' tile height='93%'>
                                <v-card-actions style='height: 100%'>
                                    <GraficoLinha style='width: 100%; height: 100%;' :chart-data='dadosGrafico' :options='{maintainAspectRatio: false, responsive: true}'></GraficoLinha>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
        <IOExternoLateral tipo='saida' :saidasAnalogicas='saidasAnalogicas'></IOExternoLateral>


        <v-dialog v-model='tecladoVisivel' content-class="sem-sombra" width='800'>
            <vue-touch-keyboard v-if="true" :layout="layoutTeclado" :cancel="esconderTeclado" :input='inputTeclado'/> 
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


        <v-snackbar v-model='snackbarErroInput' top :timeout='5000'>
            <span>Preencha todos os itens da configuração</span>
            <v-btn flat @click='snackbarErroInput=false' color='red'>OK</v-btn>
        </v-snackbar>


        </v-container>
</template>

<script>
    import GraficoLinha from '@/components/GraficoLinha'
    import IOExterno from '@/components/IOExterno'
    import IOExternoLateral from '@/components/IOExternoLateral'
    import {store} from '@/main'
    import numerico from '@/layouts/numerico'
    export default{
        components:{
            GraficoLinha,
            IOExterno,
            IOExternoLateral,
        },
        data(){
            return{
                dadosGrafico: {labels: ['1'], datasets: [{data: [1]}]},
                entradas: ['E0', 'E1', 'E2', 'E3'],
                saidas: ['S0', 'S1'],
                entradaSelecionada: 'E0',
                saidaSelecionada: 'S0',
                dtSelecionado: '0.1',
                escalaSelecionada: '1',
                tecladoVisivel: false,
                inputTeclado: null,
                cntRose: 0,
                showRose: false,
                testMode: store.testMode,
                tfNum: '1',
                tfDen: '1 1',
                inputFuncao: false,
                funcaoRelogio: null,
                simul: {},
                entradasAnalogicas: [
                    {nome: 'E0', valor: 0},
                    {nome: 'E1', valor: 0},
                    {nome: 'E2', valor: 0},
                    {nome: 'E3', valor: 0},
                ],
                saidasAnalogicas: [
                    {nome: 'S0', valor: 0},
                    {nome: 'S1', valor: 0}
                ],
                snackbarErroInput: false,
                drawerConfig: true,
                mostrarConfig: true,
                layoutTeclado: numerico.normal
            }
        },
        methods:{
            getData(){
                this.dadosGrafico = {
                    labels: this.simul.t_tend,
                    datasets: [
                        {label: this.saidaSelecionada,
                        backgroundColor: 'rgba(15, 70, 160, 0.8)',
                        //data: [1,6,3,4,1]}
                        data: this.simul.y_tend}
                    ]
                }
            },
            atualizarEntradas(entradas){
                this.entradasAnalogicas = entradas;
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
                if(!this.$refs.inputValido.validate()){
                    this.snackbarErroInput = true;
                    return;
                }
                this.resetSimul();
                this.$socket.emit('valoresIniciais', JSON.stringify(this.tfNum.split(' ')), JSON.stringify(this.tfDen.split(' ')))

                this.simul.entrada = this.entradaComputada;
                this.simul.escala = this.escalaTempoCopmutada;

                this.simul.date = new Date();
                this.simul.t0 = this.simul.date.getTime();
                this.simul.tempoAtual = this.simul.date.getTime() - this.simul.t0;
                this.simul.tempoAlvo = this.simul.tempoAtual + this.simul.dt;

                this.simul.t_tend = [0]
                this.simul.y_tend = [0]

                this.relogio = setInterval(() => {
                    this.simul.tempoAtual = new Date().getTime() - this.simul.t0;
                    if(this.simul.tempoAtual <= 10000){ //Condição para parar a simulação
                        if(this.simul.tempoAtual >= this.simul.tempoAlvo){
                            this.calculoODE();
                            this.simul.tempoAlvo += this.simul.dt;
                        }
                    }
                }, 50);
            },
            parar(){
                console.log('parando...')
                clearInterval(this.relogio);
            },
            calculoODE(){
                this.$socket.emit('calculoODE',
                                this.simul.entrada,
                                this.simul.tempoAlvo/1000,
                                this.simul.escala,
                                this.simul.A, //NÃO VOU MANDAR O X VAZIO PORRA NENHUMA
                                this.simul.B,
                                this.simul.C,
                                this.simul.x0,
                                this.simul.t_tend,
                                this.simul.u_tend,
                                this.simul.y_tend,
                                );
            },
            resetSimul(){
                this.simul = {
                    A: null,
                    B: null,
                    C: null,
                    x0: null,
                    n: null,
                    date: null,
                    t0: null,
                    tempoAlvo: null,
                    tempoAtual: null,
                    dt: this.dtMillis,
                    escala: 1,
                    entrada: 0,
                    t_tend: [],
                    y_tend: [],
                    u_tend: [],
                    t: []
                }
            },
            atualizarSaida(){
                //Fiz assim pois do outro jeito estava com bug.
                if(this.saidaSelecionada == 'S0'){
                    this.saidasAnalogicas[0].valor = this.simul.y_tend[this.simul.y_tend.length-1];
                }else if(this.saidaSelecionada == 'S1'){
                    this.saidasAnalogicas[1].valor = this.simul.y_tend[this.simul.y_tend.length-1];
                }
            }
        },
        sockets: {
            respostaValoresIniciais: function(resposta){
                this.simul.A = JSON.parse(resposta.A);
                this.simul.B = JSON.parse(resposta.B);
                this.simul.C = JSON.parse(resposta.C);
                this.simul.x0 = JSON.parse(resposta.x0);
                this.simul.n = resposta.N;
            },
            respostaODE: function(resposta){
                this.simul.t = JSON.parse(resposta.t);
                this.simul.t_tend = JSON.parse(resposta.t_tend);
                this.simul.u_tend = JSON.parse(resposta.u_tend);
                this.simul.y_tend = JSON.parse(resposta.y_tend);
                this.simul.x0 = JSON.parse(resposta.x0);
                this.atualizarSaida();
                this.getData();
            }
        },
        mounted(){
            this.getData();
            this.resetSimul();
        },
        computed: {
            tf: function(){
                return "G(s)=\\frac{"+this.getTermo(this.tfNum.split(' '))+"}{"+this.getTermo(this.tfDen.split(' '))+"}"
            },
            dtMillis: function(){
                var val = parseFloat(this.dtSelecionado);
                if(isNaN(val)){
                    val = 0.1;
                }
                return val * 1000;
            },
            escalaTempoCopmutada: function(){
                return parseFloat(this.escalaSelecionada);
            },
            entradaComputada: function(){
                var obj = this.entradasAnalogicas.find(x=>x.nome=this.entradaSelecionada);
                return obj.valor;
            }
        }
    }
</script>

<style>
    .sem-sombra{
        box-shadow: none;
    }
</style>
