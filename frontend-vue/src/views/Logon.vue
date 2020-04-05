<template>
  <div class="logon-container">
    <section class="form">
      <img :src="logoImg" alt="be the hero" />
      <form @submit.prevent="handleLogin">
        <h1>Faça seu Logon</h1>
        <input type="text" placeholder="Sua ID" v-model="localId" />
        <button class="button" type="submit">Entrar</button>
        <router-link class="back-link" to="/register">
          <Log-in-icon size="16" color="#E02041"></Log-in-icon>Não tenho cadastro
        </router-link>
      </form>
    </section>
    <img :src="heroesImg" alt="Heroes" />
  </div>
</template>

<script>
import heroesImg from "../assets/heroes.png";
import logoImg from "../assets/logo.svg";
import { LogInIcon } from "vue-feather-icons";

import api from "../services/api";

export default {
  components: {
    LogInIcon
  },
  data() {
    return {
      heroesImg,
      logoImg,
      localId: ""
    };
  },
  computed: {
    id: {
      get() {
        return this.localId;
      },
      set(value) {
        this.id = value;
      }
    }
  },
  methods: {
    setId(value) {
      return (this.id = value);
    },
    async handleLogin() {
      const id = this.id;
      try {
        const response = await api
          .post("sessions", { id })
          .catch(err => console.log(err));

        localStorage.setItem("ongId", id);
        localStorage.setItem("ongName", response.data.name);

        this.$router.push("/profile");
      } catch (err) {
        alert("Falha no login");
      }
    }
  }
};
</script>

<style scoped>
.logon-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logon-container section.form {
  width: 100%;
  max-width: 350px;
  margin-right: 30px;
}

.logon-container section.form form {
  margin-top: 100px;
}

.logon-container section.form h1 {
  font-size: 32px;
  margin-bottom: 32px;
}
</style>