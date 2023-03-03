export const state = () => ({
  inAnchor: "",
  outAnchor: "",
  itemCurrent: 0,
  itemsTotal: 0
});

export const mutations = {
  setItemCurrent(state, itemCurrent) {
    state.itemCurrent = itemCurrent;
  },
  setItemsTotal(state, itemsTotal) {
    state.itemsTotal = itemsTotal;
  },
  setInAnchor(state, anchor) {
    state.inAnchor = anchor;
  },
  setOutAnchor(state, anchor) {
    state.outAnchor = anchor;
  }
};
