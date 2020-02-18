export interface Household {
  id: string;
  name: string;
  description: string;
  location: {
    type: 'Point',
    coordinates: [number, number]
  };
  roleMappings: { [username: string]: string };
}
