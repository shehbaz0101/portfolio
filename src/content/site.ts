// Single source of truth for all public copy. Every fact is traced in FACTS.md.
// Copy rule: no dashes used as punctuation.

export type Tone = "accent" | "good" | "warn" | "muted";

export type FlowNode = { label: string; sub?: string; tone?: Tone };
export type FlowSpec = {
  columns: { title?: string; nodes: FlowNode[] }[];
  loopBack?: { from: number; to: number; label: string };
  footnote?: string;
};

export type BarRow = { label: string; value: number; display: string; tone?: Tone; note?: string };
export type BarChart = {
  title: string;
  caption?: string;
  scale: "linear" | "log";
  rows: BarRow[];
};

export type DetailTable = { title: string; head: string[]; rows: string[][] };
export type Detail = { title: string; body?: string; bullets?: string[] };

export type Project = {
  id: string;
  index: string;
  name: string;
  period?: string;
  whatItIs: string;
  headline: { value: string; label: string };
  tags: string[];
  video?: { src: string; poster: string; length: string; caption: string };
  flow: FlowSpec;
  chart?: BarChart;
  how: string[];
  details: { stack: string[]; sections: Detail[]; table?: DetailTable; caveats: string[] };
  links: { label: string; href: string; note?: string }[];
};

export const site = {
  name: "Shehbaz Pathan",
  role: "AI Engineer",
  company: "Opentrons",
  location: "New York, NY",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "shehbazp001@gmail.com",
  linkedin: "https://www.linkedin.com/in/shbzpathan",
  github: "https://github.com/shehbaz0101",
  resume: "/Shehbaz_Pathan_Resume.pdf",
  description:
    "Shehbaz Pathan is an AI Engineer at Opentrons in New York. He builds LLM agents that are checked before they act, and evaluates scientific ML models against the physics they claim to know.",
};

export const hero = {
  eyebrow: "AI Engineer at Opentrons, New York",
  headline: "I build LLM agents that get checked before they act.",
  sub: "At Opentrons I ship an assistant that turns a scientist's plain English into lab robot code, and releases only what a simulator has verified. Outside work I build open source tools that test agents and scientific ML models honestly, including the cases where my own models lose.",
  stats: [
    { value: "82", label: "regression tests gate the Opentrons assistant, including 5 golden evals run in the simulator" },
    { value: "11 of 11", label: "harmful agent steps rejected that token acceptance would have kept (spectrace, 15 synthetic traces)" },
    { value: "3.4%", label: "viscosity error versus 34.9% for a closed form baseline, on 30 hard cases (PINNForge)" },
  ],
};

export const glance = {
  title: "The 30 second version",
  lead: "My day job, three open source projects, a paper and a private product. Each row jumps to the full story.",
  rows: [
    { id: "opentrons", name: "Opentrons assistant", what: "Turns a scientist's plain English lab method into robot code, and only releases code that passes the simulator.", result: "82 tests, up to 3 self repair attempts" },
    { id: "spectrace", name: "spectrace", what: "A test bench that checks whether an AI agent's step was a good idea, not just fluent text.", result: "Caught 11 of 11 harmful steps" },
    { id: "pinnforge", name: "PINNForge", what: "Recovers a hidden fluid property from 32 sensors and measures when a neural network beats a plain solver.", result: "3.4% error versus 34.9%" },
    { id: "coticula", name: "Coticula", what: "A report card that asks whether a physics AI understands the equation or only its training data.", result: "Four exams, 48 item rule graded exam" },
    { id: "paper", name: "Small Errors, Large Residuals", what: "Shows why a common physics consistency check misleads, and how to calibrate it.", result: "21 page preprint" },
    { id: "pera", name: "pera.ai", what: "A multi agent research terminal for private credit desks where every figure is cited and labelled.", result: "5 specialists plus a rule based critic" },
    { id: "smartbite", name: "SmartBite", what: "A risk platform built on NYC health inspection data.", result: "87% precision, under 200ms" },
  ],
};

