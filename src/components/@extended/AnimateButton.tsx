import PropTypes from "prop-types";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateButtonProps {
  children: ReactNode;
  type: "slide" | "scale" | "rotate";
}

export default function AnimateButton({ children, type = "scale" }: AnimateButtonProps) {
  switch (type) {
    case "rotate": // TODO: add rotate animation
    case "slide": // TODO: add rotate animation
    case "scale": // TODO: add rotate animation
    default:
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      );
  }
}

AnimateButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["slide", "scale", "rotate"]),
};

AnimateButton.defaultProps = {
  type: "scale",
};
