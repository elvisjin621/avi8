<template>
  <nuxt-link to="/memberships"
    ><div class="membership-button">Membership</div></nuxt-link
  >
</template>

<script>
export default {
  name: "MembershipLink",
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.membership-button {
  width: 120px;
  text-align: center;
  padding: $space-1;
  font-size: $fontSize2;
  font-weight: $fontWeightSemiBold;
  background: $colorDarkestGray;
  color: $colorGold;
}
</style>
