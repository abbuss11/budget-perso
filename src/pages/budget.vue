<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Comptes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Solde total</ion-card-subtitle>
          <ion-card-title>{{ formatCurrency(totalBalance) }}</ion-card-title>
        </ion-card-header>
      </ion-card>

      <ion-list>
        <ion-item v-for="account in accounts" :key="account.id">
          <ion-label>
            <h3>{{ account.nom }}</h3>
            <p>{{ accountTypeLabel(account.type) }}</p>
          </ion-label>
          <ion-badge color="primary">{{ formatCurrency(account.solde_initial) }}</ion-badge>
        </ion-item>
        <ion-item v-if="accounts.length === 0">
          <ion-label>Aucun compte pour le moment.</ion-label>
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
import type { Account, AccountType } from '../models/compte';
import { accountService } from '../services/accountService';
import { formatCurrency } from '../utils/formatters';

const accounts = ref<Account[]>([]);

const loadAccounts = async () => {
  accounts.value = await accountService.getAccounts();
};

onMounted(() => {
  void loadAccounts();
});

const totalBalance = computed(() => accountService.totalBalance(accounts.value));

const accountTypeLabel = (type: AccountType) => {
  switch (type) {
    case 'CASH':
      return 'Cash';
    case 'MOBILE_MONEY':
      return 'Mobile Money';
    case 'BANQUE':
      return 'Banque';
    case 'EPARGNE':
      return 'Épargne';
    default:
      return 'Autre';
  }
};
</script>
