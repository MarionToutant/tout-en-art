export interface BubbleData {
  readonly mediaFile: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly year?: string;
}

export interface Section {
  readonly title: string;
  readonly coverMediaFile?: string;
  readonly bubbles: readonly BubbleData[];
}
