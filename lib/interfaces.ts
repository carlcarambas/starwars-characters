interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string; // You could use Date if you parse the string into a Date object
  edited: string;  // Same as above
  url: string;
  imgUrl?: any;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

interface PaginationProps {
  count: number;
  nextUrl: string | null;
  previousUrl: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: () => null
}

interface IFilter {
  homeworld: string;
  gender: string;
}


interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface IFilterOption {
  value: string,
  label: string
}