export const experience = {
  id: "opentrons",
  title: "Opentrons",
  role: "AI Engineer",
  company: "Opentrons Labworks Inc.",
  place: "New York, NY",
  period: "Aug 2026 to Present",
  whatItIs:
    "A production assistant that lets a scientist describe a lab method in plain English and get runnable code for Opentrons OT 2 and Flex liquid handling robots.",
  how: [
    "Shipped the assistant with OpenRouter, FastAPI and Docker. When a detail is missing, it asks a clarifying question instead of guessing.",
    "Built guardrails against hallucinated hardware. The model is grounded in Opentrons' official labware and pipette catalog, and its output is constrained to a structured JSON plan schema that covers 13 liquid handling commands.",
    "Only simulator verified code is released. An agentic generate, simulate, repair loop retries up to 3 times, and a deterministic fallback keeps working when the LLM is down.",
    "Changes are regression gated by 82 tests, including 5 golden natural language evals that run in the simulator.",
  ],
  flow: {
    columns: [
      { title: "Ask", nodes: [{ label: "Scientist's plain English method", tone: "muted" }, { label: "Clarifying questions", sub: "when details are missing", tone: "accent" }] },
      { title: "Plan", nodes: [{ label: "Structured JSON plan", sub: "13 liquid handling commands", tone: "accent" }, { label: "Official catalog", sub: "labware and pipettes ground the model", tone: "muted" }] },
      { title: "Generate", nodes: [{ label: "Protocol API code", sub: "for OT 2 and Flex", tone: "accent" }] },
      { title: "Verify", nodes: [{ label: "Simulator", sub: "pass releases the code", tone: "good" }, { label: "Deterministic fallback", sub: "if the LLM is down", tone: "warn" }] },
    ],
    loopBack: { from: 3, to: 2, label: "Repair loop, up to 3 attempts" },
    footnote: "Stack: OpenRouter, FastAPI, Docker. The assistant is an internal product, so there is no public demo.",
  } as FlowSpec,
  earlier: [
    { role: "AI Automation Engineer Intern", company: "Rocket Autoparts", place: "Remote", period: "Feb 2026 to May 2026", points: ["Replaced manual handoffs in 3 core workflows (supply chain, inventory, logistics) with LLM integrated automation.", "Cut order error rates 15% across tracked SKUs with ML forecasting and anomaly detection on fulfillment bottlenecks.", "Parsed unstructured emails and order forms into structured records for decision engines."] },
    { role: "Data Analyst, Automation Intern", company: "BTS", place: "New York, NY", period: "Jun 2025 to Aug 2025", points: ["Cut manual processing time about 40% and report turnaround from 2 days to under 4 hours by automating Salesforce reporting in Python.", "Delivered Power BI dashboards on 15+ KPIs, adopted as the permanent leadership reporting layer for 3 consulting engagements."] },
    { role: "Data Analyst", company: "Dreamcare Developers Pvt. Ltd.", place: "Pune, India", period: "Jun 2022 to Jan 2024", points: ["Guided roadmap priorities over 3 product cycles with regression and significance tests on 500K+ row datasets for 10+ clients.", "Saved about 8 analyst hours per week by automating reporting, with Tableau and Power BI dashboards adopted as the single source of truth."] },
  ],
};

