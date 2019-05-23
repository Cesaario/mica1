<template>
        <v-container fluid fill-height px-0 pt-0 pb-4>
        <IOExternoLateral tipo='entrada'></IOExternoLateral>
        <IOExterno></IOExterno>
            <v-layout column>
                <v-flex xs1>
                    <v-layout row  fill-height>
                        <v-flex xs12>
                            <v-card class='ma-2' tile height='90%'>
                                <v-card-actions class='justify-center' fill-height>
                                    <katex-element style='overflow: hidden; font-size: 22px' display-mode expression="G_4(S)=\frac{s+2}{s^2+2.7s^3+4.4s^2+4.7s+2}"/>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs11>
                    <v-layout row fill-height>
                        <v-flex xs2>
                            <v-card class='ma-2' tile height='90%'>
                                <v-card-title>
                                    OI2
                                </v-card-title>
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
        </v-container>
</template>

<script>
    import GraficoLinha from '@/components/GraficoLinha'
    import IOExterno from '@/components/IOExterno'
    import IOExternoLateral from '@/components/IOExternoLateral'
    export default{
        components:{
            GraficoLinha,
            IOExterno,
            IOExternoLateral,
        },
        data(){
            return{
                dadosGrafico: {labels: ['1'], datasets: [{data: [1]}]}
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
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>