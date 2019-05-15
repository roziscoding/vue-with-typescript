import axios, { AxiosInstance } from 'axios'

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface ListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

export class FilmeService {
  private readonly http: AxiosInstance

  constructor ({ url }: { url: string }) {
    this.http = axios.create({
      baseURL: url,
      params: { format: 'json' }
    })
  }

  async list (page: number = 1) {
    return this.http.get<ListResponse>('/films', { params: { page } })
      .then(({ data }) => data)
  }

  async getOne (id: number) {
    return this.http.get<Film>(`/films/${id}`)
      .then(({ data }) => data)
  }
}
