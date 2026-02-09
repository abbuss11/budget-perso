<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="auth-header">
        <ion-text color="primary">
          <h1>Créer un compte</h1>
        </ion-text>
        <p>Enregistrez-vous pour démarrer votre suivi budgétaire.</p>
      </div>

      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-input v-model="name" label="Nom complet" placeholder="Votre nom" />
          </ion-item>
          <ion-item>
            <ion-input v-model="email" label="Email" type="email" placeholder="vous@email.com" />
          </ion-item>
          <ion-item>
            <ion-input v-model="password" label="Mot de passe" type="password" />
          </ion-item>
          <ion-item lines="none">
            <ion-checkbox v-model="accepted" />
            <ion-label class="ion-margin-start">J'accepte les conditions d'utilisation</ion-label>
          </ion-item>
          <ion-button expand="block" :disabled="loading" @click="handleSignup">
            {{ loading ? 'Création...' : 'Créer mon compte' }}
          </ion-button>
          <ion-text color="danger" v-if="error" class="ion-margin-top">
            <p>{{ error }}</p>
          </ion-text>
          <div class="auth-footer">
            <p>
              Déjà inscrit ?
              <ion-router-link href="/login">Se connecter</ion-router-link>
            </p>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonText
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const accepted = ref(false);
const loading = ref(false);
const error = ref('');

const handleSignup = async () => {
  error.value = '';
  if (!name.value || !email.value || !password.value) {
    error.value = 'Merci de remplir tous les champs.';
    return;
  }
  if (!accepted.value) {
    error.value = 'Vous devez accepter les conditions.';
    return;
  }

  loading.value = true;
  try {
    await authService.signup({
      nom: name.value,
      email: email.value,
      devise: 'XOF',
      date_creation: new Date().toISOString()
    });
    await router.replace('/tabs/dashboard');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Inscription impossible.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-header {
  text-align: center;
  margin: 32px 0 24px;
}

.auth-footer {
  margin-top: 16px;
  text-align: center;
}
</style>
