import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AtmCardImage from "../../assets/img/atm-card.png";
import {
  cardVariants,
  indicatorVarVariants,
  swipeConfidenceThreshold,
  swipePower,
} from "../../animation";
import getCurrency from "../../utility/getCurrency";
import { Eye, EyeOff } from "lucide-react";
import type { CardSwiperProps } from "../../types/type";

export const CardSwiper = ({
  cards,
  activeCard,
  setActiveCard,
}: CardSwiperProps) => {
  const [direction, setDirection] = useState(0);
  const [balanceHidden, setBalanceHidden] = useState(false);

  const activeIndex = cards.findIndex((card) => card.id === activeCard);

  const handleCardClick = (id: string) => {
    const newIndex = cards.findIndex((card) => card.id === id);
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveCard(id);
  };

  const handleDragEnd = (
    _: never,
    { offset, velocity }: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold && activeIndex < cards.length - 1) {
      setDirection(1);
      setActiveCard(cards[activeIndex + 1].id);
    } else if (swipe > swipeConfidenceThreshold && activeIndex > 0) {
      setDirection(-1);
      setActiveCard(cards[activeIndex - 1].id);
    }
  };

  return (
    <div className=" h-fit!">
      <div className="relative w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {cards
            .filter((card) => card.id === activeCard)
            .map((card) => (
              <motion.div
                key={card.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                whileTap={{ cursor: "grabbing" }}
                onDragEnd={handleDragEnd}
              >
                <div className="absolute left-4 bottom-4 sm:left-5.75 sm:bottom-5.75 space-y-2 sm:space-y-3.5">
                  <div className="flex items-center gap-3 text-gray-500">
                    <p className="text-xs ">Balance</p>
                    <button onClick={() => setBalanceHidden((prev) => !prev)}>
                      {balanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-base sm:text-xl font-black text-white">
                    {balanceHidden
                      ? "******"
                      : `${getCurrency({ currency: card.currency })} ${card.balance}`}
                  </p>
                </div>
                <img src={AtmCardImage} alt="" className="w-full h-auto" />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Card selector dots */}
      <div className="flex gap-1 mt-2 items-center justify-center relative z-20">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            variants={indicatorVarVariants}
            initial="initial"
            animate={activeCard === card.id ? "animate" : "initial"}
            onClick={() => handleCardClick(card.id)}
            className={`h-1 cursor-pointer rounded-full ${activeCard === card.id ? " bg-secondary-500 dark:bg-white" : " bg-gray-200 dark:bg-gray-700"}`}
          />
        ))}
      </div>
    </div>
  );
};
