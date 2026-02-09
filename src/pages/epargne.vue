<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Épargne</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Total épargné</ion-card-subtitle>
          <ion-card-title>{{ formatCurrency(totalSaved) }}</ion-card-title>
        </ion-card-header>
      </ion-card>

      <ion-list>
        <ion-item v-for="saving in savings" :key="saving.id">
          <ion-label>
            <h3>{{ saving.objectif }}</h3>
            <p>Créé le {{ formatDate(saving.date_creation) }}</p>
          </ion-label>
          <ion-badge color="success">{{ formatCurrency(saving.montant) }}</ion-badge>
        </ion-item>
        <ion-item v-if="savings.length === 0">
          <ion-label>Aucun objectif enregistré.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBadge,
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
import { computed, onMounted, ref } from 'vue';
import type { Savings } from '../models/savings';
import { savingsService } from '../services/savingsService';
import { formatCurrency, formatDate } from '../utils/formatters';

const savings = ref<Savings[]>([]);

const loadSavings = async () => {
  savings.value = await savingsService.getSavings();
};

onMounted(() => {
  void loadSavings();
});

const totalSaved = computed(() => savingsService.totalSaved(savings.value));
</script>
