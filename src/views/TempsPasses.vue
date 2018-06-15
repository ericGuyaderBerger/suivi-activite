<template>
    <div>
        <h4>{{ titre }}</h4>
        <table v-if="temps" class="table table-condensed" >
            <thead>
                <tr>
                    <th>Jour</th>
                    <th>Description</th>
                    <th>Durée</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tache,index) in temps" :key="index">
                    <td>{{ tache.date | getDay }}</td>
                    <td><strong>{{ tache.projet }}</strong><br>{{ tache.description }}</td>
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
    name:'TempsPasses',
    props:['temps','titre'],
    computed:{
        totalDuree(){
            let total = 0

            if(this.temps){
                this.temps.forEach(item => total+=item.duree)
            }
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
