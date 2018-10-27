import { HorizontalBar, mixins } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart({
      labels: ['No.1', 'No.2', 'No.3', 'No.4', 'No.5', 'No.6', 'No.7', 'No.8', 'No.9', 'No.10', 'No.11', 'No.12', 'No.13', 'No.14', 'No.15', 'No.16', 'No.17', 'No.18', 'No.19', 'No.20', 'No.21'],
      datasets: [
        {
          label: '得票数',
          backgroundColor: '#26a2ff',
          data: this.chartData,
          borderWidth:1
        }
      ]
    }, {responsive: false, maintainAspectRatio: false, scales: {xAxes:[{ticks:{min:0,stepSize: 1}}]}})
  }
}