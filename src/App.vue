<template>
  <div id="app">
    <h1>Star Wars API</h1>
    <h3>Click on someone to see their details</h3>
    <div v-if="isLoading" class="loading">
      Loading data...
    </div>
    <div class="box" v-if="!isLoading">
      <div>
        <ul>
          <li v-for="person in people" :key="person.name" class="pointer" @click="selectPerson(person.name)">
            {{ person.name }}
          </li>
        </ul>
      </div>
      <div v-if="currentPerson">
        Name: {{ currentPerson.name }}<br>
        Height: {{ currentPerson.height }}<br>
        Mass: {{ currentPerson.mass }}<br>
        Hair color: {{ currentPerson.hair_color | firstUpper }}<br>
        Skin color: {{ currentPerson.skin_color | firstUpper }}<br>
        Eye color: {{ currentPerson.eye_color | firstUpper }}<br>
        Birth year: {{ currentPerson.birth_year }}<br>
        Gender: {{ currentPerson.gender | firstUpper }}<br>
        <a :href="currentPerson.homeworld" target="_blank">Home world</a><br>
        <a :href="currentPerson.url" target="_blank">API URL</a><br>
      </div>
    </div>
    <h3>Page: {{ page }}</h3>
    <div class="box">
      <div>
        <button v-if="hasPrevious" @click="page--">Previous page</button>
      </div>
      <div>
        <button v-if="hasNext" @click="page++">Next page</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Person } from './services/PeopleService'

export default Vue.extend({
  name: 'app',
  data () {
    return {
      people: [] as Person[],
      hasNext: false,
      hasPrevious: false,
      page: 1,
      currentPerson: null as Person | null,
      isLoading: false
    }
  },
  methods: {
    selectPerson (name: string) {
      const selectedPerson = this.people.find(person => person.name === name)
      this.currentPerson = selectedPerson || null
    },
    async loadPeople () {
      this.isLoading = true
      const peopleList = await this.$services.people.list(this.page)
      this.hasNext = !!peopleList.next
      this.hasPrevious = !!peopleList.previous
      this.people = peopleList.results
      this.isLoading = false
    }
  },
  filters: {
    firstUpper: (value: string) => {
      const [first, ...rest] = value.split('')
      return [first.toUpperCase(), ...rest].join('')
    }
  },
  mounted () {
    this.loadPeople()
  },
  watch: {
    page () {
      this.currentPerson = null
      this.loadPeople()
    }
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 100%;
}

.pointer {
  cursor: pointer;
}

.box {
  display: flex;
  justify-content: center;
}

.box > * {
  padding: 20px;
  min-width: 200px;
}

ul {
  list-style: none;
}

.loading {
  min-height: 300px;
}
</style>
