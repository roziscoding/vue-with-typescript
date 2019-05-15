import Vue from 'vue'
import { FilmeService } from './FilmService'
import { PeopleService } from './PeopleService'

export interface Services {
  people: PeopleService
  films: FilmeService
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: Services
  }
}

export interface IServicesConfig {
  starWars: { url: string }
}

export const factory = (config: IServicesConfig) => function ServicesFactory (vue: typeof Vue) {
  const services: Services = {
    people: new PeopleService(config.starWars),
    films: new FilmeService(config.starWars)
  }

  Object.defineProperty(vue.prototype, '$services', { get () { return services } })
}

export default { factory }
