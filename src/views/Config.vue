<template>
    <div>
        <v-layout>
            <v-flex xs3>
                <v-card class='ma-2 pa-2' height='100%'>
                    <div class='text-xs-center'>
                        <h1>Login Google</h1>
                        <v-btn v-if='!autenticado' @click='login'>Login</v-btn>
                        <v-btn v-if='autenticado' @click='logout'>Logout</v-btn>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs3>
                <v-card class='ma-2 pa-2' height='100%'>
                    <div class='text-xs-center'>
                        <h1>Modo Teste</h1>
                    </div>
                    <v-switch v-model='testMode' @change='alternar()'></v-switch>
                    <v-btn @click='teste()'>Teste</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {store} from '../main'
    export default{
        beforeCreate(){
            store.atualizarAutenticado(this.$gapi.isAuthenticated());
        },
        data(){
            return{
                testMode: this.getModoTesteAtual(),
                autenticado: store.state.autenticado,
            }
        },
        methods: {
            alternar(){
                store.atualizarTestMode(!store.state.testMode);
            },
            getModoTesteAtual(){
                return store.state.testMode;
            },
            getAutenticado(){
                return store.state.autenticado;
            },
            login(){
                if (!this.$gapi.isAuthenticated()) {
                    this.$gapi
                    .login()
                    .then(() => {
                        // eslint-disable-next-line no-console
                        console.log("Autenticado!");
                        store.atualizarAutenticado(true);
                        this.autenticado = true;
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-console
                        console.error("Login falhou: %s", err.message);
                    });
                }
            },
            logout(){
                if (this.$gapi.isAuthenticated()) {
                    this.$gapi
                    .logout()
                    .then(() => {
                        // eslint-disable-next-line no-console
                        console.log("Deslogado!");
                        store.atualizarAutenticado(false);
                        this.autenticado = false;
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-console
                        console.error("Logout falhou: %s", err.message);
                    });
                }
            }
        }
    }
</script>