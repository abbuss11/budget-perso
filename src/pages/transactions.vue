<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Transactions</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="selectedSegment">
          <ion-segment-button value="all">Tout</ion-segment-button>
          <ion-segment-button value="DEPENSE">Dépenses</ion-segment-button>
          <ion-segment-button value="REVENU">Revenus</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="transaction in filteredTransactions" :key="transaction.id">
          <ion-label>
            <h3>{{ transaction.note }}</h3>
            <p>{{ formatDate(transaction.date) }} · {{ categoryName(transaction.categorieId) }}</p>
          </ion-label>
          <ion-badge :color="transaction.type === 'REVENU' ? 'success' : 'danger'">
            {{ formatCurrency(transaction.montant) }}
          </ion-badge>
        </ion-item>
        <ion-item v-if="filteredTransactions.length === 0">
          <ion-label>Aucune transaction trouvée.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import type { Category, Transaction } from '../models/depenses';
import { transactionService } from '../services/transactionService';
import { formatCurrency, formatDate } from '../utils/formatters';

const transactions = ref<Transaction[]>([]);
const categories = ref<Category[]>([]);
const selectedSegment = ref<'all' | 'DEPENSE' | 'REVENU'>('all');

const loadTransactions = async () => {
  transactions.value = await transactionService.getTransactions();
  categories.value = await transactionService.getCategories();
};

onMounted(() => {
  void loadTransactions();
});

const filteredTransactions = computed(() => {
  const sorted = [...transactions.value].sort((a, b) =>
    b.date_creation.localeCompare(a.date_creation)
  );
  if (selectedSegment.value === 'all') {
    return sorted;
  }
  return sorted.filter((transaction) => transaction.type === selectedSegment.value);
});

const categoryName = (categoryId: string) =>
  categories.value.find((category) => category.id === categoryId)?.nom ?? 'Autre';
</script>
