import SidebarMenu from "../../components/SideBarMenu";
import Styles from "./Styles.module.css";
import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { getBezierPath } from "reactflow";

import "reactflow/dist/style.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PipelineService from "../../services/pipeline";

const pipelineEmpty = {
  name: "",
  description: "",
  category: "",
  active: false,
  pdilist: [
    {
      id: 0,
      index: 1,
      digitalProcess: {
        id: 16,
        name: "",
        description: "",
        category: "",
      },
      valueParameters: [
        {
          id: 0,
          value: "",
          parameter: {
            id: 0,
            name: "",
            description: "",
            type: "",
            required: false,
            index: 0,
          },
        },
      ],
      pipelineId: 0,
    },
  ],
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: "#fff",
      color: "#333",
      border: "1px solid #233821",
      width: 180,
    },
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: {
      label: "Another default node",
    },
  },
  {
    id: "5",
    data: {
      label: "Node id: 5",
    },
    position: { x: 250, y: 325 },
  },
  {
    id: "6",
    type: "output",
    data: {
      label: (
        <>
          An <strong>output node</strong>
        </>
      ),
    },
    position: { x: 100, y: 480 },
  },
  {
    id: "7",
    type: "output",
    data: { label: "Another output node" },
    position: { x: 400, y: 450 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "step",
    style: { stroke: "#f6ab6c" },
    animated: true,

    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
];

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

function FlowScreen() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [pipeline, setPipeline] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const foreignObjectSize = 40;

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    const newArray = [];
    edges.map((edge) => {
      if (edge.id != id) {
        newArray.push(edge);
      }
    });
    setEdges(newArray);
  };

  function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }) {
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    return (
      <>
        <path
          id={id}
          style={style}
          className="react-flow__edge-path"
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={labelX - foreignObjectSize / 2}
          y={labelY - foreignObjectSize / 2}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <body className={Styles.body}>
            <button
              className={Styles.edgebutton}
              onClick={(event) => onEdgeClick(event, id)}
            >
              ×
            </button>
          </body>
        </foreignObject>
      </>
    );
  }

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "buttonedge" }, eds)),
    [setEdges]
  );
  const reactFlowStyle = {
    background: "white",
    boxShadow: "10px 0 20px -10px #888 inset",
    width: "100%",
    height: 300,
    zIndex: 1,
  };

  useEffect(() => {
    if (location.state) {
      setPipeline(location.state.pipeline);
    }
  }, []);

  useEffect(() => {
    if (pipeline) {
      setEdges([]);
      pipeline.pdilist.map((pdi) => {
        const newNode = {
          id: `${pdi.index}`,
          data: {
            label: <>{pdi.digitalProcess.name}</>,
          },
          position: pdi.position ? pdi.position : { x: 100, y: 100 },
          style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #233821",
            width: 180,
          },
        };
        if (pdi.children) {
          pdi.children.map((child) => {
            const newEdge = {
              id: `e${pdi.index}-${child}`,
              source: `${pdi.index}`,
              target: `${child}`,
              type: "buttonedge",
              animated: true,
            };
            setEdges((oldedges) => [...oldedges, newEdge]);
          });
        }

        setNodes((oldnodes) => [...oldnodes, newNode]);
      });
    }
  }, [pipeline]);

  async function handleSave() {
    pipeline.pdilist.map((pdi) => {
      nodes.map((node) => {
        if (node.id == pdi.index) {
          pdi.position = node.position;
        }
      });

      pdi.children = [];
      edges.map((edge) => {
        if (edge.source == pdi.index) {
          console.log(edge.source, pdi.index);
          pdi.children.push(edge.target);
          console.log(pdi.children);
        }
      });
    });
    const novoEstado = Object.assign({}, pipeline);
    setPipeline(novoEstado);
    await PipelineService.update(pipeline);
    navigate("../pipeline", { replace: true, state: { pipeline } });
  }

  const edgeTypes = {
    buttonedge: CustomEdge,
  };

  return (
    <div className="content">
      <SidebarMenu page={"pipeline"} />
      <div className="content-body">
        <ReactFlow
          style={reactFlowStyle}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="top-right"
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "input") return "#0041d0";
              if (n.type === "output") return "#ff0072";
              if (n.type === "default") return "#1a192b";

              return "#eee";
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;

              return "#fff";
            }}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <div className={Styles.position}>
          <button
            className={"btn btn-color " + Styles.btn}
            onClick={(e) => handleSave()}
          >
            Salvar e voltar
          </button>

          <a
            href="#"
            onClick={(e) =>
              navigate("../pipeline", { replace: true, state: { pipeline } })
            }
            className={Styles.back}
          >
            voltar
          </a>
        </div>
      </div>
    </div>
  );
}

export default FlowScreen;
