<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tableau de bord</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Solde total</ion-card-title>
          <ion-card-subtitle>Toutes sources confondues</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <h2>{{ formatCurrency(totalBalance) }}</h2>
        </ion-card-content>
      </ion-card>

      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Revenus</ion-card-subtitle>
                <ion-card-title class="success-text">{{ formatCurrency(totalIncome) }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Dépenses</ion-card-subtitle>
                <ion-card-title class="danger-text">{{ formatCurrency(totalExpense) }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Épargne</ion-card-subtitle>
                <ion-card-title>{{ formatCurrency(totalSavings) }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Taux d'épargne</ion-card-subtitle>
                <ion-card-title>{{ savingsRate }}%</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Transactions récentes</ion-card-title>
        </ion-card-header>
        <ion-list>
          <ion-item v-for="transaction in recentTransactions" :key="transaction.id">
            <ion-label>
              <h3>{{ transaction.note }}</h3>
              <p>{{ formatDate(transaction.date) }} · {{ categoryName(transaction.categorieId) }}</p>
            </ion-label>
            <ion-badge :color="transaction.type === 'REVENU' ? 'success' : 'danger'">
              {{ formatCurrency(transaction.montant) }}
            </ion-badge>
          </ion-item>
          <ion-item v-if="recentTransactions.length === 0">
            <ion-label>Aucune transaction disponible.</ion-label>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import type { Account } from '../models/compte';
import type { Category, Transaction } from '../models/depenses';
import type { Savings } from '../models/savings';
import { accountService } from '../services/accountService';
import { transactionService } from '../services/transactionService';
import { savingsService } from '../services/savingsService';
import { formatCurrency, formatDate } from '../utils/formatters';

const accounts = ref<Account[]>([]);
const transactions = ref<Transaction[]>([]);
const categories = ref<Category[]>([]);
const savings = ref<Savings[]>([]);

const loadDashboard = async () => {
  accounts.value = await accountService.getAccounts();
  transactions.value = await transactionService.getTransactions();
  categories.value = await transactionService.getCategories();
  savings.value = await savingsService.getSavings();
};

onMounted(() => {
  void loadDashboard();
});

const totalBalance = computed(() => accountService.totalBalance(accounts.value));
const totalIncome = computed(() => transactionService.sumByType(transactions.value, 'REVENU'));
const totalExpense = computed(() => transactionService.sumByType(transactions.value, 'DEPENSE'));
const totalSavings = computed(() => savingsService.totalSaved(savings.value));
const savingsRate = computed(() => {
  if (totalIncome.value === 0) {
    return 0;
  }
  return Math.round(((totalIncome.value - totalExpense.value) / totalIncome.value) * 100);
});

const recentTransactions = computed(() =>
  [...transactions.value]
    .sort((a, b) => b.date_creation.localeCompare(a.date_creation))
    .slice(0, 4)
);

const categoryName = (categoryId: string) =>
  categories.value.find((category) => category.id === categoryId)?.nom ?? 'Autre';
</script>

<style scoped>
h2 {
  font-size: 28px;
  margin: 0;
}

.success-text {
  color: var(--ion-color-success);
}

.danger-text {
  color: var(--ion-color-danger);
}
</style>
