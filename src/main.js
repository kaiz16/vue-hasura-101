import { createApp } from 'vue'
import App from './App.vue'
import { DefaultApolloClient, provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./vue-apollo"; 

provideApolloClient(apolloClient)
createApp(App)
.provide(DefaultApolloClient, apolloClient)
.mount('#app')
