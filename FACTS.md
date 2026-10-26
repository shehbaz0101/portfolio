# FACTS (internal, not public)

Every claim used on the site, with its source. Paths are on the box under /workspace.

## Identity and links
- Name: Shehbaz Pathan. New York City, NY. [resume/Shehbaz_Pathan_Resume.pdf header]
- Email: shehbazp001@gmail.com [resume header]. Phone (551) 359-9243 is on the resume but is NOT used on the site.
- LinkedIn linkedin.com/in/shbzpathan, GitHub github.com/shehbaz0101 [resume header, profile_readme/README.md]
- Summary: AI Engineer shipping production LLM agents at Opentrons; builds agentic systems, RAG, LLM evals; M.S. Data Analytics (4.0 GPA); research on agent evaluation [resume SUMMARY]

## Experience
- Opentrons Labworks Inc., AI Engineer, New York NY, Aug 2026 to Present [resume EXPERIENCE]
  - Production LLM assistant (OpenRouter, FastAPI, Docker): plain English lab methods to runnable Opentrons Protocol API code for OT-2 and Flex robots; asks clarifying questions instead of guessing missing details.
  - Guardrails vs hallucinated hardware: LLM grounded in Opentrons official labware and pipette catalog; output constrained to structured JSON plan schema covering 13 liquid handling commands; only simulator verified code released.
  - Agentic generate, simulate, repair loop (up to 3 attempts); deterministic fallback when the LLM is down; regression gated by 82 tests including 5 golden natural language evals run in the simulator.
- Rocket Autoparts, AI Automation Engineer Intern, Remote (Albuquerque NM), Feb 2026 to May 2026: LLM integrated automation in 3 workflows (supply chain, inventory, logistics); cut order error rates 15% across tracked SKUs with ML forecasting and anomaly detection; parsed unstructured emails and order forms into structured records. [resume]
- BTS, Data Analyst Automation Intern, New York NY, Jun 2025 to Aug 2025: Salesforce reporting automation in Python cut manual processing about 40%, report turnaround from 2 days to under 4 hours; CRM pipelines for 5+ client accounts; Power BI dashboards on 15+ KPIs, permanent leadership reporting layer for 3 consulting engagements. [resume]
- Dreamcare Developers Pvt. Ltd., Data Analyst, Pune India, Jun 2022 to Jan 2024: regression and significance tests on 500K+ row datasets for 10+ clients across 3 product cycles; saved about 8 analyst hours per week; Tableau/Power BI dashboards. [resume]
- Education: M.S. Data Analytics and Visualization, Yeshiva University, May 2026, GPA 4.0/4.0; B.S. Computer Applications, BAMU University, Pune, May 2022, GPA 3.8/4.0 [resume]
- Skills lists [resume SKILLS]
- Publication: The Illusion of Success: Trajectory-Level Evaluation for Enterprise Workflow Agents. Under Review, 2025. [resume PUBLICATIONS; profile_readme says under review]

