<template>
        <v-container fluid fill-height px-0 pt-0 pb-4>
        <IOExternoLateral tipo='entrada' @atualizarEntradas='atualizarEntradas'></IOExternoLateral>
        <IOExterno></IOExterno>
            <v-layout column>
                <v-flex xs12>
                    <v-layout row fill-height>
                        <div>
                            <v-navigation-drawer class='grey lighten-4' v-model='drawerConfig' :mini-variant.sync="mostrarConfig" hide-overlay stateless width="350">
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
                                        <v-form>
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
                                                        <v-text-field box label="Segundos" hide-details @click='show' v-model='dtSelecionadoOsciloscopio' :rules="[v => (!isNaN(v) && v != '') || 'Valor necessário']"></v-text-field>                                                    </v-list-tile-action>
                                                    <!-- </v-list-tile-action> ????? -->
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-form>
                                        <v-card-actions class="justify-center">
                                            <v-layout row>
                                                <v-btn v-if='!mostrarConfig' large color='success' class='ma-2' @click.stop.prevent='iniciar()'>
                                                    <span class='headline'>INICIAR</span>
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn v-if='!mostrarConfig' large color='error' class='ma-2' @click.stop.prevent='parar()'>
                                                    <span class='headline'>PARAR</span>
                                                </v-btn>
                                            </v-layout>
                                        </v-card-actions>
                                    </v-list>
                                </v-card>
                            </v-navigation-drawer>
                        </div>
                        <div style='overflow-x: scroll; width: 100%'>
                            <v-card class='mx-2 mt-2' tile height='93%'>
                                <v-card-actions style='height: 100%'>
                                    <GraficoLinha style='width: 100%; height: 100%;' :chart-data='dadosGrafico' :options='opcoesGrafico'></GraficoLinha>
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
                opcoesGrafico: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        zoom: {
                            zoom: {
                                enabled: true,
                                mode: 'x',
                                speed: 100
                            },
                            pan: {
                                enabled: true,
                                mode: 'x'
                            }
                        }
                    }
                },
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
                dadosOsciloscopio: {},
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
                layoutTeclado: numerico.normal,
                dtSelecionadoOsciloscopio: '0.1'
            }
        },
        methods:{
            getData(){
                this.dadosGrafico = {
                    labels: this.dadosOsciloscopio.t_tend,
                    datasets: [
                        {label: 'E0',
                        backgroundColor: 'rgba(15, 70, 160, 0.8)',
                        borderColor: 'rgba(15, 70, 160, 0.8)',
                        data: this.dadosOsciloscopio.a_tend,
                        fill: false},
                        {label: 'E1',
                        backgroundColor: 'rgba(46, 125, 50, 0.8)',
                        borderColor: 'rgba(46, 125, 50, 0.8)',
                        data: this.dadosOsciloscopio.b_tend,
                        fill: false},
                        {label: 'E2',
                        backgroundColor: 'rgba(251, 192, 45, 0.8)',
                        borderColor: 'rgba(251, 192, 45, 0.8)',
                        data: this.dadosOsciloscopio.c_tend,
                        fill: false},
                        {label: 'E3',
                        backgroundColor: 'rgba(183, 28, 28, 0.8)',
                        borderColor: 'rgba(183, 28, 28, 0.8)',
                        data: this.dadosOsciloscopio.d_tend,
                        fill: false}
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
                this.resetOsciloscopio();

                this.dadosOsciloscopio.date = new Date();
                this.dadosOsciloscopio.t0 = this.dadosOsciloscopio.date.getTime();
                this.dadosOsciloscopio.tempoAtual = new Date().getTime() - this.dadosOsciloscopio.t0;
                this.dadosOsciloscopio.tempoAlvo = this.dadosOsciloscopio.tempoAtual + this.simul.dt;

                this.relogio = setInterval(() => {
                    this.dadosOsciloscopio.tempoAtual = new Date().getTime() - this.dadosOsciloscopio.t0;
                    if(this.dadosOsciloscopio.tempoAtual <= 999999999){ //Condição para parar a simulação
                        if(this.dadosOsciloscopio.tempoAtual >= this.dadosOsciloscopio.tempoAlvo){
                            this.dadosOsciloscopio.t_tend.push((this.dadosOsciloscopio.tempoAtual/1000).toFixed(1));
                            this.dadosOsciloscopio.tempoAlvo += this.dadosOsciloscopio.dt;
                            this.leituraEntradas();
                            this.getData();
                        }
                    }
                }, 50);
            },
            parar(){
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
            leituraEntradas(){
                this.dadosOsciloscopio.a_tend.push(this.entradasAnalogicas[0].valor);
                this.dadosOsciloscopio.b_tend.push(this.entradasAnalogicas[1].valor);
                this.dadosOsciloscopio.c_tend.push(this.entradasAnalogicas[2].valor);
                this.dadosOsciloscopio.d_tend.push(this.entradasAnalogicas[3].valor);
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
            resetOsciloscopio(){
                this.dadosOsciloscopio = {
                    date: null,
                    t0: null,
                    tempoAlvo: null,
                    tempoAtual: null,
                    dt: this.dtMillisOsciloscopio,
                    t_tend: [],
                    a_tend: [],
                    b_tend: [],
                    c_tend: [],
                    d_tend: []
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
            dtMillisOsciloscopio: function(){
                var val = parseFloat(this.dtSelecionadoOsciloscopio);
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
