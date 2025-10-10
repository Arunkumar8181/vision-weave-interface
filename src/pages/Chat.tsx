import { Navigation } from "@/components/Navigation";
import { ChatInterface } from "@/components/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <div style={{ background: "var(--gradient-primary)" }}>
        <Navigation />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Health Assistant
          </h1>
          <p className="text-muted-foreground">
            Get instant answers to your diabetes and health questions
          </p>
        </div>

        <ChatInterface />
      </main>
    </div>
  );
};

export default Chat;