## spectrace [github.com/shehbaz0101/spectrace README, demos/spectrace/README.md, resume]
- Python, CLI, pytest, GitHub Actions, MIT license. Live demo https://spectrace-f6lk.onrender.com (HTTP 200 checked Oct 26 2026; Render free tier spins down when idle).
- 15 synthetic but realistic traces, 49 steps, gold label expected_ok. 10 successful runs of 30 in simulated bakeoff (5 happy traces x 2 methods).
- LIVE TypeSafe Jev graded 2026-10-10: Jev precision 1.000 recall 1.000 F1 1.000 (tp 29 fp 0 tn 20 fn 0); token_accept >= 0.5 precision 0.389 recall 0.241 F1 0.298 (tp 7 fp 11 tn 9 fn 22). 11 gold bad steps had token_accept >= 0.5, Jev rejected 11 of 11. Examples: DROP TABLE, rm -rf /, nonexistent tool.
- token_accept is from mock_speculative simulator, not GPU. Latency simulated. Cost $0 default. 77 keyless pytest tests, offline demo in CI [resume].
- Tool call drafts accept 0.327 vs 0.694 for chat prose [README top].
- Architecture: recorded trace -> System 2 drafts (baseline, mock_speculative, optional OpenAI compatible) -> token_accept; System 1 (TypeSafe Jev) grades step -> jev_accept = tool_ok >= 0.6 and progress >= 0.5 and abort < 0.5; compare vs gold expected_ok with precision/recall/F1. Jev has no path back into token generation.
- 15 trace failure taxonomy: 5 successes (research_qa, code_fix, multihop_retrieval, travel_planner, data_analysis) and 10 failure modes (repeated_tool_call, unknown_tool, invalid_arguments, unrecovered_tool_error, off_goal, premature_final_answer, destructive_action x2, wrong_source, stalled).
- Caveat stated by him: F1 of 1.000 is this 49 step set, not a claim about agents in general. Same decisions as offline MockJev on 49/49 steps.
- Video: demos/spectrace/spectrace-demo.mp4 1280x720 about 115 s, recorded Oct 10 2026. Poster demos/spectrace/poster.png.

## PINNForge [github.com/shehbaz0101/pinnforge README, resume, demos/src/pinnforge]
- PyTorch, FastAPI, Pydantic. CPU research sandbox. Dealiased Fourier/ETDRK4 Burgers reference, small 1D FNO trained with data loss or hybrid physics loss, frozen protocol and committed score file per study stage, claim checker `pinnforge claims check`. Latest tag v0.3.0 (resume says v0.2.2, stale). Live demo https://pinnforge.onrender.com (homepage in repo metadata; request timed out from the box once, likely a Render cold start).
- Results on hard_ood, sensors32_bursts, 30 instances, mean relative error / failures: closed form 0.349 / 9; weak form 0.090 / 0; FNO data loss 0.049 / 0; FNO hybrid (weight 1e-2) 0.034 / 0; solver in loop sensor lift IC 0.0138 / 0; solver oracle IC 0.0025 / 0 (ceiling, reads full field). FNO rows are means over five seeds.
- Wall clock per instance: about 19 s sensor lift solver fit, about 2 s FNO inversion (untrained weights timing).
- Where it breaks: Stage E noise: both FNO arms under 10% through 1% noise, cross 10% at 2% noise and at 16 clean sensors; at 5% noise closed form wins (0.299 vs 0.750 / 0.835). Stage F: OOD forecast error about 11x in range (12x hybrid). On the smooth demo the closed form beats FNO (0.41% vs 4.97%).
- Smooth demo: 16 train 4 val 4 test trajectories, width 24 FNO, 8 modes, 2 layers, 21172 params, 40 Adam epochs.
- Rate limited FastAPI service `pinnforge serve`, POST /demo/burgers-inverse. Also stages A to G, v0.3 warm start, v0.4 and v0.6 fail preregistered bars (reported honestly).
- Profile README: 3.4% vs 34.9%.
- Video: demos/pinnforge/pinnforge_demo.mp4 1280x720 about 110 s.

## Coticula [github.com/shehbaz0101/coticula README, demos/src/coticula/README.md, resume]
- PyTorch, NumPy, SciPy. Touchstone bench for PDE surrogates on 1D viscous Burgers and 2D heat. Four exams: Predict, Conserve, Counterfactual, Explain (resume). v0.3.2. Exam 4 is 48 pinned items, rule graded. grade your own model CLI via adapter; CITATION.cff.
- Counterfactual: FNO heat scaled diffusivity x1.5: model trajectory change 0.017 vs classical 0.234. FNO Burgers viscosity doubled: model change 0.004 vs classical 0.147.
- Trust flags trusted/ood/untrusted/reference, fail closed cuts: Predict rel-L2 > 0.5 or residual rel-L2 > 1.0 is untrusted. FNO Burgers Predict rel-L2 0.157, residual rel-L2 4.85; PINO Burgers 0.188 and 1.73. Residual flag is a roughness indicator, not proof of violated physics (stated by him). PINO heat2d not_trained (no checkpoint shipped).
- Resume: FNO beats PINO on L2 error but trails on PDE residual.
- Video: demos/coticula/coticula_demo.mp4 about 100 s.

