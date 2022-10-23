export interface GameScore {
  score: number;
  text: string;
  textFormat: {
    position: { x: number; y: number };
    style: {
      fontSize: string;
      fill: string;
    };
  };
}
