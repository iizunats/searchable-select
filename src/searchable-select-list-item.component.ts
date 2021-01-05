import {AbstractComponent, Component, EventHelper, EventListener} from "iizuna";
import {LIST_ITEM} from "./selector.const";
import {LIST_ITEM_CLICK_EVENT} from "./event.const";

@Component({
    selector: LIST_ITEM
})
export class SearchableSelectListItemComponent extends AbstractComponent {
    @EventListener()
    click() {
        EventHelper.triggerCustomEvent(LIST_ITEM_CLICK_EVENT, this.identifier);
    }
}
