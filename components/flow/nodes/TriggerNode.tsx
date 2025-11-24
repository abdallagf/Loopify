import { Handle, Position } from '@xyflow/react';

export default function TriggerNode({ data }: { data: { label: string } }) {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500 min-w-[150px]">
            <div className="flex items-center">
                <div className="rounded-full w-3 h-3 bg-green-500 mr-2" />
                <div className="text-sm font-bold text-gray-900">{data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
        </div>
    );
}
