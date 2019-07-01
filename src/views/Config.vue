<template>
    <div>
        <h1>Test Mode</h1>
        <v-switch v-model='testMode' @change='alternar()'></v-switch>
        <v-btn @click='teste()'>Teste</v-btn>
    </div>
</template>

<script>
    import {store} from '../main'
    export default{
        data(){
            return{
                testMode: this.getModoTesteAtual()
            }
        },
        methods: {
            alternar(){
                store.atualizarTestMode(!store.testMode);
            },
            getModoTesteAtual(){
                return store.testMode;
            }
        }
    }
</script>