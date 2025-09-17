export interface CartItemModel {
  id: number;                 
  projectionId: number;       
  count: number;              
  status: 'rezervisano' | 'gledano' | 'otkazano';
  rating: null | number;      
}

