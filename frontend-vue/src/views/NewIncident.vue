<template>
  <div class="incidents-container">
    <div class="content">
      <section>
        <img :src="logoImg" alt="be the hero" />
        <h1>Cadastrar novo caso</h1>
        <p>
          Descreva o caso detalhadamente para encontrar um herói para resolver
          isso
        </p>
        <router-link class="back-link" to="/profile">
          <arrow-left-icon size="16" color="#E02041"></arrow-left-icon>Voltar para home
        </router-link>
      </section>
      <form @submit.prevent="handleNewIncident">
        <input type="text" placeholder="Título do caso" v-model="localIncident.title" />
        <textarea placeholder="Descrição" v-model="localIncident.description" />

        <input placeholder="Valor em reais" v-model="localIncident.value" />

        <button type="submit" class="button">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import logoImg from "../assets/logo.svg";
import { ArrowLeftIcon } from "vue-feather-icons";

import api from "../services/api";

export default {
  components: {
    ArrowLeftIcon
  },
  data() {
    return {
      logoImg,
      localIncident: {
        title: "",
        description: "",
        value: ""
      }
    };
  },
  computed: {
    incident: {
      get() {
        return this.localIncident;
      },
      set(value) {
        this.incident = Object.assign({}, this.incident, value);
      }
    }
  },
  methods: {
    async handleNewIncident() {
      const ongId = localStorage.getItem("ongId");
      const data = {
        title: this.incident.title,
        description: this.incident.description,
        value: this.incident.value
      };

      try {
        await api.post("incidents", data, {
          headers: {
            Authorization: ongId
          }
        });
        this.$router.push("/profile");
      } catch (err) {
        alert("Erro ao cadastrar caso");
      }
    }
  }
};
</script>

<style scoped>
.incidents-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
}

.incidents-container .content {
  width: 100%;
  padding: 96px;

  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.incidents-container .content section {
  width: 100%;
  max-width: 380px;
}

.incidents-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.incidents-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.incidents-container .content form {
  width: 100%;
  max-width: 450px;
}

.incidents-container .content form input,
.incidents-container .content form textarea {
  margin-top: 8px;
}
</style>