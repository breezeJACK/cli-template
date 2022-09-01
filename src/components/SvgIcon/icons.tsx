import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'SvgIcon',
  props: {
    dot: Boolean,
    content: [Number, String],
    size: {
      type: [String, Number],
      default: '14px'
    },
    color: {
      type: String,
      default: '#ccc'
    },
    type: {
      type: String,
      required: true
    },
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'i'
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (event: Event) => {
      emit('click', event);
    };

    function addUnit(value: string | number): string | undefined {
      if (typeof value === 'number') {
        return value + 'px';
      }
      return value;
    }

    return () => {
      const { tag, type, color, size, dot, content } = props;
      const curSize = addUnit(size);
      return (
        <span class="van-icon" onClick={handleClick}>
          <svg style={{ width: curSize, height: curSize, color }} class="svg-icon">
            <use xlinkHref={`#icon-${type}`} />
          </svg>
        </span>
      );
    };
  }
});