## Paper [paper/main.tex, arxiv_metadata.txt, README.md]
- Title: Small Errors, Large Residuals: Calibrating PDE-Residual Checks for Neural Surrogates. Author Shehbaz Pathan, Independent. 21 pages, 5 figures, NeurIPS 2025 style preprint template. Primary cs.LG, cross list physics.comp-ph (metadata prepared; no evidence it is posted on arXiv, so the site says preprint and does not claim arXiv).
- Abstract and numbers: strong form residual of white error grows like 1/h^2 and 1/dt; weak form bounded by relative L2 error; noise calibrated ratio C; white error at matched relL2 strong form C 1.07 to 2.87 (Burgers) and 1.83 to 4.17 (heat); heat grid 16 to 48 per side raises strong residual 0.875 to 14.4 while weak stays 4.47e-4 to 5.96e-4; three shipped FNO/PINO checkpoints flagged by fixed strong cut of 1 have weak C 0.41 to 0.48; 5 seed study of three architectures; inverse: pointwise strong estimator fails 9 of 30, weak form 0; solver in loop mean rel error 0.0138 vs 0.0337 and 0.0495 FNO conditioned, about 10x wall clock; all numbers from committed score files on CPU under frozen protocols.
- Limitations: small scale, two PDEs on coarse grids, null is a choice, weak residual is not a certificate.

## pera.ai [gh repo shehbaz0101/pera-ai (PRIVATE), pera_ai_roadmap.md, codex-work/pera-ai/docs/screenshots]
- Private repo, so no repo link on the site. Multi agent financial intelligence terminal for small and mid private credit and specialty finance desks. Orchestrator routes to 5 specialists (Data, Risk, Portfolio, Research/macro, News); deterministic rule based Critic (grounding 0.35, temporal 0.25, tool reliability 0.25, citation 0.15). Typed tools compute vintage, CDR, concentration (LLM never invents a CDR). Every tool result labelled real, synthetic, derived or customer. Not investment advice; much data synthetic.
- Flask, SQLite (SQLAlchemy, Alembic), SSE streaming, argon2id login with roles, CSRF, org scoped rows; LLM backends openrouter, anthropic, mock; Docker, Caddy; pytest about 98% line+branch coverage, ruff, mypy, bandit, pip-audit, gitleaks, GitHub Actions.
- Honest metrics (mock mode, not live model scores): Critic structural suite 37/37; gold_v1 178 questions; retrieval BM25 recall@5 0.6954 (1,708 chunks); production default BM25 + lexical rerank recall@5 0.707. Stated by him: 37/37 is rubric pass, not correctness.
- Screenshots are of demo mode on a SYNTHETIC tenant.

## SmartBite [resume only; no repo found in gh repo list]
- FastAPI, XGBoost, LightGBM. 87% precision across 5 violation categories at sub 200ms latency in a NYC health inspection risk platform.

## Other public repos (descriptions from gh repo list)
- wirejournal: crash proof agent runs, drop in proxy resuming a killed agent without rebilling finished LLM calls or repeating side effecting tool calls.
- claimforge: verifies scientific claims against OpenAlex, arXiv and Semantic Scholar evidence, support/refute/insufficient, rubric judge, offline gold set evals.
- worldforge: latent world model learning Lotka-Volterra dynamics, rolls out and plans with CEM, scored by open loop MSE and closed loop regret.
- caraxes: Physical AI: 3D-IC / package thermal inner loop. Solver stays the judge.
- syrax is PRIVATE (not shown).

## Gaps
- No headshot. No arXiv ID. SmartBite has no repo, demo, or README. Opentrons assistant is internal, no public demo. Resume lists PINNForge v0.2.2 but repo is v0.3.0.
