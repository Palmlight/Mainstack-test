import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/helpers.utils";
import clsx from "clsx";
import { useRef } from "react";
import { useClickAway } from "react-use";

const SideModal = ({
  show,
  onClose,
  children,
  className
}: {
  show?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    if (show) {
      onClose?.();
    }
  });

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          exit={{
            opacity: 0,
            transition: { delay: 0.3, duration: 0.3, ease: "easeInOut" }
          }}
          className={cn(
            show ? "h-screen w-screen" : "h-0 w-0 opacity-0",
            "fixed top-0 left-0 z-[800] side-modal flex justify-end overflow-y-auto"
          )}
        >
          <motion.div
            key="side-modal-content"
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.2, duration: 0.3, ease: "easeInOut" }
            }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            transition={{ ease: "easeInOut" }}
            className={clsx("", className)}
            ref={ref}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideModal;
