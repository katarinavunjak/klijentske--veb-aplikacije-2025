import { Injectable } from '@angular/core';
import { ProjectionModel } from '../models/projection.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private projections: ProjectionModel[] = [
    { id: 1, movieId: 1, dateTime: '2025-09-20T18:00', price: 500 },
    { id: 2, movieId: 1, dateTime: '2025-09-20T21:00', price: 600 },
    { id: 3, movieId: 2, dateTime: '2025-09-18T20:00', price: 550 },
    { id: 4, movieId: 3, dateTime: '2025-09-19T19:00', price: 500 },
    { id: 5, movieId: 4, dateTime: '2025-09-22T17:00', price: 450 },
    { id: 6, movieId: 5, dateTime: '2025-09-23T18:30', price: 600 },
    { id: 7, movieId: 6, dateTime: '2025-09-24T16:00', price: 480 },
    { id: 8, movieId: 7, dateTime: '2025-09-20T20:00', price: 500 },
    { id: 9, movieId: 8, dateTime: '2025-09-21T19:30', price: 520 },
    { id: 10, movieId: 9, dateTime: '2025-09-25T21:00', price: 550 },
    { id: 11, movieId: 10, dateTime: '2025-09-26T18:00', price: 600 },
    { id: 12, movieId: 1,  dateTime: '2025-09-22T20:30', price: 650 },
    { id: 13, movieId: 1,  dateTime: '2025-09-28T17:00', price: 520 },

    { id: 14, movieId: 2,  dateTime: '2025-09-19T18:30', price: 560 },
    { id: 15, movieId: 2,  dateTime: '2025-09-23T21:00', price: 600 },
    { id: 16, movieId: 2,  dateTime: '2025-09-30T20:15', price: 620 },

    { id: 17, movieId: 3,  dateTime: '2025-09-20T16:30', price: 480 },
    { id: 18, movieId: 3,  dateTime: '2025-09-24T19:45', price: 520 },
    { id: 19, movieId: 3,  dateTime: '2025-09-29T21:00', price: 540 },

    { id: 20, movieId: 4,  dateTime: '2025-09-23T18:00', price: 460 },
    { id: 21, movieId: 4,  dateTime: '2025-09-27T20:30', price: 500 },
    { id: 22, movieId: 4,  dateTime: '2025-10-02T17:15', price: 480 },

    { id: 23, movieId: 5,  dateTime: '2025-09-25T16:45', price: 570 },
    { id: 24, movieId: 5,  dateTime: '2025-09-27T19:00', price: 610 },
    { id: 25, movieId: 5,  dateTime: '2025-10-01T18:20', price: 590 },

    { id: 26, movieId: 6,  dateTime: '2025-09-26T19:45', price: 490 },
    { id: 27, movieId: 6,  dateTime: '2025-09-30T17:30', price: 470 },
    { id: 28, movieId: 6,  dateTime: '2025-10-03T20:10', price: 520 },
    { id: 29, movieId: 7,  dateTime: '2025-09-22T16:10', price: 500 },
    { id: 30, movieId: 7,  dateTime: '2025-09-26T21:00', price: 540 },
    { id: 31, movieId: 7,  dateTime: '2025-10-04T18:30', price: 520 },

    { id: 32, movieId: 8,  dateTime: '2025-09-23T20:00', price: 530 },
    { id: 33, movieId: 8,  dateTime: '2025-09-28T21:30', price: 560 },
    { id: 34, movieId: 8,  dateTime: '2025-10-05T17:40', price: 510 },

    { id: 35, movieId: 9,  dateTime: '2025-09-27T18:40', price: 560 },
    { id: 36, movieId: 9,  dateTime: '2025-10-01T20:10', price: 580 },
    { id: 37, movieId: 9,  dateTime: '2025-10-04T16:30', price: 520 },

    { id: 38, movieId: 10, dateTime: '2025-09-27T19:00', price: 600 },
    { id: 39, movieId: 10, dateTime: '2025-10-02T18:30', price: 620 },
    { id: 40, movieId: 10, dateTime: '2025-10-05T20:45', price: 640 }
  ];

  
  getAllProjections(): ProjectionModel[] {
    return this.projections;
  }

  
  getProjectionsByMovie(movieId: number): ProjectionModel[] {
    return this.projections.filter(p => p.movieId === movieId);
  }

  
  getProjectionById(id: number): ProjectionModel | undefined {
    return this.projections.find(p => p.id === id);
  }

 
  searchProjections(criteria: { minPrice?: number; maxPrice?: number; date?: string }): ProjectionModel[] {
    return this.projections.filter(p => {
      let ok = true;

      if (criteria.minPrice !== undefined) {
        ok = ok && p.price >= criteria.minPrice;
      }
      if (criteria.maxPrice !== undefined) {
        ok = ok && p.price <= criteria.maxPrice;
      }
      if (criteria.date) {
        ok = ok && p.dateTime.startsWith(criteria.date); 
      }

      return ok;
    });
  }
}



