import { Handle, Position } from '@xyflow/react';

export default function ActionNode({ data }: { data: { label: string; type: 'email' | 'sms' | 'delay' } }) {
    const borderColor =
        data.type === 'email' ? 'border-blue-500' :
            data.type === 'sms' ? 'border-purple-500' : 'border-gray-500';

    return (
        <div className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${borderColor} min-w-[150px]`}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-400" />
            <div className="flex items-center justify-center">
                <div className="text-sm font-bold text-gray-900">{data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-400" />
        </div>
    );
}
