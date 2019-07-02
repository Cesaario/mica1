<template>
    <v-list-tile v-if='!possuiSub' router :to='rota'>
        <v-list-tile-action>
            <v-icon>{{icone}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class='headline' style='overflow: visible;'>{{nome}}</v-list-tile-title>
    </v-list-tile>
    <v-list-group v-else :prepend-icon='icone'>
        <template v-slot:activator>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title class='headline'>{{nome}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <v-list-tile v-for='sb in sub' :key='sb.nome' router :to='sb.rota'>
            <v-list-tile-action>
                <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
                {{sb.nome}}
            </v-list-tile-title>
        </v-list-tile>
    </v-list-group>
</template>

<script>
    export default{
        name: 'MenuItem',
        props: {
            rota: String,
            nome: String,
            icone: String,
            possuiSub: Boolean,
            sub: Array
        }
    }
</script>

<style>
</style>