<template>
  <v-footer app dark padless>
    <v-card
      flat
      tile
      width="100%"
      color="#93B954"
      class="white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="item in iconList"
          :key="item.index"
          class="mx-4 white--text"
          :href="item.url"
          target="_blank"
          icon
          :title="item.title"
        >
          <v-icon size="24px">
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} - <strong>Daoswap</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    iconList: [
      {
        title: "Daoswap",
        icon: "mdi-home",
        url: "https://app.daoswap.cc"
      },
      {
        title: "Twitter",
        icon: "mdi-twitter",
        url: "https://twitter.com/Daoswapdex"
      }
    ]
  })
};
</script>
