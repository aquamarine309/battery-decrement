const rebuyable = props => {
  props.cost = () => {
    return props.initialCost * Math.pow(props.costMult, player.apps[props.id]);
  }
  props.effect = () => (
    props.singleEffect *
    player.apps[props.id] /
    (Apps.lowBattery ? props.id + 2 : 1)
  );
  return props;
}

export const apps = {
  "clock": rebuyable({
    id: APPS.CLOCK,
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
  "daysMatter": rebuyable({
    id: APPS.DAYS_MATTER,
    name: "Days Matter",
    // 0.100% per second
    singleEffect: 0.001,
    // 5% (95%)
    initialCost: 0.05,
    costMult: 2.2,
    icon: "calendar"
  }),
  "wechat": rebuyable({
    id: APPS.WECHAT,
    name: "微信",
    // 0.400% per second
    singleEffect: 0.004,
    // 20% (80%)
    initialCost: 0.2,
    costMult: 2.3,
    icon: "weixin"
  }),
  "qq": rebuyable({
    id: APPS.QQ,
    name: "QQ",
    // 1.000% per second
    singleEffect: 0.01,
    // 50% (50%)
    initialCost: 0.5,
    costMult: 2.5,
    icon: "qq"
  }),
}