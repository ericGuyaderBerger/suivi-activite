<template>
    <div>
        <b-form inline>
            <label for="rech-mois" class="sr-only">Mois:</label><b-input type="text" id="rech-mois" placeholder="Mois" v-model="recherche.mois" class="col-3"></b-input>
            <label for="rech-client" class="sr-only">Client:</label> <b-input type="text" placeholder="Client" id="rech-client" v-model="recherche.client" class="col-4"></b-input>
            <label for="rech-client-final" class="sr-only">Client final:</label> <b-input type="text" placeholder="Client final" id="rech-client-final" v-model="recherche.clientFinal" class="col-4"></b-input>
            <b-button @click="getData" variant="primary" class="col-1">OK</b-button>
        </b-form>
        <table v-if="resultats" class="table table-condensed" >
            <thead>
                <tr>
                    <th>Jour</th>
                    <th>Description</th>
                    <th>Durée</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tache,index) in resultats" :key="index">
                    <td>{{ tache.date | getDay }}</td>
                    <td>{{ tache.description }}</td>
                    <td>{{ tache.duree | timeFormat }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td>Total</td>
                    <td>{{ totalDuree | timeFormat }}</td>                    
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    name:'StatsMensuelles',
    data(){
        return {
            recherche:{},
            resultats:[],
        }
    },
    methods:{
        getData(ev){
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
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Laboratoires+Lebeau')
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Promologis')
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Fauché')
            this.$http.get(url)
            .then(response => {
                    this.resultats = response.data;
            });
        }
    },
    computed:{
        totalDuree(){
            let total = 0
            this.resultats.forEach(item => total+=item.duree)
            return total
        }
    },
    filters:{
        getDay: (val) => new Date(val).getDate(),
        timeFormat: (val) => {
            // return val
            // return new Date(val*3600).toLocaleTimeString()
            
            return Math.floor(val) + "h" + ('0' + parseInt((parseFloat(val)-Math.floor(val)) * 60)).substr(-2)
        }
    }    
}
</script>

<style lang="scss" scoped>
    tfoot{
        font-weight: bold; 
        .header{
            text-align: right;
        }
    }
</style>
