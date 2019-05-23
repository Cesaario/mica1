<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="http://www.coltec.ufmg.br/coltec-ufmg/wp-content/uploads/2018/06/escrito.png"
          aspect-ratio="5.2"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Colégio Técnico</h3>
            <div> {{ card_text }} </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>