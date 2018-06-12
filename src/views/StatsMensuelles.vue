<template>
    <div>
        <ul>
            <li><label>Mois: <input type="text" id="" v-model="recherche.mois"></label></li>
            <li><label>Client final: <input type="text" id="" v-model="recherche.clientFinal"></label></li>
            <li><button @click="getData">OK</button></li>
        </ul>

        <table v-if="resultats">
            <thead>
                <tr>
                    <th>Jour</th>
                    <th>Description</th>
                    <th>Durée</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tache,index) in resultats" :key="index">
                    <td>{{ tache.date }}</td>
                    <td>{{ tache.description }}</td>
                    <td>{{ tache.duree }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:'StatsMensuelles',
    data(){
        return {
            recherche:{},
            resultats:[]
        }
    },
    methods:{
        getData(ev){
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Laboratoires+Lebeau')
            this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Promologis')
            // this.$http.get('http://localhost:3000/ts/2018-06?clientFinal=Fauché')
            .then(response => {
                    this.resultats = response.data;
            });
        }
    }    
}
</script>

<style>

</style>
