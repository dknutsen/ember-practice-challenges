/**
 * Chart.js is a popular canvas-based charting library for Javascript. It has been added
 * to this app's dependencies for you.
 *
 * Write a modifier that takes one arg, which is a chart configuration object, and renders
 * a Chart.js chart on the attached element.
 *
 * Hint: look at the Chart.js docs to see how to import/invoke a Chart
 * Hint: use ember-modifier (already a dependency)
 */

// [Begin] Write your modifier here!

// [End]

// Add your modifier to the canvas in this component, and don't
// forget to pass the @config arg to it
const MyChart = <template>
  <canvas>
    {{@altText}}
  </canvas>
</template>

/**
 * Do not edit below here
 */
const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const chartConfig = {
  type: 'bar',
  data: {
    labels: data.map(row => row.year),
    datasets: [
      {
        label: 'Times I wished I had become a farmer instead, by year',
        data: data.map(row => row.count),
      },
    ],
  },
};

export default <template>
  <MyChart
    @config={{chartConfig}}
    @altText="This canvas contains a bar chart showing the number of times I wish I had become a farmer instead of a software engineer per year"
  />
</template>
