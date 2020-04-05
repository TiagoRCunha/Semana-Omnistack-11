<template>
  <div class="profile-container">
    <header>
      <img :src="logoImg" alt="Be the Hero" />
      <span>Bem vinda, {{ongName}}</span>
      <router-link class="button" to="/incidents/new">Cadastrar novo caso</router-link>
      <button type="button" @click="handleLogout">
        <power-icon size="18" color="#E02041"></power-icon>
      </button>
    </header>

    <h1>Caso cadastrados</h1>

    <ul>
      <li v-for="incident in incidents" :key="incident.id">
        <strong>Caso:</strong>
        <p>{{incident.title}}</p>
        <strong>Descrição:</strong>
        <p>{{incident.description}}</p>
        <strong>Valor</strong>
        <p>{{ incident.value | numberFormat }}</p>
        <button type="button" @click="handleDeleteIncident(incident.id)">
          <trash-2-icon size="20" color="#a8a8b3"></trash-2-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import logoImg from "../assets/logo.svg";
import { PowerIcon, Trash2Icon } from "vue-feather-icons";

import api from "../services/api";

const ongId = localStorage.getItem("ongId");

export default {
  components: {
    PowerIcon,
    Trash2Icon
  },
  data() {
    return {
      logoImg,
      ongName: "",
      localIncidents: []
    };
  },
  filters: {
    numberFormat(value) {
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
  },
  mounted() {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(({ data }) => {
        this.incidents = data;
      });
  },
  computed: {
    incidents: {
      get() {
        return this.localIncidents;
      },
      set(value) {
        this.localIncidents = value;
      }
    }
  },
  methods: {
    async handleDeleteIncident(id) {
      try {
        await api.delete(`incidents/${id}`, {
          headers: {
            Authorization: ongId
          }
        });
        this.incidents = this.incidents.filter(incident => incident.id !== id);
      } catch (err) {
        alert("Erro ao deletar caso, tente novamente");
      }
    },
    handleLogout() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.profile-container {
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
}

.profile-container header {
  display: flex;
  align-items: center;
}

.profile-container header span {
  font-size: 20px;
  margin-left: 24px;
}

.profile-container header img {
  height: 64px;
}

.profile-container header a {
  width: 260px;
  margin-left: auto;
  margin-top: 0;
}

.profile-container header button {
  height: 60px;
  width: 60px;
  border-radius: 4px;
  border: 1px solid #dcdce6;
  background: transparent;
  margin-left: 16px;
  transition: border-color 0.2s;
}

.profile-container header button:hover {
  border-color: #999;
}

.profile-container h1 {
  margin-top: 80px;
  margin-bottom: 24px;
}

.profile-container ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;
}

.profile-container ul li {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
}

.profile-container ul li button {
  position: absolute;
  right: 24px;
  top: 24px;
  border: 0;
}

.profile-container ul li button:hover {
  opacity: 0.8;
}

.profile-container ul li strong {
  display: block;
  margin-bottom: 16px;
  color: #41414d;
}

.profile-container ul li p + strong {
  margin-top: 32px;
}

.profile-container ul li p {
  color: #737380;
  line-height: 21px;
  font-size: 16px;
}
</style>