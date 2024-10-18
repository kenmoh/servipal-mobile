import rider from "@/assets/images/rider.png";
import foodOrdering from "@/assets/images/restaurant.png";
import p2p from "@/assets/images/mkt.png";
import laundry from "@/assets/images/laundry.png";

export const onboardingSlides = [
  {
    id: 1,
    name: "Welcome to ServiPal",
    description:
      "Your one-stop app for item delivery, food ordering, laundry services, and secure online peer-to-peer shopping.",
    image: rider,
  },
  {
    id: 2,
    name: "Quick & Reliable Delivery",
    description: "Send and receive packages with ease, anywhere, anytime.",
    image: rider,
  },
  {
    id: 3,
    name: "Delicious Meals at Your Doorstep",
    description:
      "Order from your favourite restaurants and enjoy fast, fresh food delivery.",
    image: foodOrdering,
  },
  {
    id: 4,
    name: "Laundry Services Made Simple",
    description:
      "Choose from a wide range of laundry services providers and have your clothes cleaned and delivered.",
    image: laundry,
  },
  {
    id: 5,
    name: "Safe & Secure Shopping",
    description:
      "Browse, buy, and sell items securely with confidence using our built-in escrow service. What you ordered is what you get! 😊",
    image: p2p,
  },
];
