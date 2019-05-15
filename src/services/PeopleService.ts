import axios, { AxiosInstance } from 'axios'

export interface Person {
  id: number,
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
  created: Date;
  edited: Date;
  url: string;
}

export interface ListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export class PeopleService {
  private readonly http: AxiosInstance

  constructor ({ url }: { url: string }) {
    this.http = axios.create({
      baseURL: url,
      params: { format: 'json' }
    })
  }

  async list (page: number = 1) {
    return this.http.get<ListResponse>('/people', { params: { page } })
      .then(({ data }) => data)
  }

  async getOne (id: number) {
    return this.http.get<Person>(`/people/${id}`)
      .then(({ data }) => data)
  }
}
