import { ICONS } from "./icons.js";

const rebuyable = props => {
  props.cost = () => {
    return props.initialCost * Math.pow(props.costMult, player.apps[props.id]);
  }
  return props;
}

export const apps = [
  rebuyable({
    id: 0,
    name: "时钟",
    // 0.050% per second
    singleEffect: 0.0005,
    // 0.25% (99.75%)
    initialCost: 0.0025,
    costMult: 2,
    // font-awesome icon
    // <i class="fas fa-clock"></i> in AppRow.js
    icon: "clock"
  }),
  rebuyable({
    id: 1,
    name: "Days Matter",
    // 0.100% per second
    singleEffect: 0.001,
    // 5% (95%)
    initialCost: 0.05,
    costMult: 2.2,
    icon: "calendar"
  }),
  rebuyable({
    id: 2,
    name: "微信",
    // 0.400% per second
    singleEffect: 0.004,
    // 20% (80%)
    initialCost: 0.2,
    costMult: 2.3,
    icon: "weixin"
  }),
  rebuyable({
    id: 3,
    name: "QQ",
    // 1.000% per second
    singleEffect: 0.008,
    // 50% (50%)
    initialCost: 0.5,
    costMult: 2.5,
    icon: "qq"
  }),
  rebuyable({
    id: 4,
    name: "冰与火之舞",
    // 5.000% per second
    singleEffect: 0.05,
    // 80% (20%)
    initialCost: 0.8,
    costMult: 2.8,
    icon: ICONS.ADOFAI
  })
]