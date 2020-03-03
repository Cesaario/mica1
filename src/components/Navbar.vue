<template>
    <nav>
        <v-toolbar flat app>
            <v-toolbar-side-icon class='grey--text' @click.stop.prevent='toggleMenu()'></v-toolbar-side-icon>
            <v-toolbar-title class='grey--text'>
                <span class='font-weight-light display-2'>MICA</span>
                <span class='font-weight-bold display-2'>sh</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer v-model='menu' app temporary class='blue-grey darken-4' width='400'>
            <v-layout justify-center wrap class='py-3 fundo-menu'>
                <span class='display-4 font-weight-bold blue--text text--lighten-1 fonte'>mica</span>
            </v-layout>
            <v-divider class='mt-1' dark></v-divider>
            <v-list dark>
                <MenuItem v-for='rt in rotas'
                    :key='rt.rota' 
                    :rota='rt.rota' 
                    :nome='rt.nome' 
                    :icone='rt.icone' 
                    :possuiSub='rt.sub!=undefined'
                    :sub='rt.sub'>
                </MenuItem>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    import MenuItem from '@/components/MenuItem'
    export default{
        name: 'Navbar',
        components: {
            MenuItem
        },
        data(){
            return{
                menu: false,
                rotas: [
                    {
                        rota: '/',
                        nome: 'Principal',
                        icone: 'home'
                    },
                    {
                        rota: '/planta',
                        nome: 'Simulador de Plantas',
                        icone: 'nfc',
                        sub: [
                            {
                                nome: 'Planta 1',
                                rota: '/planta1'
                            },
                            {
                                nome: 'Planta 2',
                                rota: '/planta2'
                            }
                        ]
                    },
                    {
                        rota: '/processos',
                        nome: 'Simulador de Processos',
                        icone: 'polymer'
                    },
                    {
                        rota: '/osciloscopio',
                        nome: 'Osciloscópio',
                        icone: 'video_label'
                    },
                    {
                        rota: '/registrador',
                        nome: 'Registrador',
                        icone: 'open_in_browser'
                    },
                    {
                        rota: '/config',
                        nome: 'Opções',
                        icone: 'settings'
                    }
                ],
                plantas: 3,
            }
        },
        methods: {
            toggleMenu(){
                this.menu = !this.menu;
            }
        }
    }
</script>

<style>
.fundo-menu{
    background-color: #1976D2;
}
</style>