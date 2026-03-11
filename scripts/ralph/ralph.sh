#!/bin/bash
# Ralph Wiggum - Autonomous agent loop for Prism Portal & CRM buildout
# Spawns fresh Claude Code instances to work through the PRD one story at a time.
#
# Usage: ./scripts/ralph/ralph.sh [max_iterations]
# Example: ./scripts/ralph/ralph.sh 10

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PRD_FILE="$SCRIPT_DIR/prd.json"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"

MAX_ITERATIONS=${1:-10}

# Require prd.json
if [ ! -f "$PRD_FILE" ]; then
  echo "Error: No prd.json found at $PRD_FILE"
  exit 1
fi

# Require jq
if ! command -v jq &> /dev/null; then
  echo "Error: jq is required. Install with: brew install jq"
  exit 1
fi

# Initialize progress file
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "# Ralph Progress Log — Prism Portal & CRM" > "$PROGRESS_FILE"
  echo "Started: $(date)" >> "$PROGRESS_FILE"
  echo "" >> "$PROGRESS_FILE"
  echo "## Codebase Patterns" >> "$PROGRESS_FILE"
  echo "- Portal uses Astro 5.7 + React 19 + Recharts + Tailwind CSS" >> "$PROGRESS_FILE"
  echo "- Colors: navy (#1e3a5f), gold (#c5a55a), slate, emerald" >> "$PROGRESS_FILE"
  echo "- Components pattern: rounded-xl, border border-slate-200, shadow-sm" >> "$PROGRESS_FILE"
  echo "- Currency: GBP, locale: en-GB" >> "$PROGRESS_FILE"
  echo "- Build command: npm run build (from portal root)" >> "$PROGRESS_FILE"
  echo "- Notion CRM demo page: 31fe88f47951815483d5f796e9abfac2" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
fi

# Show state
TOTAL=$(jq '.userStories | length' "$PRD_FILE")
DONE=$(jq '[.userStories[] | select(.passes == true)] | length' "$PRD_FILE")

echo ""
echo "=== Ralph Wiggum — Prism Portal & CRM ==="
echo "PRD: $(jq -r '.description' "$PRD_FILE")"
echo "Progress: $DONE/$TOTAL stories complete"
echo "Max iterations: $MAX_ITERATIONS"
echo "=========================================="
echo ""

for i in $(seq 1 $MAX_ITERATIONS); do
  DONE=$(jq '[.userStories[] | select(.passes == true)] | length' "$PRD_FILE")
  REMAINING=$((TOTAL - DONE))

  if [ "$REMAINING" -eq 0 ]; then
    echo "All stories complete!"
    exit 0
  fi

  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS ($DONE/$TOTAL done, $REMAINING remaining)"
  echo "==============================================================="

  PROMPT=$(cat "$SCRIPT_DIR/CLAUDE.md")

  OUTPUT=$(cd "$PROJECT_ROOT" && echo "$PROMPT" | claude --dangerously-skip-permissions --print 2>&1 | tee /dev/stderr) || true

  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "=== Ralph completed all tasks! ==="
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    exit 0
  fi

  echo "Iteration $i complete. Continuing..."
  sleep 2
done

echo ""
echo "Ralph reached max iterations ($MAX_ITERATIONS)."
echo "Check $PROGRESS_FILE for status."
exit 1
