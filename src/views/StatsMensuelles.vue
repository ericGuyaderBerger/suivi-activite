<template>
    <div>
        <b-form inline>
            <label for="rech-mois" class="sr-only">Mois:</label><b-input type="month" id="rech-mois" placeholder="Mois" v-model="recherche.mois" class="col-2"></b-input>
            <label for="rech-client" class="sr-only">Client:</label> <b-input type="text" placeholder="Client" id="rech-client" v-model="recherche.client" class="col-3"></b-input>
            <label for="rech-client-final" class="sr-only">Client final:</label> <b-input type="text" placeholder="Client final" id="rech-client-final" v-model="recherche.clientFinal" class="col-3"></b-input>
            <label for="rech-projet" class="sr-only">Projet:</label> <b-input type="text" placeholder="Projet" id="rech-projet" v-model="recherche.projet" class="col-3"></b-input>
            <b-button @click="getTimesFromServer" variant="primary" class="col-1">OK</b-button>
        </b-form>
        <b-select v-if="resultats.length > 0" v-model="displayMode">
            <option value="">Standard</option> 
            <option value="client">Par client</option> 
            <option value="clientFinal">Par client final</option> 
            <option value="projet">Par projet</option> 
        </b-select>
        <temps-passes v-if="displayMode === ''" :temps="resultats" :titre="'Temps passés ' + recherche.mois"></temps-passes>
        <div v-else>
            <temps-passes v-for="(unite,index) in resultatsRanges" :temps="unite.temps" :titre="unite.nom" :key="index"></temps-passes>
        </div>
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
            displayMode:''
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
            this.$http.get(url)
            .then(response => {
                this.resultats = response.data;
            });
        }
    },
    components:{
        'temps-passes':TempsPasses
    },
    computed:{
        resultatsRanges(){
            let res = [];
            this.resultats.forEach(temps => {
                let intitule = '(Aucun)'
                if( temps[this.displayMode] !== undefined ) {
                    intitule = temps[this.displayMode]
                }
                let resItem = res.find( item => item.nom === intitule  )
                
                
                if(resItem){
                    resItem.temps.push(temps)
                }else{
                    res.push({nom:intitule,temps:[]})
                    res[res.length-1].temps.push(temps)
                }
            });
            res.sort((a,b) => a.nom > b.nom )
            return res;
        }
    }   
}
</script>

<style lang="scss" scoped>

</style>
