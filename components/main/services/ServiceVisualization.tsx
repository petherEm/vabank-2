import React from "react";
import {
  Code2Icon,
  BrainCircuitIcon,
  GaugeCircleIcon,
  BarChart4Icon,
} from "lucide-react";

interface ServiceVisualizationProps {
  serviceId: string;
}

export default function ServiceVisualization({
  serviceId,
}: ServiceVisualizationProps) {
  const renderWebVisualization = () => (
    <div className="absolute inset-0">
      {/* Code editor interface */}
      <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-t-lg flex items-center px-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-white/60">app.tsx</div>
      </div>

      {/* Code content */}
      <div className="absolute top-16 left-4 right-4 bottom-4 bg-black/30 rounded-b-lg p-4 font-mono text-xs">
        <div className="space-y-2 opacity-60">
          <div className="text-blue-400">
            import React from &apos;react&apos;
          </div>
          <div className="text-white/80">
            <span className="text-purple-400">const</span>{" "}
            <span className="text-yellow-400">Home</span>: HomePage = () =&gt;{" "}
            {"{"}
          </div>
          <div className="ml-4 text-white/80">
            <span className="text-purple-400">return</span> (
          </div>
          <div className="ml-8 text-green-400">
            &lt;div className=&#39;min-h-screen&#39;&gt;
          </div>
          <div className="ml-12 text-green-400">
            &lt;h1&gt;No magic, just code.&lt;/h1&gt;
          </div>
          <div className="ml-8 text-green-400">&lt;/div&gt;</div>
          <div className="ml-4 text-white/80">)</div>
          <div className="text-blue-400">export default Home;</div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
        <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
          <Code2Icon className="w-8 h-8 text-secondary" />
        </div>
      </div>
    </div>
  );

  const renderAIVisualization = () => (
    <div className="absolute inset-0">
      {/* Chat interface */}
      <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-t-lg flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <div className="text-xs text-white/80">AI Agent - Online</div>
        </div>
        <div className="ml-auto text-xs text-white/60">GPT-4 • Claude</div>
      </div>

      {/* Chat messages */}
      <div className="absolute top-16 left-4 right-4 bottom-16 bg-black/30 rounded-b-lg p-4 space-y-3 overflow-hidden">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-white/10 rounded-lg px-3 py-2 max-w-[70%]">
            <div className="text-xs text-white/90">
              How can I optimize my website?
            </div>
          </div>
        </div>

        {/* AI response with typing animation */}
        <div className="flex justify-start">
          <div className="bg-secondary/20 rounded-lg px-3 py-2 max-w-[80%]">
            <div className="flex items-center gap-2 mb-1">
              <BrainCircuitIcon className="w-3 h-3 text-secondary" />
              <div className="text-xs text-secondary font-medium">AI Agent</div>
            </div>
            <div className="text-xs text-white/90">
              I can help optimize your website by analyzing performance metrics,
              implementing SEO best practices...
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        {/* Processing indicator */}
        <div className="flex justify-start">
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div
                  className="w-1 h-1 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <div className="text-xs text-white/60">Processing...</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI models indicator */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="px-2 py-1 bg-secondary/20 rounded text-xs text-secondary">
            OpenAI
          </div>
          <div className="px-2 py-1 bg-secondary/20 rounded text-xs text-secondary">
            Anthropic
          </div>
        </div>
        <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
          <BrainCircuitIcon className="w-6 h-6 text-secondary" />
        </div>
      </div>

      {/* Floating AI particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-secondary/60 rounded-full animate-ping"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: "2s",
          }}
        />
      ))}
    </div>
  );

  const renderAutomationVisualization = () => (
    <div className="absolute inset-0">
      {/* Automation pipeline header */}
      <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-lg flex items-center px-4">
        <div className="text-xs text-white/80">Automation Pipeline</div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div className="text-xs text-white/60">Active</div>
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="absolute top-20 left-4 right-4 bottom-16">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="rgba(208, 56, 75, 0.8)" />
            </marker>

            {/* Animated gradient for data flow */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(208, 56, 75, 0)" />
              <stop offset="50%" stopColor="rgba(208, 56, 75, 0.8)" />
              <stop offset="100%" stopColor="rgba(208, 56, 75, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-100 0;100 0;-100 0"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* Pipeline flow */}
          <g>
            {/* Stage 1: Trigger */}
            <rect
              x="5%"
              y="30%"
              width="15%"
              height="12%"
              rx="6"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(208, 56, 75, 0.3)"
              strokeWidth="1"
            />
            <text
              x="12.5%"
              y="38%"
              textAnchor="middle"
              className="text-xs fill-white/90"
            >
              Trigger
            </text>

            {/* Stage 2: Process */}
            <rect
              x="35%"
              y="30%"
              width="15%"
              height="12%"
              rx="6"
              fill="rgba(208, 56, 75, 0.2)"
              stroke="rgba(208, 56, 75, 0.5)"
              strokeWidth="1"
            />
            <text
              x="42.5%"
              y="38%"
              textAnchor="middle"
              className="text-xs fill-white"
            >
              Process
            </text>

            {/* Stage 3: Execute */}
            <rect
              x="65%"
              y="30%"
              width="15%"
              height="12%"
              rx="6"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(208, 56, 75, 0.3)"
              strokeWidth="1"
            />
            <text
              x="72.5%"
              y="38%"
              textAnchor="middle"
              className="text-xs fill-white/90"
            >
              Execute
            </text>

            {/* Connecting arrows with animated flow */}
            <line
              x1="20%"
              y1="36%"
              x2="35%"
              y2="36%"
              stroke="url(#flowGradient)"
              strokeWidth="3"
              markerEnd="url(#arrow)"
            />
            <line
              x1="50%"
              y1="36%"
              x2="65%"
              y2="36%"
              stroke="url(#flowGradient)"
              strokeWidth="3"
              markerEnd="url(#arrow)"
            />
          </g>

          {/* Data packets moving through pipeline */}
          <g>
            <circle r="3" fill="rgba(208, 56, 75, 0.8)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 60 120 L 200 120 L 340 120"
              />
            </circle>
            <circle r="2" fill="rgba(255, 255, 255, 0.6)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin="1s"
                path="M 60 120 L 200 120 L 340 120"
              />
            </circle>
            <circle r="2" fill="rgba(255, 255, 255, 0.4)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin="2s"
                path="M 60 120 L 200 120 L 340 120"
              />
            </circle>
          </g>
        </svg>

        {/* Task queue */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="bg-black/50 rounded-lg p-3">
            <div className="text-xs text-white/80 mb-2">Task Queue</div>
            <div className="space-y-1">
              {[
                "Email notification sent",
                "Database updated",
                "Report generated",
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      i === 0
                        ? "bg-green-500"
                        : i === 1
                          ? "bg-yellow-500"
                          : "bg-white/30"
                    }`}
                  ></div>
                  <span className="text-white/70">{task}</span>
                  {i === 0 && <span className="text-green-400 ml-auto">✓</span>}
                  {i === 1 && (
                    <div className="ml-auto">
                      <div className="w-3 h-3 border border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Automation icon */}
      <div className="absolute bottom-4 right-4">
        <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
          <GaugeCircleIcon className="w-6 h-6 text-secondary" />
        </div>
      </div>

      {/* Floating automation indicators */}
      <div className="absolute top-16 right-8 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white/60">24/7 Active</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <span className="text-white/60">Auto-scaling</span>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsVisualization = () => (
    <div className="absolute inset-0">
      {/* Dashboard interface */}
      <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-lg flex items-center px-4">
        <div className="text-xs text-white/80">Analytics Dashboard</div>
        <div className="ml-auto flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="text-xs text-white/60">Live</div>
        </div>
      </div>

      {/* Chart visualization */}
      <svg width="100%" height="100%" className="absolute inset-0 mt-12">
        {/* Bar chart */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => {
            const height = Math.random() * 40 + 10;
            return (
              <rect
                key={i}
                x={`${15 + i * 8}%`}
                y={`${60 - height}%`}
                width="5%"
                height={`${height}%`}
                fill="rgba(208, 56, 75, 0.6)"
                className="animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            );
          })}
        </g>

        {/* Grid lines */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.5">
          <line x1="10%" y1="20%" x2="90%" y2="20%" />
          <line x1="10%" y1="40%" x2="90%" y2="40%" />
          <line x1="10%" y1="60%" x2="90%" y2="60%" />
        </g>

        {/* Trend line */}
        <polyline
          points="15,50 25,45 35,40 45,35 55,30 65,25 75,20"
          fill="none"
          stroke="rgba(208, 56, 75, 0.8)"
          strokeWidth="2"
          className="animate-pulse"
        />
      </svg>

      {/* Analytics icon */}
      <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
          <BarChart4Icon className="w-8 h-8 text-secondary" />
        </div>
      </div>
    </div>
  );

  const getVisualization = () => {
    switch (serviceId) {
      case "web":
        return renderWebVisualization();
      case "ai":
        return renderAIVisualization();
      case "automation":
        return renderAutomationVisualization();
      case "analytics":
        return renderAnalyticsVisualization();
      default:
        return renderWebVisualization();
    }
  };

  return (
    <div className="relative h-[350px] rounded-2xl overflow-hidden border border-white/10 mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-secondary/20">
        {getVisualization()}
      </div>
    </div>
  );
}
