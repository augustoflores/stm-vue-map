<script>
  import { Pie } from 'vue-chartjs'

  export default {
    name: 'VuePie',
    extends: Pie,
    props: {  
      labels: Array,
      arrvalues: Array,
    },
  mounted () {
    // Overwriting base render method with actual data.
    console.log(this.arrvalues);
    this.renderChart({
      //this.arrvalues
      labels: this.labels,
      datasets: [
          {
            label: "NSE",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF","#E46661", "#00D8CC"],
            data: this.arrvalues
          }
        ]
    })
  }
  };
</script>