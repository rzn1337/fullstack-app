import Button from "./Button";
import { PenTool, Users, Zap, ChevronRight, Sidebar } from "lucide-react";

function Home() {
    return (
        <main className="flex-1 overflow-y-auto p-6">
            <section className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">
                    Collaborate in Real-Time
                </h1>
                <p className="mb-8 text-xl text-muted-foreground">
                    Bring your team's ideas to life with our interactive
                    whiteboard.
                </p>
                <Button size="lg">
                    Start Collaborating
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </section>

            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border p-4">
                        <Users className="mb-2 h-8 w-8" />
                        <h3 className="mb-2 text-lg font-medium">
                            Real-time Collaboration
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Work together with your team in real-time, no matter
                            where they are.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-4">
                        <PenTool className="mb-2 h-8 w-8" />
                        <h3 className="mb-2 text-lg font-medium">
                            Intuitive Drawing Tools
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Express your ideas with our easy-to-use drawing and
                            diagramming tools.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-4">
                        <Zap className="mb-2 h-8 w-8" />
                        <h3 className="mb-2 text-lg font-medium">
                            Instant Sharing
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Share your whiteboards instantly with a simple link.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
