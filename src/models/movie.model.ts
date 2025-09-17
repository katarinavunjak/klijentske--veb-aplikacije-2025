import { ReviewModel } from "./review.model";

export interface MovieModel {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: number; 
  director: string;
  actors: string[];
  releaseDate: string; 
  posterUrl: string;
  reviews?: ReviewModel[]; 
  trailerUrl?: string;
}