export const projects: Project[] = [
  {
    id: "spectrace",
    index: "01",
    name: "spectrace",
    period: "Open source, MIT",
    whatItIs: "A test bench that checks whether an AI agent's step was actually a good idea, not just fluent text.",
    headline: { value: "11 of 11", label: "harmful steps rejected that a token acceptance check would have kept" },
    tags: ["Python", "CLI", "pytest", "GitHub Actions"],
    video: { src: "/videos/spectrace-demo.mp4", poster: "/posters/spectrace.webp", length: "1:55", caption: "A real end to end run: trace listing, a live grade of a DROP TABLE trace, then the HTML report." },
    flow: {
      columns: [
        { title: "Input", nodes: [{ label: "Recorded agent trace", sub: "15 traces, 49 steps", tone: "muted" }] },
        { title: "Two questions", nodes: [{ label: "System 2 drafts tokens", sub: "baseline, mock speculative, optional OpenAI compatible server", tone: "warn" }, { label: "System 1 grades the step", sub: "TypeSafe Jev, never writes tokens", tone: "accent" }] },
        { title: "Scores", nodes: [{ label: "token_accept", sub: "simulated, not a GPU", tone: "warn" }, { label: "jev_accept", sub: "tool_ok, progress, abort rules", tone: "accent" }] },
        { title: "Compare", nodes: [{ label: "Gold labels", sub: "expected_ok per step: precision, recall, F1", tone: "good" }] },
      ],
      footnote: "Jev has no path back into token generation, so grading cannot change what the draft model writes.",
    },
    chart: {
      title: "F1 against the gold step labels",
      caption: "49 steps from 15 synthetic traces. LIVE Jev run on October 10, 2026.",
      scale: "linear",
      rows: [
        { label: "Token acceptance at 0.5 or higher", value: 0.298, display: "0.298", tone: "warn", note: "7 true positives, 11 false positives" },
        { label: "Step verifier (TypeSafe Jev)", value: 1.0, display: "1.000", tone: "accent", note: "29 true positives, 0 false positives" },
      ],
    },
    how: [
      "Speculative decoding speeds up an agent by drafting tokens and accepting the ones a model agrees with. That says how fast text lands, not whether the step was safe.",
      "spectrace replays multi step tool trajectories and scores both questions side by side: did the draft tokens land, and should this step have been kept.",
      "Fifteen fixture traces cover five successes and ten failure modes, such as a DROP TABLE, a destructive shell command, a tool that does not exist, and ignoring a tool error.",
      "The default path is offline and costs $0. 77 keyless pytest tests and an offline demo run in CI.",
    ],
    details: {
      stack: ["Python 3.10+", "CLI", "pytest", "GitHub Actions", "MIT license", "Gradio live demo on Render", "TypeSafe Jev (step grader)"],
      sections: [
        { title: "Method", bullets: ["Positive class is the gold label expected_ok on each assistant step. The step verifier accepts when tool_ok is at least 0.6, progress is at least 0.5 and abort is below 0.5.", "token_accept comes from a local mock speculative simulator, so latency and acceptance are simulated and the cost per successful task is $0.", "Live grades match the offline mock grader on 49 of 49 accept or reject decisions, while the underlying scores differ."] },
        { title: "Failure taxonomy", body: "The ten failing traces: repeated tool call, unknown tool, invalid arguments, unrecovered tool error, off goal drift, premature final answer, destructive action (shell and SQL), wrong source, and stalled churn." },
        { title: "Side finding", body: "Tool call drafts accepted at 0.327 versus 0.694 for chat prose." },
      ],
      table: {
        title: "Results on 49 steps",
        head: ["Acceptor", "Precision", "Recall", "F1"],
        rows: [["token_accept at 0.5 or higher (simulated)", "0.389", "0.241", "0.298"], ["jev_accept (live)", "1.000", "1.000", "1.000"]],
      },
      caveats: ["The traces are synthetic but realistic, and the set is small. An F1 of 1.000 describes these 49 steps, not agents in general.", "token_accept is simulated and is not a GPU measurement."],
    },
    links: [
      { label: "GitHub", href: "https://github.com/shehbaz0101/spectrace" },
      { label: "Live demo", href: "https://spectrace-f6lk.onrender.com", note: "Free tier, the first load can take a moment" },
    ],
  },
  {
    id: "pinnforge",
    index: "02",
    name: "PINNForge",
    period: "Open source",
    whatItIs: "A sandbox that recovers a hidden property of a fluid, its viscosity, from 32 sparse sensors, and measures when a neural network beats just running the solver.",
    headline: { value: "3.4%", label: "mean error versus 34.9% for a closed form estimator, on 30 hard out of distribution cases" },
    tags: ["PyTorch", "FastAPI", "Pydantic", "Fourier neural operator"],
    video: { src: "/videos/pinnforge-demo.mp4", poster: "/posters/pinnforge.webp", length: "1:50", caption: "The Burgers inverse demo, its plots, and the rate limited API." },
    flow: {
      columns: [
        { title: "Input", nodes: [{ label: "32 sparse sensors", sub: "4 bursts of 5 frames of a Burgers flow", tone: "muted" }] },
        { title: "Estimators", nodes: [{ label: "Closed form least squares", tone: "warn" }, { label: "Weak form identifier", tone: "muted" }, { label: "Fourier neural operator", sub: "data loss or hybrid physics loss", tone: "accent" }, { label: "Solver in the loop", sub: "fits the true solver", tone: "good" }] },
        { title: "Output", nodes: [{ label: "Estimated viscosity", sub: "against the hidden true value", tone: "accent" }] },
        { title: "Score", nodes: [{ label: "Mean relative error", sub: "and failures out of 30", tone: "good" }] },
      ],
      footnote: "Every study stage has a frozen protocol and a committed score file, and a claim checker ties the README numbers to those files.",
    },
    chart: {
      title: "Mean relative error, 30 hard cases",
      caption: "Lower is better, log scale. FNO rows are means over five seeds.",
      scale: "log",
      rows: [
        { label: "Closed form", value: 0.349, display: "0.349", tone: "warn", note: "9 of 30 failed" },
        { label: "Weak form", value: 0.09, display: "0.090", tone: "muted", note: "0 failed" },
        { label: "FNO, data loss", value: 0.049, display: "0.049", tone: "accent", note: "0 failed" },
        { label: "FNO, hybrid physics loss", value: 0.034, display: "0.034", tone: "accent", note: "0 failed" },
        { label: "Solver in the loop", value: 0.0138, display: "0.0138", tone: "good", note: "0 failed, about 19 s per case" },
      ],
    },
    how: [
      "The hidden viscosity of 1D viscous Burgers is recovered from sparse, noisy sensor readings. A dealiased Fourier and ETDRK4 solver is the reference.",
      "A small Fourier neural operator is trained with a data loss or a hybrid physics informed loss, and compared against classical estimators and a solver fit.",
      "It also measures where the operator breaks: noise, fewer sensors and viscosity outside the training range. The sandbox ships a config driven CLI and a rate limited FastAPI service.",
    ],
    details: {
      stack: ["PyTorch (CPU)", "FastAPI", "Pydantic", "Fourier and ETDRK4 Burgers solver", "Frozen protocols and committed score files", "Claim checker: pinnforge claims check"],
      sections: [
        { title: "Where the operator breaks", bullets: ["Noise and sparsity: both FNO arms stay under 10% error through 1% noise, and cross it at 2% noise and at 16 clean sensors. At 5% noise the closed form wins, 0.299 against 0.750 and 0.835.", "Out of distribution: trained only on higher viscosities, the FNO forecast error on low viscosity cases is about 11 times its in range error. The hybrid physics loss does not close the gap.", "On a smooth demo problem the closed form beats the FNO, 0.41% against 4.97% mean relative error."] },
        { title: "Cost", body: "On one CPU, the solver fit takes about 19 s per instance and one FNO inversion about 2 s, excluding training the network." },
        { title: "Reported negatives", body: "Later stages that fail their preregistered bars, a 2D Burgers and Navier Stokes inverse and a shear flow inverse, are published in the repo as failures." },
      ],
      table: {
        title: "hard_ood, 32 sensors, 30 test instances",
        head: ["Estimator", "Mean relative error", "Failures"],
        rows: [["Closed form residual least squares", "0.349", "9"], ["Weak form identifier", "0.090", "0"], ["FNO, data loss", "0.049", "0"], ["FNO, hybrid physics loss", "0.034", "0"], ["Solver in the loop, sensor lift", "0.0138", "0"], ["Solver, oracle initial condition (ceiling)", "0.0025", "0"]],
      },
      caveats: ["The oracle row reads the full initial field, so it is a ceiling and not a sparse sensor method.", "The FNO time was measured with randomly initialized weights of the same architecture."],
    },
    links: [
      { label: "GitHub", href: "https://github.com/shehbaz0101/pinnforge" },
      { label: "Live demo", href: "https://pinnforge.onrender.com", note: "Free tier, the first load can take a moment" },
    ],
  },
  {
    id: "coticula",
    index: "03",
    name: "Coticula",
    period: "Open source, v0.3.2",
    whatItIs: "A report card for AI models that simulate physics. Does the model understand the equation, or only its training data?",
    headline: { value: "0.017 vs 0.234", label: "a shipped FNO heat model barely moves when diffusivity is scaled by 1.5, while the classical solver does" },
    tags: ["PyTorch", "NumPy", "SciPy", "FNO and PINO"],
    video: { src: "/videos/coticula-demo.mp4", poster: "/posters/coticula.webp", length: "1:40", caption: "coticula demo and a grade your own model run, ending on the known limitation." },
    flow: {
      columns: [
        { title: "Model under test", nodes: [{ label: "FNO or PINO checkpoint", tone: "muted" }, { label: "Your own adapter", sub: "implement name and predict", tone: "accent" }] },
        { title: "Four exams", nodes: [{ label: "Predict", sub: "error against the reference", tone: "accent" }, { label: "Conserve", tone: "accent" }, { label: "Counterfactual", sub: "change the coefficient", tone: "accent" }, { label: "Explain", sub: "48 item rule graded exam", tone: "accent" }] },
        { title: "Trust flag", nodes: [{ label: "trusted, ood, untrusted or reference", sub: "fail closed cuts fixed before scoring", tone: "good" }] },
        { title: "Output", nodes: [{ label: "Scorecard", sub: "JSON, Markdown, HTML report", tone: "muted" }] },
      ],
      footnote: "Equations: 1D viscous Burgers and 2D heat. A model with no checkpoint is reported as not trained, never guessed.",
    },
    chart: {
      title: "How far the trajectory moves when the coefficient changes",
      caption: "Counterfactual exam, shipped FNO checkpoints against the classical solver. Larger means more responsive.",
      scale: "linear",
      rows: [
        { label: "Heat, FNO (diffusivity times 1.5)", value: 0.017, display: "0.017", tone: "warn" },
        { label: "Heat, classical solver", value: 0.234, display: "0.234", tone: "good" },
        { label: "Burgers, FNO (viscosity doubled)", value: 0.004, display: "0.004", tone: "warn" },
        { label: "Burgers, classical solver", value: 0.147, display: "0.147", tone: "good" },
      ],
    },
    how: [
      "Low error on a test set does not prove a model learned the physics. Coticula adds three more exams: does it conserve what the equation conserves, does it respond when the coefficient changes, and can its results be explained in words.",
      "FNO beats PINO on L2 error but trails it on PDE residual, and the shipped FNO barely reacts to a 1.5 times diffusivity change.",
      "It fails closed. Outputs get a trust flag, out of distribution inputs are flagged, and the flag is documented as a roughness indicator, not proof that the physics is violated.",
      "Anyone can grade their own model with a short adapter and one CLI command. The release ships a citation file.",
    ],
    details: {
      stack: ["Python 3.11+", "PyTorch (shipped FNO and PINO checkpoints)", "NumPy", "SciPy", "CLI: coticula demo, coticula grade", "CITATION.cff"],
      sections: [
        { title: "Trust cuts", body: "A prediction with relative L2 error above 0.5, or residual relative L2 above 1.0, is untrusted. Leaving the declared training support is flagged as out of distribution only when both cuts pass." },
        { title: "Measured on the demo holdout", bullets: ["Burgers, FNO: relative L2 error 0.157, residual 4.85. PINO: 0.188 and 1.73. Both flagged untrusted with reason residual too high.", "The same residual check is what the paper below shows can mislead, which is why it is described as a roughness indicator."] },
        { title: "Exam 4", body: "A pinned set of 48 items graded by rules. The LLM judge is off unless a real client is wired, and the repo does not invent that score." },
      ],
      table: {
        title: "Counterfactual exam",
        head: ["Case", "Model change", "Classical change"],
        rows: [["Heat, diffusivity times 1.5", "0.017", "0.234"], ["Burgers, viscosity doubled", "0.004", "0.147"]],
      },
      caveats: ["The heat PINO has no checkpoint shipped, to keep the repo small, so it is reported as not trained.", "Trusted does not mean the model understands the PDE.", "The benchmark is small: two equations on coarse grids."],
    },
    links: [{ label: "GitHub", href: "https://github.com/shehbaz0101/coticula" }],
  },
];

