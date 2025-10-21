export interface SpaceCardType {
  flight_number: number;
  links: {
    mission_patch_small: string | null;
  };
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
}
