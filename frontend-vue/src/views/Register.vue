<template>
  <div class="register-container">
    <div class="content">
      <section>
        <img :src="logoImg" alt="be the hero" />
        <h1>Cadastro</h1>
        <p>
          Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
          os casos da sua ONG.
        </p>
        <router-link class="back-link" to="/">
          <arrow-left-icon size="16" color="#E02041"></arrow-left-icon>Já tenho cadastro
        </router-link>
      </section>
      <form @submit.prevent="handleRegister">
        <input type="text" placeholder="Nome da ONG" v-model="localOng.name" />
        <input type="email" placeholder="E-mail" v-model="localOng.email" />

        <input placeholder="Whatsapp" v-model="localOng.whatsapp" />

        <div class="input-group">
          <input type="text" placeholder="Cidade" v-model="localOng.city" />
          <input type="text" placeholder="UF" style="width: 80px" v-model="localOng.uf" />
        </div>

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
      localOng: {
        name: "",
        email: "",
        whatsapp: "",
        city: "",
        uf: ""
      }
    };
  },
  computed: {
    ong: {
      get() {
        return this.localOng;
      },
      set(value) {
        this.ong = Object.assign({}, this.ong, value);
      }
    }
  },
  methods: {
    async handleRegister() {
      const data = {
        name: this.ong.name,
        email: this.ong.email,
        whatsapp: this.ong.whatsapp,
        city: this.ong.city,
        uf: this.ong.uf
      };
      try {
        const response = await api.post("ongs", data);
        alert(`Seu ID de acesso: ${response.data.id}`);
        this.$router.push("/");
      } catch (err) {
        alert("Erro no cadastro, tente novamente");
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container .content {
  width: 100%;
  padding: 96px;

  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-container .content section {
  width: 100%;
  max-width: 380px;
}

.register-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.register-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.register-container .content form {
  width: 100%;
  max-width: 450px;
}

.register-container .content form input {
  margin-top: 8px;
}

.register-container .content form .input-group {
  display: flex;
}

.register-container .content form .input-group input + input {
  margin-left: 8px;
}
</style>