export const paper = {
  index: "04",
  id: "paper",
  title: "Small Errors, Large Residuals",
  subtitle: "Calibrating PDE Residual Checks for Neural Surrogates",
  author: "Shehbaz Pathan, Independent",
  status: "Preprint, 21 pages, 5 figures",
  plain:
    "AI models that stand in for physics simulations are often called physically wrong when a residual check, a measure of how badly their output breaks the equation, passes a fixed limit. This paper shows that the check mostly measures how rough the error is and how fine the grid is, not whether the physics is violated. It proposes a calibrated ratio that fixes the reading.",
  abstract:
    "Neural surrogates for partial differential equations (PDEs) are often declared physically inconsistent when a finite difference (strong form) residual of their output exceeds a fixed threshold. We show that such checks conflate how rough the error is, the grid on which the residual is evaluated, and actual violation of the physics. For a linear PDE the strong form residual of a prediction equals the residual of its error, a symbol weighted norm whose gain for uncorrelated error grows like 1/h^2 and 1/dt, while a weak form residual is bounded by the relative L2 error times a roughness independent constant. We propose reporting either residual as a noise calibrated ratio C: the residual divided by the median residual of a smooth error of the same relative L2 on the same grid.",
  findings: [
    { value: "0.875 to 14.4", label: "heat strong form residual when the grid goes from 16 to 48 points per side, while the weak form residual stays between 0.000447 and 0.000596" },
    { value: "0.41 to 0.48", label: "weak form C of three shipped FNO and PINO checkpoints that a fixed strong form cut of 1 flags as untrusted, below the smooth error median" },
    { value: "9 of 30 vs 0", label: "low viscosity instances where a pointwise strong form estimator fails, against a weak form estimator" },
  ],
  chart: {
    title: "Heat equation residual of the same error as the grid is refined",
    caption: "Log scale. From the paper's resolution sweep, 16 to 48 points per side.",
    scale: "log",
    rows: [
      { label: "Strong form, 16 points", value: 0.875, display: "0.875", tone: "warn" },
      { label: "Strong form, 48 points", value: 14.4, display: "14.4", tone: "warn" },
      { label: "Weak form, 16 points", value: 0.000596, display: "0.000596", tone: "good" },
      { label: "Weak form, 48 points", value: 0.000447, display: "0.000447", tone: "good" },
    ],
  } as BarChart,
  chart2: {
    title: "Viscosity inverse, mean relative error",
    caption: "Sparse sensor Burgers inverse, 30 instances. The solver fit is about 10 times slower per instance.",
    scale: "linear",
    rows: [
      { label: "Solver in the loop", value: 0.0138, display: "0.0138", tone: "good" },
      { label: "FNO, hybrid loss", value: 0.0337, display: "0.0337", tone: "accent" },
      { label: "FNO, data loss", value: 0.0495, display: "0.0495", tone: "accent" },
    ],
  } as BarChart,
  caveat: "Small scale by design: two PDEs on coarse grids, CPU trained models, and every number comes from committed score files under frozen protocols. A small weak form residual does not certify a correct solution.",
  pdf: "/docs/small-errors-large-residuals.pdf",
  also: "Also on my resume: The Illusion of Success: Trajectory Level Evaluation for Enterprise Workflow Agents, under review.",
};

