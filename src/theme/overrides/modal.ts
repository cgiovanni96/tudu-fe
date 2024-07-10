import { Modal } from "@mantine/core";

export default {
  Modal: Modal.extend({
    defaultProps: {
      overlayProps: {
        backgroundOpacity: 0.45,
        blur: 5,
      },
    },
  }),
};
