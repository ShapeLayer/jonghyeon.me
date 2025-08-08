<script lang="ts">
	import { onMount } from 'svelte';

  interface Props {
    renderSize: {
      width: number;
      height: number;
    };
    screenSize?: {
      width: number;
      height: number;
    };
    padding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    scores: {
      sigma: number;
      mean: number;
      myScore: number;
      top30?: number;
      top10?: number;
      targetPeakHeightPercentage: number;
    };
    graphRange: {
      xMin: number;
      xMax: number;
      yMin: number;
      yMax: number;
    };
  }
  let {
    renderSize = { width: 1000, height: 600 },
    screenSize = { width: 500, height: 300 },
    padding,
    scores,
    graphRange = {
      xMin: 0,
      xMax: 1000,
      yMin: 0,
      yMax: 0.40
    },
  }: Props = $props();

  let renderMultiplier = (
    (renderSize.width / (screenSize?.width || renderSize.width)) +
    (renderSize.height / (screenSize?.height || renderSize.height))
  ) / 2;

  let canvas: HTMLCanvasElement | null = $state(null);

  const drawCanvas = () => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get actual canvas size
    // (even it set by props!)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const graphWidth = canvasWidth - (padding?.left || 0) - (padding?.right || 0);
    const graphHeight = canvasHeight - (padding?.top || 0) - (padding?.bottom || 0);

    const normalPDF = (x: number, mu: number, sigma: number): number => {
      const exponent = -((x - mu) ** 2) / (2 * sigma ** 2);
      return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    };

    const maxPDF = normalPDF(scores.mean, scores.mean, scores.sigma);

    const targetPeakYValue = scores.targetPeakHeightPercentage * graphRange.yMax;
    const yAxisScaleFactor = targetPeakYValue / maxPDF;


    const getXCanvas = (xData: number) => {
      return (padding?.left || 0) + (xData - graphRange.xMin) / (graphRange.xMax - graphRange.xMin) * graphWidth;
    };
    const getYCanvas = (yData: number) => {
      return (padding?.top || 0) + graphHeight - (yData - graphRange.yMin) / (graphRange.yMax - graphRange.yMin) * graphHeight;
    };

    // Draw
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5 * renderMultiplier;

    // Axes: X-axis
    ctx.beginPath();
    ctx.moveTo((padding?.left || 0), getYCanvas(graphRange.yMin));
    ctx.lineTo((padding?.left || 0) + graphWidth, getYCanvas(graphRange.yMin));
    ctx.stroke();

    // Axes: Y-axis
    ctx.beginPath();
    ctx.moveTo((padding?.left || 0), getYCanvas(graphRange.yMin));
    ctx.lineTo((padding?.left || 0), getYCanvas(graphRange.yMax));
    ctx.stroke();

    // X-axis labels and ticks
    ctx.font = `${14 * renderMultiplier}px Arial`;
    ctx.fillStyle = '#555'; // Grey for labels
    const xTickInterval = 200;
    for (let i = graphRange.xMin; i <= graphRange.xMax; i += xTickInterval) {
      const x = getXCanvas(i);
      ctx.fillText(i.toString(), x - ctx.measureText(i.toString()).width / 2, getYCanvas(graphRange.yMin) + 20);
      // Tick mark
      ctx.beginPath();
      ctx.moveTo(x, getYCanvas(graphRange.yMin));
      ctx.lineTo(x, getYCanvas(graphRange.yMin) - 5);
      ctx.stroke();
    }

    // Y-axis labels and ticks
    ctx.fillStyle = '#555'; // Grey for labels
    const dynamicYMax = Math.max(targetPeakYValue * 1.2, 0.05);
    const yTickInterval = dynamicYMax / 10; // 10 ticks across the range
    for (let i = graphRange.yMin; i <= dynamicYMax; i += yTickInterval) {
      const y = getYCanvas(i * (graphRange.yMax / dynamicYMax)); // Scale to original range
      const label = (i * 100).toFixed(1) + '%';
      ctx.fillText(label, (padding?.left || 0) - ctx.measureText(label).width - 10, y + 5);
      // Tick mark
      ctx.beginPath();
      ctx.moveTo((padding?.left || 0), y);
      ctx.lineTo((padding?.left || 0) + 5, y);
      ctx.stroke();
    }

    // Normal distribution curve
    ctx.beginPath();
    ctx.strokeStyle = '#3498db'; // Blue color for the curve
    ctx.lineWidth = 2 * renderMultiplier;
    let firstPoint = true;

    for (let x = graphRange.xMin; x <= graphRange.xMax; x += 1) { // Increment by 1 for a smoother curve
      const pdfValue = normalPDF(x, scores.mean, scores.sigma);
      const scaledPDFValue = pdfValue * yAxisScaleFactor; // Scale PDF output to graph's Y-range

      // Ensure the scaled value does not exceed yMax (40%)
      const yData = Math.min(scaledPDFValue, graphRange.yMax);

      const canvasX = getXCanvas(x);
      const canvasY = getYCanvas(yData);

      if (firstPoint) {
        ctx.moveTo(canvasX, canvasY);
        firstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    // Draw vertical lines for scores
    ctx.font = `${16 * renderMultiplier}px Arial`;
    ctx.textAlign = 'center';

    const lineTopYCanvas = getYCanvas(graphRange.yMax * 0.4);

    const drawScoreLine = (score: number, color: string, labelText: string, yOffset = 10) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * renderMultiplier;
      ctx.beginPath();
      const scoreX = getXCanvas(score);
      ctx.moveTo(scoreX, getYCanvas(graphRange.yMin)); // Start from X-axis
      ctx.lineTo(scoreX, lineTopYCanvas); // Extend to fixed height
      ctx.stroke();
      ctx.fillStyle = color; // Text color for label
      ctx.fillText(labelText, scoreX, lineTopYCanvas - yOffset); // Label placed above line top
    };

    drawScoreLine(scores.myScore, '#e74c3c', scores.myScore.toString());
    drawScoreLine(scores.mean, '#3498db', scores.mean.toString());
    if (scores.top30) {
      drawScoreLine(scores.top30, '#95a5a6', scores.top30.toString(), 30); // Offset to avoid overlap
    }
    if (scores.top10) {
      drawScoreLine(scores.top10, '#95a5a6', scores.top10.toString(), 50); // Offset to avoid overlap
    }
  }

  const init = () => {
    drawCanvas();
    if (canvas) {
      canvas.style.width = `${screenSize.width}px`;
      canvas.style.height = `${screenSize.height}px`;
    }
  }

  onMount(init);
</script>

<div>
  <canvas id="topcitGraph" bind:this={canvas} width={renderSize.width} height={renderSize.height}></canvas>
</div>