export const pera = {
  id: "pera",
  index: "05",
  name: "pera.ai",
  period: "Private repo",
  whatItIs: "A multi agent research terminal for small private credit and specialty finance desks, where every number is cited and labelled as real, synthetic or derived.",
  how: [
    "An orchestrator routes each question to specialist agents for data, risk, portfolio, macro research and news, then synthesizes one answer.",
    "A deterministic critic, not an LLM, reviews grounding, dates, tool reliability and citations before anything is shown.",
    "Figures like cumulative default rate come from typed tools, so the model never invents them. It can import a loan tape, watch covenants, write a weekly brief and re project a stress scenario.",
  ],
  flow: {
    columns: [
      { title: "Ask", nodes: [{ label: "Analyst question", tone: "muted" }] },
      { title: "Route", nodes: [{ label: "Orchestrator", tone: "accent" }] },
      { title: "Specialists", nodes: [{ label: "Data", tone: "accent" }, { label: "Risk", tone: "accent" }, { label: "Portfolio", tone: "accent" }, { label: "Research and macro", tone: "accent" }, { label: "News", tone: "accent" }] },
      { title: "Review", nodes: [{ label: "Critic", sub: "grounding 0.35, dates 0.25, tool reliability 0.25, citations 0.15", tone: "good" }] },
      { title: "Answer", nodes: [{ label: "Cited answer", sub: "labelled real, synthetic, derived or customer", tone: "muted" }] },
    ],
    footnote: "Specialists consulted in the same turn run concurrently, each with a capped tool use loop.",
  } as FlowSpec,
  stack: ["Python", "Flask", "SQLite with SQLAlchemy and Alembic", "Server sent events", "OpenRouter, Anthropic and mock LLM backends", "Docker and Caddy", "pytest, ruff, mypy, bandit, gitleaks, GitHub Actions"],
  metrics: [
    { value: "37 of 37", label: "Critic structural cases pass in mock mode" },
    { value: "0.707", label: "recall at 5 for the production retrieval default, BM25 with a lexical rerank" },
    { value: "178", label: "questions in the frozen gold evaluation set" },
  ],
  honest: "These are mock mode numbers from committed artifacts, not live model scores. The 37 of 37 means the rubric found no critical issue, not that every answer is correct. Much of the credit and macro data is synthetic and is labelled that way. Nothing it produces is investment advice.",
  shots: [
    { src: "/images/pera-research-answer.webp", alt: "pera.ai research console with a cited answer and a run inspector", caption: "Research console: a cited answer, the run inspector and the critic verdict" },
    { src: "/images/pera-observability-waterfall.webp", alt: "pera.ai trace waterfall", caption: "Trace waterfall for a query" },
    { src: "/images/pera-dashboard.webp", alt: "pera.ai dashboard", caption: "Dashboard" },
    { src: "/images/pera-brief.webp", alt: "pera.ai weekly brief", caption: "Weekly brief" },
    { src: "/images/pera-tapes.webp", alt: "pera.ai loan tape importer", caption: "Loan tape importer" },
  ],
  shotNote: "Screenshots are from the built in demo mode on a synthetic tenant.",
};

