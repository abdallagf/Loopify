"use client";

import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';

const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
};

const initialNodes = [
    { id: '1', type: 'trigger', position: { x: 250, y: 5 }, data: { label: 'New Member Joins' } },
    { id: '2', type: 'action', position: { x: 250, y: 100 }, data: { label: 'Send Welcome Email', type: 'email' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function FlowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onSave = () => {
        console.log('Flow saved:', { nodes, edges });
        alert('Flow saved! (Check console for JSON)');
    };

    return (
        <div className="h-[600px] w-full border border-gray-200 rounded-lg bg-gray-50 relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>

            <div className="absolute top-4 right-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                <h3 className="font-bold mb-2">Toolbox</h3>
                <div className="space-y-2">
                    <div className="p-2 border border-green-500 rounded cursor-move bg-green-50 text-xs font-bold text-center" draggable onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'trigger')}>
                        Trigger Node
                    </div>
                    <div className="p-2 border border-blue-500 rounded cursor-move bg-blue-50 text-xs font-bold text-center" draggable onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'action-email')}>
                        Email Action
                    </div>
                    <div className="p-2 border border-purple-500 rounded cursor-move bg-purple-50 text-xs font-bold text-center" draggable onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'action-sms')}>
                        SMS Action
                    </div>
                </div>
                <button onClick={onSave} className="mt-4 w-full bg-black text-white py-2 rounded text-sm font-bold hover:bg-gray-800">
                    Save Flow
                </button>
            </div>
        </div>
    );
}
