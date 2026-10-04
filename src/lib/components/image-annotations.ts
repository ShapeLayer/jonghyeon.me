/** Coordinates are percentages (0–100) of the entire image, independent of display size. */
export interface ImageAnnotation {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	/** Localized text shown in the tooltip and exposed as the region’s accessible name. */
	text: string;
	/** Localized description shown on hover, keyboard focus, or tap. Defaults to text. */
	tooltip?: string;
}