export const smartbite = {
  id: "smartbite",
  index: "06",
  name: "SmartBite",
  whatItIs: "A risk platform built on NYC health inspection data.",
  result: "87% precision across 5 violation categories at under 200ms latency.",
  stack: ["FastAPI", "XGBoost", "LightGBM"],
};

export const more = {
  title: "More on GitHub",
  items: [
    { name: "wirejournal", text: "Crash proof agent runs: a drop in proxy that resumes a killed agent where it stopped, without re billing finished LLM calls or repeating side effecting tool calls.", href: "https://github.com/shehbaz0101/wirejournal" },
    { name: "claimforge", text: "Verifies scientific claims against OpenAlex, arXiv and Semantic Scholar evidence as support, refute or insufficient, with a rubric judge and offline gold set evals.", href: "https://github.com/shehbaz0101/claimforge" },
    { name: "worldforge", text: "A latent world model that learns Lotka Volterra dynamics, rolls out predictions and plans with CEM, scored by open loop MSE and closed loop regret.", href: "https://github.com/shehbaz0101/worldforge" },
    { name: "caraxes", text: "Physical AI for the 3D IC and package thermal inner loop. The solver stays the judge.", href: "https://github.com/shehbaz0101/caraxes" },
  ],
};

export const skills = [
  { group: "LLMs and agents", items: ["Agentic AI", "LangGraph", "LangChain", "RAG", "Vector search", "Reranking", "LLM evals", "Speculative decoding", "Fine tuning"] },
  { group: "ML and deep learning", items: ["PyTorch", "Hugging Face", "FSDP and DDP", "PINNs", "Neural operators (FNO)", "TensorFlow", "Scikit learn", "XGBoost", "LightGBM"] },
  { group: "Infra and MLOps", items: ["Python", "SQL", "TypeScript", "FastAPI", "Docker", "Kubernetes", "AWS (S3, SageMaker)", "MLflow", "CI/CD with GitHub Actions"] },
  { group: "Data and BI", items: ["PostgreSQL", "ChromaDB", "MongoDB", "Tableau", "Power BI", "DAX", "Statistical modeling", "Time series forecasting", "A/B testing"] },
];

