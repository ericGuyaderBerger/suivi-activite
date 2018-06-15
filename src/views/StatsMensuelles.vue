<template>
    <div>
        <b-form inline>
            <label for="rech-mois" class="sr-only">Mois:</label><b-input type="month" id="rech-mois" placeholder="Mois" v-model="recherche.mois" class="col-2"></b-input>
            <label for="rech-client" class="sr-only">Client:</label> <b-input type="text" placeholder="Client" id="rech-client" v-model="recherche.client" class="col-3"></b-input>
            <label for="rech-client-final" class="sr-only">Client final:</label> <b-input type="text" placeholder="Client final" id="rech-client-final" v-model="recherche.clientFinal" class="col-3"></b-input>
            <label for="rech-projet" class="sr-only">Projet:</label> <b-input type="text" placeholder="Projet" id="rech-projet" v-model="recherche.projet" class="col-3"></b-input>
            <b-button @click="getTimesFromServer" variant="primary" class="col-1">OK</b-button>
        </b-form>
        <temps-passes :temps="resultats" :titre="'Temps passés ' + recherche.mois"></temps-passes>
    </div>
</template>

<script>
import TempsPasses from '@/views/TempsPasses.vue'

export default {
    name:'StatsMensuelles',
    data(){
        return {
            recherche:{},
            resultats:[],
        }
    },
    methods:{
        getTimesFromServer(ev){
            let baseUrl = 'http://localhost:3000/ts/';
            let url = baseUrl;
            if(undefined !== this.recherche.mois && this.recherche.mois !== ''){
                url += this.recherche.mois + '?'
            }
            if(undefined !== this.recherche.client && this.recherche.client !== ''){
                url += 'client=' + this.recherche.client + '&'
            }
            if(undefined !== this.recherche.clientFinal && this.recherche.clientFinal !== ''){
                url += 'clientFinal=' + this.recherche.clientFinal + '&'
            }
            if(undefined !== this.recherche.projet && this.recherche.projet !== ''){
                url += 'projet=' + this.recherche.projet + '&'
            }
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Laboratoires+Lebeau')
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Promologis')
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Fauché')
            this.$http.get(url)
            .then(response => {
                this.resultats = response.data;
            });
        }
    },
    components:{
        'temps-passes':TempsPasses
    }   
}
</script>

<style lang="scss" scoped>

</style>
