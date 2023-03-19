import { BlockConstructor } from "@utils/Block";
import store, { StoreEvents, TState } from "./Store";

export default function withStore(mapStateToProps: (state: TState) => any) {
	return function wrap(Component: BlockConstructor) {
		let previousState: any;

		return class WithStore extends Component {
			constructor(props: any) {
				previousState = mapStateToProps(store.getState());

				super({ ...props, ...previousState });

				store.on(StoreEvents.Updated, () => {
					const stateProps = mapStateToProps(store.getState());

					previousState = stateProps;

					this.setProps({ ...stateProps });
				});
			}
		};
	};
}
