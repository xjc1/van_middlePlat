import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { $html } from '@tong/assistant';
import { forceSimulation, forceLink, forceCenter, forceManyBody, forceX, forceY } from 'd3-force';
import _ from 'lodash';
import { EmptyFn } from '@/components/tis_ui';

function Index({
                 nodes = [],
                 edges = [],
                 categories = [],
                 onNodeSelected = EmptyFn,
                 onEdgeSelected = EmptyFn,
                 onCanvasSelected = EmptyFn,
               }) {
  const [data, setData] = useState({ nodes: [], edges: [] });
  const chart = useRef();

  useEffect(() => {
    const force = forceSimulation()
      .nodes(nodes)
      .force('charge', forceManyBody())
      .force(
        'link',
        forceLink(edges)
          .id(d => d.id)
          .distance(20)
          .strength(1),
      )
      .force('x', forceX())
      .force('y', forceY())
      .force('center', forceCenter())
      .alphaDecay(0.2);

    force.on('end', () => {
      const d3nodes = force.nodes();
      setData({
        nodes: _.map(d3nodes, node => {
          const { name } = node;
          return {
            ...node,
            name: $html.decode(name),
          };
        }),
        edges: _.map(edges, ({ source, target }) => {
          return {
            source: source.id,
            target: target.id,
          };
        }),
      });
    });
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <ReactECharts
        style={{ height: '100%' }}
        ref={chart}
        onEvents={{
          click({ dataType, data: model }) {
            switch (dataType) {
              case 'node': {
                onNodeSelected(model);
                break;
              }
              case 'edge': {
                onEdgeSelected(model);
                break;
              }
              default:
                onCanvasSelected();
            }
          },
        }}
        option={{
          legend: [
            {
              // selectedMode: 'single',
              data: _.map(categories, a => a.name),
              left: 20,
              top: 10,
            },
          ],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              data: data.nodes,
              links: data.edges,
              roam: true,
              edgeSymbol: ['arrow', 'circle'],
              edgeSymbolSize: [8, 0],
              categories,
              label: {
                show: true,
                position: 'right',
                formatter: '{b}',
              },
              emphasis: {
                focus: 'adjacency',
                label: {
                  position: 'right',
                  show: true,
                },
                lineStyle: {
                  width: 10,
                },
              },
              selectedMode: 'single',
              select: {
                itemStyle: {
                  color: 'red',
                },
                lineStyle: {
                  width: 10,
                },
              },
              labelLayout: {
                hideOverlap: true,
              },
              lineStyle: {
                color: 'target',
                curveness: 0.3,
                width: 2,
              },
            },
          ],
        }}
      />
    </div>
  );
}

export default React.memo(Index);
