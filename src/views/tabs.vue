<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/tabs/dashboard">
          <ion-icon :icon="homeOutline" />
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="accounts" href="/tabs/accounts">
          <ion-icon :icon="walletOutline" />
          <ion-label>Comptes</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="transactions" href="/tabs/transactions">
          <ion-icon :icon="swapHorizontalOutline" />
          <ion-label>Transactions</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="savings" href="/tabs/savings">
          <ion-icon :icon="trendingUpOutline" />
          <ion-label>Épargne</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="safe" href="/tabs/safe">
          <ion-icon :icon="lockClosedOutline" />
          <ion-label>Coffre</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/vue';
import {
  homeOutline,
  lockClosedOutline,
  swapHorizontalOutline,
  trendingUpOutline,
  walletOutline
} from 'ionicons/icons';
</script>
