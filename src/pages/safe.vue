<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Coffre-fort</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card color="light">
        <ion-card-header>
          <ion-card-title>🔒 Données chiffrées AES-256</ion-card-title>
          <ion-card-subtitle>Vos informations sensibles sont protégées.</ion-card-subtitle>
        </ion-card-header>
      </ion-card>

      <ion-list>
        <ion-item v-for="item in safeItems" :key="item.id">
          <ion-label>
            <h3>{{ item.title }}</h3>
            <p>{{ item.type }}</p>
          </ion-label>
          <ion-button fill="outline" size="small" @click="toggle(item.id)">
            {{ item.visible ? 'Masquer' : 'Afficher' }}
          </ion-button>
        </ion-item>
        <ion-item v-for="item in safeItems" :key="`${item.id}-content`" v-if="item.visible">
          <ion-label>{{ item.content }}</ion-label>
        </ion-item>
        <ion-item v-if="safeItems.length === 0">
          <ion-label>Ajoutez un document ou un mot de passe.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { ref } from 'vue';

type SafeItem = {
  id: string;
  title: string;
  type: string;
  content: string;
  visible: boolean;
};

const safeItems = ref<SafeItem[]>([
  {
    id: 'safe-1',
    title: 'Email principal',
    type: 'Mot de passe',
    content: '••••••••',
    visible: false
  }
]);

const toggle = (id: string) => {
  safeItems.value = safeItems.value.map((item) =>
    item.id === id ? { ...item, visible: !item.visible } : item
  );
};
</script>
