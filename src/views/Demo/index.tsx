import { defineComponent, VNode } from 'vue';
import { selectProps } from 'ant-design-vue/es/select/index';
import { Select as ASelect } from 'ant-design-vue';

const Select = defineComponent({
  name: 'Select',
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    ...selectProps()
  },
  components: {
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    }
  },
  setup(props, { attrs, emit, slots, expose }) {
    console.log(props, slots, '传值');
    const { multiple, ...rest } = props;

    const dropdownRender = e => (
      <>
        {multiple && <div>has extend</div>}
        <v-nodes vnodes={e} />
      </>
    );
    return () => {
      console.log(props);
      return <ASelect {...rest} dropdownRender={dropdownRender} />;
    };
  }
});

export default Select;
