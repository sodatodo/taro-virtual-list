import { PureComponent } from "react";

let INSTANCE_ID = 0;

export type createListComponentParams = {

}

export interface IListProps {
    initialScrollOffset?: number;
}
export interface IListState {
    id: string;
    instance: PureComponent<IListProps, IListState>;
    isScrolling: boolean;
    scrollDirection: 'forward' | 'backward';
    scrollOffset: number;
    scrollUpdateWasRequested: boolean;
    sizeList: any[];
}
export default function createListComponent () {
    let _class, _temp;

    return _temp = _class = class List extends PureComponent<IListProps, IListState> {
        private _instanceProps: undefined;
        private _outerRef: undefined;
        private _resetIsScrollingTimeoutId: null;
        field: { scrollLeft: number; scrollTop: number; scrollHeight: number; scrollWidth: number; clientHeight: number; clientWidth: number; };

        constructor(props) {
            super(props);
            this._instanceProps = void 0;
            this._outerRef = void 0;
            this._resetIsScrollingTimeoutId = null;

            this.state = {
                id: props.id || `virtual-list-${INSTANCE_ID++}`,
                instance: this,
                isScrolling: false,
                scrollDirection: 'forward',
                scrollOffset: typeof this.props.initialScrollOffset === 'number' ? this.props.initialScrollOffset : 0,
                scrollUpdateWasRequested: false,
                sizeList: []
            }

            this.field = {
                scrollLeft: 0,
                scrollTop: 0,
                scrollHeight: 0,
                scrollWidth: 0,
                clientHeight: 0,
                clientWidth: 0
            }
        }
    }
}