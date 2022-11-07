export interface Airport {
  id?: string;
  name: string;
  country?: Country;
  location: google.maps.LatLngLiteral | google.maps.LatLng;
  airlines?: Airline[];
}

export interface Airline {
  id?: string;
  name: string;
  country?: Country;
  airports?: Airport[];
}

export interface Country {
  id?: string;
  name: string;
  code: string;
}
