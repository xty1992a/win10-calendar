import { computed, h } from "vue";

export default function Mask(props) {
  const position = props.position;
  const style = computed(() => {
    const size = Math.max(position.width, position.height) * 2;
    const isEnter = position.enter;
    return {
      transform: `translate(${position.x - size / 2}px, ${
        position.y - size / 2
      }px)`,
      backgroundImage: isEnter
        ? `radial-gradient(transparent, rgba(0, 0, 0, 1) 60px, #000)`
        : "",
      backgroundColor: isEnter ? "" : "#000",
      width: size ? size + "px" : "100%",
      height: size ? size + "px" : "100%",
    };
  });

  return <div class="mask" style={style.value} />;
}
