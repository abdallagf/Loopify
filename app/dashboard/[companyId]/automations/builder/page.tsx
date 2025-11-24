import FlowBuilder from "@/components/flow/FlowBuilder";

export default function VisualBuilderPage() {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Visual Automation Builder</h1>
                <p className="text-gray-500">Drag and drop nodes to create your automation flow.</p>
            </div>

            <div className="flex-1 min-h-[600px]">
                <FlowBuilder />
            </div>
        </div>
    );
}