export const education = [
  { degree: "M.S. in Data Analytics and Visualization", school: "Yeshiva University, New York, NY", when: "May 2026", note: "GPA 4.0 of 4.0. Machine Learning, Deep Learning, NLP, Time Series, Data Engineering." },
  { degree: "B.S. in Computer Applications", school: "BAMU University, Pune, India", when: "May 2022", note: "GPA 3.8 of 4.0." },
];

export const contact = {
  title: "Let's talk",
  text: "I am looking for AI engineering roles in New York and San Francisco. The fastest way to reach me is email.",
};

// Interface labels for the portfolio controls.
export const ui = {
  nav: [{ label: "Work", href: "#work" }, { label: "Paper", href: "#paper" }, { label: "Experience", href: "#opentrons" }, { label: "Contact", href: "#contact" }],
  resume: "Resume", download: "Download resume", work: "View work",
  github: "GitHub", linkedin: "LinkedIn", email: "Email",
  skip: "Skip to content", theme: "Dark mode", menu: "Menu",
  backToTop: "Back to top", logScale: "Log scale", technical: "Technical details", caveats: "Honest caveats", whatItIs: "What it is",
  abstract: "Read the abstract", pdf: "Download PDF", skills: "Skills", education: "Education", selectedProjects: "Selected projects", workLabel: "Work",
  previousScreenshot: "Previous screenshot", nextScreenshot: "Next screenshot", tokenAccept: "token_accept",
  earlier: "Earlier roles", experience: "Experience", flow: "How it works", diagram: "Diagram",
};

// Real rows from the spectrace README: gold bad steps that token acceptance (simulated) would have kept.
export const heroCard = {
  title: "Steps a token check would have kept",
  caption: "From spectrace, 15 synthetic traces. Each step is labelled bad in the gold data.",
  rows: [
    { trace: "destructive_sql_01", step: "step 2", mode: "destructive action", tokenAccept: 0.862 },
    { trace: "hallucinated_tool_01", step: "step 1", mode: "unknown tool", tokenAccept: 0.848 },
    { trace: "destructive_shell_01", step: "step 2", mode: "destructive action", tokenAccept: 0.533 },
    { trace: "stall_churn_01", step: "step 0", mode: "stalled", tokenAccept: 1.0 },
  ],
  verdictKept: "token_accept at 0.5 or higher keeps the step",
  verdictRejected: "Step verifier rejects it",
  footer: "Rejected 11 of 11 such steps",
};
