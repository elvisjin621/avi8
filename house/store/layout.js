export const state = () => ({
  isMenuOpen: false,
  isDarkBackground: false,
  isFooterVisible: false,
  isFooterAllowed: false,
  cursorPosition: {
    top: 0,
    left: 0
  }
});

export const mutations = {
  toggleMenu(state) {
    state.isMenuOpen = !state.isMenuOpen;
  },
  closeMenu(state) {
    state.isMenuOpen = false;
  },
  showFooter(state) {
    state.isFooterVisible = true;
    state.isMenuOpen = false;
  },
  hideFooter(state) {
    state.isFooterVisible = false;
  },
  allowFooter(state) {
    state.isFooterAllowed = true;
  },
  disallowFooter(state) {
    state.isFooterAllowed = false;
  },
  setCursorPosition(state, cursorPosition) {
    state.cursorPosition = cursorPosition;
  },
  setDarkBackground(state) {
    state.isDarkBackground = true;
  },
  setLightBackground(state) {
    state.isDarkBackground = false;
  }
};
