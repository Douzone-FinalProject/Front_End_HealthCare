import { ResponsivePie } from '@nivo/pie'

function PieChart(props) {
  return (
    <>
      <div>{props.category}</div>
      <ResponsivePie
          data={props.chartData}
          id={props.chartData.id}
          margin={{ top: 20, right: 40, bottom: 60, left: 40 }}
          innerRadius={0.7}
          padAngle={0.7}
          fit={false}
          activeOuterRadiusOffset={8}
          colors={({id, data}) => data[`color`]}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
          isInteractive={false}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 70,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
    </>
  );
}

export default PieChart;